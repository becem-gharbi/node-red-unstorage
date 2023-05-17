// var Settings = new Schema({
//   appname: String,
//   settings: Schema.Types.Mixed,
// });
import { storage } from "../storage.js";

export default {
  findOne: (
    whrere: { appname: string },
    cb: (err: Error, settings: any) => void
  ) => {},

  findOneAndUpdate: (
    where: { appname: string },
    data: { settings: any },
    cb: (err: Error, settings: any) => {}
  ) => {},
};
