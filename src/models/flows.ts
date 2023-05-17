// var Flows = new Schema({
//   appname: String,
//   flow: Schema.Types.Mixed,
// });
import { storage } from "../storage.js";

export default {
  findOne: (
    where: { appname: string },
    cb: (err: Error, flows: any) => void
  ) => {},

  findOneAndUpdate: (
    where: { appname: string },
    data: { flow: any },
    cb: (err: Error, flows: any) => {}
  ) => {},
};
