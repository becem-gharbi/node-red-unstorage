import { prefixStorage, createStorage } from "unstorage";
import type { CreateStorageOptions } from "unstorage";

var ContextStore = function (args: {
  app: string;
  options: CreateStorageOptions;
}) {
  const storage = createStorage(args.options);

  this.appStorage = prefixStorage(storage, args.app);
};

ContextStore.prototype.get = function (
  scope: string,
  key: string | string[],
  cb: (error: Error, ...values: string[]) => void
) {
  try {
    if (Array.isArray(key)) {
      Promise.all(
        key.map((el) => this.appStorage.getItem(scope + ":" + el))
      ).then((result) => cb(undefined, ...result));
    }

    this.appStorage
      .getItem(scope + ":" + key)
      .then((result) => cb(undefined, result));
  } catch (error) {
    cb(error);
  }
};

ContextStore.prototype.set = function (
  scope: string,
  key: string | string[],
  value: string | string[],
  cb: (error?: Error) => void
) {
  try {
    if (Array.isArray(key)) {
      const values = [...value];

      Promise.all(
        key.map((el, index) =>
          this.appStorage.setItem(scope + ":" + el, values[index] || null)
        )
      ).then(() => cb());
    } else {
      this.appStorage.setItem(scope + ":" + key, value).then(() => cb());
    }
  } catch (error) {
    cb(error);
  }
};

ContextStore.prototype.keys = function (
  scope: string,
  cb: (error: Error, ...values: string[]) => void
) {
  try {
    this.appStorage.getKeys(scope).then((result) => {
      const keys = result.map((el) => el.split(":")[1]);

      cb(undefined, keys);
    });
  } catch (error) {
    cb(error);
  }
};

ContextStore.prototype.delete = function (scope: string) {
  this.appStorage
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
