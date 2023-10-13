import { FSXAActions, FSXAAppError, FSXAAppState, FSXAGetters } from "@/store";
import {
  getNavigationNodeByPath,
  NAVIGATION_ERROR_404,
} from "@/utils/navigation";
import Component from "vue-class-component";
import { Prop, ProvideReactive, Watch } from "vue-property-decorator";
import Dataset from "./Dataset";
import { Component as TsxComponent } from "vue-tsx-support";
import {
  FSXA_INJECT_KEY_DEV_MODE,
  FSXA_INJECT_KEY_LAYOUTS,
  FSXA_INJECT_KEY_SECTIONS,
  FSXA_INJECT_KEY_LOADER,
  FSXA_INJECT_KEY_COMPONENTS,
  FSXA_INJECT_KEY_TPP_VERSION,
  FSXA_INJECT_KEY_CUSTOM_SNAP_HOOKS,
  FSXA_INJECT_DEV_MODE_INFO,
  FSXA_INJECT_USE_ERROR_BOUNDARY_WRAPPER,
} from "@/constants";
import Page from "./Page";
import ErrorBoundary from "./internal/ErrorBoundary";
import InfoBox from "./internal/InfoBox";
import Code from "./internal/Code";
import {
  CaaSApi_Dataset,
  ComparisonQueryOperatorEnum,
  FSXAApi,
  FSXAApiSingleton,
} from "fsxa-api";
import { AppProps } from "@/types/components";
import PortalProvider from "./internal/PortalProvider";
import { importTPPSnapAPI } from "@/utils";
import {
  getRemoteDatasetPageRefMapping,
  getRemoteDatasetProjectId,
  getStoredItem,
  isExactDatasetRoutingEnabled,
  triggerRouteChange,
} from "@/utils/getters";
import { registerTppHooks } from "@/utils/tpp-snap-hooks";
import { InitializeAppPayload } from "@/store/actions/initializeApp";

@Component({
  name: "FSXAApp",
})
class App extends TsxComponent<AppProps> {
  @Prop({ default: () => ({}) }) components!: AppProps["components"];
  @Prop() currentPath!: AppProps["currentPath"];
  @Prop({ default: false }) devMode!: AppProps["devMode"];
  @Prop({ required: true }) defaultLocale!: AppProps["defaultLocale"];
  @Prop({ required: true }) handleRouteChange!: AppProps["handleRouteChange"];
  @Prop() fsTppVersion: AppProps["fsTppVersion"];
  @Prop({ default: false }) customSnapHooks!: AppProps["customSnapHooks"];
  @Prop({ default: true })
  useErrorBoundaryWrapper!: AppProps["useErrorBoundaryWrapper"];
  @ProvideReactive("currentPath") path = this.currentPath;
  @ProvideReactive(FSXA_INJECT_KEY_DEV_MODE) injectedDevMode = this.devMode;
  @ProvideReactive(FSXA_INJECT_KEY_CUSTOM_SNAP_HOOKS)
  injectedCustomSnapHooks = this.customSnapHooks;
  @ProvideReactive(FSXA_INJECT_KEY_COMPONENTS) injectedComponents = this
    .components;

  @ProvideReactive(FSXA_INJECT_KEY_LAYOUTS) injectedLayouts =
    this.components?.layouts || {};
  @ProvideReactive(FSXA_INJECT_KEY_SECTIONS) injectedSections =
    this.components?.sections || {};
  @ProvideReactive(FSXA_INJECT_KEY_LOADER) injectedLoader =
    this.components?.loader || null;
  @ProvideReactive(FSXA_INJECT_DEV_MODE_INFO) injectedInfoError =
    this.components?.devModeInfo || null;

  @ProvideReactive(FSXA_INJECT_USE_ERROR_BOUNDARY_WRAPPER)
  injectedUseErrorBoundaryWrapper = this.useErrorBoundaryWrapper;

