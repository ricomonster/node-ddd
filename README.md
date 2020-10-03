# Node DDD Boilerplate

> RESTful API and Serverless-ready (TBD) with Domain Driven Design

[![Node-ddd-develop Actions Status](https://github.com/ricomonster/node-ddd/workflows/node-ddd-develop/badge.svg)](https://github.com/ricomonster/node-ddd/actions)

## What is DDD (Domain Driven Design)?

Domain driven design (DDD) is an approach to software design that values simplicity and modeling code as closely to the business domain as possible. This results in code that can be easily understood by the business and evolved as the needs of the business domain change.

By isolating domain code away from all other concerns of the system like infrastructure, security, transportation, serialization etc; the complexity of the system grows only as large as the complexity of the business or problem domain itself.

## Overview

- uses Node.js > v8
- written using ES6
- uses NPM for package dependency management
- uses [JavaScript Standard Style](http://standardjs.com/)
- uses `sequelize` and `sequelize-cli` as ORM and data migration tool
- Filename convention are `camelCase` and `kebab-case`.

## Development Environment Setup

Make sure you have `npm`, and at least `node v12.x`

### Note:

If you need database connectivity, PostgreSQL and MySQL is supported by default as it uses `sequelize` as ORM.

## Installation

1. Clone the repository with `git clone --depth=1 https://github.com/ricomonster/node-ddd.git`
2. Install the dependencies with NPM. It is installed by default with Node.
3. Install global dependencies [Application Setup](https://github.com/ricomonster/node-ddd#application-setup-development).
4. Create the development and test [Databases](https://github.com/ricomonster/node-ddd#database-setup-development).
5. Run database migrations and seed with `npm run db:migrate`.
6. Run the application in development mode with `npm run start:http`.
7. Access `http://localhost:<PORT>` and you're ready to go!

### Application Setup (Development)

```sh
$ npm install -g standard   # JavaScript Standard Style
$ npm install -g sequelize-cli  # CLI for Sequelize
$ npm install -g pg mysql2 # Database
```

### Database Setup (Development)

1. Install either Postgres 12.4 or MySQL 5.x.
2. Create an empty database according to your preference.
3. Rename the .env and populate it with the correct credentials and settings of your preferred database.

## Acknowledgments

This boilerplate is inspired from [node-api-boilerplate](https://github.com/joshuaalpuerto/node-ddd-boilerplate)
