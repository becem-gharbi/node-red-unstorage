import { prefixStorage, createStorage } from "unstorage";
import type { CreateStorageOptions } from "unstorage";

var ContextStore = function (args: {
  app: string;
  options: CreateStorageOptions;
}) {
  const storage = createStorage(args.options);

  this.appStorage = prefixStorage(storage, args.app);
};

ContextStore.prototype.get = function (scope: string, key: string | string[]) {
  if (Array.isArray(key)) {
    return Promise.all(
      key.map((el) => this.appStorage.getItem(scope + ":" + el))
    );
  }

  return this.appStorage.getItem(scope + ":" + key);
};

ContextStore.prototype.set = function (
  scope: string,
  key: string | string[],
  value: string | string[]
) {
  if (Array.isArray(key)) {
    const values = [...value];
    return Promise.all(
      key.map((el, index) =>
        this.appStorage.setItem(scope + ":" + el, values[index] || null)
      )
    );
  }

  return this.appStorage.setItem(scope + ":" + key, value);
};

ContextStore.prototype.keys = function (scope: string) {
  return this.appStorage
    .getKeys(scope)
    .then((result) => result.map((el) => el.split(":")[1]));
};

ContextStore.prototype.delete = function (scope: string) {
  return this.appStorage
    .getKeys(scope)
    .then((result) =>
      Promise.all(result.map((key) => this.appStorage.removeItem(key)))
    );
};

ContextStore.prototype.open = () => {};

ContextStore.prototype.close = () => {};

ContextStore.prototype.clean = (activeNodes) => {};

export default (args: { app: string; options: CreateStorageOptions }) => {
  return new ContextStore(args);
};
