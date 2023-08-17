import Vue from "vue";
import Vuex, { Module } from "vuex";
import {
  NavigationData,
  FSXAContentMode,
  FSXAProxyApiConfig,
  FSXARemoteApiConfig,
  FSXAApiSingleton,
  ProjectProperties,
} from "fsxa-api";
import {
  CreateStoreProxyOptions,
  CreateStoreRemoteOptions,
} from "../types/fsxa-pattern-library";
import { createAppInitialization } from "./actions/initializeApp";
export interface FSXAAppError {
  message: string;
  description?: string;
  stacktrace?: string;
}
export enum FSXAAppState {
  not_initialized = "not_initialized",
  initializing = "initializing",
  ready = "ready",
  error = "error",
}
export interface FSXAVuexState {
  locale: string | null;
  fsxaApiMode: "proxy" | "remote";
  configuration: FSXAProxyApiConfig | FSXARemoteApiConfig;
  appState: FSXAAppState;
  navigation: NavigationData | null;
  settings: ProjectProperties | null;
  error: FSXAAppError | null;
  pageComponentKey: string | null;
  stored: {
    [key: string]: {
      ttl: number;
      fetchedAt: number;
      value: any;
    };
  };
  mode: "release" | "preview";
  snapUrl: string | null;
}
export interface RootState {
  fsxa: FSXAVuexState;
}

Vue.use(Vuex);

const prefix = "fsxa";

const Actions = {
  initializeApp: "initializeApp",
  hydrateClient: "hydrateClient",
  setStoredItem: "setStoredItem",
  setNavigation: "setNavigation",
};

const Getters = {
  appState: "appState",
  error: "error",
  currentPage: "currentPage",
};

export const FSXAActions = {
  initializeApp: `${prefix}/${Actions.initializeApp}`,
  hydrateClient: `${prefix}/${Actions.hydrateClient}`,
  setStoredItem: `${prefix}/${Actions.setStoredItem}`,
  setNavigation: `${prefix}/${Actions.setNavigation}`,
};

const Mutations = {
  setPageComponentKey: "setPageComponentKey",
} as const;

export const FSXAMutations = {
  setPageComponentKey: `${prefix}/${Mutations.setPageComponentKey}`,
};

const GETTER_NAVIGATION_DATA = "navigationData";
const GETTER_CONFIGURATION = "configuration";
const GETTER_LOCALE = "locale";
const GETTER_ITEM = "item";
const GETTER_PAGE_BY_URL = "getPageIdByUrl";
const GETTER_MODE = "mode";
const GETTER_REFERENCE_URL = "getReferenceUrl";
const GETTER_SNAP_URL = "getSnapUrl";

export const FSXAGetters = {
  [Getters.appState]: `${prefix}/${Getters.appState}`,
  [Getters.error]: `${prefix}/${Getters.error}`,
  [GETTER_NAVIGATION_DATA]: `${prefix}/${GETTER_NAVIGATION_DATA}`,
  [GETTER_CONFIGURATION]: `${prefix}/${GETTER_CONFIGURATION}`,
  [GETTER_LOCALE]: `${prefix}/${GETTER_LOCALE}`,
  [GETTER_ITEM]: `${prefix}/${GETTER_ITEM}`,
  [GETTER_PAGE_BY_URL]: `${prefix}/${GETTER_PAGE_BY_URL}`,
  [GETTER_MODE]: `${prefix}/${GETTER_MODE}`,
  [GETTER_REFERENCE_URL]: `${prefix}/${GETTER_REFERENCE_URL}`,
  [GETTER_SNAP_URL]: `${prefix}/${GETTER_SNAP_URL}`,
};

