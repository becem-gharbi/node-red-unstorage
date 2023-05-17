// var Credentials = new Schema({
//   appname: String,
//   credentials: String,
// });

import { storage } from "../storage.js";

export default {
  findOne: (
    where: { appname: string },
    cb: (err: Error, credentials: any) => void
  ) => {},

  findOneAndUpdate: (
    where: { appname: string },
    data: { credentials: any },
    cb: (err: Error, credentials: any) => {}
  ) => {},
};
