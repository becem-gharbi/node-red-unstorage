import { appStorage } from "../storage.js";

interface IFlows {
  appname: string;
  flow: any;
}

export default {
  findOne: (
    where: { appname: string },
    cb: (err: Error | null, flows?: IFlows) => void
  ) => {
    appStorage
      .getItem("flows")
      .then((value) => {
        const entity: IFlows = {
          appname: where.appname,
          flow: value,
        };
        cb(null, entity);
      })
      .catch(cb);
  },

  findOneAndUpdate: (
    where: { appname: string },
    data: { flow: any },
    cb: (err: Error | null, flows?: IFlows) => {}
  ) => {
    const entity: IFlows = {
      appname: where.appname,
      flow: data.flow,
    };

    appStorage
      .setItem("flows", entity)
      .then(() => cb(null, entity))
      .catch(cb);
  },
};
