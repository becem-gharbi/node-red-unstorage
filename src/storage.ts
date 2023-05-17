//@ts-nocheck
import type { StorageModule } from "@node-red/runtime";
import { createStorage, prefixStorage, Storage } from "unstorage";
import Library from "./models/library.js";
import fsDriver from "unstorage/drivers/fs";

var appname: string;

export var appStorage: Storage;

export const storageModule: StorageModule = {
  init: () => {
    appname = "app0";

    const unstorage = createStorage({
      driver: fsDriver({ base: "./tmp" }),
    });

    appStorage = prefixStorage(unstorage, appname);
  },

  getFlows: () => appStorage.getItem("flows").then((flows) => flows || []),

  saveFlows: (flows) => appStorage.setItem("flows", flows),

  getCredentials: () =>
    appStorage.getItem("credentials").then((creds) => creds || {}),

  saveCredentials: () => appStorage.setItem("credentials", credentials),

  getSettings: () =>
    appStorage.getItem("settings").then((settings) => settings || {}),

  saveSettings: () => appStorage.setItem("settings", settings),

  getSessions: () =>
    appStorage.getItem("sessions").then((sessions) => sessions || {}),

  saveSessions: () => appStorage.setItem("sessions", sessions),

  getLibraryEntry: function (type, name) {
    console.log("********* getLibraryEntry *********");

    if (name == "") {
      name = "/";
    } else if (name.substr(0, 1) != "/") {
      name = "/" + name;
    }

    return new Promise(function (resolve, reject) {
      Library.findOne(
        { appname: appname, type: type, name: name },
        function (err, file) {
          if (err) {
            reject(err);
          } else if (file) {
            resolve(file.body);
          } else {
            var reg = new RegExp("^" + name, "");
            Library.find(
              { appname: appname, type: type, name: reg },
              function (err, fileList) {
                if (err) {
                  reject(err);
                } else {
                  var dirs = [];
                  var files = [];

                  for (var i = 0; i < fileList.length; i++) {
                    var n = fileList[i].name;
                    n = n.replace(name, "");
                    if (n.indexOf("/") == -1) {
                      var f = fileList[i].meta;
                      f.fn = n;
                      files.push(f);
                    } else {
                      n = n.substr(0, n.indexOf("/"));
                      dirs.push(n);
                    }
                  }
                  dirs = dirs.concat(files);
                  resolve(dirs);
                }
              }
            );
          }
        }
      );
    });
  },

  saveLibraryEntry: function (type, name, meta, body) {
    console.log("********* saveLibraryEntry *********");

    return new Promise(function (resolve, reject) {
      var p = name.split("/"); // strip multiple slash
      p = p.filter(Boolean);
      name = p.slice(0, p.length).join("/");
      if (name != "" && name.substr(0, 1) != "/") {
        name = "/" + name;
      }
      Library.findOneAndUpdate(
        { appname: appname, name: name },
        { name: name, meta: meta, body: body, type: type },
        function (err, library) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },
};
