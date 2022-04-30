<div id="top"></div>

[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h1 align="center">Domain Driven Design Boilerplate for Node JS + TypeScript</h1>

  <p align="center">
    RESTful API and Serverless-ready with Domain Driven Design to jumpstart your projects.
    <br />
    <a href="https://github.com/ricomonster/node-ddd-ts"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ricomonster/node-ddd-ts">View Demo</a>
    ·
    <a href="https://github.com/ricomonster/node-ddd-ts/issues">Report Bug</a>
    ·
    <a href="https://github.com/ricomonster/node-ddd-ts/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#folder-structure">Folder Structure</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <!-- <li><a href="#contact">Contact</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

I really like the Domain Driven Design as the concept is super cool once you understand how it works and its implementations. I do have an existing boilerplate for this [one](https://github.com/ricomonster/node-ddd) but this time I want it to work with TypeScript.

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Node.js](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [Awilix](https://github.com/jeffijoe/awilix)
* [Objection.js](https://vincit.github.io/objection.js/)
* [Serverless](https://www.serverless.com/)
* [Eslint](https://eslint.org/)
* [Jest](https://jestjs.io/)
* [Knex](https://knexjs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

### So what is Domain Driven Design?
Domain driven design (DDD) is an approach to software design that values simplicity and modeling code as closely to the business domain as possible. This results in code that can be easily understood by the business and evolved as the needs of the business domain change.

By isolating domain code away from all other concerns of the system like infrastructure, security, transportation, serialization etc; the complexity of the system grows only as large as the complexity of the business or problem domain itself.

### Prerequisites

Before you can use the boilerplate, make sure have the following installed:
* Node JS (>= v14) via [nvm](https://github.com/nvm-sh/nvm), Node JS installers, or your OS package manager.
  ```sh
  # Example via nvm
  # Installation via cURL
  $ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  
  # Installation via Wget
  $ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  
  # Install atleast Node JS version 14
  $ nvm install 14
  ```

* Serverless
  ```sh
  $ npm i serverless-cli -g
  ```

* Knex
  ```sh
  $ npm i knex -g
  ```

* Your choice of relational database that [Objection.js supports](https://vincit.github.io/objection.js/guide/installation.html).

### Installation

1. Clone the repository
    ```sh
    $ git clone --depth=1 https://github.com/ricomonster/node-ddd-ts.git
    ```
2. Go inside of the directory and install the dependencies
    ```sh
    $ cd node-ddd-ts # or whatever you named to the boilerplate
    $ npm i
    ```
3. By default it uses PostgreSQL for database and if you wanted to change switch make sure to install its NPM dependency.
    ```sh
    $ npm i mysql2 --save # for MySQL
    $ npm i mariadb --save # for MariaDB
    $ npm i sqlite3 --save # for SQLite
    $ npm i pg --save # for PostgreSQL
    ```

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

Now you're ready to go! Its usage will always depend on you but here's the basic gist of how the boilerplate works.

### Folder Structure
This is the current folder structure of the boilerplace and what does it contains (ideally).

      .
      ├── __tests__/
      ├── config/
      └── src/
          ├── application/
          ├── config/
              ├── config.ts
              └── database.ts
          ├── domain/
          ├── infrastructure/
              ├── database/
                  ├── migrations/
                  ├── models/
                  ├── seeders/
                  └── index.ts
              ├── logger/
                  └── Logger.ts
              ├── repositories/
                  ├── BaseRepository.ts
                  └── UserRepository.ts
              └── utils/
                  └── strings.ts
          ├── interface/
              ├── express/
              └── lambda/
          ├── types
              ├── Application.ts
              ├── Cradle.ts
              └── Repository.ts
          └── container.ts
* `__tests__/` - This basically contains all the test suites and it uses [Jest](https://jestjs.io/). You can use your preferred test suite.

* `config/` This just store the configuration for Jest and stub for Knex migrations and seeds.

* `src/` Everything is stored here and you're going to work here most of the time.
  * `application/` - Application logic goes in here.
  * `config/` - Application and database configuration.
  * `domain/` - Data attribute structure
  * `infrastructure/` - Utilities, repositories, database connectivity, models, and services goes in here.
  * `interface/` - How your application will be accessed. (via REST, Lambda, or GraphQL)
  * `container.ts` - Every parts of this application are registered here.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [node-ddd](https://github.com/ricomonster/node-ddd)
* [node-api-boilerplate](https://github.com/joshuaalpuerto/node-ddd-boilerplate)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ricomonster/node-ddd-ts.svg?style=for-the-badge
[contributors-url]: https://github.com/ricomonster/node-ddd-ts/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ricomonster/node-ddd-ts.svg?style=for-the-badge
[forks-url]: https://github.com/ricomonster/node-ddd-ts/network/members
[stars-shield]: https://img.shields.io/github/stars/ricomonster/node-ddd-ts.svg?style=for-the-badge
[stars-url]: https://github.com/ricomonster/node-ddd-ts/stargazers
[issues-shield]: https://img.shields.io/github/issues/ricomonster/node-ddd-ts.svg?style=for-the-badge
[issues-url]: https://github.com/ricomonster/node-ddd-ts/issues
[license-shield]: https://img.shields.io/github/license/ricomonster/node-ddd-ts.svg?style=for-the-badge
[license-url]: https://github.com/ricomonster/node-ddd-ts/blob/develop/LICENSE.txt
