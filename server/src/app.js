
require("dotenv").config();

import Koa from "koa";
import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import mount from "koa-mount";
import path from "path"
import Router from "koa-router";
import api from "./api";
import jwtMiddleware from "./lib/jwtMiddleware";
import * as mongodb from './mongodb/mongodb.js';

// const https = require('https');
// const sslConfig = require('../private/ssl-config.js');
// const options = {
//     key: sslConfig.privateKey,
//     cert: sslConfig.certificate,
//     passphrase: process.env.PASSPHRASE,
//   };

const app = new Koa();
const static_pages = new Koa();
static_pages.use(serve(path.resolve(__dirname, '../../client/build/')))
app.use(mount("/", static_pages));

const port = process.env.PORT || 8888;
mongodb.connect();
const router = new Router();
router.use("/api", api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log(`HTTP server Listening on port ${port}`));