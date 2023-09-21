# Environment variables glossary

Document all environment variables here.

| Key name                 | Description                                                     | Type                     | Is secret            |
| ------------------------ | --------------------------------------------------------------- | ------------------------ | -------------------- |
| **ENVIRONMENT**          | Describes the current environment stage the code is running in  | `local`,`preview`,`prod` | No                   |
| **GCP_PROJECT_ID**       | The Google Cloud Project ID that this application is running in | `string`                 | No                   |
| **IS_CI**                | Describes whether the code is running in CI or not              | `boolean`                | No                   |
| **SERVICES_MONGODB_URI** | Mongo connection URI, must start with `mongodb://`              | `string`                 | Yes (_except local_) |
