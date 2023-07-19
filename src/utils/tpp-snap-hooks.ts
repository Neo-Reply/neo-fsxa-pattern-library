import { FSXAApi } from "fsxa-api/dist/types";
import {
  connectCaasEvents,
  DEFAULT_CAAS_EVENT_TIMEOUT_IN_MS,
} from "./caas-events";

export const CUSTOM_TPP_UPDATE_EVENT = "tpp-update";

export type RegisterTppHooksOptions = {
  fsxaApi: FSXAApi;
  TPP_SNAP: any;
  forceUpdateStore: () => Promise<void>;
  routeToPreviewId: (previewId: string) => Promise<void>;
};

export const registerTppHooks = async ({
  fsxaApi,
  TPP_SNAP,
  forceUpdateStore,
  routeToPreviewId,
}: RegisterTppHooksOptions) => {
  if (!TPP_SNAP) throw new Error("Could not find global TPP_SNAP object.");

  TPP_SNAP.onInit(async (success: boolean) => {
    if (!success) throw new Error("Could not initialize TPP");

    if (TPP_SNAP.fsxaHooksRegistered) {
      console.debug("Hooks already registered, skipping registrations.");
      return;
    }
    TPP_SNAP.fsxaHooksRegistered = true;

    // using live events for better performance
    const caasEvents = connectCaasEvents(fsxaApi);

    console.debug("Registering FSXA TPP hooks");

    const waitForEventOrTimeout = async (
      previewId?: string | null,
      timeout?: number,
    ) => {
      await caasEvents.waitFor(
        previewId ?? (await TPP_SNAP.getPreviewElement()),
        {
          timeout: timeout ?? DEFAULT_CAAS_EVENT_TIMEOUT_IN_MS,
        },
      );
    };

    // https://docs.e-spirit.com/tpp/snap/index.html#tpp_snaponrequestpreviewelement
    TPP_SNAP.onRequestPreviewElement(async (previewId: string) => {
      console.debug("onRequestPreviewElement triggered", previewId);
      await routeToPreviewId(previewId);
    });

    // https://docs.e-spirit.com/tpp/snap/index.html#tpp_snaponcontentchange
    TPP_SNAP.onContentChange(
      async ($node: HTMLElement, previewId: string, content: unknown) => {
        console.debug("onContentChange triggered", {
          $node,
          previewId,
          content,
        });

        if (content === null && $node === null) {
          // page or dataset has been deleted. update the store and
          // return for now, the ContentCreator will request the Homepage as the next step
          // INFO: the previewId matches /^element-with-id-[0-9]+-not-found$/
          forceUpdateStore(); // the force update is used to remove rendered menu items
          return false;
        } else if ($node) {
          // Content has been changed --> Wait for CaaS
          await waitForEventOrTimeout(previewId);

          const canceled = !$node.dispatchEvent(
            new CustomEvent(CUSTOM_TPP_UPDATE_EVENT, {
              bubbles: true,
              cancelable: true,
              detail: { previewId, content },
            }),
          );
          // prevent `onRerenderView` if the event has canceled (handled anywhere else)
          if (canceled) return false;
        }
      },
    );

    // https://docs.e-spirit.com/tpp/snap/index.html#tpp_snaponrerenderview
    TPP_SNAP.onRerenderView(async () => {
      console.debug("onRerenderView triggered");
      // Wait, because we want to make sure any changed that led to rerender are available in CaaS / Navservice
      await waitForEventOrTimeout();
      await forceUpdateStore();
      return false;
    });

    // https://docs.e-spirit.com/tpp/snap/index.html#tpp_snaponnavigationchange
    TPP_SNAP.onNavigationChange(async (newPagePreviewId: string | null) => {
      console.debug("onNavigationChange triggered", {
        newPagePreviewId,
      });
      // Wait before routing or refetch. Creating the page seems to take longer than other CaaS/Nav Calls -> increased Timeout
      await waitForEventOrTimeout(
        newPagePreviewId ?? (await TPP_SNAP.getPreviewElement()),
        4500,
      );

      if (newPagePreviewId) {
        // new page created. We need to Update our Navigation and route to it afterwards
        await forceUpdateStore();
        await routeToPreviewId(newPagePreviewId);
      } else {
        // navigation has been changed --> reinit App
        await forceUpdateStore();
      }
    });
  });
};
