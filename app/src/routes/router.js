"use strict";

/*============== 라우터 사용 ==============*/
import express from "express";
export const router = express.Router();

/*============== body-parser ==============*/
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

/*============== 컨트롤러 사용 ==============*/
import { process,render } from './controller.js';

/*============== 로그인 요청 ==============*/
router.get('/login',render.login);
router.post('/login',process.login);

/*============== 회원가입 요청 ==============*/
router.get('/signup',render.signup);
router.post('/signup',process.signup);

/*============== 외부로 export ==============*/