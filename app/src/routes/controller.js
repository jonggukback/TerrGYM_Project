"use strict";

import { User } from '../models/User.js';
import { Record } from '../models/database.js';
import { Register } from '../models/registerdata.js'

const render = {
    home : (req,res)=>{
        res.render('home/main');
    },
    login : (req,res)=>{
        res.render('login/login');
    },
    signup : (req,res)=>{
        res.render('signup/signup');
    },
    mypage: (req,res)=>{
        res.render('mypage/mypage');
    },
    record: (req,res)=>{
        res.render('mypage/record/record');
    },
    recordall: (req,res)=> {
        res.render('/Users/comedown/Desktop/TerrGYM/app/src/views/mypage/record/recordall.ejs');
    },
    detail: (req,res)=>{
        res.render('home/detail_page/about');
    },
    register: (req,res)=>{
        res.render('mypage/registration/register');
    },
    regiList: (req,res)=>{
        res.render('mypage/registration/regiList');
    },
    regiDetail: (req,res)=>{
        res.render('mypage/registration/regiDetail');
    },
    question: (req,res)=>{
        res.render('mypage/question/question');
    },
    questionmodal: (req,res)=>{
        res.render('mypage/question/questionmodal');
    },
    questionUpload: (req,res) =>{
        res.render('/Users/comedown/Desktop/TerrGYM/app/src/views/mypage/question/questionUpload');
    },  
    memberpage: (req,res) => {
        res.render('/Users/comedown/Desktop/TerrGYM/app/src/views/mypage/member/profile.ejs');
    }
}

const user = {
    login : async (req, res) => {
        const user = new User(req.body);
        const respones = await user.login();
        return res.json(respones);
    },
    islogin : async (req,res)=>{
        const user = new User();
        const respones = user.islogin();
        const uid = respones.uid;
        // const profile = await user.profile(respones.uid);
        // respones.profile = profile;
        return res.json(respones);
    },
    logout : async (req,res)=>{
        const user = new User();
        const respones = await user.logout();
        console.log(respones);
        return res.json(respones);
    },
    signup : async (req, res) => {
        const user = new User(req.body);
        const respones = await user.signup();
        console.log(respones);
        return res.json(respones);
    },
    memberprofile: async (req,res) => {
        const user = new User(req.body);
        const islogin = user.islogin();
        const uid = islogin.uid;

        if (islogin.success){
            // const respones = await record.getList(islogin.uid);
            const response = await user.profile(uid);
            return res.json(response);
        } else {
            return res.json(islogin);
        }
    }
}

const record = {
    getlistall : async (req, res) => {
        const record = new Record(req.body);
        const user = new User();
        const islogin = user.islogin();

        if (islogin.success){
            const respones = await record.getList(islogin.uid);
            return res.json(respones);
        } else {
            return res.json(islogin);
        }
    },

    getlist : async (req, res) => {
        const record = new Record(req.body);
        const user = new User();
        const islogin = user.islogin();

        if (islogin.success){
            const respones = await record.getList(islogin.uid);
            return res.json(respones);
        } else {
            return res.json(islogin);
        }
    },
    setlist : async (req, res) => {
        const record = new Record(req.body);
        const user = new User();
        const islogin = user.islogin();

        if (islogin.success){
            const respones = await record.setList(islogin.uid);
            return res.json(respones);
        } else {
            return res.json(islogin);
        }
    },
    deleterow: async (req, res) => {
        const record = new Record(req.body);
        const user = new User();
        const islogin = user.islogin();

        if (islogin.success){
            const respones = await record.deleteRow(islogin.uid);
            return res.json(respones);
        } else {
            return res.json(islogin);
        }
    }
}

const registerdata = {

    deleteList: async (req, res) => {
        const user = new User();
        const islogin = user.islogin();
        const register = new Register(req.body);

        if (islogin.success){
            const respones = await register.deleteList();
            return res.json(respones);
        } else {
            return res.json(islogin);
        }
    },

    getlist2 : async (req, res) => {
        const register = new Register(req.body);
        const user = new User();
        const islogin = user.islogin();

        if (islogin.success){
            const respones = await register.getList2(islogin.uid);
            return res.json(respones);
        } else {
            return res.json(islogin);
        }
    },
    
    getlist : async (req, res) => {
        const register = new Register(req.body);
        const user = new User();
        const islogin = user.islogin();

        if (islogin.success){
            const respones = await register.getList();
            return res.json(respones);
        } else {
            return res.json(islogin);
        }
    },
    setlist : async (req, res) => {
        const request = req.body;

        const user = new User();
        const islogin = user.islogin();

        const profile = await user.profile(islogin.uid)

        request.이름 = profile.profile.name;
        request.성별 = profile.profile.gender;
        request.UID = islogin.uid;

        const register = new Register(request);
        register.register();

        res.send(`<script type="text/javascript">
        alert("등록 성공");
        location.href="/mypage/register";
        </script>`);
    }
}

export {render, user, record, registerdata,};