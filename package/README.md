# Node Red Unstorage

Node-RED is a programming tool for wiring together hardware devices, APIs and online services via a browser-based editor.

Unstorage is a universal key-value storage library. It supports multiple storage platform: filesystem, database, localStorage and [more](https://unstorage.unjs.io/).

This package is a Node-RED storage plugin that enables the integration with `unstorage`. It implements a `storageModule` for storing flows, settings, sessions and library content. Plus a `contextStorage` for storing context data. Ultimately, the goal is to create a platform agnostic storage layer for Node RED.

## Setup

Make sure to install the dependency:

```bash
npm i @bg-dev/node-red-unstorage
```

## Usage

Below, a Node-Red instance is embedded in a node.js application. Mongo DB is is used for storage layer.

```js
// Supports ESM and CJS
import storage from "@bg-dev/node-red-unstorage";

import * as dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import nodered from "node-red";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import mongodbDriver from "unstorage/drivers/mongodb";

dotenv.config();

const { contextStore, storageModule } = storage({
  // A namespace for the storage layer
  // Allows creating multiple projects with isolated data access
  app: "app0",

  // Unstorage instance options, for storageModule (required)
  storageOptions: {
    driver: mongodbDriver({
      connectionString: process.env.MONGO_DB_URL,
      databaseName: "nodeRed",
      collectionName: "storage",
    }),
  },

  // Unstorage instance options, for contextStore (optional)
  contextOptions: {
    driver: mongodbDriver({
      connectionString: process.env.MONGO_DB_URL,
      databaseName: "nodeRed",
      collectionName: "context",
    }),
  },
});

const cwd = dirname(fileURLToPath(import.meta.url));

const settings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  // The userDir contains the external libraries
  // Should be at the project root
  userDir: cwd,
  nodesDir: resolve(cwd, "nodes"),
  uiHost: "0.0.0.0",
  uiPort: parseInt(process.env.PORT) || 8080,

  storageModule: storageModule,

  contextStorage: {
    unstorage: {
      module: contextStore,
    },
  },
};

// Express is used as suggested in Node-Red docs
const app = express();

const server = createServer(app);

app.use("/", express.static("public"));

nodered.init(server, settings);

app.use(settings.httpAdminRoot, nodered.httpAdmin);

app.use(settings.httpNodeRoot, nodered.httpNode);

server.listen(settings.uiPort);

nodered.start();
```

## Credits

- [@hardillb](https://github.com/hardillb) - node-red-contrib-storage-mongodb
