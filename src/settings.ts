import type { LocalSettings } from "@node-red/runtime";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { storageModule } from "./storage.js";

const cwd = dirname(fileURLToPath(import.meta.url));

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
};
