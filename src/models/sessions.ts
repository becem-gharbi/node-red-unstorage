interface ISessions {
  appname: string;
  sessions: any;
}

export default {
  findOne: (
    where: { appname: string },
    cb: (err: Error, sessions: ISessions) => void
  ) => {},

  findOneAndUpdate: (
    where: { appname: string },
    data: { sessions: any },
    cb: (err: Error, sessions: ISessions) => {}
  ) => {},
};
