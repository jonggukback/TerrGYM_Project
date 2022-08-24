import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { getDoc, doc, addDoc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyDync9al_o87hKg744E6_AX3WDVJQ1PCM0",
  authDomain: "testlogin-e3edb.firebaseapp.com",
  databaseURL: "https://testlogin-e3edb-default-rtdb.firebaseio.com",
  projectId: "testlogin-e3edb",
  storageBucket: "testlogin-e3edb.appspot.com",
  messagingSenderId: "793640808427",
  appId: "1:793640808427:web:ad4c4722e28e6822ab33ae",
  measurementId: "G-8CZSZ9B0BF"
};


/*==== 사이드바 js ==== */
/* global bootstrap: false */
// (() => {
//   'use strict'
//   const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//   tooltipTriggerList.forEach(tooltipTriggerEl => {
//     new bootstrap.Tooltip(tooltipTriggerEl)
//   })
// })()

/*==== 사이드바 js ==== */

/* ============================== [[ 로직 시작 ]]===================================== */

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const upload = document.querySelector('#upload'),
      title = document.querySelector('#title'),
      type = document.querySelector('#select_value'),
      content = document.querySelector('#content'),
      writer = document.querySelector('#writer'),
      date = newdate();

/*  값 입력하기 */
upload.addEventListener('click',async ()=>{

  const data = {
    title : title.value,
    type : type.value,
    writer : writer.value,
    content : content.value,
    date : newdate()
  }

  const s = "문의유형을 선택하시오.";

    /* =========빈값 체크 ===========///////////////////??*/
    if(!title.value){
      console.log("제목을 입력하세요");
      alert("제목을 입력하시오")
      title.focus();
    }
    else if(s == type.value){
      alert("문의 유형을 선택하시오");
      type.focus();
  
    }else if(!content.value){
      alert("내용을 작성하시오")
      content.focus();
    }else {
      alert('나의 문의가 등록되었습니다.')
      const docRef = addDoc(collection(db, "QUESTION"), data).then((data)=>{
        console.log(data);
        docRef.then(console.log);
        location.href="/mypage/question"
      }
      )}
    })

/* ============================== [[ 로직 끝]]===================================== */


/* ============================== [[ 뷰 시작]]===================================== */


function newdate(){
  let today = new Date();

  var hours = ('0' + today.getHours()).slice(-2); 
  var minutes = ('0' + today.getMinutes()).slice(-2);
  var seconds = ('0' + today.getSeconds()).slice(-2); 
  
  var timeString = hours + ':' + minutes  + ':' + seconds;

  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);

  let dateString = year + '-' + month  + '-' + day;
  return dateString+" ["+timeString+"]"; 
}

const cancel = document.querySelector('#cancel');
cancel.addEventListener('click',()=> {
  alert("작성 취소되었습니다.")
  location.href = "/mypage/question";
})

const reload = document.querySelector('#reload');
reload.addEventListener('click',()=>{
  location.reload();
})

/* ============================== [[ 뷰 끝]]===================================== */
