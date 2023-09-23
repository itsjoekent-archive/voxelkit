NEXT

- confirm tests still work
  - run tests serially that need DB operations
  - where do we clear the DB? maybe we spy the mongo import and if its imported by code invoked by a test, we know to clean up after the test run? the mock would just return the original lib/mongo import
  - create a services/test/factory folder to generate mock accounts for testing ?
- create the response formatters
- create the api router and express server
- add the server to bin/start
- create the account field validation routes
- create the gcp infra with terraform
- create the deploy actions pipelines
- create the ci actions for code + terraform
- setup a logger

- Add toJSON override to ApiError
- Add more event handlers to mongo ?
- set mongo timeout based on environment ?

- add migration scripts to bin/all ?
- add an account migration script ?
- where should migrations live? should they live in `services/` and get compiled to bin ?

FUTURE

- run tests in docker setup
- add request id's to logs + api error
- sensitive info in logs redaction
  - add prefix to sensitive fields (eg: for passwords, `pw_${hash}`)
  - create a `secrets` array in `services/lib/environment-variables` (rename `lib/secrets`), regex match the log message and redact
- mono repo guidelines
- generate openapi/swagger spec

- setup chaos testing (eg: redis is switched off, do services degrade properly), environment specific testing (eg: if in prod mode, are logs filtered out)
