# Restaurant API

GraphQL API for ordering places in restaurants.

## Installation and running of the application

Make sure that docker and node are installed prior the launch of application. Recommended version of node is 20.

1. Create `.env` file in the root of the project. Check [`env-example`](/env-example) in order to view a list of required variables.
2. Build the docker image in the root of the project.
3. Install dependencies - `npm install`.
4. Execute all migrations - `npm run migration:run`.
5. Optional: seed the database - `npm run seed`.
6. Launch the application - `npm start`.
