import type { LocalSettings } from "@node-red/runtime";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { storageModule } from "./storage.js";
import { createStorage } from "unstorage";
import fsDriver from "unstorage/drivers/fs";

const cwd = dirname(fileURLToPath(import.meta.url));

const storage = createStorage({
  //@ts-ignore
  driver: fsDriver({ base: "./tmp" }),
});

export const settings: LocalSettings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  userDir: resolve(cwd, ".."),
  nodesDir: resolve(cwd, "..", "nodes"),
  functionGlobalContext: {},
  uiHost: "0.0.0.0",
  uiPort: parseInt(process.env.PORT) || 8080,
  credentialSecret: "secret",
  //@ts-ignore
  storageModule: storageModule,
  storageSettings: {
    storage: storage,
    appName: process.env.APP_NAME || "default",
  },
};
