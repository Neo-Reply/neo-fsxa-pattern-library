import { Page as APIPage } from "fsxa-api";
import { Component, InjectReactive, Prop, Watch } from "vue-property-decorator";

import BaseComponent from "@/components/base/BaseComponent";
import { FSXA_INJECT_KEY_LOADER } from "@/constants";

import Layout from "./Layout";
import { getTPPSnap, isClient } from "@/utils";
import { FSXAAppState } from "@/store";

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

  removeTppUpdateListener?: () => void;

  serverPrefetch() {
    return this.fetchPage();
  }

  @Watch("id")
  handleIdChange(id: string, prevId: string) {
    if (id !== prevId && id != null) {
      this.fetchPage();
    }
  }

  mounted() {
    if (!this.pageData && !this.loadedPage) {
      this.fetchPage();
    }

    const onTppUpdateHandler = (event: any) => {
      try {
        if (event.detail.content.fsType === "Dataset") {
          // changing a dataset could be very complex, so better rerender the view
          // achive this by not preventDefault this event
          return;
        }
      } catch (ignore) {
        // the event detail may not have content or a fsType
      }

      if (!event.defaultPrevented) {
        event.preventDefault();
        this.fetchPage();
      }
    };
    document.body.addEventListener("tpp-update", onTppUpdateHandler);
    this.removeTppUpdateListener = () =>
      document.body.removeEventListener("tpp-update", onTppUpdateHandler);
  }
  beforeDestroy() {
    this.removeTppUpdateListener?.();
  }

  async fetchPage() {
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
    } catch (err) {
      this.setStoredItem(this.id, null);
    }
  }

  // ✨ use [key] to re-render on store changes {@see https://michaelnthiessen.com/force-re-render/}
  key = Date.now();

  get loadedPage(): APIPage | null | undefined {
    this.key = Date.now(); // update the [key] any time the store item gets updated
    return this.id ? this.getStoredItem(this.id) : undefined;
  }

  get page(): APIPage | null | undefined {
    return this.pageData || this.loadedPage;
  }

  render() {
    if (
      typeof this.page === "undefined" ||
      this.$store.state.fsxa.appState !== FSXAAppState.ready
    ) {
      const LoaderComponent = this.loaderComponent || "div";
      return <LoaderComponent />;
    }
    if (this.page === null) {
      throw new Error("Could not load page");
    }

    if (this.isEditMode && isClient()) {
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
