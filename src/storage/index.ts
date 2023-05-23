import type { CreateStorageOptions } from "unstorage";
import contextStore from "./context.js";
import storageModule from "./module.js";

export default function (args: {
  app: string;
  storageOptions: CreateStorageOptions;
  contextOptions: CreateStorageOptions;
}) {
  const module = storageModule({ app: args.app, options: args.storageOptions });

  return {
    storageModule: module,
    contextStore: () =>
      contextStore({ app: args.app, options: args.contextOptions }),
  };
}
