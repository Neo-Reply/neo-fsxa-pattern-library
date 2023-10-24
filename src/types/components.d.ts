import { Component } from "vue-tsx-support";
import {
  FSXAProxyApi,
  FSXAProxyApiConfig,
  FSXARemoteApi,
  FSXARemoteApiConfig,
  NavigationData,
  NavigationItem,
  Page as APIPage,
  PageBodyContent,
  ProjectProperties,
  RichTextElement,
} from "fsxa-api";
import { FSXAAppState, FSXAAppError } from "./../store";
import { Dataset } from "fsxa-api";

export class FSXABaseComponent<
  Props = {},
  EventsWithOn = {},
  Slots = {}
> extends Component<Props, EventsWithOn, Slots> {
  /**
   * Check wether devMode is active
   */
  isDevMode: boolean;

  /**
   * The currently used ts-tpp-api version.
   *
   * *Hint:* If you want to work with specific features make sure that the current version supports them. The fs-tpp-api will only be injected, when isEditMode = true
   *
   * @deprecated use `FSXA_SNAP_URL` instead {@link https://github.com/e-Spirit/fsxa-pattern-library/#snap-url}
   */
  fsTppVersion: string;

  /**
   * Use custom TPP_SNAP hooks, instead of `registerTppHooks()`
   *
   * {@link https://docs.e-spirit.com/tpp/snap/index.html}
   */
  customSnapHooks: boolean;

  /**
   * This method will trigger a route change request
   *
   * You can pass in a pageId, route or locale
   *
   * If a corresponding page is found the route change will be triggered
   *
   * Make sure that you always provide some kind of fallback since this route change will only be available when javascript is enabled
   */
  triggerRouteChange: (params: RequestRouteChangeParams) => Promise<void>;
  /**
   * Get the corresponding route for a given pageId
   *
   * Will return null if no page was found
   */
  getUrlByPageId(pageId: string): string | null;
  /**
   * Get the NavigationItem that is matching the current path
   *
   * If null is returned, no current route could be matched to the current path
   */
  get currentPage(): NavigationItem | null;
  /**
   * Get the Dataset for the the current path
   *
   * If null is returned, this path is not a content projection
   */
  get currentDataset(): Dataset | null;

  /**
   * Check if this app is delivering preview or released data
   *
   * If editMode is true, the TPP_SNAP utility will be injected as well
   */
  get isEditMode(): boolean;
  /**
   * get preconfigured and ready to use FSXAApi instance
   */
  get fsxaApi(): FSXARemoteApi | FSXAProxyApi;
  /**
   * the current locale the content is displayed in
   */
  get locale(): string;
  /**
   * the current navigation data state
   */
  get navigationData(): NavigationData | null;
  /**
   * The content of your globally configured GCAPage "global_settings"
   */
  get globalSettings(): ProjectProperties | null;
  /**
   * Provides the TPPSnap API
   */
  get tppSnap(): any;
  /**
   * Access your stored data in the vuex store
   */
  getStoredItem<Type = any>(key: string): Type | null;
  /**
   * Save your data in the vuex-store
   *
   * You can use this to store your data from 3rd party services that were fetched in the Server Side Rendering process to access it later in on the client
   *
   * Specify a ttl that will determine how long the value will be valid
   */
  setStoredItem<Type = any>(key: string, value: Type, ttl?: number): void;
}

export interface BaseLayoutProps<Data = {}, Meta = {}> {
  /**
   * the id of the page that was requested
   */
  pageId: string;
  /**
   * data that is relevant for your page and layout
   */
  data: Data;
  /**
   * Meta data that is relevant for your page and layout
   */
  meta: Meta;
}
export interface RenderingOptions {
  /**
   * Renders an "+ add section" button at the bottom of this slot (only in preview mode)
   */
  showAddSectionButtonInPreview?: boolean;
}
export class FSXABaseLayout<Data = {}, Meta = {}> extends FSXABaseComponent<
  BaseLayoutProps<Data, Meta>,
  {},
  {}
> {
  /**
   * the id of the page that was requested
   */
  pageId: string;
  /**
   * Data that is relevant for your page and layout
   */
  data: Data;
  /**
   * Meta data that is relevant for your page and layout
   */
  meta: Meta;
  /**
   * The prerendered sections are injected as slots into the component. You can access the slot directly through `this.$scopedSlots.contentName`
   * or by calling this method and passing in the name of the content section
   * @param name string
   * @param options RenderingOptions
   */
  renderContentByName(name: string, options?: RenderingOptions): any;
  /**
   * You can render any PageBodyContent through that method
   */
  renderContentElement: (content: PageBodyContent) => JSX.Element | null;
}

export interface BaseSectionProps<Payload, Meta> {
  /**
   * The id of the section
   */
  id?: string;
  /**
   * The payload that is passed to the section
   */
  payload: Payload;
  /**
   * Additional meta data that is provided to the section
   */
  meta: Meta;
}
export class FSXABaseSection<
  Payload = Record<string, any>,
  Meta = Record<string, any>,
  EventsWithOn = {},
  Slots = {}
