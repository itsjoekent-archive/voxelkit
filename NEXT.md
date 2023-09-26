NEXT

- get tests working again

  - find untested code?
  - setup test coverage?

- create the response formatters
- create the api router and express server
- add the server to bin/start
- create the account field validation routes
- create the gcp infra with terraform
- create the deploy actions pipelines
- create the ci actions for code + terraform

- setup a logger

  - replace console.log calls
  - create eslint rule ?

- Add toJSON override to ApiError
- Add more event handlers to mongo ?
- set mongo timeout based on environment ?

- add migration scripts to bin/all ?
- where should migrations live? should they live in `services/` and get compiled to bin ?
- add account migration file

- create a services/test/factory folder to generate mock accounts for testing

FUTURE

- eslint
  - can we enforce ordering imports alphabetically?
  - can we enforce no back ticks, use `@/...` ?
- add request id's to logs + api error
- sensitive info in logs redaction
  - add prefix to sensitive fields (eg: for passwords, `pw_${hash}`)
  - create a `secrets` array in `services/lib/environment-variables` (rename `lib/secrets`), regex match the log message and redact
- mono repo guidelines
- generate openapi/swagger spec

- setup chaos testing (eg: redis is switched off, do services degrade properly), and environment specific testing (eg: if in prod mode, are logs filtered out)
