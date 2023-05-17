//@ts-nocheck
import type { StorageModule } from "@node-red/runtime";
import { createStorage, prefixStorage, Storage } from "unstorage";
import Flows from "./models/flows.js";
import Credentials from "./models/credentials.js";
import Settings from "./models/settings.js";
import Sessions from "./models/sessions.js";
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

  getFlows: function () { //Needed
    console.log("********* getFlows *********");

    return new Promise(function (resolve, reject) {
      Flows.findOne({ appname: appname }, function (err, flows) {
        if (err) {
          reject(err);
        } else {
          if (flows.flow) {
            resolve(flows.flow);
          } else {
            resolve([]);
          }
        }
      });
    });
  },

  saveFlows: function (flows) { //Needed
    console.log("********* saveFlows *********");

    return new Promise(function (resolve, reject) {
      Flows.findOneAndUpdate(
        { appname: appname },
        { flow: flows },
        function (err, flows) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },

  getCredentials: function () { //Needed
    console.log("********* getCredentials *********");

    return new Promise(function (resolve, reject) {
      Credentials.findOne({ appname: appname }, function (err, credentials) {
        if (err) {
          reject(err);
        } else {
          if (credentials.credentials) {
            resolve(JSON.parse(credentials.credentials));
          } else {
            resolve({});
          }
        }
      });
    });
  },

  saveCredentials: function (credentials) {
    console.log("********* saveCredentials *********");

    return new Promise(function (resolve, reject) {
      Credentials.findOneAndUpdate(
        { appname: appname },
        { credentials: JSON.stringify(credentials) },
        function (err, credentials) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },

  getSettings: function () { //Needed
    console.log("********* getSettings *********");

    return new Promise(function (resolve, reject) {
      Settings.findOne({ appname: appname }, function (err, settings) {
        if (err) {
          reject(err);
        } else {
          if (settings.settings) {
            resolve(settings.settings);
          } else {
            resolve({});
          }
        }
      });
    });
  },

  saveSettings: function (settings) { //Needed
    console.log("********* saveSettings *********");

    return new Promise(function (resolve, reject) {
      Settings.findOneAndUpdate(
        { appname: appname },
        { settings: settings },
        function (err, settings) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },

  getSessions: function () {
    console.log("********* getSessions *********");

    return new Promise(function (resolve, reject) {
      Sessions.findOne({ appname: appname }, function (err, sessions) {
        if (err) {
          reject(err);
        } else {
          if (sessions.sessions) {
            resolve(sessions.sessions);
          } else {
            resolve({});
          }
        }
      });
    });
  },

  saveSessions: function (sessions) {
    console.log("********* saveSessions *********");

    return new Promise(function (resolve, reject) {
      Sessions.findOneAndUpdate(
        { appname: appname },
        { sessions: sessions },
        function (err, sessions) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },

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
