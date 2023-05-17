import { appStorage } from "../storage.js";

interface ICredentials {
  appname: string;
  credentials: string;
}

export default {
  findOne: (
    where: { appname: string },
    cb: (err: Error | null, credentials?: ICredentials) => void
  ) => {
    appStorage
      .getItem("credentials")
      .then((value) => {
        const entity: ICredentials = {
          appname: where.appname,
          credentials: value && value.toString(),
        };
        cb(null, entity);
      })
      .catch(cb);
  },

  findOneAndUpdate: (
    where: { appname: string },
    data: { credentials: any },
    cb: (err: Error | null, credentials?: ICredentials) => {}
  ) => {
    const entity: ICredentials = {
      appname: where.appname,
      credentials: data.credentials,
    };

    appStorage
      .setItem("credentials", entity)
      .then(() => cb(null, entity))
      .catch(cb);
  },
};
