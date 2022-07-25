"use strict";

/*============== 라우터 사용 ==============*/
import express from "express";
export const router = express.Router();

/*============== body-parser ==============*/
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

/*============== 컨트롤러 사용 ==============*/
import { process,render } from './controller.js';

/*============== 마이페이지 요청 ==============*/
router.get('/mypage',render.mypage);
router.post('/mypage',process.islogin);
router.post('/mypage2',process.logout);

/*============== 로그인 요청 ==============*/
router.get('/login',render.login);
router.post('/login',process.login);

/*============== 회원가입 요청 ==============*/
router.get('/signup',render.signup);
router.post('/signup',process.signup);

/*============== 외부로 export ==============*/