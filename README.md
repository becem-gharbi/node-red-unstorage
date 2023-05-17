# 💾 Node Red Unstorage

Node-RED is a programming tool for wiring together hardware devices, APIs and online services via a browser-based editor.

This project aims to embed and run a Node Red instance on a NodeJS application suitable for serverless deployment.

By default the data is stored on filesystem. However, Node RED exposes a storage interface enabling custom integrations.

This project implements a storage plugin based on [unstorage](https://unstorage.unjs.io/) library. Thus allowing a flexible storage layer that can run on filesystem, Mongo DB and a variety of key-value storage platforms.

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

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Caveats

Node RED has a large [library](https://flows.nodered.org/) of ready to use Nodes. In order to add an external Node to the palette, the installation should happend over CLI.

## Credits

- [@hardillb](https://github.com/hardillb) - [node-red-contrib-storage-mongodb](https://github.com/hardillb/node-red-contrib-storage-mongodb)
