import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import type { LocalSettings } from "@node-red/runtime";

const cwd = dirname(fileURLToPath(import.meta.url));

export const settings: LocalSettings = {
  httpAdminRoot: "/",
  httpNodeRoot: "/api",
  userDir: resolve(cwd, "userDir"),
  nodesDir: resolve(cwd, "userDir", "nodes"),
  functionGlobalContext: {},
  uiHost: "0.0.0.0",
  uiPort: parseInt(process.env.PORT) || 8080,
  credentialSecret: "secret",
};
