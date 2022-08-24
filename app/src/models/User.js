"use strict";

/*============== firebase 연결 ==============*/
import { config } from '../config/config.js';
import { initializeApp } from "firebase/app";
import { getAuth, signOut , signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { doc, getDoc,setDoc, getFirestore } from "firebase/firestore";

const firebase = initializeApp(config.firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth();

class User {
    constructor(body){
        this.body = body
    }

    islogin(){
        const user = auth.currentUser;
        let userinfo = {}
        if (user === null){
            userinfo.success = false;
            userinfo.msg = "로그인 상태가 아닙니다.";
            return userinfo;
        } else {
            userinfo.success = true;
            userinfo.msg = "로그인 상태 입니다.";
            userinfo.uid = user.uid;
            return userinfo;
        }
    }
    
    async profile(uid){
        if (!uid){
            return { profile : '로그인 상태가 아닙니다.'};
        }
        const docRef = doc(db, "member", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { profile : docSnap.data() };
        } else {
            console.log("No such document!");
            return { profile : '불러오기를 실패 했습니다.'};
        }
    }

    async login(){
        const email = this.body.id;
        const password = this.body.pw;
        const respones = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return { success:true, uid: user.uid,};
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            return { success : false, msg: '로그인에 실패 했습니다.' }
        });
        return respones;
    }

    async logout(){
        const result = await signOut(auth).then(() => {
            return { success:true, msg: '로그아웃 성공'};
        }).catch((error) => {
            return { success:false, msg: '로그아웃 실패'}
        });
        return result;
    }

    async signup(){
        const email = this.body.id,
            password = this.body.pw,
            name = this.body.name,
            gender = this.body.gender,
            address = this.body.address,
            address2 = this.body.address2;

        const respones = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        }).then((user)=>{
            setDoc(doc(db, "member", user.uid), {
                address2: address2,
                address: address,
                gender: gender,
                name: name,
                email: email,
            });
            return { success:true, msg:'가입이 완료되었습니다.', }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            return { success:false, msg: '회원 가입에 실패했습니다.' }
        });
        return respones;
    }
}

export { User };