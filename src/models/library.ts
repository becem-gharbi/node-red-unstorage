import { appStorage } from "../storage.js";

interface ILibrary {
  appname: string;
  type: string;
  name: string;
  meta: any;
  body: any;
}

export default {
  findOne: (
    where: { appname: string; type: string; name: string },
    cb: (err: Error | null, library?: ILibrary) => void
  ) => {
    appStorage
      .getItem("library")
      .then((value) => {
        const parsed = JSON.parse(value.toString()) as ILibrary;

        cb(null, parsed);
      })
      .catch(cb);
  },

  findOneAndUpdate: (
    where: { appname: string; name: string },
    data: { name: string; meta: any; body: any; type: string },
    cb: (err: Error | null, library?: ILibrary) => {}
  ) => {
    const entity: ILibrary = {
      appname: where.appname,
      name: where.name,
      body: data.body,
      meta: data.meta,
      type: data.type,
    };

    appStorage
      .setItem("library", entity)
      .then(() => cb(null, entity))
      .catch(cb);
  },
};
