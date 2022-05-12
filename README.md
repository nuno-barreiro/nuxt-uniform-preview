# nuxt-uniform-preview

## Configure local environment variables

- Create a `.env` file in the root directory with the below contents. Fill in the missing values.
```yaml
UNIFORM_PROJECT_ID=
UNIFORM_API_KEY=
COMPOSITION_API_URL=http://localhost:7071/api/composition
```

- Create a `api\local.settings.json` file in the root directory with the below contents. Fill in the missing values.

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "UNIFORM_PROJECT_ID": "",
    "UNIFORM_API_KEY": "",
    "CONTENTFUL_SPACE_ID":"",
    "CONTENTFUL_DELIVERY_API_KEY":"",
    "CONTENTFUL_PREVIEW_API_KEY":""
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
}
```

## Running the application
```bash
# install dependencies
$ yarn install

# serve static site application 
$ yarn start
```