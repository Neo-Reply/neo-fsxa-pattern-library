import { Component as TsxComponent } from "vue-tsx-support";
import { Component, Inject, InjectReactive } from "vue-property-decorator";
import { FSXAGetters } from "@/store";
import {
  FSXAApiSingleton,
  NavigationData,
  NavigationItem,
  FSXAApi,
  Dataset,
  ProjectProperties,
} from "fsxa-api";
import {
  findNavigationItemInNavigationData,
  getStoredItem,
  setStoredItem,
  setNavigation,
  triggerRouteChange,
  isExactDatasetRoutingEnabled,
  getRemoteDatasetProjectId,
  getRemoteDatasetPageRefMapping,
  isExactDatasetRoutingFallbackEnabled,
} from "@/utils/getters";
import { RequestRouteChangeParams } from "@/types/components";
import {
  FSXA_INJECT_KEY_CUSTOM_SNAP_HOOKS,
  FSXA_INJECT_KEY_DEV_MODE,
  FSXA_INJECT_KEY_TPP_VERSION,
  FSXA_STORE_TTL,
} from "@/constants";
import { getNavigationNodeByPath } from "@/utils/navigation";
import { getTPPSnap } from "@/utils";

@Component({
  name: "BaseComponent",
})
class BaseComponent<
  Props = {},
  EventsWithOn = {},
  Slots = {}
> extends TsxComponent<Props, EventsWithOn, Slots> {
  @InjectReactive({
    from: "currentPath",
  })
  private currentPath!: string;
  @InjectReactive({ from: FSXA_INJECT_KEY_TPP_VERSION })
  fsTppVersion!: string;
  @InjectReactive({ from: FSXA_INJECT_KEY_CUSTOM_SNAP_HOOKS })
  customSnapHooks!: boolean;
  @Inject({ from: FSXA_INJECT_KEY_DEV_MODE, default: false })
  isDevMode!: boolean;
  @Inject({ from: FSXA_STORE_TTL, default: 300000 })
  storeTTL!: number;
  @Inject({
    from: "requestRouteChange",
    default: () => (params: RequestRouteChangeParams) =>
      console.log(
        "Could not perform route change, since this component is not a child of an FSXAPage",
        params,
      ),
  })
  private handleRouteChangeRequest!: (newRoute: string | null) => void;

  /**
   * This method will trigger a route change request
   *
   * You can pass in a pageId, route or locale
   *
   * If a corresponding page is found the route change will be triggered
   *
   * Make sure that you always provide some kind of fallback since this route change will only be available when javascript is enabled
   */
  async triggerRouteChange(params: RequestRouteChangeParams) {
    this.handleRouteChangeRequest(
      await triggerRouteChange(
        this.$store,
        this.fsxaApi,
        {
          locale: params.locale,
          pageId: params.pageId,
          route: params.route
            ? params.route
            : params.pageId
            ? undefined
            : this.currentPath,
        },
        this.locale,
        this.$store.getters[FSXAGetters.getGlobalSettingsKey],
        isExactDatasetRoutingEnabled(this),
        getRemoteDatasetProjectId(this),
        getRemoteDatasetPageRefMapping(this),
      ),
    );
  }

  /**
   * Get the corresponding route for a given pageId
   *
   * Will return null if no page was found
   */
  getUrlByPageId(pageId: string) {
    return (
      findNavigationItemInNavigationData(
        this.$store.getters[FSXAGetters.navigationData],
        {
          pageId,
        },
      )?.seoRoute || null
    );
  }

  /**
   * Get the NavigationItem that is matching the current path
   *
   * If null is returned, no current route could be matched to the current path
   */
  get currentPage(): NavigationItem | null {
    try {
      return getNavigationNodeByPath(
        isExactDatasetRoutingEnabled(this),
        isExactDatasetRoutingFallbackEnabled(this),
        this.navigationData,
        this.currentPath,
        this.currentDataset,
      );
    } catch (err) {
      // page could not be found
      return null;
    }
  }

  /**
   * Get the Dataset for the the current path
   *
   * If null is returned, this path is not a content projection
   */
  get currentDataset(): Dataset | null {
    return getStoredItem(this.$store, this.currentPath) || null;
  }

  /**
   * Check if this app is delivering preview or released data
   *
   * If editMode is true, the TPP_SNAP utility will be injected as well
   */
  get isEditMode() {
    return this.$store.getters[FSXAGetters.mode] === "preview";
  }

  /**
   * get preconfigured and ready to use FSXAApi instance
   */
  get fsxaApi(): FSXAApi {
    return FSXAApiSingleton.instance;
  }

  /**
   * the current locale the content is displayed in
   */
  get locale(): string {
    return this.$store.getters[FSXAGetters.locale];
  }

  /**
   * the current navigation data state
   */
  get navigationData(): NavigationData | null {
    return this.$store.getters[FSXAGetters.navigationData];
  }

  /**
   * The content of your globally configured GCAPage.
   *
   * This will be null if no globalSettingsKey was passed to the FSXAApp or no corresponding GCAPage could be found
   */
  get globalSettings(): ProjectProperties | null {
    return this.$store.state.fsxa.settings || null;
  }

  /**
   * Provides the TPPSnap API
   */
  get tppSnap(): any {
    return getTPPSnap();
  }

  /**
   * Save your navigation data in the vuex-store
   * You can use this function to store or update your navigation that were fetched from a server request
   */
  setNavigation(payload: NavigationData) {
    return setNavigation(this.$store, payload);
  }

  /**
   * Access your stored data in the vuex store
   */
  getStoredItem<Value = any>(key: string) {
    return getStoredItem<Value>(this.$store, key);
  }

  /**
   * Save your data in the vuex-store
   *
   * You can use this to store your data from 3rd party services that were fetched in the Server Side Rendering process to access it later in on the client
   *
   * Specify a ttl that will determine how long the value will be valid
   */
  setStoredItem<Value = any>(key: string, value: Value, ttl = this.storeTTL) {
    return setStoredItem(this.$store, key, value, ttl);
  }

  render(): any {
    return <div>Please provide your own render method.</div>;
  }
}
export default BaseComponent;
