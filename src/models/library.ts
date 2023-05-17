// var Library = new Schema({
//   appname: String,
//   type: String,
//   name: String,
//   meta: Schema.Types.Mixed,
//   body: Schema.Types.Mixed,
// });
import { storage } from "../storage.js";

export default {
  findOne: (
    where: { appname: string; type: string; name: string },
    cb: (err: Error, library: any) => void
  ) => {},

  findOneAndUpdate: (
    where: { appname: string; name: string },
    data: { name: string; meta: string; body: string; type: string },
    cb: (err: Error, library: any) => {}
  ) => {},
};
