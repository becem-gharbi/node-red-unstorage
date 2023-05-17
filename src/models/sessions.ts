// var Sessions = new Schema({
//   appname: String,
//   sessions: Schema.Types.Mixed,
// });
import { storage } from "../storage.js";

export default {
  findOne: (
    where: { appname: string },
    cb: (err: Error, sessions: any) => void
  ) => {},

  findOneAndUpdate: (
    where: { appname: string },
    data: { sessions: any },
    cb: (err: Error, sessions: any) => {}
  ) => {},
};
