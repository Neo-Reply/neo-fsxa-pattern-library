import { FSXAActions, FSXAGetters, RootState } from "@/store";
import { fetchDatasetByRoute } from "@/store/actions/initializeApp";
import {
  ComparisonQueryOperatorEnum,
  Dataset,
  FSXAApi,
  NavigationData,
  NavigationItem,
} from "fsxa-api";
import Vue from "vue";
import { Store } from "vuex";

export function getStoredItem<Value = any>(
  $store: Store<RootState>,
  key: string,
): Value | undefined {
  const storedItem = $store.getters[FSXAGetters.item](key);
  const currentTime = new Date().getTime();
  if (
    !storedItem ||
    (storedItem.ttl >= 0 && storedItem.fetchedAt + storedItem.ttl < currentTime)
  )
    return undefined;
  return storedItem.value;
}

export function setStoredItem(
  $store: Store<RootState>,
  key: string,
  value: any,
  ttl: number,
) {
  $store.dispatch(FSXAActions.setStoredItem, {
    key,
    value,
    fetchedAt: new Date().getTime(),
    ttl,
  });
}

export function setNavigation(
  $store: Store<RootState>,
  payload: NavigationData,
) {
  $store.dispatch(FSXAActions.setNavigation, payload);
}

export function findNavigationItemInNavigationData(
  navigationData: NavigationData | null,
  params: {
    seoRoute?: string;
    pageId?: string;
  },
): NavigationItem | null {
  if (!navigationData) return null;
  if (
    (!params.pageId && !params.seoRoute) ||
    (params.pageId && params.seoRoute)
  ) {
    return null;
  }
  if (params.pageId) {
    return navigationData.idMap[params.pageId] || null;
  }
  if (params.seoRoute) {
    const pageId = navigationData.seoRouteMap[params.seoRoute];
    if (!pageId) return null;
    return navigationData.idMap[pageId] || null;
  }
  return null;
}

export interface TriggerRouteChangeParams {
  route?: string;
  pageId?: string;
  locale?: string;
}

export async function triggerRouteChange(
  $store: Store<RootState>,
  $fsxaApi: FSXAApi,
  params: TriggerRouteChangeParams,
  currentLocale: string,
  globalSettingsKey?: string,
  useExactDatasetRouting?: boolean,
  remoteProxyApiPath?: string,
  remoteDatasetPageRefMapping?: Record<string, string>,
  validLanguages?: string[],
): Promise<string | null> {
  console.debug("triggerRouteChange", { currentLocale, params });
  const navigationData: NavigationData =
    $store.getters[FSXAGetters.navigationData];

  if (!params.locale || params.locale === currentLocale) {
    if (params.route) {
      if (useExactDatasetRouting) {
        const dataset = await fetchDatasetByRoute(
          $fsxaApi,
          params.route,
          remoteProxyApiPath,
          remoteDatasetPageRefMapping,
          validLanguages,
        );
        if (dataset) {
          console.debug(
            `Storing dataset ${dataset.id} for route ${params.route}.`,
          );

          $store.dispatch(FSXAActions.setStoredItem, {
            key: params.route,
            value: dataset,
            fetchedAt: new Date().getTime(),
          });
        }
      }
      return params.route;
    }
    if (params.pageId)
      return (
        findNavigationItemInNavigationData(navigationData, {
          pageId: params.pageId,
        })?.seoRoute || null
      );
  }
  if (params.locale && params.locale !== currentLocale) {
    const currentPageId = findNavigationItemInNavigationData(navigationData, {
      pageId: params.pageId,
      seoRoute: params.route,
    })?.id;

    const currentDataset = params.route
      ? ($store.state.fsxa.stored[params.route]?.value as Dataset) || null
      : null;

    // We throw away the old state and reinitialize the app with the new locale
    await $store.dispatch(FSXAActions.initializeApp, {
      locale: params.locale,
      globalSettingsKey,
    });

    if (currentDataset) {
      // fetching dataset with target locale
      const {
        items: [dataset],
      } = (await $fsxaApi.fetchByFilter({
        filters: [
          {
            operator: ComparisonQueryOperatorEnum.EQUALS,
            value: currentDataset.id,
            field: "identifier",
          },
        ],
        locale: params.locale,
      })) as { items: Dataset[] };
      if (dataset) {
        const currentContentProjectionPageId =
          currentDataset.routes.find(el => el.route === params.route)
            ?.pageRef || "";
        // Finding localized route of dataset for current content projection page
        const route =
          dataset.routes?.find(
            el => el.pageRef === currentContentProjectionPageId,
          )?.route ||
          dataset.route ||
          "";
        if (route !== "") {
          $store.dispatch(FSXAActions.setStoredItem, {
            key: route,
            value: dataset,
            fetchedAt: new Date().getTime(),
          });
        }
        return route;
      }
    } else if (currentPageId) {
      // Using navigation data of new locale that was fetched by initializeApp to
      // find localized seoRoute of current page.
      const navigationData: NavigationData =
        $store.getters[FSXAGetters.navigationData];
      return (
        findNavigationItemInNavigationData(navigationData, {
          pageId: currentPageId,
        })?.seoRoute || null
      );
    }
  }
  return null;
}

export function isExactDatasetRoutingEnabled(vue: Vue): boolean {
  // Assuming that pattern lib is used in Nuxt environment where $config is available.
  if (!(vue as any).$config) return false;
  return (vue as any).$config.FSXA_USE_EXACT_DATASET_ROUTING === true || false;
}

export function displayHiddenSections(vue: Vue): boolean {
  // Assuming that pattern lib is used in Nuxt environment where $config is available.
  if (!(vue as any).$config) return true;
  return (vue as any).$config.FSXA_DISPLAY_HIDDEN_SECTIONS !== false;
}

export function getRemoteDatasetPageRefMapping(
  vue: Vue | undefined,
): Record<string, string> | undefined {
  // Assuming that pattern lib is used in Nuxt environment where $config is available.
  const mapping =
    (vue as any)?.$config?.FSXA_REMOTE_DATASET_PAGEREF_MAPPING || undefined;

  return mapping;
}

export function getValidLanguages(vue: Vue | undefined): string[] | undefined {
  // Assuming that pattern lib is used in Nuxt environment where $config is available.
  const validLanguages =
    (vue as any)?.$config?.FSXA_VALID_LANGUAGES || undefined;

  return validLanguages;
}

export function getRemoteDatasetProxyApiPath(
  vue: Vue | undefined,
): string | undefined {
  // Assuming that pattern lib is used in Nuxt environment where $config is available.
  const remoteDatasetProxyApiPath =
    (vue as any)?.$config?.FSXA_REMOTE_DATASET_PROXY_API_PATH || undefined;
  return remoteDatasetProxyApiPath;
}

export function getStoreTTL(vue: Vue): number {
  // Assuming that pattern lib is used in Nuxt environment where $config is available.
  if (!(vue as any).$config) return 300000;
  const storeTTL = (vue as any).$config.FSXA_STORE_TTL;
  return "number" === typeof storeTTL ? storeTTL : 300000;
}
