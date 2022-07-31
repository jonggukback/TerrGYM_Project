"use strict";

/*============== 라우터 사용 ==============*/
import express from "express";
export const router = express.Router();

/*============== body-parser ==============*/
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

/*============== 컨트롤러 사용 ==============*/
import { user,render,record } from './controller.js';

/*============== 마이페이지 요청 ==============*/
router.get('/mypage',render.mypage);
router.post('/islogin',user.islogin);
router.post('/islogin',user.logout);

router.get('/mypage/record',render.record);
router.post('/mypage/record/getlist',record.getlist);
router.post('/mypage/record/setlist',record.setlist);
router.post('/mypage/record/deleteRow',record.deleterow);

/*============== 로그인 요청 ==============*/
router.get('/login',render.login);
router.post('/login',user.login);

/*============== 회원가입 요청 ==============*/
router.get('/signup',render.signup);
router.post('/signup',user.signup);

/*============== 외부로 export ==============*/