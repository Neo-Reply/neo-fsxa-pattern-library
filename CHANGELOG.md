## [9.6.3](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v9.6.2...v9.6.3) (2024-06-24)


### Bug Fixes

* **removed import:** util import breaks apps ([e65a6b1](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/e65a6b10d072fa08f5be9b6d37654cbca3cca571))

## [9.6.2](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v9.6.1...v9.6.2) (2024-06-24)


### Bug Fixes

* **util import:** use .. instead of @ ([f42eb91](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/f42eb9110db7ffb3959f3846f550afc1d7547c63))

## [9.6.1](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v9.6.0...v9.6.1) (2024-06-24)


### Bug Fixes

* **client check routing:** client check routing ([a9bbb22](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/a9bbb22189935119d7af8b8cda64aea087fe4f4d))

# [9.6.0](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v9.5.0...v9.6.0) (2024-06-21)


### Features

* **proxy-api for remote dataset routing:** use separate configurable … ([#15](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/15)) ([a4311fe](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/a4311fec968705503aaf9fc3ad734a4ef83a1d75))

# [9.5.0](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v9.4.0...v9.5.0) (2024-06-19)


### Features

* **validlanguages:** filter Dataset routing for valid Languages ([7b0756e](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/7b0756e845daf03d50e60a849741f4c0e1b89330))

# [9.4.0](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v9.3.0...v9.4.0) (2023-11-09)


### Features

* **defaultlocale:** use FSXA_LOCALE from runtimeConfig for defaultLocale if available ([#14](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/14)) ([94397cc](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/94397cc3c3bafdbb775dfddc3df7dcc6b2485724))

# [9.3.0](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v9.2.1...v9.3.0) (2023-11-03)


### Features

* **remote-datasets:** Add support for remote Datasets from Remote Project ([#13](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/13)) ([c2db24a](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/c2db24a8ebf59d22493fd77b89b6f8a74307b03a))

## [9.2.1](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v9.2.0...v9.2.1) (2023-10-24)


### Bug Fixes

* **storeTLL:** remove prop from test ([#12](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/12)) ([f242462](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/f242462721174e5f052eeb8043b6ee20e0109dc8))
* **storeTTL:** read storeTTL from nuxt config ([#11](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/11)) ([4175636](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/4175636877fab08d0c1656198f8301f8a6e098c1))

# [9.2.0](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v9.1.0...v9.2.0) (2023-10-24)


### Features

* **storeTTL:** add configurable default store TTL ([f1b06ae](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/f1b06ae148b25beaca1e3020f0f1e39fd86312db))

# [9.1.0](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v9.0.0...v9.1.0) (2023-10-13)


### Features

* **lifespan:** add lifespan of a section to its meta data ([#8](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/8)) ([d9e956a](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/d9e956a49891829ef2b500735bf0af9bbd03d075))

# [9.0.0](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v8.21.3...v9.0.0) (2023-10-12)


### Build System

* **fsxa-api:** move fsxa-api to peer dependency ([#6](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/6)) ([824b4a7](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/824b4a78d46608b29b866a614c49cb4903fb562f))


### BREAKING CHANGES

* **fsxa-api:** fsxa-api dependency moved to peer & dev dependencies

## [8.21.3](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v8.21.2...v8.21.3) (2023-08-17)


### Bug Fixes

* **page:** fix usage of store for component key ([#5](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/5)) ([d9cd7ac](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/d9cd7ac361e228ad6dc731060df34b3d84e2b0c0))

## [8.21.2](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v8.21.1...v8.21.2) (2023-08-16)


### Bug Fixes

* **page:** fix forced remounts on client side app render ([#3](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/3)) ([05c5108](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/05c51087ef5dffde8f39f0accc86425517a4c5c4))


### Reverts

* Revert "fix(layout): avoid forced remounts" ([fd3e0f8](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/fd3e0f8f196452ff44bde9947b1929d9a7758813))

## [8.21.1](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v8.21.0...v8.21.1) (2023-08-14)


### Bug Fixes

* **layout:** avoid forced remounts ([b973d69](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/b973d69c7e88f4c06b47e7b97a0e4aa2762ddc44))

# [8.21.0](https://github.com/Neo-Reply/neo-fsxa-pattern-library/compare/v8.20.0...v8.21.0) (2023-07-17)


### Bug Fixes

* **dependencies:** update test description ([#134](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/134)) ([ad092dc](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/ad092dca2fb1a1e044275dc1ceb26ad7ae89c650))


### Features

* **dependencies:** update fsxa dependencies ([#132](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/132)) ([07a614d](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/07a614d49e81819fd80f743ee55b5d3af696e3ca))
* **dependencies:** update fsxa stack ([#133](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/133)) ([a7dab38](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/a7dab380fb9df23abe30670bf00ecafccfa2f96b))
* **dependencies:** update fsxa stack ([#135](https://github.com/Neo-Reply/neo-fsxa-pattern-library/issues/135)) ([e40b0e2](https://github.com/Neo-Reply/neo-fsxa-pattern-library/commit/e40b0e2026ce3d14a5b3fc95a4b24a117409186a))

# [8.22.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.21.1...v8.22.0) (2023-06-22)

### Features

- **dependencies:** update fsxa stack ([#135](https://github.com/e-Spirit/fsxa-pattern-library/issues/135)) ([e40b0e2](https://github.com/e-Spirit/fsxa-pattern-library/commit/e40b0e2026ce3d14a5b3fc95a4b24a117409186a))

## [8.21.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.21.0...v8.21.1) (2023-06-16)

### Bug Fixes

- **dependencies:** update test description ([#134](https://github.com/e-Spirit/fsxa-pattern-library/issues/134)) ([ad092dc](https://github.com/e-Spirit/fsxa-pattern-library/commit/ad092dca2fb1a1e044275dc1ceb26ad7ae89c650))

# [8.21.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.20.0...v8.21.0) (2023-06-16)

### Features

- **dependencies:** update fsxa stack ([#133](https://github.com/e-Spirit/fsxa-pattern-library/issues/133)) ([a7dab38](https://github.com/e-Spirit/fsxa-pattern-library/commit/a7dab380fb9df23abe30670bf00ecafccfa2f96b))

# [8.20.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.19.5...v8.20.0) (2023-06-12)

### Features

- **dependencies:** update fsxa dependencies ([#132](https://github.com/e-Spirit/fsxa-pattern-library/issues/132)) ([07a614d](https://github.com/e-Spirit/fsxa-pattern-library/commit/07a614d49e81819fd80f743ee55b5d3af696e3ca))

## [8.19.5](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.19.4...v8.19.5) (2023-05-09)

### Bug Fixes

- **deps:** update transitive dependencies loader-utils ([#129](https://github.com/e-Spirit/fsxa-pattern-library/issues/129)) ([d208e0f](https://github.com/e-Spirit/fsxa-pattern-library/commit/d208e0f0b6a896d7288388625f44efb2df1404ad))

## [8.19.4](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.19.3...v8.19.4) (2023-05-03)

### Bug Fixes

- **triggerRouteChange:** do not throw errors for missing datasets ([#128](https://github.com/e-Spirit/fsxa-pattern-library/issues/128)) ([67e3fb5](https://github.com/e-Spirit/fsxa-pattern-library/commit/67e3fb5ee2757e9407106294be62e2c33e79a85e))

## [8.19.3](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.19.2...v8.19.3) (2023-04-25)

### Bug Fixes

- **getters:** trigger route change not waiting for dataset fetch ([#126](https://github.com/e-Spirit/fsxa-pattern-library/issues/126)) ([d84384f](https://github.com/e-Spirit/fsxa-pattern-library/commit/d84384fb171fecd2c16f9b3f7141fc879f480c90))

## [8.19.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.19.1...v8.19.2) (2023-04-14)

### Bug Fixes

- **fsxa-api:** update to latest version ([#125](https://github.com/e-Spirit/fsxa-pattern-library/issues/125)) ([b9ea6f3](https://github.com/e-Spirit/fsxa-pattern-library/commit/b9ea6f3b1f4721f008949884cd67224daece44e8))

## [8.19.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.19.0...v8.19.1) (2023-03-21)

### Bug Fixes

- **dependencies:** update fsxa-stack to the latest dependencies ([#123](https://github.com/e-Spirit/fsxa-pattern-library/issues/123)) ([59bf013](https://github.com/e-Spirit/fsxa-pattern-library/commit/59bf013e46f03ef3f379375b0ca949779e9b4d82))

# [8.19.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.18.5...v8.19.0) (2023-03-20)

### Features

- **authorizationheaders:** update fsxa stack to the latest dependencies ([#122](https://github.com/e-Spirit/fsxa-pattern-library/issues/122)) ([80c57b4](https://github.com/e-Spirit/fsxa-pattern-library/commit/80c57b4d80ddbfeed42feb0dff694175cb127ffd))

## [8.18.5](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.18.4...v8.18.5) (2023-03-17)

### Bug Fixes

- **imagemap:** update fsxa-stack to the latest dependencies ([#121](https://github.com/e-Spirit/fsxa-pattern-library/issues/121)) ([739054b](https://github.com/e-Spirit/fsxa-pattern-library/commit/739054bcf37642a4c27263bf6e507d74f519adb8))

## [8.18.4](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.18.3...v8.18.4) (2023-03-16)

### Bug Fixes

- **gitignore:** add Dockerfile to gitignore ([#120](https://github.com/e-Spirit/fsxa-pattern-library/issues/120)) ([0bc0e37](https://github.com/e-Spirit/fsxa-pattern-library/commit/0bc0e37d1902541dfc198b759176f3905bcc5dcf))

## [8.18.3](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.18.2...v8.18.3) (2023-03-16)

### Bug Fixes

- **changelog:** fix unfitting log entry ([#119](https://github.com/e-Spirit/fsxa-pattern-library/issues/119)) ([4b1e403](https://github.com/e-Spirit/fsxa-pattern-library/commit/4b1e403c4ad4e800b6eac39c25f3a7d386eb994b))

## [8.18.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.18.1...v8.18.2) (2023-03-16)

### Bug Fixes

- **layout:** fix side effects of circular references of hidden sections ([#116](https://github.com/e-Spirit/fsxa-pattern-library/issues/116)) ([933aaea](https://github.com/e-Spirit/fsxa-pattern-library/commit/933aaea90d302567f6fbf096b184e1782dc061c7))

## [8.18.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.18.0...v8.18.1) (2023-03-09)

### Bug Fixes

- **dependencies:** update fsxa-api to 10.10.2 ([#118](https://github.com/e-Spirit/fsxa-pattern-library/issues/118)) ([079539c](https://github.com/e-Spirit/fsxa-pattern-library/commit/079539c10017172540a2f8596cb38e295331a91a))

# [8.18.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.17.0...v8.18.0) (2023-02-02)

### Features

- **dependencies:** update fsxa-api to latest version ([#114](https://github.com/e-Spirit/fsxa-pattern-library/issues/114)) ([7913350](https://github.com/e-Spirit/fsxa-pattern-library/commit/7913350966251006173360c8a60b37c9e84c3cc9))

# [8.17.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.16.0...v8.17.0) (2023-01-24)

### Features

- **tpp-snap:** add `onContentChange` handler ([#105](https://github.com/e-Spirit/fsxa-pattern-library/issues/105)) ([67013dd](https://github.com/e-Spirit/fsxa-pattern-library/commit/67013dd4efa45a11e6cf8a2c783b2c4f80b7a84b))

# [8.16.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.15.0...v8.16.0) (2023-01-24)

### Features

- **layout:** hide not displayed sections depending on FSXA_DISPLAY_HIDDEN_SECTIONS flag ([#102](https://github.com/e-Spirit/fsxa-pattern-library/issues/102)) ([70a8b3b](https://github.com/e-Spirit/fsxa-pattern-library/commit/70a8b3b85dd3f9e7dbfead5348ae430211bbfc62))

# [8.15.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.14.1...v8.15.0) (2023-01-13)

### Features

- **editor-flow:** Navigate to dataset when created ([cf31677](https://github.com/e-Spirit/fsxa-pattern-library/commit/cf3167744522e7285325d23528b3c6e39bae8237))

## [8.14.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.14.0...v8.14.1) (2022-12-15)

### Bug Fixes

- **nuxtbuild:** remove navigation import using absolute path ([#111](https://github.com/e-Spirit/fsxa-pattern-library/issues/111)) ([2f794ae](https://github.com/e-Spirit/fsxa-pattern-library/commit/2f794ae916bc1ec9082a2bcb1385bfa118fc39b4))

# [8.14.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.13.2...v8.14.0) (2022-12-14)

### Features

- **content-projection:** add new content projection routing ([#106](https://github.com/e-Spirit/fsxa-pattern-library/issues/106)) ([09ce0db](https://github.com/e-Spirit/fsxa-pattern-library/commit/09ce0dbb900550776debc24f100cc9c7de8c1ea3))

## [8.13.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.13.1...v8.13.2) (2022-11-23)

### Bug Fixes

- **devmode:** fix stringification of circular json in dev mode ([#101](https://github.com/e-Spirit/fsxa-pattern-library/issues/101)) ([15b9ff3](https://github.com/e-Spirit/fsxa-pattern-library/commit/15b9ff32d88306f8bcbcc26e9ae1f61f9daa3801))

## [8.13.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.13.0...v8.13.1) (2022-11-14)

### Bug Fixes

- **fsxa-api:** update to latest version ([#100](https://github.com/e-Spirit/fsxa-pattern-library/issues/100)) ([3d63d0d](https://github.com/e-Spirit/fsxa-pattern-library/commit/3d63d0d46d991615d3fa5fde6aa612f8857dcc30))

# [8.13.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.12.0...v8.13.0) (2022-10-25)

### Features

- **navigationData:** provide vuex action to mutate navigation data ([#94](https://github.com/e-Spirit/fsxa-pattern-library/issues/94)) ([7b1b3f0](https://github.com/e-Spirit/fsxa-pattern-library/commit/7b1b3f0cfb14a9fbf291bb87a144647e19002916))

# [8.12.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.11.5...v8.12.0) (2022-10-24)

### Features

- **snap:** prevent loading snap.js when PWA is the top frame ([#97](https://github.com/e-Spirit/fsxa-pattern-library/issues/97)) ([36c7f4d](https://github.com/e-Spirit/fsxa-pattern-library/commit/36c7f4d23c4da0360483d769d577da8a2d9ef722))

## [8.11.5](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.11.4...v8.11.5) (2022-10-21)

### Bug Fixes

- **dependencies:** update to latest version ([#96](https://github.com/e-Spirit/fsxa-pattern-library/issues/96)) ([a7dda4b](https://github.com/e-Spirit/fsxa-pattern-library/commit/a7dda4bc8eee1c50de146e0afd62e41dd4840419))

## [8.11.4](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.11.3...v8.11.4) (2022-10-20)

### Bug Fixes

- **fsxa-dependencies:** update to latest version ([#95](https://github.com/e-Spirit/fsxa-pattern-library/issues/95)) ([a844ee6](https://github.com/e-Spirit/fsxa-pattern-library/commit/a844ee618e78d24468b003d8669e65de7cb6fbb2))

## [8.11.3](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.11.2...v8.11.3) (2022-10-06)

### Bug Fixes

- **layout:** hide layout component on devMode and editMode to true ([#92](https://github.com/e-Spirit/fsxa-pattern-library/issues/92)) ([b9765a9](https://github.com/e-Spirit/fsxa-pattern-library/commit/b9765a91a49ce6aca18263b76f20cef79c19bdc0))

## [8.11.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.11.1...v8.11.2) (2022-10-06)

### Bug Fixes

- **tests:** fix the error on the test ([#90](https://github.com/e-Spirit/fsxa-pattern-library/issues/90)) ([81903d0](https://github.com/e-Spirit/fsxa-pattern-library/commit/81903d049c81a328985e19cde1dfe7f68a381a71))

## [8.11.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.11.0...v8.11.1) (2022-10-05)

### Bug Fixes

- **error-boundary:** resolves the `useErrorBoundaryWrapper` workaround ([#93](https://github.com/e-Spirit/fsxa-pattern-library/issues/93)) ([77693de](https://github.com/e-Spirit/fsxa-pattern-library/commit/77693de3cfded3747675b01ba55fda1b92ed88d0))

# [8.11.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.10.1...v8.11.0) (2022-09-27)

### Features

- **dependencies:** update fsxa-api to the lastest version ([#89](https://github.com/e-Spirit/fsxa-pattern-library/issues/89)) ([44b2c64](https://github.com/e-Spirit/fsxa-pattern-library/commit/44b2c64854f206630a130ff85d9eeac4529cbc92))

## [8.10.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.10.0...v8.10.1) (2022-09-26)

### Bug Fixes

- **getters:** language change when route is empty ([#87](https://github.com/e-Spirit/fsxa-pattern-library/issues/87)) ([2dd6f6f](https://github.com/e-Spirit/fsxa-pattern-library/commit/2dd6f6fdd1eba57517e2d4e351bde257e9a4a71a))

# [8.10.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.9.0...v8.10.0) (2022-09-22)

### Features

- **dependencies:** update to latest fsxa-api version ([#88](https://github.com/e-Spirit/fsxa-pattern-library/issues/88)) ([53ddbc5](https://github.com/e-Spirit/fsxa-pattern-library/commit/53ddbc5e5a1c6d1911f1eddf995c67f8172aea23))

# [8.9.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.8.0...v8.9.0) (2022-09-01)

### Features

- **fs-tpp-api:** add FSXA_SNAP_URL env variable and deprecate fsTppVersion config param ([#83](https://github.com/e-Spirit/fsxa-pattern-library/issues/83)) ([6e8a99b](https://github.com/e-Spirit/fsxa-pattern-library/commit/6e8a99bfe19f61e4d7bbef6172f6adb872362f63))

# [8.8.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.7.1...v8.8.0) (2022-08-26)

### Features

- **dependencies:** update fsxa-api dependency to latest version ([#86](https://github.com/e-Spirit/fsxa-pattern-library/issues/86)) ([ac2c489](https://github.com/e-Spirit/fsxa-pattern-library/commit/ac2c4893d7692cb5ff9820de9c46946d61bd4976))

## [8.7.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.7.0...v8.7.1) (2022-08-26)

### Bug Fixes

- **fsxa-api:** update to latest fsxa-api version ([#85](https://github.com/e-Spirit/fsxa-pattern-library/issues/85)) ([5da6bea](https://github.com/e-Spirit/fsxa-pattern-library/commit/5da6bea98824bbe057085345a8bae5f01682cf82))

# [8.7.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.6.1...v8.7.0) (2022-08-11)

### Features

- **fsxa-api:** update to latest fsxa-api version ([#82](https://github.com/e-Spirit/fsxa-pattern-library/issues/82)) ([54eccb7](https://github.com/e-Spirit/fsxa-pattern-library/commit/54eccb74d5df1d932579240d4c062a6d8da30035))

## [8.6.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.6.0...v8.6.1) (2022-08-09)

### Bug Fixes

- **dataset.spec.ts:** reactiveInject variable in test ([#81](https://github.com/e-Spirit/fsxa-pattern-library/issues/81)) ([4c1e874](https://github.com/e-Spirit/fsxa-pattern-library/commit/4c1e874845b4a61643dc78bcdcce6acd761c5756))

# [8.6.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.5.0...v8.6.0) (2022-08-02)

### Features

- **dependencies:** update fsxa-api to 10.3.0 ([#79](https://github.com/e-Spirit/fsxa-pattern-library/issues/79)) ([a1128b8](https://github.com/e-Spirit/fsxa-pattern-library/commit/a1128b82b5f558c2239e276ba5735c8f90899087))

# [8.5.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.4.2...v8.5.0) (2022-07-25)

### Features

- **add-section-button:** add an "Add Section" button in preview ([#75](https://github.com/e-Spirit/fsxa-pattern-library/issues/75)) ([d113d39](https://github.com/e-Spirit/fsxa-pattern-library/commit/d113d3996521e44b18d4196bb319c56d76047934))

## [8.4.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.4.1...v8.4.2) (2022-07-19)

### Bug Fixes

- **fsxa-api:** update to latest fsxa-api version ([#76](https://github.com/e-Spirit/fsxa-pattern-library/issues/76)) ([8569d9f](https://github.com/e-Spirit/fsxa-pattern-library/commit/8569d9f63638e6003df5fd1106aee1b9d4dc538a))

## [8.4.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.4.0...v8.4.1) (2022-07-11)

### Bug Fixes

- **requestPreviewElement:** fix language handling ([#74](https://github.com/e-Spirit/fsxa-pattern-library/issues/74)) ([1babe3e](https://github.com/e-Spirit/fsxa-pattern-library/commit/1babe3e4004c5c5f13490d17094003e952853a65))

# [8.4.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.3.1...v8.4.0) (2022-07-04)

### Features

- **errorboundary:** refactor error boundary to remove extra div wrapper ([#72](https://github.com/e-Spirit/fsxa-pattern-library/issues/72)) ([f8322f1](https://github.com/e-Spirit/fsxa-pattern-library/commit/f8322f16d03868e15d8c497839b2a8243c78905a))

## [8.3.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.3.0...v8.3.1) (2022-07-01)

### Bug Fixes

- **tpp-snap:** only import tpp-snap once ([#73](https://github.com/e-Spirit/fsxa-pattern-library/issues/73)) ([132a1c3](https://github.com/e-Spirit/fsxa-pattern-library/commit/132a1c3e010d3b1742bd38a3896bd7d54caaf71c))

# [8.3.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.2.1...v8.3.0) (2022-06-21)

### Features

- **dataset.tsx:** extend route query to also search "routes" ([#59](https://github.com/e-Spirit/fsxa-pattern-library/issues/59)) ([83ed1e3](https://github.com/e-Spirit/fsxa-pattern-library/commit/83ed1e322319d551ed28cc716c283d1611c36699))

## [8.2.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.2.0...v8.2.1) (2022-06-10)

### Bug Fixes

- **fsxa-api:** update to latest version ([#69](https://github.com/e-Spirit/fsxa-pattern-library/issues/69)) ([3e14105](https://github.com/e-Spirit/fsxa-pattern-library/commit/3e1410590b1ff52234f90fd2ea0d902a9e167002))

# [8.2.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.1.0...v8.2.0) (2022-06-01)

### Features

- **component:** add RenderContentElement component ([#57](https://github.com/e-Spirit/fsxa-pattern-library/issues/57)) ([ada65ae](https://github.com/e-Spirit/fsxa-pattern-library/commit/ada65aeb1d456dceb042081bf7a95d2722ee5dfe))

# [8.1.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v8.0.0...v8.1.0) (2022-05-23)

### Features

- **dependency-update:** update fsxa-api dependency to latest version ([#62](https://github.com/e-Spirit/fsxa-pattern-library/issues/62)) ([051e935](https://github.com/e-Spirit/fsxa-pattern-library/commit/051e9356f43d4757085ea59201457b5bc7555e5f))

# [8.0.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v7.0.2...v8.0.0) (2022-05-17)

### Features

- **package.json & package-lock.json:** update fsxa-api ([#65](https://github.com/e-Spirit/fsxa-pattern-library/issues/65)) ([727a76c](https://github.com/e-Spirit/fsxa-pattern-library/commit/727a76c94064f9c1c825524fe3ef6d1605588f15))

### BREAKING CHANGES

- **package.json & package-lock.json:** Links inside of RichtTextElements will now be mapped in the same way as the value
  of CMS_INPUT_LINK. Refer to FSXA-API changelog for more details.

## [7.0.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v7.0.1...v7.0.2) (2022-05-06)

### Bug Fixes

- **fsxa-api:** update to latest fsxa-api ([#64](https://github.com/e-Spirit/fsxa-pattern-library/issues/64)) ([553c9d7](https://github.com/e-Spirit/fsxa-pattern-library/commit/553c9d73a126010c2144043c6374ab69e2e282c3))

## [7.0.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v7.0.0...v7.0.1) (2022-04-25)

### Bug Fixes

- **projectporperties:** fix projectProperties typing ([#60](https://github.com/e-Spirit/fsxa-pattern-library/issues/60)) ([ff52a0c](https://github.com/e-Spirit/fsxa-pattern-library/commit/ff52a0c6166b9ae5a2e19bd9fa294f35d450a4c5))

# [7.0.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v6.3.0...v7.0.0) (2022-04-21)

### Features

- **dataset:** access to current Dataset ([#56](https://github.com/e-Spirit/fsxa-pattern-library/issues/56)) ([4eea093](https://github.com/e-Spirit/fsxa-pattern-library/commit/4eea093d3eef69c09b1f0914e617dc451a3a6ec9)), closes [#53](https://github.com/e-Spirit/fsxa-pattern-library/issues/53)

### BREAKING CHANGES

- **dataset:** The latest fsxa-api version has a new return type for fetchProjectProperties and a
  new format for the ImageMap type. For details, check the the [breaking changes](https://github.com/e-Spirit/fsxa-api/blob/master/CHANGELOG.md#breaking-changes) in the fsxa-api.

# [6.3.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v6.2.2...v6.3.0) (2022-03-24)

### Features

- **dependencies:** update fsxa-api version ([#52](https://github.com/e-Spirit/fsxa-pattern-library/issues/52)) ([0f12811](https://github.com/e-Spirit/fsxa-pattern-library/commit/0f12811a6bd0a906beab90dc2a427f66c6609b88))

## [6.2.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v6.2.1...v6.2.2) (2022-03-02)

### Bug Fixes

- **fsxa-api:** performance fix for fetch project properties ([#50](https://github.com/e-Spirit/fsxa-pattern-library/issues/50)) ([526b7f6](https://github.com/e-Spirit/fsxa-pattern-library/commit/526b7f67e88cda250f93fd66171551df062f41f4))

## [6.2.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v6.2.0...v6.2.1) (2022-02-22)

### Bug Fixes

- **fsxa-api dependency:** update fsxa-api dependency ([#45](https://github.com/e-Spirit/fsxa-pattern-library/issues/45)) ([24c316a](https://github.com/e-Spirit/fsxa-pattern-library/commit/24c316a552f7c6f4ce91df1d4e35fa2897991848))

# [6.2.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v6.1.0...v6.2.0) (2022-02-15)

### Features

- **change stream:** accessing the FSXA API EventSource ([#32](https://github.com/e-Spirit/fsxa-pattern-library/issues/32)) ([7840e7a](https://github.com/e-Spirit/fsxa-pattern-library/commit/7840e7a37e924a14b6e2c4956fe81049c4b3807d))

# [6.1.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v6.0.1...v6.1.0) (2022-02-11)

### Features

- **fsxa-api:** update fsxa-api for references to sections ([#42](https://github.com/e-Spirit/fsxa-pattern-library/issues/42)) ([9c463c7](https://github.com/e-Spirit/fsxa-pattern-library/commit/9c463c7a67775f8e33328f805477160ed182fe91))

## [6.0.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v6.0.0...v6.0.1) (2022-02-09)

### Bug Fixes

- **initializeApp:** fix handling of path on initital pageload ([#41](https://github.com/e-Spirit/fsxa-pattern-library/issues/41)) ([eef8e26](https://github.com/e-Spirit/fsxa-pattern-library/commit/eef8e26a4f6c2065ab0807962688a19b72c61509))

# [6.0.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v5.1.2...v6.0.0) (2022-02-08)

### Features

- **api-config:** update api and use api singleton ([#40](https://github.com/e-Spirit/fsxa-pattern-library/issues/40)) ([aac69b5](https://github.com/e-Spirit/fsxa-pattern-library/commit/aac69b5836292ef30040e46669d66c66b1c6db49))

### BREAKING CHANGES

- **api-config:** `App.tsx` and `BaseComponent.tsx` return a FSXAApiSingleton instead of new FSXAApi instances with each fsxaApi call.
  We also updated the dependency to latest fsxa-api version, introducing new "type" attribute for public interfaces. This may cause your application to break. Details how to handle this can be found in the [Changelog of the fsxa-api](https://github.com/e-Spirit/fsxa-api/blob/master/CHANGELOG.md#breaking-changes).

## [5.1.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v5.1.1...v5.1.2) (2022-01-25)

### Bug Fixes

- **infrastructure:** test navigation initialization ([#35](https://github.com/e-Spirit/fsxa-pattern-library/issues/35)) ([0c77435](https://github.com/e-Spirit/fsxa-pattern-library/commit/0c7743574f93a2eb84463bb40bb0c98f29d5df7c))

## [5.1.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v5.1.0...v5.1.1) (2022-01-14)

### Bug Fixes

- **dependencies:** update fsxa-api ([#33](https://github.com/e-Spirit/fsxa-pattern-library/issues/33)) ([1f08b4e](https://github.com/e-Spirit/fsxa-pattern-library/commit/1f08b4e5176e3ce15400d405f708b8f107121da7))

# [5.1.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v5.0.0...v5.1.0) (2022-01-11)

### Features

- **InEdit:** add properties for InEdit([#26](https://github.com/e-Spirit/fsxa-pattern-library/issues/26)) ([9f4c5a5](https://github.com/e-Spirit/fsxa-pattern-library/commit/9f4c5a5e3e897e23b19d5020a446d1815604e3a3))

# [5.0.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v4.0.2...v5.0.0) (2022-01-11)

### Features

- update usage of fetchByFilter ([#31](https://github.com/e-Spirit/fsxa-pattern-library/issues/31)) ([263b085](https://github.com/e-Spirit/fsxa-pattern-library/commit/263b0856a6a04b77fef62a97be2c8ae0d7a88c93))

### BREAKING CHANGES

- fetchByFilter from fsxa-api now has an extended structure. Please read the fsxa-api/[CHANGELOG.md](https://github.com/e-Spirit/fsxa-api/blob/master/CHANGELOG.md#breaking-change) for more information.

## [4.0.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v4.0.1...v4.0.2) (2021-12-22)

### Bug Fixes

- **tpp-snap:** enable cropping for all resolutions ([#28](https://github.com/e-Spirit/fsxa-pattern-library/issues/28)) ([8f7d52a](https://github.com/e-Spirit/fsxa-pattern-library/commit/8f7d52aadaa552d939da7fee0dab8eb9ed6a08eb))

### Update Notice

The bug fix only works with a TPP_SNAP version >= 2.4.1

## [4.0.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v4.0.0...v4.0.1) (2021-12-21)

### Bug Fixes

- **store:** fix definition of state's mode property ([#29](https://github.com/e-Spirit/fsxa-pattern-library/issues/29)) ([7ff4955](https://github.com/e-Spirit/fsxa-pattern-library/commit/7ff49551ca5d8f5fcaac1f32dca6db1e3c48849f))

# [4.0.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v3.4.0...v4.0.0) (2021-12-07)

### Features

- add NavigationFilter ([#27](https://github.com/e-Spirit/fsxa-pattern-library/issues/27)) ([38973fd](https://github.com/e-Spirit/fsxa-pattern-library/commit/38973fdbac8ccacccc3e44f521b3d7859ba454df)), closes [#17](https://github.com/e-Spirit/fsxa-pattern-library/issues/17) [#18](https://github.com/e-Spirit/fsxa-pattern-library/issues/18)

### BREAKING CHANGES

- The original fsxa-api class was removed and the new ones FSXAProxyApi and
  FSXARemoteApi are used. Their have a slightly different, but better, method signatures. For
  more information, please read the [migration guide in the CHANGELOG of the FSXA-API](https://github.com/e-Spirit/fsxa-api/blob/master/CHANGELOG.md#migration-guide).

# [3.4.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v3.3.0...v3.4.0) (2021-11-25)

### Features

- **404 page:** identify and handle not-found ([#19](https://github.com/e-Spirit/fsxa-pattern-library/issues/19)) ([c389f94](https://github.com/e-Spirit/fsxa-pattern-library/commit/c389f9412137a081decd30ee6f0aefb15ffbc430))

# [3.3.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v3.2.4...v3.3.0) (2021-11-17)

### Features

- **tpp-snap:** provide tpp snap ([#21](https://github.com/e-Spirit/fsxa-pattern-library/issues/21)) ([5a67ea7](https://github.com/e-Spirit/fsxa-pattern-library/commit/5a67ea7f3e26bb889dff053999cbd453a4f49b51))

## [3.2.4](https://github.com/e-Spirit/fsxa-pattern-library/compare/v3.2.3...v3.2.4) (2021-08-16)

### Bug Fixes

- update dependencies ([#15](https://github.com/e-Spirit/fsxa-pattern-library/issues/15)) ([61d1610](https://github.com/e-Spirit/fsxa-pattern-library/commit/61d1610d2b9bd6a6bcd176d49a8c12612a75a807))

## [3.2.3](https://github.com/e-Spirit/fsxa-pattern-library/compare/v3.2.2...v3.2.3) (2021-07-19)

### Bug Fixes

- **tpp-snap cropping:** provide temporary fix for cropping multiple resolutions ([#13](https://github.com/e-Spirit/fsxa-pattern-library/issues/13)) ([eada971](https://github.com/e-Spirit/fsxa-pattern-library/commit/eada97172e37b705b34fd4f1f43a73b74ef25f94))

## [3.2.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v3.2.1...v3.2.2) (2021-06-01)

### Bug Fixes

- updated dependencies ([#12](https://github.com/e-Spirit/fsxa-pattern-library/issues/12)) ([8d67100](https://github.com/e-Spirit/fsxa-pattern-library/commit/8d6710044d25671cb738b73154ff4931d7beebd7))
- **section.tsx:** added missing prefix to avoid name clashing for group class ([#10](https://github.com/e-Spirit/fsxa-pattern-library/issues/10)) ([29eb01b](https://github.com/e-Spirit/fsxa-pattern-library/commit/29eb01bee718de7fa82b01b51b53b8970b681e0d))

## [3.2.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v3.2.0...v3.2.1) (2021-05-12)

### Bug Fixes

- added a timeout when a site is created in ocm ([2fa68c6](https://github.com/e-Spirit/fsxa-pattern-library/commit/2fa68c6c543503ec0f1c69a8456a3459f689454f))

# [3.2.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v3.1.0...v3.2.0) (2021-03-31)

### Features

- added support for richtext ([099d65d](https://github.com/e-Spirit/fsxa-pattern-library/commit/099d65da502aae69d4a11fca053eabe758a68262))
- **devmodeinfo:** added the possibility to display a custom component to declare missing components ([2c0d452](https://github.com/e-Spirit/fsxa-pattern-library/commit/2c0d452c1522b464d0d5332afc69f069751a60ad))

# [3.1.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v3.0.0...v3.1.0) (2021-03-09)

### Features

- **tpp-snap:** remove the bundled tpp-snap version and dynamically load specified version ([#6](https://github.com/e-Spirit/fsxa-pattern-library/issues/6)) ([8ef20e9](https://github.com/e-Spirit/fsxa-pattern-library/commit/8ef20e96b9ba1390e282a92f6fdcae09c194b6d6))

# [3.0.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.2.3...v3.0.0) (2021-02-26)

### Features

- **fetchprojectproperties:** updated fsxa-api and implemented fetchprojectproperties ([1251218](https://github.com/e-Spirit/fsxa-pattern-library/commit/1251218295108819d19aa5c4e4572a8011d2540a))

### BREAKING CHANGES

- **fetchprojectproperties:** This version only works with CaaSConnect module version 3.3.0 onwards.

## [2.2.3](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.2.2...v2.2.3) (2021-01-26)

### Bug Fixes

- **global settings:** fix error, where globalSettings would be lost after locale change ([a64c080](https://github.com/e-Spirit/fsxa-pattern-library/commit/a64c08076dad30a9dabc0933834f189e12cb492c))

## [2.2.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.2.1...v2.2.2) (2021-01-20)

### Bug Fixes

- **tpp-snap:** move setPreviewElement invocation to Page.tsx ([e3f0bc3](https://github.com/e-Spirit/fsxa-pattern-library/commit/e3f0bc315b8640ab7e36083f1b077ad36f9c07f6))

## [2.2.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.2.0...v2.2.1) (2021-01-14)

### Bug Fixes

- **tailwindcss:** add prefix to tailwindcss ([dc7556a](https://github.com/e-Spirit/fsxa-pattern-library/commit/dc7556a260533473b411a3c470a4e44d0233d5d0))

# [2.2.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.1.8...v2.2.0) (2021-01-14)

### Features

- **basecomponent:** add currentPage getter to BaseComponent ([918ea88](https://github.com/e-Spirit/fsxa-pattern-library/commit/918ea88a71040b60dedd8bc610eb18b3f62a7f69))

## [2.1.8](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.1.7...v2.1.8) (2020-12-23)

### Bug Fixes

- **fsxa-api:** fix wrong reference of external fsxa-api dependency ([4ae8cab](https://github.com/e-Spirit/fsxa-pattern-library/commit/4ae8cab55f1c5f0c4b9146973d4d7c58bd47864a))

## [2.1.7](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.1.6...v2.1.7) (2020-12-23)

### Bug Fixes

- **fsxa-api:** set fsxa-api as external dependency so it is not added to the bundle ([77ec92e](https://github.com/e-Spirit/fsxa-pattern-library/commit/77ec92e9c023de5e4d1b16f14f3f4155120d98f8))

## [2.1.6](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.1.5...v2.1.6) (2020-12-17)

### Bug Fixes

- **datasets:** fix display of dataset element in dynamic route ([aa20eea](https://github.com/e-Spirit/fsxa-pattern-library/commit/aa20eeac4ee0328b9fc4d33c08782daecfa28ffc))

## [2.1.5](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.1.4...v2.1.5) (2020-12-17)

### Bug Fixes

- **rendering:** reduced wrapper divs as much as possible and added styling to required ones ([9e5bc78](https://github.com/e-Spirit/fsxa-pattern-library/commit/9e5bc7853a8bce23d2905d2dfefcb08b785128aa))

## [2.1.4](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.1.3...v2.1.4) (2020-12-15)

### Bug Fixes

- **rendercontentelement:** we readded the renderContentElement method ([8ffebc9](https://github.com/e-Spirit/fsxa-pattern-library/commit/8ffebc915ecac81b8919294b63c92a40cfd43277))

## [2.1.3](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.1.2...v2.1.3) (2020-12-15)

### Bug Fixes

- **richtext:** switched back to easier syntax for rendering richtext-content ([ed782c0](https://github.com/e-Spirit/fsxa-pattern-library/commit/ed782c091f86d63c865f4e9840ce711a9f7aef52))

## [2.1.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.1.1...v2.1.2) (2020-12-15)

### Bug Fixes

- **fragments:** we've removed vue-fragment as dependency since this can break SSR ([04ceaf5](https://github.com/e-Spirit/fsxa-pattern-library/commit/04ceaf511c1976123b6ac9c8a90164602e770bd3))

## [2.1.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.1.0...v2.1.1) (2020-12-14)

### Bug Fixes

- **richtext:** change devMode appearance for RichText-Elements ([12bc7b4](https://github.com/e-Spirit/fsxa-pattern-library/commit/12bc7b4ba980f2b618f57ea8d8a4d02d02cba496))

# [2.1.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v2.0.0...v2.1.0) (2020-12-14)

### Features

- **richtext:** we upgraded the fsxa-api dependency and switched to the new RichText JSON structure ([e41bb9d](https://github.com/e-Spirit/fsxa-pattern-library/commit/e41bb9d9d89816074237a5f8ce3353b8f50ded04))

# [2.0.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.5.1...v2.0.0) (2020-12-09)

- Feature/refactor (#4) ([d100c6c](https://github.com/e-Spirit/fsxa-pattern-library/commit/d100c6c9d38c64252074c6d69ae32745d0f5ef4b)), closes [#4](https://github.com/e-Spirit/fsxa-pattern-library/issues/4)

### BREAKING CHANGES

- - We removed the default components. Every component must now be mapped in your
    project. (we've fully dropped fsxa-ui as dependency)

* You now have to use the FSXAApp as
  root-wrapper.
* The interface for providing your component map slightly changed. You now can pass
  all of your components through a single property.

## [1.5.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.5.0...v1.5.1) (2020-11-12)

### Bug Fixes

- **misc:** fix multiple errors ([41fccb3](https://github.com/e-Spirit/fsxa-pattern-library/commit/41fccb3ff076243a6fc987225cf9dcf8a46e75b3))

# [1.5.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.4.2...v1.5.0) (2020-10-30)

### Features

- **routing:** added util method to replace FS formatting in richtexts with working links ([#3](https://github.com/e-Spirit/fsxa-pattern-library/issues/3)) ([b68632e](https://github.com/e-Spirit/fsxa-pattern-library/commit/b68632ed5fffaeb31f05999ae2534f431ff8f4e8))

## [1.4.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.4.1...v1.4.2) (2020-10-28)

### Bug Fixes

- **deployment:** fix error where configuration and mode is "forgotten" in deployed pwas ([de08987](https://github.com/e-Spirit/fsxa-pattern-library/commit/de089870917d3bca89c35cb973f6e5de667a5e38))
- **deployment:** use correct content mode instead of api-mode ([d92394d](https://github.com/e-Spirit/fsxa-pattern-library/commit/d92394d52918099e9f1a02affa812229ab2b10aa))
- **typescript:** fix typescript typings and remove unused declarations from imports ([4fd6c43](https://github.com/e-Spirit/fsxa-pattern-library/commit/4fd6c43d071957508e38df15569b4e2fa6216197))

## [1.4.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.4.0...v1.4.1) (2020-10-28)

### Bug Fixes

- **datasets:** fix embedded datasets and add support for dynamic urls ([430e9bc](https://github.com/e-Spirit/fsxa-pattern-library/commit/430e9bcf2f9f28a83f46fed72fdff84c03911295))

# [1.4.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.3.0...v1.4.0) (2020-10-14)

### Features

- **misc:** expose preconfigured fsxaApi through basecomponent and add method to render child comps ([1022faa](https://github.com/e-Spirit/fsxa-pattern-library/commit/1022faafef2bb636487874b1ec73ac77a152fce7))

# [1.3.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.2.3...v1.3.0) (2020-10-14)

### Features

- **datasets:** add support for datasets ([5fceab3](https://github.com/e-Spirit/fsxa-pattern-library/commit/5fceab362e2b5f9f3ad4d19789844fa715a29294))

## [1.2.3](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.2.2...v1.2.3) (2020-09-24)

### Bug Fixes

- **i18n:** the page was not showing content on inital load ([17aa294](https://github.com/e-Spirit/fsxa-pattern-library/commit/17aa294e4aed7f6dbe0717196608175c9ae928c7))

## [1.2.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.2.1...v1.2.2) (2020-09-23)

### Bug Fixes

- **types:** remove wrong import in types ([c19d7d2](https://github.com/e-Spirit/fsxa-pattern-library/commit/c19d7d290324e0920efa3e8d69e966a2563ea903))

## [1.2.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.2.0...v1.2.1) (2020-09-18)

### Bug Fixes

- **multi-language:** fix error, where locale was not set correctly ([5bcd8c8](https://github.com/e-Spirit/fsxa-pattern-library/commit/5bcd8c8cff1e71130435ef9e46d67081e2155554))

# [1.2.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.1.2...v1.2.0) (2020-09-17)

### Features

- **i18n:** we now support multi-language projects ([50d8c83](https://github.com/e-Spirit/fsxa-pattern-library/commit/50d8c839089fb7f7a925dcfecad0409ebb493b2e))

## [1.1.2](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.1.1...v1.1.2) (2020-09-08)

### Bug Fixes

- **store:** we introduced new FSXAModuleParams to meet SSR requirements ([c09ad8d](https://github.com/e-Spirit/fsxa-pattern-library/commit/c09ad8d3c97ceb4043a31a0dc0403b57f75574a5))

## [1.1.1](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.1.0...v1.1.1) (2020-08-25)

### Bug Fixes

- **typescript:** extend FSXABaseComponent instead of Component ([8e72379](https://github.com/e-Spirit/fsxa-pattern-library/commit/8e72379b1c1935fab4c46addc8d1ee219a7ae2d6))

## [1.1.0](https://github.com/e-Spirit/fsxa-pattern-library/compare/v1.0.0...v1.1.0) (2020-08-25)

### Features

- **fsxapage:** extend FSXAPage-Interface to accept components in render-callbacks as well ([5380f1e](https://github.com/e-Spirit/fsxa-pattern-library/commit/5380f1edb21ca67c75a796c4bccd3fb964df128a))
- **fsxapage:** introduce new properties appLayoutComponent and navigationComponent ([968b740](https://github.com/e-Spirit/fsxa-pattern-library/commit/968b74003c0637eda90ea5ef8fdecfedb5fb98ca))

## [1.0.0](https://github.com/e-Spirit/fsxa-pattern-library/releases/tag/v1.0.0) (2020-08-17)

### Bug Fixes

- **introduce new fsxa-api version:** introduce new fsxa-api and refactor code to match new structure ([2fff5f1](https://github.com/e-Spirit/fsxa-pattern-library/commit/2fff5f16d40ce334f61e4c9ce146740169f171e2))

### BREAKING CHANGES

- **introduce new fsxa-api version:** the fsxa-api is now working with the native fetch api, which is not available on
  server side. if you are using the pattern-library make sure that you are polyfilling fetch through
  cross-fetch for example.

---

## 0.1.60

Breaking Changes:

- removed all CSS styling from project. This means that you do not have to import the `fsxa-pattern-library.css` into your project.
- fsxa-ui was transformed to a peer dependency. You have to install it yourself.

## 0.1.59

Breaking Changes:

- removed FSXAConfigProvider. All its properties can now directly be passed to the FSXAPage
