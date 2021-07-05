# Dapp Boilerplate

This repo makes use of a React, Redux + Saga, Reselect boilerplate

## Table of Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
<!-- - [License](#license) -->

## Features

### Stack

* JS Framework: [React](https://github.com/facebook/react) + [Typescript](https://github.com/microsoft/TypeScript)
* SEO & Metadata: [Helmet.js](https://helmetjs.github.io/)
* Blockchain components: [Ethers.js](https://github.com/ethers-io/ethers.js/) + [web3-react](https://github.com/NoahZinsmeister/web3-react)
* Styling: [JSS](https://cssinjs.org/?v=v10.0.3) + [Material UI](https://material-ui.com/)
* State management: [Redux](https://redux.js.org/) + [Redux-Saga](https://redux-saga.js.org/) + [Reselect](https://github.com/reduxjs/reselect)
* Template generation: [Plop](https://plopjs.com/) + [Handlebars.js](https://handlebarsjs.com/)
* Compiling: [Webpack](https://webpack.js.org/) + [Babel](https://babeljs.io/)
* Forms & Validation: [Formik](https://jaredpalmer.com/formik) + [Yup](https://github.com/jquense/yup) 
* Notifications: [Toastify](https://fkhadra.github.io/react-toastify/)

### Structure

The boiler is set up as a [Yarn](https://yarnpkg.com/) workspace/monorepo, this allows for adding additional workspaces like `Blockchain` or `Server` if required and executing parallel scripts across all spaces.

### Webapp

The web app is structured as a standard React app, the important areas to note is the `/api`, `/domains`, `/containers` & `/components`.

The api interactions have helpers to automatically format form field data, collect access token headers and allow for reducer-esque api calling functions. 

The domains folder acts as the apps main Daemon & singleton business logic management components, general app actions are managed here, reducers for the domain state, selectors etc can be found here. Domains are meant to be globally accessable services facilitated through Redux-Saga for async actions

The containers folder allows for managing the business logic of constructing selectors, action dispatch functions, and any complex operations that should be managed seperately from the mark up.

The components folder is for markup files & styling.

## Install

First, run yarn to install the workspace dependancies:

```
yarn install
```

## Usage

### Development

For running a local instance use the command:
```
yarn start:dev
```

### Template generator

To make use of the webapp template generator, first open a terminal and navigate to `./WebApp`, run the command `yarn generate` & follow the prompts.

### Build

To build the project across workspaces, at the root of the directory, run the command `yarn build`.

## Contributions

Frontend boilerplate designed & crafted originally by [@FSM1](https://github.com/FSM1)/[@panterazar](https://github.com/panterazar)

General updates & modifications by [@RyRy79261](https://github.com/RyRy79261)
