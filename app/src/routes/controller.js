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
}

const process = {
    login : async (req, res) => {
        const user = new User(req.body);
        const respones = await user.login();
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