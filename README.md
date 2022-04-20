# ballona-discovery

[![Test](https://github.com/dhkatz/ballona-discovery/actions/workflows/test.yml/badge.svg)](https://github.com/dhkatz/ballona-discovery/actions/workflows/test.yml) [![Coverage Status](https://coveralls.io/repos/github/dhkatz/ballona-discovery/badge.svg?branch=master)](https://coveralls.io/github/dhkatz/ballona-discovery?branch=master)

A content management system for creating interactive park tours and experiences.

## Install

``yarn install``

## Information

### Features

* Panel Editor
  - Create and edit tour panels
  - Add multimedia content to panels
* User Authentication
  - Authenticate with email
  - Authenticate with providers (Facebook, Google, etc.)
* User Management
  - Role based access control
  - Permissions set per role
* Content Management
  - Tours
  - Events
  - Information

### Packages

The Ballona Discovery project is split into multiple packages.

- **@ballona-discovery/api**
  - Firebase Functions
  - API Server
- **@ballona-discovery/editor**
  - React Panel Editor
- **@ballona-discovery/app**
  - Main React App

## Development

### Deployment

Deployment is handled automatically through [GitHub Actions](https://github.com/dhkatz/ballona-discovery/actions).

The following actions are available:

* Firebase Functions
* Firebase Hosting
* Firebase Firestore Rules
* Testing

### Emulation

Due to the project making extensive use of Firebase services, you will want to set up Firebase emulators in order
to test functionality without affecting your production environment.

If you haven't already, set up the Firebase emulators. The `firebase.json` file contains the emulators necessary already. Simply
run the following command and press `ENTER` to continue.

```bash
firebase init emulators
```

After the emulators are installed you can begin development using the emulators.
You will most likely want to run these commands in separate terminals:

**Starting Firebase Emulators**
```bash
yarn run emulate
```

**Watching Packages for Changes**
```bash
yarn run dev
```

Note that running in development mode will **not** build the packages for production, meaning the hosting
emulator on port `5000` will **not** show the latest changes unless you rebuild manually. 
Instead, visit the development site in at port `3000` (or whatever port the terminal running `yarn run dev` displays).
