"use strict";

/*============== firebase 연결 ==============*/
import { config } from '../config/config.js';
import { initializeApp } from "firebase/app";
import { getFirestore , orderBy, limit, query ,doc ,setDoc, getDoc, getDocs,collection ,deleteDoc,} from "firebase/firestore";

const firebase = initializeApp(config.firebaseConfig);
const db = getFirestore(firebase);


class Record {
    constructor(body){
        this.body = body
    }

    async getList(UID){
        // const citiesRef = collection(db, "record");
        // const docRef = doc(citiesRef, UID);
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     const list = docSnap.data();
        //     return { success:true, list : list , msg:'데이터 조회 성공'}
        // } else {
        //     return { success:false, list: null, msg:'데이터 조회 실패' }
        // }

        const docData = new Map();
        
        const q = query(collection(db, UID), orderBy("날짜", "desc"), limit(7));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            docData.set(doc.id, doc.data());
        });

        const list = Object.fromEntries(docData.entries());

        if (!list){
            return { success:false, list: null, msg:'데이터 조회 실패' }
        }else{
            return { success:true, list : list , msg:'데이터 조회 성공'}
        }
    }

    async setList(UID){
        const date = this.body.날짜.replace(/\-/g, '');
        const req = this.body;

        const Ref = doc(db, UID, date);
        const respones = await setDoc(Ref, req, { merge: true })
        .then(()=>{
            return { success :true, msg : '데이터 입력 성공' };
        })
        .catch(()=>{
            return { success :false, msg : '데이터 입력 실패'};
        })

        return respones;
    }

    async deleteRow(UID){
        const result = this.body.doc;
        // const docData = new Map();
        // docData.set(result, deleteField());
        // const obj = Object.fromEntries(docData.entries());

        // const cityRef = doc(db, 'record', UID);
        // const response = await updateDoc(cityRef, obj)
        // .then(()=>{
        //     return { success: true, msg:'삭제 성공'};
        // })
        // .catch(()=>{
        //     return { success: false, msg:'삭제 실패'};
        // })
        // return response;
        const response = await deleteDoc(doc(db, UID, result))
        .then(()=>{
            return { success: true, msg:'삭제 성공'};
        })
        .catch(()=>{
            return { success: false, msg:'삭제 실패'};
        })
        
        return response;
    }
}

export { Record };