# Full Stack Open 2021
Part 13 - SQL - Open relational databases

Node JS - Express Server - with PostgreSQL


- cli.js - run only for first part of tasks
- commands.sql - the first tasks as sql

the rest of tasks:

- you can do migrations first
- or you can uncomment the Sync() in /models/index.js to initialize DB first
- default user password hardcoded = secret
- users can be enabled/disabled in DB and login token is stored in db for invalidating on logout
- sensitive routes are checking the token

- npm install
- modify .env
- run : npm run start

.env file must contain : 
DATABASE_URL=db_connection_string - have the DB ready and initialize it first
SECRET=jwt_token_secret
PORT=3001
