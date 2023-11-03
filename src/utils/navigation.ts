import {
  ComparisonQueryOperatorEnum,
  Dataset,
  DatasetRoute,
  LogicalQueryOperatorEnum,
  NavigationData,
  NavigationItem,
  QueryBuilderQuery,
} from "fsxa-api";

export const NAVIGATION_ERROR_404 = "Could not find route with given path";

const getNavigationItem = (
  path: string,
  navigationData: NavigationData,
): NavigationItem | null => {
  return navigationData.idMap[navigationData.seoRouteMap[path]] || null;
};

const findExactMatchInSeoRouteMap = (
  path: string,
  navigationData: NavigationData,
): NavigationItem | null => {
  let node: NavigationItem | null = getNavigationItem(path, navigationData);
  if (!node) {
    // if we cannot find a route we try finding one with or without a slash at the end dependent on the original path
    path = path.endsWith("/") ? path.slice(0, -1) : path.concat("/");
    node = getNavigationItem(path, navigationData);
  }
  return node;
};

function findMatchWithSeoRouteRegex(
  path: string,
  navigationData: NavigationData,
) {
  return (
    Object.values(navigationData.idMap)
      .filter((item: any) => item.seoRouteRegex)
      .find((item: any) => path.match(item.seoRouteRegex)) || null
  );
}

function findExactMatchInRoutes(
  path: string,
  routes: DatasetRoute[],
  navigationData: NavigationData,
) {
  const node = routes.find(route => route.route === path)?.pageRef;
  return node ? navigationData.idMap[node] : null;
}

export const getNavigationNodeByPath = (
  useExactDatasetRouting: boolean,
  navigationData: NavigationData | null,
  currentPath?: string,
  currentDataset?: Dataset | null,
) => {
  if (!navigationData) return null;
  const path = decodeURIComponent(currentPath || "");
  if (path && path !== "/") {
    // Have to check exact match with dataset route as first step to avoid
    // matching a path in the seoRouteMap (as non-existing paths that match any
    // seoRouteRegex are automatically added to the seoRouteMap by the
    // by-seo-route endpoint of the Nav svc).
    if (useExactDatasetRouting && currentDataset) {
      const contentProjectionNode = findExactMatchInRoutes(
        path,
        currentDataset.routes,
        navigationData,
      );
      if (contentProjectionNode) {
        console.debug(
          `Found content projection navigation node ${contentProjectionNode.id} for path ${path} of dataset ${currentDataset.id} using explicit matching.`,
        );
        return contentProjectionNode;
      }
    }

    const node = findExactMatchInSeoRouteMap(path, navigationData);
    if (node) return node;

    if (!useExactDatasetRouting) {
      const contentProjectionNode = findMatchWithSeoRouteRegex(
        path,
        navigationData,
      );
      if (contentProjectionNode) return contentProjectionNode;
    }

    // we will throw an error, when no route was found, so the callee can show an error page
    throw new Error(NAVIGATION_ERROR_404);
  }
  return navigationData.idMap[
    navigationData.seoRouteMap[navigationData.pages.index]
  ];
};

export function createDatasetRouteFilters(route: string): QueryBuilderQuery[] {
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