> extends FSXABaseComponent<
  BaseSectionProps<Payload, Meta>,
  EventsWithOn,
  Slots
> {
  /**
   * The id of the section
   */
  id?: string;
  /**
   * The payload that is passed to the section
   */
  payload: Payload;
  /**
   * Additional meta data that is provided to the section
   */
  meta: Meta;
  /**
   * You can render any PageBodyContent through that method
   */
  renderContentElement: (content: PageBodyContent) => JSX.Element | null;
}

export interface BaseAppLayoutProps {
  /**
   * The appState is telling you in which phase your app is
   *
   * Possible values are: *not_initialized*, *initializing*, *ready*, *error*
   *
   * Make sure that you render your layout corresponding to the appState
   *
   * **not_initialized**: The app should not be displayed since no navigation-data, global-settings and page is fetched yet. If you are using SSR this will be only available on the SSR. So you do not need to display anything at all.
   *
   * **initializing**: The pattern-library is fetching the navigation-data and global-settings. If you are using SSR this will be only available on the SSR. So you do not need to display anything at all.
   *
   * **error**: The pattern-library failed initializing itself. This can happen if the navigation-service is not available. The default slot will be always empty since the initialization failed.
   */
  appState: FSXAAppState;
  /**
   * It is possible that the pattern-library will run into an error it could not recover from
   *
   * Make sure to display or log the error and fix it, when it occurs
   */
  appError: FSXAAppError | null;
}
export class FSXABaseAppLayout extends FSXABaseComponent<
  BaseAppLayoutProps,
  {},
  {
    /**
     * This is the content that should be displayed inside of your AppLayout
     *
     * This already contains the automatically mapped layouts and sections so make sure that you embed it
     */
    default: {};
  }
> {
  /**
   * The appState is telling you in which phase your app is
   *
   * Possible values are: *not_initialized*, *initializing*, *ready*, *error*
   *
   * Make sure that you render your layout corresponding to the appState
   *
   * **not_initialized**: The app should not be displayed since no navigation-data, global-settings and page is fetched yet. If you are using SSR this will be only available on the SSR. So you do not need to display anything at all.
   *
   * **initializing**: The pattern-library is fetching the navigation-data and global-settings. If you are using SSR this will be only available on the SSR. So you do not need to display anything at all.
   *
   * **error**: The pattern-library failed initializing itself. This can happen if the navigation-service is not available. The default slot will be always empty since the initialization failed.
   */
  appState: BaseAppLayoutProps["appState"];
  /**
   * It is possible that the pattern-library will run into an error it could not recover from
   *
   * Make sure to display or log the error and fix it, when it occurs
   */
  appError: BaseAppLayoutProps["appError"];
}

export interface AppComponents {
  /**
   * Your component that will render the overall AppLayout.
   *
   * If no appLayout is passed the rendered content Layout + Sections is returned
   */
  appLayout?: any;
  /**
   * Pass a component that should get rendered, when no matching route was found
   *
   * If no 404 page is passed nothing will be rendered
   */
  page404?: any;
  loader?: any;
  /**
   * Pass your sections that will be mapped through the provided record key
   *
   * Nothing will be rendered, if no matching section was found and devMode is not active
   */
  sections?: Record<string, any>;
  /**
   * Pass your layouts that will be mapped through the provided record key
   *
   * Nothing will be rendered, if no matching layout was found and devMode is not active
   */
  layouts?: Record<string, any>;
  richtext?: Record<string, any>;
  devModeInfo?: any;
  useErrorBoundaryWrapper?: boolean;
}

export interface AppProps {
  components?: AppComponents;
  /**
   * You can specify the path of the page that should be displayed
   */
  currentPath?: string;
  /**
   * Please provide the locale your content should be displayed in, if no initial path is passed
   */
  defaultLocale: string;
  /**
   * When activated, you will be shown useful information with which you can start developing your beautiful ui.
   *
   * We want to make the entry into frontend development with FirstSpirit as easy as possible. That's why we developed the DevMode.
   *
   * Basically, new content types (whether layouts or sections) that cannot be mapped are skipped. This means that a section that does not have a frontend component as a counterpart is simply not rendered.
   *
   * Thus, errors that could arise in this way are categorically excluded.
   *
   * Furthermore, each layout and section is automatically wrapped with an ErrorBoundary. This prevents an error in a particular section type from breaking the entire page.
   *
   * However, this feature brings other problems, because a frontend developer now lacks important information in the event of an error and it would be helpful to know the payload and key of a new content type as well.
   *
   * DevMode to the rescue!
   */
  devMode?: boolean;

  /**
   * defines default time to live for StoreElements in Milliseconds. -1 => No TTL, always valid
   */
  storeTTL?: number;

