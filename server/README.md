# Backend

Data model definitions and database interactions for all incoming HTTP requests

## Getting Started

### Prerequisites

Check that node and npm are installed and up to date

## Deployment

When deploying the server project for the first time, navigate to the project directory in Terminal and run 
```
npm install
```
For all subsequent deployments, run
```
npm start
```
Navigate to http://localhost:3000 to verify that your server is running.


## Accessing Database

Currently the database connections are to CockroachCloud's cluster. The certificate as well as connection parameters are stored in the /database/config directory. To download the CRDB client, use:

**For Mac**
```
curl https://binaries.cockroachdb.com/cockroach-v20.2.4.darwin-10.9-amd64.tgz | tar -xJ; cp -i cockroach-v20.2.4.darwin-10.9-amd64/cockroach /usr/local/bin/
```
**For Linux**
```
wget -qO- https://binaries.cockroachdb.com/cockroach-v20.2.4.linux-amd64.tgz | tar xvz; cp -i cockroach-v20.2.4.linux-amd64/cockroach /usr/local/bin/
```
**For Windows:** [Instructions](https://www.cockroachlabs.com/docs/v20.2/install-cockroachdb-windows?_ga=2.143609845.1382161654.1613844948-869747237.1613844948#download-the-executable)

To connect from Terminal, execute the following

```
cockroach sql --url 'postgres://cindy@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=<your_certs_directory>/cc-ca.crt&options=--cluster=honk-bonk-830'
```


## Test Cases

The curl commands and other relevant testing strategies are commented above each service. 
