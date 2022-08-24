"use strict";

import  path from 'path';

/*============== express 사용 ==============*/
import express from "express";
import { config } from './src/config/config.js';
const app = express();

/*============== 라우팅 사용 ==============*/
import { router } from './src/routes/router.js';
app.use('/', router);

/*============== views 엔진 세팅 ==============*/
app.set('views', './src/views/');
app.set('view engine', 'ejs');
app.use(express.static('./src/views'));

/*============== 서버 on ==============*/
app.listen(config.port, ()=>{
    console.log("서버 ON : "+config.url);
});

