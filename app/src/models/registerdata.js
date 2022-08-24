"use strict";

/*============== firebase 연결 ==============*/
import { config } from '../config/config.js';
import { initializeApp } from "firebase/app";
import { getFirestore , orderBy, limit, query ,doc ,setDoc, getDoc, getDocs,collection ,updateDoc,addDoc,where,deleteDoc} from "firebase/firestore";


const firebase = initializeApp(config.firebaseConfig);
const db = getFirestore(firebase);

class Register {
    constructor(body){
        this.body = body
    }

    async deleteList(){
        const request = this.body.신청날짜;
        let id;
        let num;

        

        const q = query(collection(db, "myclass"), where("신청일자", "==", request));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            id = doc.id;
            num = doc.data().강의번호;
        });

        const result = await deleteDoc(doc(db, "myclass", id)).then(()=>{
            return { success: true, msg : "삭제 성공" }
        }).catch(()=>{
            return { success: false, msg : "삭제 실패" }
        })

        this.deletenum(num);

        return result;
    }

    async register(){
        const obj = this.body;
        const num = obj.강의번호;
        await addDoc(collection(db, "myclass"), obj);
        this.addnum(num);
    }

    async getList2(UID){
        const docData = new Map();

        const q = query(collection(db, "myclass"), where("UID", "==", UID));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docData.set(doc.data().강의번호, doc.data());
        });

        const list = Object.fromEntries(docData.entries());

        if (!list){
            return { success:false, list: null, msg:'데이터 조회 실패' }
        }else{
            return { success:true, list : list , msg:'데이터 조회 성공'}
        }
    }
    
    async getList(){

        const docData = new Map();

        const q = query(collection(db, "center_gangnam"),orderBy("강의번호", "asc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docData.set(doc.data().강의번호, doc.data());
        });

        const list = Object.fromEntries(docData.entries());

        if (!list){
            return { success:false, list: null, msg:'데이터 조회 실패' }
        }else{
            return { success:true, list : list , msg:'데이터 조회 성공'}
        }
    }

    async addnum(num){
        let id;
        let count;
        
        const q = query(collection(db, "center_gangnam"), where("강의번호", "==", num));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            id = doc.id;
            count = doc.data().신청인원;
        });

        const washingtonRef = doc(db, "center_gangnam", id);
        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
            신청인원 : count+1
        });
    }

    async deletenum(num){
        let 강의번호 = num;
        let id;
        let count;

        const q2 = query(collection(db, "center_gangnam"), where("강의번호", "==", 강의번호));
        const querySnapshot2 = await getDocs(q2);
        querySnapshot2.forEach((doc) => {
            id = doc.id;
            count = doc.data().신청인원;
        });

        if (count > 0){
            const washingtonRef = doc(db, "center_gangnam", id);
            // Set the "capital" field of the city 'DC'
            await updateDoc(washingtonRef, {
                신청인원 : count-1
            });
        }
    }
}

export { Register };