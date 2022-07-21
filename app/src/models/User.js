"use strict";

/*============== firebase 연결 ==============*/
import { config } from '../config/config.js';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { doc, getDoc,setDoc, getFirestore } from "firebase/firestore";

const firebase = initializeApp(config.firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth();

class User {
    constructor(body){
        this.body = body
    }

    profile(uid){
        const docRef = doc(db, "member", uid);
        const docSnap = getDoc(docRef);

        if (docSnap.exists()) {
            return { success : true, profile:docSnap.data(), };
        } else {
            console.log("No such document!");
            return { success : false, msg: '불러오기를 실패 했습니다.'};
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