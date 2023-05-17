import { appStorage } from "../storage.js";

interface ISessions {
  appname: string;
  sessions: any;
}

export default {
  findOne: (
    where: { appname: string },
    cb: (err: Error | null, sessions?: ISessions) => void
  ) => {
    appStorage
      .getItem("sessions")
      .then((value) => {
        const entity: ISessions = {
          appname: where.appname,
          sessions: value,
        };
        cb(null, entity);
      })
      .catch(cb);
  },

  findOneAndUpdate: (
    where: { appname: string },
    data: { sessions: any },
    cb: (err: Error | null, sessions?: ISessions) => {}
  ) => {
    const entity: ISessions = {
      appname: where.appname,
      sessions: data.sessions,
    };

    appStorage
      .setItem("sessions", entity)
      .then(() => cb(null, entity))
      .catch(cb);
  },
};
