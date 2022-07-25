"use strict";

import { async } from '@firebase/util';
import { User } from '../models/User.js';

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
}

const process = {
    login : async (req, res) => {
        const user = new User(req.body);
        const respones = await user.login();
        console.log(respones);
        return res.json(respones);
    },
    islogin : async (req,res)=>{
        const user = new User();
        const respones = user.islogin();
        const uid = respones.uid;
        const profile = await user.profile(respones.uid);
        respones.profile = profile;
        console.log(respones);
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
export {render, process};