  /**
   * Required callback that will be triggered, when the route should be changed
   *
   * Info: We do not know in which context you are using our pattern-library, so we decided that you should have the last word about routing.
   * You can use your own routing technology but rely on the pattern-library to do the heavy lifting.
   */
  handleRouteChange: (nextRoute: string) => void;
  /**
   * You can specify which fs-tpp-api version should be loaded in preview-mode
   *
   * The TPP-API is used for enabling the editing experience in the OCM
   *
   * @deprecated use `FSXA_SNAP_URL` instead {@link https://github.com/e-Spirit/fsxa-pattern-library/#snap-url}
   */
  fsTppVersion?: string;
  /**
   * Use custom TPP_SNAP hooks, instead of `registerTppHooks()`
   *
   * {@link https://docs.e-spirit.com/tpp/snap/index.html}
   */
  customSnapHooks?: boolean;
  /**
   * When enabled, events for `insert`, `replace` and `delete` CaaS documents can be observed and handled.
   *
   * It's currently used in preview mode, to sync updated data in FirstSpirit with the CaaS and the App State.
   *
   * It could be also used in release mode to e.g. inform the user that the current page has been updated, while the user is on it. Feel free to utilize `src/utils/caas-events.ts`.
   *
   * *Note*: This is an experimental feature and must be explicit turned on.
   */
  enableEventStream?: boolean;

  /* When enabled an EXTRA <div class="pl-relative pl-group"> wrapper with css properties like group (for group hover effects) and position: relative is added.
   *
   * For new projects recommended to disable useErrorBoundaryWrapper for not displaying extra div with relative class.
   *
   * Disabling removes this extra div with the classes.
   *
   * Error boundary to catch component errors is injected no matter if the flag is set or not.
   */
  useErrorBoundaryWrapper?: boolean;
}
export class FSXAApp extends Component<AppProps> {}

export interface DatasetProps {
  /**
   * You can pass an id of the dataset that should be automatically loaded
   *
   * *Note*: You either have to provide an id or a route
   */
  id?: string;
  /**
   * You can pass a route of the dataset that should be automatically loaded.
   *
   * *Note*: You either have to provide an id or a route
   */
  route?: string;
  /**
   * Pass an optional pageId that should be loaded. The pageId works as a wrapper and its layout is used.
   */
  pageId?: string;
}
export class FSXADataset extends FSXABaseComponent<DatasetProps> {}

export interface PageProps {
  /**
   * You can pass an id of the page that should be automatically loaded
   */
  id?: string;
  /**
   * If you already fetched a page via the fsxa-api, you can pass its data to the component as well
   */
  pageData?: APIPage;
}
export class FSXAPage extends FSXABaseComponent<PageProps> {}

export interface BaseRichTextElementProps<Data = Record<string, any>> {
  content: RichTextElement[];
  data: Data;
}
export class FSXABaseRichTextElement<
  Data = Record<string, any>
> extends FSXABaseComponent<BaseRichTextElementProps<Data>> {
  content: BaseRichTextElementProps<Data>["content"];
  data: BaseRichTextElementProps<Data>["data"];
  renderContent: () => JSX.Element[];
}

export interface RichTextProps extends InEditEditorProps {
  content: RichTextElement[];
}
export class FSXARichText extends FSXABaseComponent<RichTextProps> {}

export interface RequestRouteChangeParams {
  /**
   * The pageId the pattern-library should route to
   */
  pageId?: string;
  /**
   * the route the pattern-library should route to
   */
  route?: string;
  /**
   * the locale the new route should be in
   *
   * This can be used to switch language
   * You could specify an additional pageId or route if you want to keep the current page
   */
  locale?: string;
}

export type CreateStoreProxyOptions = {
  mode: "proxy";
  config: FSXAProxyApiConfig;
  snapUrl?: string;
};

export type CreateStoreRemoteOptions = {
  mode: "remote";
  config: FSXARemoteApiConfig;
  snapUrl?: string;
};

export interface InEditProps extends InEditEditorProps {
  /**
   * String content that should be rendered
   */
  content: string;
}
export class FSXAInEdit extends FSXABaseComponent<InEditProps> {}

export interface AddSectionButtonProps {
  /**
   * String bodyName `Body` name
   */
  bodyName?: string;
}
export class AddSectionButton extends FSXABaseComponent<
  AddSectionButtonProps
> {}

export interface InEditEditorProps {
  /**
   * The name of the editor input component, specified in the FirstSpirit template
   *
   * A list of supported input components could be found in the ODFS {@link https://docs.e-spirit.com/odfs/template-develo/content-highlig/use-projects/index.html#unterstuetzte_eingabekomponenten__inedit}
   */
  editorName?: string;
}

export interface RenderContentElementProps {
  /**
   * PageBodyContent element that should be rendered
   */
  element?: PageBodyContent;
}

export class FSXARenderContentElement extends FSXABaseComponent<
  RenderContentElementProps
> {}
