
# dockerized-nest-postgres

REST API created in purpose of self-development and skills improvement in the field of SQL and Nest.js

## Run locally
Start container with command: ```$ docker-compose up```
it should be exposed for you on port 8089

## Testing
Before pushing the code make sure all tests are passing.

Unit tests: ```$ npm run test```
e2e tests: ```$ npm run:e2e```

## CI/CD
Project is using github actions to set up a container and check if tests are passing in every PR and after pushing code to the main branche
After merging with main branch and passing tests automatically starts deployment to heroku
[heroku](https://donate-shelter-nestjs.herokuapp.com/)

## Endpoints
// TODO add swagger

GET /users - as admin you can get the list of all users

POST /users/signup - register new user

POST /users/signin - login user


POST /shelter/new - as admin you can create a new shelter

GET /shelter - all shelters list


GET /wallet/new - create a wallet for current user

PATCH /wallet/charge - charge users's wallet

PATCH /wallet/donate - donate shelter from user's wallet

    
