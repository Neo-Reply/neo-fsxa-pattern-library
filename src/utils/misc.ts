import { Dataset, PageBodyContent } from "fsxa-api";

export interface ShouldHideSectionType {
  content: PageBodyContent;
  isEditMode: boolean;
  displayHiddenSections: boolean;
}

export function shouldHideSection({
  content,
  isEditMode,
  displayHiddenSections,
}: ShouldHideSectionType): boolean {
  return (
    isEditMode &&
    !displayHiddenSections &&
    content.type === "Section" &&
    content.displayed === false
  );
}

/**
 * Iterates through routes Array of a dataset and applies the pageRef Mapping.
 * The original dataset is manipulated. If no mapping is found for a pageRef, it will not change
 *
 * Example Input:
 *
 * ```pageRefMapping = {"page-ref-id-A": "other-page-ref-id-B"}```
 *
 * ```dataset.routes = [{"page-ref-id-A": "some/route"}, {"page-ref-id-Z": "some/other/route"}]```
 *
 * dataset.routes gets manipulated to:
 *
 * ```dataset.routes = [{"other-page-ref-id-B": "some/route"}, {"page-ref-id-Z": "some/other/route"}]```
 *
 *
 * @param dataset
 * @param pageRefMapping
 */
export function applyPageRefMappingToRemoteDataset(
  dataset: Dataset | undefined,
  pageRefMapping: Record<string, string> | undefined,
) {
  dataset?.routes.forEach(
    routeData =>
      (routeData.pageRef =
        pageRefMapping?.[routeData.pageRef] || routeData.pageRef),
  );
}
