# Playlister



[![demo](https://img.youtube.com/vi/-R74MWnp7xs/0.jpg)](https://www.youtube.com/watch?v=-R74MWnp7xs)

The web application enables users to generate customized lists of YouTube videos and also allows them to listen to playlists created by other individuals.



## Technologies

### Frontend

* React 
* NextJS
* Tailwindcss
* axios
* pg
* Javascript

### Backend

* Postgresql
* jsonwebtoken

## Installation

```bash
git clone https://github.com/fkamouacs/playlister
```

Use the package manager [npm](https://nodejs.org/en/).

```bash
npm install
```

## Start

```bash
npm run dev
```

## Postgresql server

Use the createTableStatements.sql file to setup postgresql tables.

create a .env.local file with the following variables

```env
PGSQL_USER=
PGSQL_PASSWORD=
PGSQL_HOST=
PGSQL_PORT=
PGSQL_DATABASE=

JWT_SECRET=
```

## Thoughts

Things I would have done differently: make use of redux or react context to manage state. It was messy using props to send state to lower components and back.
