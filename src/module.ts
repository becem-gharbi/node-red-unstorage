//@ts-nocheck
import { prefixStorage, createStorage } from "unstorage";
import type { CreateStorageOptions, Storage } from "unstorage";

var appStorage: Storage;
var libraryStorage: Storage;

export default (args: { app: string; options: CreateStorageOptions }) => {
  return {
    init: () => {
      const storage = createStorage(args.options);

      appStorage = prefixStorage(storage, args.app);

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
      } else if (!name.startsWith("/")) {
        name = "/" + name;
      }

      const library = await libraryStorage.getItem(name + ":" + type);

      if (library) {
        const body = JSON.parse(library.body);
        return body;
      }

      let libraryKeys = await libraryStorage.getKeys(name);

      if (!libraryKeys) {
        return [];
      }

      libraryKeys = libraryKeys.filter((el) => el.endsWith(type));

      var dirs = [];
      var files = [];

      for (var i = 0; i < libraryKeys.length; i++) {
        const library = await libraryStorage.getItem(libraryKeys[i]);

        var n = library.name;
        n = n.replace(name, "");
        if (n.indexOf("/") == -1) {
          var f = library.meta;
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
      if (name != "" && !name.startsWith("/")) {
        name = "/" + name;
      }

      return libraryStorage.setItem(name + ":" + type, {
        name,
        meta,
        body,
        type,
      });
    },
  };
};
