import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import createStore from "@/store";
import { FSXAContentMode, FSXAProxyApi, LogLevel } from "fsxa-api";
import { CreateStoreProxyOptions } from "@/types/fsxa-pattern-library";
import { TriggerRouteChangeParams, triggerRouteChange } from "./getters";
import { getMockNavigationData } from "../../testing/getMockNavigationData";

jest.mock("fsxa-api");

const API_URL = "http://fsxa.local";

const options: CreateStoreProxyOptions = {
  mode: "proxy",
  config: {
    contentMode: FSXAContentMode.PREVIEW,
    clientUrl: API_URL,
    serverUrl: API_URL,
    logLevel: LogLevel.NONE,
  },
};

const setup = () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = createStore(options);
  store.replaceState({
    ...store.state,
    fsxa: {
      ...store.state.fsxa,
    },
  });
  const fsxaApi = new FSXAProxyApi("http://fsxa.local", LogLevel.NONE);
  return { localVue, store, fsxaApi };
};

describe("triggerRouteChange", () => {
  it("return route from routes array on language change if targetDataset.route is empty", async () => {
    const { store, fsxaApi } = setup();
    const currentLocale = "de";
    const targetLocale = "en";
    const currentDataset = {
      id: "datasetId",
      route: "currentDSRoute2",
      routes: [
        { pageRef: "PRID1", route: "currentDSRoute1" },
        { pageRef: "PRID2", route: "currentDSRoute2" },
      ],
    };
    const targetDataset = {
      id: "datasetId",
      route: "",
      routes: [
        { pageRef: "PRID1", route: "targetDSRoute1" },
        { pageRef: "PRID2", route: "targetDSRoute2" },
      ],
    };
    // prepare store state
    store.state.fsxa.locale = currentLocale;
    store.state.fsxa.navigation = getMockNavigationData();
    store.state.fsxa.stored[currentDataset.route] = {
      ttl: 30000,
      fetchedAt: Date.now(),
      value: currentDataset,
    };
    // mocks
    fsxaApi.fetchByFilter = jest
      .fn()
      .mockResolvedValue({ items: [targetDataset] });

    // change language via triggerRouteChange
    const params: TriggerRouteChangeParams = {
      route: currentDataset.route,
      locale: targetLocale,
    };
    const targetRoute = await triggerRouteChange(
      store,
      fsxaApi,
      params,
      currentLocale,
    );
    expect(targetRoute).toEqual(targetDataset.routes[1].route);
  });
});
