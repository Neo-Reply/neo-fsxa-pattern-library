import { ActionContext } from "vuex";
import {
  ComparisonQueryOperatorEnum,
  Dataset,
  FetchNavigationParams,
  FSXAApi,
  FSXAApiErrors,
  LogicalQueryOperatorEnum,
  NavigationData,
  QueryBuilderQuery,
} from "fsxa-api";

import { FSXAVuexState, RootState } from "../";
import { applyPageRefMappingToRemoteDataset } from "@/utils/misc";

function createDatasetRouteFilters(route: string): QueryBuilderQuery[] {
  return [
    {
      operator: LogicalQueryOperatorEnum.OR,
      filters: [
        {
          field: "route",
          operator: ComparisonQueryOperatorEnum.EQUALS,
          value: route,
        },
        {
          field: "routes.route",
          operator: ComparisonQueryOperatorEnum.EQUALS,
          value: route,
        },
      ],
    },
    {
      operator: ComparisonQueryOperatorEnum.EQUALS,
      value: "Dataset",
      field: "fsType",
    },
  ];
}

function isNotFoundError(errorLike: unknown) {
  return (
    errorLike &&
    typeof errorLike === "object" &&
    (errorLike as Record<string, unknown>).message === FSXAApiErrors.NOT_FOUND
  );
}

async function fetchNavigationOrNull(
  fsxaApi: FSXAApi,
  params: FetchNavigationParams,
) {
  try {
    return await fsxaApi.fetchNavigation(params);
  } catch (reason) {
    if (isNotFoundError(reason)) return null;
    throw reason;
  }
}

export async function fetchDatasetByRoute(
  fsxaApi: FSXAApi,
  route: string,
  remoteProjectId: string | undefined,
  pageRefMapping: Record<string, string> | undefined,
): Promise<Dataset | undefined> {
  const { items } = await fsxaApi.fetchByFilter({
    filters: createDatasetRouteFilters(route),
  });
  const localDataset = items[0];

  if (!localDataset && remoteProjectId) {
    const { items: remoteItems } = await fsxaApi.fetchByFilter({
      filters: createDatasetRouteFilters(route),
      remoteProject: remoteProjectId,
    });

    const remoteDataset = remoteItems[0] as Dataset;
    applyPageRefMappingToRemoteDataset(remoteDataset, pageRefMapping);
    remoteDataset &&
      console.log(
        "fetchDatasetByRoute, remote Dataset fetched ",
        remoteDataset.id,
        remoteDataset.routes,
      );

    return remoteDataset as Dataset | undefined;
  }

  return localDataset as Dataset | undefined;
}

export interface InitializeAppPayload {
  locale: string;
  initialPath?: string;
  useExactDatasetRouting?: boolean;
  remoteDatasetProjectId?: string;
  remoteDatasetPageRefMapping?: Record<string, string>;
}
export const createAppInitialization = (fsxaApi: FSXAApi) => async (
  { commit }: ActionContext<FSXAVuexState, RootState>,
  payload: InitializeAppPayload,
): Promise<void> => {
  console.debug("Initializing app", { payload });
  const route = payload.initialPath ? decodeURI(payload.initialPath) : "/";

  // reset store
  commit("setAppAsInitializing");

  async function fetchExactDatasetRouting(): Promise<NavigationData | null> {
    let navigationData = null;
    if (payload.useExactDatasetRouting) {
      const dataset = await fetchDatasetByRoute(
        fsxaApi,
        route,
        payload.remoteDatasetProjectId,
        payload.remoteDatasetPageRefMapping,
      );
      if (dataset) {
        console.debug(`Storing dataset ${dataset.id} for route ${route}.`);
        commit("setStoredItem", {
          key: payload.initialPath,
          value: dataset,
          fetchedAt: new Date().getTime(),
          ttl: 300000,
        });
        navigationData = await fetchNavigationOrNull(fsxaApi, {
          locale: dataset.locale,
        });
      }
    }
    return navigationData;
  }

  async function fetchNavigationDataFallback(): Promise<NavigationData | null> {
    let navigationData = await fetchNavigationOrNull(fsxaApi, {
      locale: payload.locale,
      initialPath: route,
    });
    if (!navigationData) {
      // unable to find path in NavigationData. Fetch Nav for root
      navigationData = await fetchNavigationOrNull(fsxaApi, {
        locale: payload.locale,
        initialPath: "/",
      });
    }

    return navigationData;
  }

  try {
    const navigationData =
      (await fetchExactDatasetRouting()) ||
      (await fetchNavigationDataFallback());

    if (!navigationData) {
      commit("setError", {
        message: "Could not fetch navigation-data from NavigationService",
        description:
          "Please make sure that the Navigation-Service is available and your config is correct. See the documentation for more information.",
      });
      return;
    }

    const settings = await fsxaApi.fetchProjectProperties({
      locale: navigationData.meta.identifier.languageId,
    });

    commit("setAppAsInitialized", {
      locale: navigationData.meta.identifier.languageId,
      navigationData,
      settings,
    });
  } catch (error) {
    if (error instanceof Error) {
      commit("setError", {
        message: error.message,
        stacktrace: error.stack,
      });
    } else {
      commit("setError", {
        message: (error as any)?.message || "Unknown error occurred.",
      });
    }
    console.error(error);
  }
};
