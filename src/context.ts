import { prefixStorage, Storage } from "unstorage";

var appStorage: Storage;

var ContextStore = function (storageSettings) {
  appStorage = prefixStorage(storageSettings.storage, storageSettings.appName);
};

ContextStore.prototype.open = () => {};

ContextStore.prototype.close = () => {};

ContextStore.prototype.get = (scope: string, key: string | string[]) => {
  if (Array.isArray(key)) {
    return Promise.all(key.map((el) => appStorage.getItem(scope + ":" + el)));
  }

  return appStorage.getItem(scope + ":" + key);
};

ContextStore.prototype.set = (
  scope: string,
  key: string | string[],
  value: string | string[]
) => {
  if (Array.isArray(key)) {
    const values = [...value];
    return Promise.all(
      key.map((el, index) =>
        appStorage.setItem(scope + ":" + el, values[index] || null)
      )
    );
  }

  return appStorage.setItem(scope + ":" + key, value);
};

ContextStore.prototype.keys = (scope: string) =>
  appStorage
    .getKeys(scope)
    .then((result) => result.map((el) => el.split(":")[1]));

ContextStore.prototype.delete = (scope: string) =>
  appStorage
    .getKeys(scope)
    .then((result) =>
      Promise.all(result.map((key) => appStorage.removeItem(key)))
    );

ContextStore.prototype.clean = (activeNodes) => {};

export function contextModule(config) {
  return new ContextStore(config);
}
