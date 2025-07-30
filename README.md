# SGA Senator Application, Nomination, and Audit System

The purpose of this application is to streamline the application and nomination processes for senators at SGA (Student Government Association).

## Technologies

Monorepo: [nx](https://nx.dev)

Common:

- [TypeScript](https://www.typescriptlang.org/)
- Test framework: [Jest](https://jestjs.io/)

Frontend:

- Library: [React](https://react.dev/)
- Component library: [Material UI](https://mui.com/)
- CSS library: [styled-components](https://styled-components.com/)

Backend:

- Framework: [NestJS](https://nestjs.com/)
- Database: TBD

## Deployment

( Deployed separatedly )

- Deployed frontend on static site of Render
- Deployed backend on web app site of Render

## Setting up the development environment

Prerequisites: make sure everything is installed

1. [node/npm](https://nodejs.org/en)
   - To check if it's installed: `node -v` and `npm -v`
   - To install: for [mac/linux](https://github.com/nvm-sh/nvm) and [windows](https://github.com/coreybutler/nvm-windows) (setup instructions are in the link under the `Installing and Updating` and `Installation & Upgrades` sections, respectively)
2. [yarn](https://yarnpkg.com/)
   - To check if it's installed: `yarn -v`
   - To install: `npm install --global yarn`
3. [nx](https://nx.dev/): `npm add --global nx@latest`

First, clone the repo and `cd` into the directory

```bash
git clone https://github.com/SGAOperationalAffairs/nomination-system.git
cd nomination-system
```

Then, install the dependencies

```bash
yarn
```

## Running the app

To run just the frontend,

```bash
nx serve frontend
```

To run just the backend,

```bash
nx serve backend
```

To run both the frontend and backend with one command,

```bash
nx run-many -t serve -p frontend backend
```

## Serving the app using docker

```bash
docker-compose up --build
```

The frontend will be at http://localhost:4200/ and the backend will be at http://localhost:3000/.

## To Do List:

- [x] Add better responses from form backends than just 'Bad Request'
- [x] Add Pop Up for error message for invalid form responses based on invalid frontend data
- [x] Encode user permission functionality
- [x] Encode dashboard backend functionality
- [x] Make constituencyName on application same as on nomination, dont make user type out
- [ ] Make sure that constituencyName is actually being put in the db
- [ ] Not have nomineeName be updated literally every second
- [x] Create SGA theme colors and logos
- [x] Add relative imports
- [ ] Clean up code
- [ ] Make use of libraries (for ex. use in application form)
- [ ] Reduce file length, split into multiple files
- [ ] Improve reusability of code
- [ ] Standardize styling with general style guide and usage (colors as well), potentially use styling library like tailwind?
- [ ] Fix spacing in applications and nominations forms
- [ ] Make the website look good on mobile
- [ ] Use caching for gathering nominees on nomination form
- [ ] Hide API keys and backend import paths
- [ ] Try to not have all code public..?
- [ ] Remove print statements
- [ ] Either notify user that sites slow during inactivity or not have site slow down during inactivity
- [x] Update admin page to show application correctly instead of nomination twice💀
- [ ] Add time stamps to applications and nominations?
