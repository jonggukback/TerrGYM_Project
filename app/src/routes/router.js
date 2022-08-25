"use strict";

/*============== 라우터 사용 ==============*/
import express from "express";
export const router = express.Router();

/*============== body-parser ==============*/
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

/*============== 컨트롤러 사용 ==============*/
import { user,render,record ,registerdata} from './controller.js';

/*============== 홈페이지 ==============*/
router.get('/', render.home)

/*============== 홈페이지 상세페이지 ==============*/
router.get('/detail', render.detail)

/*============== 마이페이지 요청 ==============*/
router.get('/mypage',render.mypage);
router.get('/mypage/register', render.register);
router.post('/mypage/register/getlist',registerdata.getlist)
router.post('/mypage/register/getlist2',registerdata.getlist2)
router.post('/mypage/register/setlist',registerdata.setlist)
router.post('/mypage/register/deleteList',registerdata.deleteList)

router.get('/mypage/regiList', render.regiList);
router.get('/mypage/regiDetail',render.regiDetail);

router.post('/islogin',user.islogin);
router.post('/logout',user.logout);

router.get('/mypage/record',render.record);
router.get('/mypage/recordall',render.recordall);
router.post('/mypage/record/getlistall',record.getlistall);
router.post('/mypage/record/getlist',record.getlist);
router.post('/mypage/record/setlist',record.setlist);
router.post('/mypage/record/deleteRow',record.deleterow);

router.get('/mypage/question' ,render.question);
router.get('/mypage/question/questionmodal',render.questionmodal);
router.get('/mypage/question/questionUpload',render.questionUpload);

router.get('/mypage/member',render.memberpage);

router.post('/mypage/member/getprofile',user.memberprofile);
router.post('/mypage/member/userdelete',user.userDelete);
router.post('/mypage/member/userupdate',user.userUpdate);
/*============== 로그인 요청 ==============*/
router.get('/login',render.login);
router.post('/login',user.login);

/*============== 회원가입 요청 ==============*/
router.get('/signup',render.signup);
router.post('/signup',user.signup);

/*============== 외부로 export ==============*/

