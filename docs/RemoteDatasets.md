## RemoteDatasets

the neo-fsxa-pattern-library can support a specific implementation of remote datasets.
Those Datasets can be fetched via a separate fsxa remote Api managed by the Users Application, that will be requested by a proxy Api created by fsxa-pattern-library
This Remote Api should connect to the CaaS of the remote Project.

Must be used with ExactDatasetRouting.

To configure remote Datasets, add the following line to your .env and your nuxt public runtime.

`FSXA_REMOTE_DATASET_PROXY_API_PATH=/path/to/remote/api`

If this is set, the pattern lib will try to resolve routes from that projects CaaS regarding to its Datatets. Those Routes are only taken into Account, if no local route can be resolved.
The fsxa-pattern-lib will create a separate fsxa-proxy-api connecting to this path only used for remote dataset routing.

To make sure, that a valid PageRef can be used to display those Datasets, one may add a mapping to map REMOTE_PAGEREF_ID to LOCAL_PAGEREF_ID

`FSXA_REMOTE_DATASET_PAGEREF_MAPPING={ "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}`

Additionally, you may configure the variable `FSXA_VALID_LANGUAGES`, which will filter out Dataset Routing to the Languages set here. e.g.

`FSXA_VALID_LANGUAGES=["DE_DE", "EN_US"]`

Note that the values in this Array must coincide with the identifier of a Language in the CaaS found in each Document under "locale.identifier", not the CaaS Locales.
