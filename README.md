# ballona-discovery

[![Test](https://github.com/dhkatz/ballona-discovery/actions/workflows/test.yml/badge.svg)](https://github.com/dhkatz/ballona-discovery/actions/workflows/test.yml) [![Coverage Status](https://coveralls.io/repos/github/dhkatz/ballona-discovery/badge.svg?branch=master)](https://coveralls.io/github/dhkatz/ballona-discovery?branch=master)

A content management system for creating interactive park tours and experiences.

## Install

``yarn install``

## Information

### Features

### Configuration

## Usage

## Documentation

### Emulation

Due to the project making extensive use of Firebase services, you will want to set up Firebase emulators in order
to test functionality without affecting your production environment.

Please note that the emulator is emulating a _production_ environment. Packages will be rebuilt for production during
emulation. This is slower than a development build, but the emulators require transpiled code.

If you haven't already, set up the Firebase emulators. The `firebase.json` file contains the emulators necessary already. Simply
run the following command and press `ENTER` to continue.

```bash
firebase init emulators
```

After the emulators are installed you can begin development using the emulators with the following commands:

**Starting Firebase Emulators**
```bash
yarn run emulate:firebase
```

**Watching Packages for Changes**
```bash
yarn run emulate
```

You will most likely want to run these commands in separate terminals.
