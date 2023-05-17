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
    cb: (err: Error, library: ILibrary) => void
  ) => {},

  findOneAndUpdate: (
    where: { appname: string; name: string },
    data: { name: string; meta: any; body: any; type: string },
    cb: (err: Error, library: ILibrary) => {}
  ) => {},
};
