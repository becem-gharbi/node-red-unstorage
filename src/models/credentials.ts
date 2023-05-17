interface ICredentials {
  appname: string;
  credentials: string;
}

export default {
  findOne: (
    where: { appname: string },
    cb: (err: Error, credentials: ICredentials) => void
  ) => {},

  findOneAndUpdate: (
    where: { appname: string },
    data: { credentials: any },
    cb: (err: Error, credentials: ICredentials) => {}
  ) => {},
};
