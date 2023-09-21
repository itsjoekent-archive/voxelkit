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

- fix mongodb local run (or just use real mongo image in a new multi stage??)
- what if we did a `docker build -t voxelkit-base .` and then had images like `Dockerfile.local-development` and `Dockerfile.unit-testing` which did `FROM voxelkit-base` ... then we'd skip needing to build unnecessary stages.
- should we put the docker compose + dockerfiles in a new directory? eg: `infrastructure/containers` ?
- should we create a file for keeping track of the versions used for mongo and other software (eg redis), could be `infrastructure/versions/mongo` or something

3. create a test script in bin

- launch the mongodb in memory server
- read a `.env.test` file
- launch all test processes with correct env
- determine between one off / watch
- create a `test.sh` file to build docker (ignore bin/local stage), run the bin/testing script
- maybe move `start.sh` and `test.sh` to bin, update readme

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
