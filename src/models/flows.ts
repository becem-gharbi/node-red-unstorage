interface IFlows {
  appname: string;
  flow: any;
}

export default {
  findOne: (
    where: { appname: string },
    cb: (err: Error, flows: IFlows) => void
  ) => {},

  findOneAndUpdate: (
    where: { appname: string },
    data: { flow: any },
    cb: (err: Error, flows: IFlows) => {}
  ) => {},
};
