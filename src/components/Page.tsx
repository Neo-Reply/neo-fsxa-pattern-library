import { Page as APIPage } from "fsxa-api";
import { Component, InjectReactive, Prop, Watch } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent";
import { FSXA_INJECT_KEY_LOADER } from "@/constants";

import Layout from "./Layout";
import { getTPPSnap } from "@/utils";
import { FSXAAppState } from "@/store";
import { CUSTOM_TPP_UPDATE_EVENT } from "@/utils/tpp-snap-hooks";

export interface PageProps {
  id?: string;
  pageData?: APIPage;
}
@Component({
  name: "FSXAPage",
})
class Page extends BaseComponent<PageProps> {
  @InjectReactive({ from: FSXA_INJECT_KEY_LOADER }) loaderComponent: any | null;
  @Prop({ required: false }) id: PageProps["id"];
  @Prop({ required: false }) pageData: PageProps["pageData"];

  key = "fsxa_page_" + 0;

  removeTppUpdateListener?: () => void;

  serverPrefetch() {
    return this.fetchPage();
  }

  @Watch("id")
  handleIdChange(id: string, prevId: string) {
    if (id !== prevId && id != null) {
      this.fetchPage(true);
    }
  }

  createTppUpdateHandler() {
    const onTppUpdateHandler = (event: any) => {
      if (event.detail?.content?.fsType === "Dataset") {
        // changing a dataset could be very complex, so better rerender the view
        // achive this by not preventDefault this event
        return;
      }

      if (!event.defaultPrevented) {
        event.preventDefault();
        // Force Update of Data, since Backend data might have been changed
        this.fetchPage(true);
      }
    };
    document.body.addEventListener(CUSTOM_TPP_UPDATE_EVENT, onTppUpdateHandler);
    this.removeTppUpdateListener = () =>
      document.body.removeEventListener(
        CUSTOM_TPP_UPDATE_EVENT,
        onTppUpdateHandler,
      );
  }

  mounted() {
    if (!this.pageData && !this.loadedPage) {
      this.fetchPage();
    }
    if (this.isEditMode) {
      this.createTppUpdateHandler();
    }
  }

  beforeDestroy() {
    this.removeTppUpdateListener?.();
  }

  async fetchPage(forceRerender = false) {
    // if pageData was passed as prop, we cannot refetch. Parent must do that
    if (this.pageData) return;
    if (!this.id) {
      throw new Error(
        "You either have to pass already loaded pageData or the id of the page that should be loaded.",
      );
    }
    try {
      const page = await this.fsxaApi.fetchElement({
        id: this.id,
        locale: this.locale,
      });
      this.setStoredItem(this.id, page);
      this.setTppPreviewElement();
      if (forceRerender) this.key = "fsxa_page_" + Date.now();
    } catch (err) {
      this.setStoredItem(this.id, null);
    }
  }

  get loadedPage(): APIPage | null | undefined {
    return this.id ? this.getStoredItem(this.id) : undefined;
  }

  get page(): APIPage | null | undefined {
    return this.pageData || this.loadedPage;
  }

  setTppPreviewElement() {
    if (this.isEditMode) {
      const TPP_SNAP = getTPPSnap();
      if (TPP_SNAP) {
        TPP_SNAP.isConnected
          .then((connected: boolean) => {
            if (connected && typeof this.page !== "undefined" && this.page) {
              TPP_SNAP.setPreviewElement(
                this.currentDataset?.previewId ?? this.page.previewId,
              );
            }
          })
          .catch((e: any) => {
            console.error("Could not set preview element: " + e);
          });
      }
    }
  }

  updated() {
    this.setTppPreviewElement();
  }

  render() {
    if (
      typeof this.page === "undefined" ||
      this.$store.state.fsxa.appState !== FSXAAppState.ready
    ) {
      const LoaderComponent = this.loaderComponent || "div";
      return <LoaderComponent />;
    }
    if (!this.page) {
      console.error(`Page not found for id: ${this.id}`);
      const LoaderComponent = this.loaderComponent || "div";
      return <LoaderComponent />;
    }

    return (
      <Layout
        key={this.key}
        pageId={this.id!}
        previewId={this.page.previewId}
        type={this.page.layout}
        content={this.page.children}
        data={this.page.data}
        meta={this.page.meta}
      >
        {this.$slots.default}
      </Layout>
    );
  }
}
export default Page;