export function getFSXAModule<R extends RootState>(
  options: CreateStoreProxyOptions | CreateStoreRemoteOptions,
): Module<FSXAVuexState, R> {
  return {
    namespaced: true,
    state: () => ({
      stored: {},
      locale: null,
      navigation: null,
      settings: null,
      appState: FSXAAppState.not_initialized,
      error: null,
      pageComponentKey: null,
      fsxaApiMode: options.mode,
      mode: options.config.contentMode,
      configuration: options.config,
      snapUrl: options.snapUrl ?? null,
    }),
    actions: {
      [Actions.initializeApp]: createAppInitialization(
        FSXAApiSingleton.instance,
      ),
      [Actions.hydrateClient]: function({ commit }, payload: FSXAVuexState) {
        commit("setInitialStateFromServer", payload);
      },
      [Actions.setStoredItem]: async function({ commit }, payload) {
        commit("setStoredItem", payload);
      },
      [Actions.setNavigation]: function({ commit }, payload) {
        commit("setNavigation", payload);
      },
    },
    mutations: {
      [Mutations.setPageComponentKey]: function(state, key: string) {
        Vue.set(state, "pageComponentKey", key);
      },
      setNavigation(state, payload: NavigationData) {
        state.navigation = payload;
      },
      setAppAsInitializing(state) {
        state.appState = FSXAAppState.initializing;
        state.navigation = null;
        state.settings = null;
        state.stored = {};
        state.error = null;
      },
      setAppAsInitialized(
        state,
        payload: {
          locale: string;
          navigationData: NavigationData;
          settings: ProjectProperties | null;
        },
      ) {
        state.appState = FSXAAppState.ready;
        state.navigation = payload.navigationData;
        state.settings = payload.settings;
        state.locale = payload.locale;
      },
      setLocale(state, locale: string) {
        Vue.set(state, "locale", locale);
      },
      startInitialization(state) {
        Vue.set(state, "appState", FSXAAppState.initializing);
        // we reset all stored data
        Vue.set(state, "stored", {});
      },
      setGlobalData(
        state,
        payload: {
          navigationData: NavigationData;
          settings: any;
          locale: string;
        },
      ) {
        Vue.set(state, "locale", payload.locale);
        Vue.set(state, "navigation", payload.navigationData);
        Vue.set(state, "settings", payload.settings);
      },
      setStoredItem(state, { key, value, fetchedAt, ttl }) {
        Vue.set(state.stored, key, {
          value,
          fetchedAt,
          ttl,
        });
      },
      setInitialStateFromServer(state, initialStateFromServer: FSXAVuexState) {
        Vue.set(state, "configuration", initialStateFromServer.configuration);
        Vue.set(state, "locale", initialStateFromServer.locale);
        Vue.set(state, "navigation", initialStateFromServer.navigation);
        Vue.set(state, "settings", initialStateFromServer.settings);
        Vue.set(state, "appState", initialStateFromServer.appState);
        Vue.set(state, "error", initialStateFromServer.error);
        Vue.set(state, "stored", initialStateFromServer.stored);
      },
      setAppState(state, appState) {
        Vue.set(state, "appState", appState);
      },
      setError(state, payload: FSXAAppError) {
        state.appState = FSXAAppState.error;
        state.error = payload;
      },
    },
    getters: {
      [Getters.appState]: function(state): FSXAAppState {
        return state.appState;
      },
      [Getters.error]: function(state) {
        return state.error;
      },
      [GETTER_NAVIGATION_DATA]: function(state) {
        return state.navigation || null;
      },
      [GETTER_CONFIGURATION]: function(state) {
        return state.configuration || null;
      },
      [GETTER_LOCALE]: function(state) {
        return state.locale || null;
      },
      [GETTER_ITEM]: (state): any => (id: string) => state.stored[id] || null,
      [GETTER_PAGE_BY_URL]: (state, getters) => (url: string) => {
        const navigationData = getters[FSXAGetters[GETTER_NAVIGATION_DATA]];
        if (!navigationData) return null;
        return (navigationData as NavigationData).seoRouteMap[url] || null;
      },
      [GETTER_MODE]: (state): FSXAContentMode => state.mode as FSXAContentMode,
      [GETTER_REFERENCE_URL]: state => (
        referenceId: string,
        referenceType: "PageRef",
      ) => {
        const page =
          referenceType === "PageRef"
            ? state.navigation?.idMap[referenceId]
            : null;
        return page ? page.seoRoute : null;
      },
      [GETTER_SNAP_URL]: state => state.snapUrl,
    },
  };
}

const createStore = (
  options: CreateStoreProxyOptions | CreateStoreRemoteOptions,
) => {
  const store = new Vuex.Store<RootState>({
    modules: {
      fsxa: {
        ...getFSXAModule<RootState>(options),
      },
    },
  });
  return store;
};
export default createStore;
