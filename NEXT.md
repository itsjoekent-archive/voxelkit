NEXT

- confirm tests still work
  - run tests serially that need DB operations
  - where do we clear the DB? maybe we spy the mongo import and if its imported by code invoked by a test, we know to clean up after the test run? the mock would just return the original lib/mongo import
- create the response formatters
- create the api router and express server
- add the server to bin/start
- make sure service ports are exposed
- add mongo to docker-compose
- create the account field validation routes
- create the gcp infra with terraform
- create the deploy actions pipelines

- Move env files to to `infrastructure` ?

4. add migration scripts to bin/all

- add an account migration script
- where should migrations live? should they live in `services/` and get compiled to bin?
- add a db init + seed scripts to `bin/` ?

FUTURE

- run tests in docker setup
- add request id's to logs + api error
- sensitive info in logs redaction
- mono repo guidelines
- generate openapi/swagger spec
