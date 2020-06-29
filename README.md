# Endpoints monitoring service

## Installation

If you don't have mySQL installed on your macOS machine, you can install it with **homebrew** (package manager) or with [native package](https://dev.mysql.com/doc/mysql-osx-excerpt/5.7/en/osx-installation-pkg.html)

```bash
brew install mysql
```

After installation, you have to launch the mySQL server. You can do this via **macOS Preference Panel** or via **CLI**:

```bash
sudo /usr/local/mysql/support-files/mysql.server start
sudo /usr/local/mysql/support-files/mysql.server stop
sudo /usr/local/mysql/support-files/mysql.server restart
```

Make sure you start your mySQL server and set the [enviroment variable](#Enviroment-variables) inside config.\
By default mySQL server is running on port `3306`, socket locatioon is `/tmp/mysql.sock`.

When the database is running successfully, clone the repository, navigate to the cloned directory and run:

```bash
cd ./server
npm install
npm run build
npm start
```

This launches `rest-api`. Now navigate to `service` directory and run:

```bash
npm install
npm run build
npm start
```

Or with **docker**, navigate to root directory of cloned repo and run:

```bash
docker-compose up
```

## Usage

After docker container will successfully run or node package manager will successfully install and start server and monitoring service.
There is [rest-api](http://localhost:3000) running on port `3000` specified in enviroment variables. You can use Postman or CLI to try routes to use this server.

All routes except `/user/login` and `/user/register` are protected with middleware that checks JWT token in `Authorization` header. Some routes require `Content-Type: application/json` header to work with json.

Token can be obtained by POST Request to `/user/login`.\
Successfully logged user can access only endpoints that he owns and last 10 results that belong to his endpoints.

### How to use rest-api `./server`

If you want to test only functionality of rest-api in docker navigate to the root directory, where `docker-compose.yml` file resides and run this command:

```bash
docker-compose up mysql server
```

This will run just `mysql` and `server` service from `docker-compose.yml` file in interactive mode (`docker-compose up -d mysql server` for background mode).

#### Available logins:

**email:** `batman@example.com`\
**pw:** `dcb20f8a-5657-4f1b-9f7f-ce65739b359e`

**email:** `info@applifting.cz`\
**pw:** `93f39e2f-80de-4033-99ee-249d92736a25`

#### Available requests:

`GET`, `POST`, `PUT`, `DELETE`

#### Available routes:

`/users`\
`/endpoints`\
`/endpoints/:eID/results`

These can be used alone like this:

| route                     | description                                                         |
| :------------------------ | :------------------------------------------------------------------ |
| `/users`                  | returns an array of all Users - only monitoring service have access |
| `/endpoints`              | returns an array of all Endpoints for specified User                |
| `/endpoints/:eID/results` | returns an array of all Results for specified Endpoint              |

Or can be used in conjunction with identifiers to retrieve the metadata for that identifier:

| route                         | description                                                     |
| :---------------------------- | :-------------------------------------------------------------- |
| `/endpoints/:ID`              | returns an Endpoint represented by specified ID                 |
| `/endpoints/:eID/results/:ID` | returns a Result represented by specified ID and ID of Endpoint |

##### Response example:

```json
{
    "dto": [
        {
            "id": 1,
            "name": "batman",
            "url": "https://www.dccomics.com/characters/batman",
            "dateOfCreation": "2020-06-28T21:11:54.000Z",
            "dateOfLastCheck": "2020-06-28T21:11:54.000Z",
            "monitoredInterval": 5,
            "owner": 2
        }
    ]
}
```

#### Other routes:

| route            | description                                                                                          |
| :--------------- | :--------------------------------------------------------------------------------------------------- |
| `/user/login`    | returns JWT token in which are encrypted ID and email of the User.                                   |
| `/user/register` | creates new record of User (served as a helper route during development - bCrypt is not implemented) |

### How to use monitoring service `./service`

In this case, we require all three services to be running in docker.

Service is running in background and checking every minute for new or updated endpoints. You can change the time of checking for new enpoints in `./service/index.ts` and change `@constant MINUTE` to specific value or to `@constant MINUTES_15` which represent 15 minutes.

User token is valid only for 15 minutes so maximum interval for checking is 15 minutes unless validation interval in JWT sign function is changed.

When using Docker you can add new endpoints to the database and either wait for minute or stop docker-compose by command:

```bash
docker-compose stop
```

command `docker-compose down` would remove volumes which would reset the database.\
When not using Docker you can add new endpoints and manually restart service by running `npm start`

### Tests

Tests are written in jest testing framework and are focused on communication between `client -> rest-api` and `rest-api -> database`.

Multiple tests are using similar instances which breaks group testing by command `npm test` in root directory.\
You can run tests individually:

| command                               | description                                                                         |
| :------------------------------------ | :---------------------------------------------------------------------------------- |
| `npm test MonitoredEndpoint.test`     | test of rest-api endpoint /endpoints                                                |
| `npm test MonitoringResult.test`      | test of rest-api endpoint /endpoints/:eID/results/                                  |
| `npm test User.test`                  | test of rest-api endpoint /users & /user/login & /user/register                     |
| `npm test MonitoredEndpointRepo.test` | test of functions that handles communication with database table monitoredEndpoints |
| `npm test MonitoringResultRepo.test`  | test of functions that handles communication with database table monitoringResults  |
| `npm test UserRepo.test`              | test of functions that handles communication with database table users              |

### Seeded data

I have created [module](server/src/db/sampleData.ts) for sample data and [function](server/src/db/repos/mysql/seed.ts) that seeds these sample data after successful connection to database.

### Enviroment variables

There are enviroment variables that represent information about url where rest-api resides, its port, database information for establishing connection and JWT secret for User authentication.
If they're not set, values from [config](server/src/config.ts) will be assigned.