  @Watch("currentPath")
  onCurrentPathChange(nextPath: string) {
    this.path = nextPath;
  }

  @Watch("devMode")
  onDevModeChange(nextDevMode: boolean) {
    this.injectedDevMode = nextDevMode;
  }

  @Watch("useErrorBoundaryWrapper")
  onUseErrorBoundaryWrapperChange(nextUseErrorBoundaryWrapper: boolean) {
    this.injectedUseErrorBoundaryWrapper = nextUseErrorBoundaryWrapper;
  }

  @Watch("components")
  onComponentsChange(nextComponents: AppProps["components"]) {
    this.injectedComponents = nextComponents;
    this.injectedLayouts = nextComponents?.layouts || {};
    this.injectedSections = nextComponents?.sections || {};
  }

  serverPrefetch() {
    return this.initialize();
  }

  @ProvideReactive(FSXA_INJECT_KEY_TPP_VERSION)
  get tppVersion() {
    return this.fsTppVersion;
  }

  async mounted() {
    if (this.appState === FSXAAppState.not_initialized) await this.initialize();

    if (this.isEditMode) {
      // initialize TPP
      const TPP_SNAP = await importTPPSnapAPI({
        version: this.tppVersion,
        url: this.$store.getters[FSXAGetters.getSnapUrl],
      });

      if (!this.customSnapHooks) {
        // Note: The OCM event handlers are registered on the first App instance that is rendered.
        // This means the handlers capture and reference variables of that first component instance
        // which can contain outdated values when new App instances are created and rendered (e.g.,
        // after navigating or switching language).
        // This is why some instance variables are not accessed in these handlers and alternatives
        // are used (e.g., location path instead of currentPath property).

        // predefine store utils
        const forceUpdateStore = async (path = window.location.pathname) => {
          await this.initialize(this.$store.getters[FSXAGetters.locale], path);
        };
        const routeToPreviewId = async (previewId: string) => {
          const [pageId, locale] = previewId.split(".");
          await this.requestRouteChangeByPageId(pageId, locale);
        };

        // register default fsxa tpp hooks
        await registerTppHooks({
          fsxaApi: this.fsxaApi,
          TPP_SNAP,
          forceUpdateStore,
          routeToPreviewId,
        });
      }
    }
  }

  initialize(locale?: string, path?: string) {
    const payload: InitializeAppPayload = {
      locale: locale ? locale : this.defaultLocale,
      initialPath: path ? path : this.currentPath,
      useExactDatasetRouting: isExactDatasetRoutingEnabled(this),
      remoteDatasetProjectId: getRemoteDatasetProjectId(this),
      remoteDatasetPageRefMapping: getRemoteDatasetPageRefMapping(this),
    };
    return this.$store.dispatch(FSXAActions.initializeApp, payload);
  }

  async requestRouteChangeByPageId(pageId: string, locale?: string) {
    console.debug("Try to resolve route", { pageId, locale });

    if (pageId) {
      // lookup route for `pageId` from store
      let newRoute: string | null = await triggerRouteChange(
        this.$store,
        this.fsxaApi,
        { pageId, locale: locale ?? this.$store.getters[FSXAGetters.locale] },
        this.$store.getters[FSXAGetters.locale],
        this.$store.getters[FSXAGetters.getGlobalSettingsKey],
        isExactDatasetRoutingEnabled(this),
        getRemoteDatasetProjectId(this),
        getRemoteDatasetPageRefMapping(this),
      );

      // if no route found, lookup from api
      if (newRoute === null) {
        const response = await this.fsxaApi.fetchByFilter({
          filters: [
            {
              field: "identifier",
              operator: ComparisonQueryOperatorEnum.EQUALS,
              value: pageId,
            },
          ],
          locale: locale ?? this.$store.getters[FSXAGetters.locale],
          additionalParams: {
            keys: [{ type: 1, route: 1, "routes.route": 1 }],
          },
        });
        const item = response?.items?.[0] as Partial<
          Pick<CaaSApi_Dataset, "routes" | "route">
        >;
        newRoute = item?.route ?? item?.routes?.[0]?.route ?? null;
        if (newRoute) {
          await this.initialize(this.$store.getters[FSXAGetters.locale]);
        }
      }

      if (newRoute != null) {
        this.handleRouteChange(newRoute);
      } else {
        console.warn("Unable to find route by ", { pageId, locale });
      }
    }
  }

