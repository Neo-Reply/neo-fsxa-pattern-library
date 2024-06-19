## RemoteDatasets

the neo-fsxa-pattern-library can support a specific implementation of remote datasets.
Those Datasets must be available in the CaaS of the specified remote project with the same FSXA_API_KEY as the project itself uses.

Must be used with ExactDatasetRouting.

To configure remote Datasets, add the following line to your .env and your nuxt public runtime

`FSXA_REMOTE_DATASET_PROJECT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

If this is set, the pattern lib will try to resolve routes from that projects CaaS regarding to its Datatets. Those Routes are only taken into Account, if no local route can be resolved.

To make sure, that a valid PageRef can be used to display those Datasets, one may add a mapping to map REMOTE_PAGEREF_ID to LOCAL_PAGEREF_ID

`FSXA_REMOTE_DATASET_PAGEREF_MAPPING={ "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}`

Additionally, you may configure the variable `FSXA_VALID_LANGUAGES`, which will filter out Dataset Routing to the Languages set here. e.g.

`FSXA_VALID_LANGUAGES=["DE_DE", "EN_US"]`

Note that the values in this Array must coincide with the identifier of a Language in the CaaS found in each Document under "locale.identifier"
