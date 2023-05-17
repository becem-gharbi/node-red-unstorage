//@ts-nocheck
import type { StorageModule } from "@node-red/runtime";
import { prefixStorage, Storage } from "unstorage";

var appStorage: Storage;
var libraryStorage: Storage;

export const storageModule: StorageModule = {
  init: ({ storageSettings }) => {
    appStorage = prefixStorage(
      storageSettings.storage,
      storageSettings.appName
    );

    libraryStorage = prefixStorage(appStorage, "library");
  },

  getFlows: () => appStorage.getItem("flows").then((flows) => flows || []),

  saveFlows: (flows) => appStorage.setItem("flows", flows),

  getCredentials: () =>
    appStorage.getItem("credentials").then((creds) => creds || {}),

  saveCredentials: (credentials) =>
    appStorage.setItem("credentials", credentials),

  getSettings: () =>
    appStorage.getItem("settings").then((settings) => settings || {}),

  saveSettings: (settings) => appStorage.setItem("settings", settings),

  getSessions: () =>
    appStorage.getItem("sessions").then((sessions) => sessions || {}),

  saveSessions: (sessions) => appStorage.setItem("sessions", sessions),

  getLibraryEntry: async function (type, name) {
    if (name == "") {
      name = "/";
    } else if (name.substr(0, 1) != "/") {
      name = "/" + name;
    }

    const library = await libraryStorage.getItem(name);

    if (library) {
      const parsedLibrary = JSON.parse(library);

      return parsedLibrary.body;
    }

    const libraryKeys = await libraryStorage.getKeys(name);

    var dirs = [];
    var files = [];

    for (var i = 0; i < libraryKeys.length; i++) {
      const library = await libraryStorage.getItem(libraryKeys[i]);

      const parsedLibrary = JSON.parse(library);

      var n = parsedLibrary.name;
      n = n.replace(name, "");
      if (n.indexOf("/") == -1) {
        var f = parsedLibrary.meta;
        f.fn = n;
        files.push(f);
      } else {
        n = n.substr(0, n.indexOf("/"));
        dirs.push(n);
      }
    }

    dirs = dirs.concat(files);

    return dirs;
  },

  saveLibraryEntry: function (type, name, meta, body) {
    var p = name.split("/"); // strip multiple slash
    p = p.filter(Boolean);
    name = p.slice(0, p.length).join("/");
    if (name != "" && name.substr(0, 1) != "/") {
      name = "/" + name;
    }

    return libraryStorage.setItem(name, { name, meta, body, type });
  },
};