  @ProvideReactive("requestRouteChange")
  async requestRouteChange(newRoute: string | null) {
    if (newRoute) this.handleRouteChange(newRoute);
  }

  get isEditMode() {
    return this.$store.getters[FSXAGetters.mode] === "preview";
  }

  get fsxaApi(): FSXAApi {
    return FSXAApiSingleton.instance;
  }

  get locale(): string {
    return this.$store.getters[FSXAGetters.locale];
  }

  get appState(): FSXAAppState {
    return this.$store.state.fsxa.appState;
  }

  get appError(): FSXAAppError {
    return this.$store.state.fsxa.error;
  }

  get navigationData() {
    return this.$store.state.fsxa.navigation;
  }

  renderContent() {
    if (this.$slots.default) return this.$slots.default || null;
    if (
      [FSXAAppState.not_initialized, FSXAAppState.initializing].includes(
        this.appState,
      )
    ) {
      if (this.components?.loader) {
        const Loader = this.components.loader;
        return <Loader />;
      }
      return null;
    }
    try {
      const currentNode = getNavigationNodeByPath(
        isExactDatasetRoutingEnabled(this),
        this.navigationData,
        this.currentPath,
        this.currentPath ? getStoredItem(this.$store, this.currentPath) : null,
      );
      // is content projection
      if (currentNode && (currentNode as any).seoRouteRegex !== null) {
        return this.currentPath ? (
          <Dataset
            route={this.currentPath}
            pageId={currentNode.caasDocumentId}
          />
        ) : null;
      } else if (currentNode && currentNode?.caasDocumentId) {
        return <Page id={currentNode.caasDocumentId} />;
      } else throw new Error(NAVIGATION_ERROR_404);
    } catch (error) {
      // We will render a 404 page if this is passed as a component
      if (error instanceof Error) {
        if (error.message === NAVIGATION_ERROR_404) {
          if (this.components?.page404) {
            const Page404Layout = this.components.page404;
            return <Page404Layout currentPath={this.currentPath} />;
          }
          return null;
        }
        console.error(error.message);
      }
    }
    return null;
  }

  render() {
    const AppLayout = this.components?.appLayout;
    if (!AppLayout && this.appState === FSXAAppState.error) {
      return (
        <InfoBox
          type="error"
          headline="Encountered error while rendering the FSXAApp"
        >
          {this.appError.stacktrace ? (
            <Code language="js">{this.appError?.stacktrace}</Code>
          ) : (
            <div class="pl-text-gray-900">
              <h2 class="pl-text-lg pl-font-medium pl-text-gray-900">
                <span role="alert">{this.appError?.message}</span>
              </h2>
              {this.appError.description && (
                <h3>{this.appError?.description}</h3>
              )}
            </div>
          )}
        </InfoBox>
      );
    }
    // We only want to generate the content, when the app is correctly initialized
    const content =
      this.appState === FSXAAppState.ready ? this.renderContent() : null;
    if (AppLayout) {
      const appLayout = (
        <AppLayout appState={this.appState} appError={this.appError}>
          {content}
        </AppLayout>
      );
      return (
        <ErrorBoundary title="Error rendering custom AppLayout component">
          {this.devMode ? (
            <PortalProvider>{appLayout}</PortalProvider>
          ) : (
            appLayout
          )}
        </ErrorBoundary>
      );
    }
    return this.devMode ? <PortalProvider>{content}</PortalProvider> : content;
  }
}
export default App;
