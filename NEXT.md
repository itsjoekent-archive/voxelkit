NEXT

- fix tests to work with mongodb mock
- create the response formatters
- create the api router and express server
- add the server to bin/start
- create the account field validation routes
- create the gcp infra with terraform
- create the deploy actions pipelines

1. install 'mongodb-memory-server' in bin/
2. create a 'bin' stage in the dockerfile

- make sure the right binary is configured, https://github.com/nodkz/mongodb-memory-server?tab=readme-ov-file#configuring-which-mongod-binary-to-use
- should bin get renamed? since it's local specific?
- maybe make a 'local' + 'remote' + 'all' subfolder pattern?
- base -> bin/all -> bin/testing -> bin/local

3. create a test script in bin

- launch the mongodb in memory server
- read a `.env.test` file
- launch all test processes with correct env
- determine between one off / watch
- create a `test.sh` file to build docker (ignore bin/local stage), run the bin/testing script
- maybe move `start.sh` and `test.sh` to bin, update readme

FUTURE

- run tests in docker setup
- add request id's to logs + api error
- sensitive info in logs redaction
- mono repo guidelines
- generate openapi/swagger spec
