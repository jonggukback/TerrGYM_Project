"use strict";

import { User } from '../models/User.js';
import { Record } from '../models/database.js';

const render = {
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
        res.render('record/record');
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
        const profile = await user.profile(respones.uid);
        respones.profile = profile;
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
}

const record = {
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
export {render, user, record};