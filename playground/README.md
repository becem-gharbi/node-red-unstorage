# Node Red Unstorage

Node-RED is a programming tool for wiring together hardware devices, APIs and online services via a browser-based editor. By default the data is stored on local file-system. However, Node RED provides a storage API allowing custom integrations.

This project aims to embed and run a Node Red instance on a Node.js application suitable for stateless deployment. This is done by implementing a storage plugin based on [unstorage](https://unstorage.unjs.io/) library. Thus allowing a flexible storage layer that can run on file-system, Mongo DB and a variety of key-value storage platforms.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:8080`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Run the production build:

```bash
npm run start
```

## Credits
- [@hardillb](https://github.com/hardillb) - node-red-contrib-storage-mongodb
