interface ISettings {
  appname: string;
  settings: any;
}

export default {
  findOne: (
    whrere: { appname: string },
    cb: (err: Error, settings: ISettings) => void
  ) => {},

  findOneAndUpdate: (
    where: { appname: string },
    data: { settings: any },
    cb: (err: Error, settings: ISettings) => {}
  ) => {},
};
