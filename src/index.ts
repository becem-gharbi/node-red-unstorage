import * as dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import nodered from "node-red";
import { LocalSettings } from "@node-red/runtime";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { storageModule } from "./storage.js";
import { createStorage } from "unstorage";
import mongodbDriver from "unstorage/drivers/mongodb";
import { contextModule } from "./context.js";

dotenv.config();

const storage = createStorage({
  //@ts-ignore
  driver: mongodbDriver({
    connectionString: process.env.MONGO_DB_URL,
    databaseName: "nodeRed",
    collectionName: "unstorage",
  }),
});

const cwd = dirname(fileURLToPath(import.meta.url));

const settings: LocalSettings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  userDir: resolve(cwd, ".."),
  nodesDir: resolve(cwd, "..", "nodes"),
  functionGlobalContext: {},
  uiHost: "0.0.0.0",
  uiPort: parseInt(process.env.PORT) || 8080,
  credentialSecret: process.env.CREDENTIAL_SECRET || "secret",

  //@ts-ignore
  storageModule: storageModule,

  storageSettings: {
    storage: storage,
    appName: process.env.APP_NAME || "default",
  },

  adminAuth: {
    type: "credentials",
    users: [
      {
        username: "admin",
        // Password = 1234
        // Use `node-red admin hash-pw` to change
        password:
          "$2b$08$1DooD4I2bJVYmxEVF69L2e55N8KkO/dn3QMFwvCtt.tgrD9X7cB/m",
        permissions: "*",
      },
    ],
  },

  contextStorage: {
    unstorage: {
      //@ts-ignore
      module: contextModule,
      config: {
        storage: storage,
        appName: process.env.APP_NAME || "default",
      },
    },
  },
};

const app = express();

const server = createServer(app);

app.use("/", express.static("public"));

nodered.init(server, settings);

app.use(settings.httpAdminRoot as string, nodered.httpAdmin);

app.use(settings.httpNodeRoot as string, nodered.httpNode);

server.listen(settings.uiPort);

nodered.start();
