//@ts-nocheck
import type { Storage } from "unstorage";
import { createStorage } from "unstorage";
import Flows from "./models/flows.js";
import Credentials from "./models/credentials.js";
import Settings from "./models/settings.js";
import Sessions from "./models/sessions.js";
import Library from "./models/library.js";

var appname: string;

export const storage = createStorage();

export const storageModule = {
  init: async () => {
    appname = "app0";
  },

  getFlows: function () {
    return new Promise(function (resolve, reject) {
      Flows.findOne({ appname: appname }, function (err, flows) {
        if (err) {
          reject(err);
        } else {
          if (flows) {
            resolve(flows.flow);
          } else {
            resolve([]);
          }
        }
      });
    });
  },

  saveFlows: function (flows) {
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

  getCredentials: function () {
    return new Promise(function (resolve, reject) {
      Credentials.findOne({ appname: appname }, function (err, credentials) {
        if (err) {
          reject(err);
        } else {
          if (credentials) {
            resolve(JSON.parse(credentials.credentials));
          } else {
            resolve({});
          }
        }
      });
    });
  },

  saveCredentials: function (credentials) {
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

  getSettings: function () {
    return new Promise(function (resolve, reject) {
      Settings.findOne({ appname: appname }, function (err, settings) {
        if (err) {
          reject(err);
        } else {
          if (settings) {
            resolve(settings.settings);
          } else {
            resolve({});
          }
        }
      });
    });
  },

  saveSettings: function (settings) {
    return new Promise(function (resolve, reject) {
      Settings.findOneAndUpdate(
        { appname: appname },
        { settings: settings },
        { upsert: true, useFindAndModify: false },
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
    return new Promise(function (resolve, reject) {
      Sessions.findOne({ appname: appname }, function (err, sessions) {
        if (err) {
          reject(err);
        } else {
          if (sessions) {
            // console.log("found session")
            resolve(sessions.sessions);
          } else {
            resolve({});
          }
        }
      });
    });
  },

  saveSessions: function (sessions) {
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
