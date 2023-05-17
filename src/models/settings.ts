import { appStorage } from "../storage.js";

interface ISettings {
  appname: string;
  settings: any;
}

export default {
  findOne: (
    where: { appname: string },
    cb: (err: Error | null, settings?: ISettings) => void
  ) => {
    appStorage
      .getItem("settings")
      .then((value) => {
        const entity: ISettings = {
          appname: where.appname,
          settings: value,
        };
        cb(null, entity);
      })
      .catch(cb);
  },

  findOneAndUpdate: (
    where: { appname: string },
    data: { settings: any },
    cb: (err: Error | null, settings?: ISettings) => {}
  ) => {
    const entity: ISettings = {
      appname: where.appname,
      settings: data.settings,
    };

    appStorage
      .setItem("settings", entity)
      .then(() => cb(null, entity))
      .catch(cb);
  },
};
