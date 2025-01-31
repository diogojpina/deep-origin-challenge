# Deep Origin Challenge

## Config

Go to the backend folder. Create a .env file with:

```
MONGODB_URL=mongodb://127.0.0.1:27017/deep-origin
```

Go to the frontend folder. Create a .env file with:

```
VITE_API_URL=http://127.0.0.1:3010
```

## Install and Run

### Backend

Go to the backend folder and run:

```
yarn
yarn start:dev
```

### Frontend

Go to the frontend folder and run:

```
yarn
yarn dev
```

### Docker run

At the root folder, run:

```
docker compose up
```

If you need to rebuild, run:

```
docker compose up --build
```

## Docker

I created a docker-compose.yaml at root dir to put all docker compose info together.

That file will create/start 4 containers:

- Backend: it'll install the Node/Nest packages and run it
- Frontend: it'll install the React/Vite packages and run it
- MongoDB: it'll run a MongoDB database

For backend and frontend container, docker will use the Dockerfile inside of their directories to create the image.

Note:
Backend and frontend configuration was create for test environment. That means, for production environment the Dockerfile
needs to be improved creating ad builder to install the dependencies and build the code, and a runner to get the generate code and run
it inside of an nginx.

## Techs

- Node.JS (v20)
- React
- Typescript
- MongoDB

### Backend

- NestJS: framework
- Mongoose: ORM for Mongo
- JWT: user auth token
- Swagger: to json:api
- Throttler: rate-limit

### Frontend

- Vite: lib/framework
- Axios: connect to API (http)
- Jose: JWT read
- React Router: create routes
- React Icons: icons
- SASS: scss

## API documentation

[http://localhost:3010/docs](http://localhost:3010/docs)

## Extras

- Add support for accounts. You have to create an user through API, but login is implemented in React
- Validate the URL (API and React)
- Display an error message if invalid (API and React)
- Make it easy to copy the shortened URL to the clipboard (React)
- Allow users to modify the slug of their URL (React and API)
- Track visits to the shortened URL (count the number of access)
- Add rate-limiting to prevent bad-actors from spamming the service (Added Throttler in the API)
- Update API to follow a known spec (add Swagger)
