import express from "express";
import { createServer } from "http";
import nodered from "node-red";
import { settings } from "./settings.js";

const app = express();

const server = createServer(app);

nodered.init(server, settings);

app.use(settings.httpAdminRoot as string, nodered.httpAdmin);

app.use(settings.httpNodeRoot as string, nodered.httpNode);

server.listen(settings.uiPort);

nodered.start();
