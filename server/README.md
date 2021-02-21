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

Currently to simplify the database access process, the application is using sqlite, an SQL database engine. For now, this is will efficiently test our basic logic. In the future we will transition to using Postgres by changing the connections under [env.js](https://github.com/SirFancyWalrus/DogGo/blob/master/database/config/env.js). Since both use SQL, we would not need to change any other details in our program. To view the contents and tables within the database after deployment, navigate to the project directory and execute
```
sqlite3 db.sqlite
```
To view all tables
```
.tables
```
To view all seeded values in the table
```
select * from users;
```
To exit
```
.exit
```


## Test Cases

TODO
