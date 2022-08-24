import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { getDoc, doc, addDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

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



/* ============================== [[ 로직 시작]]===================================== */


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* ======= 클릭했을 때 모달 창에 데이터 불러오기 ========= */
//화면이 렌더링되는 것과 스크립트 처리사이에 시간차
$(document).ready(async function(){
  const params = new URLSearchParams(document.location.search);
  const id = params.get("id");
  console.log("사용자가 선택한 id : "+id);
  
  // const readModal = document.getElementById('staticBackdrop');
  // readModal.addEventListener('shown.bs.modal', async () => {

    const docRef = doc(db, "QUESTION", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // $('#staticBackdropLabel').text(docSnap.data().title);

      //$("#staticcontent").text(docSnap.data().content);
      $('.title').text(docSnap.data().title);
      $('.typeof').text(docSnap.data().type);
      $('.content').text(docSnap.data().content);
      $('.writer').text(docSnap.data().writer);
      $('.date').text(docSnap.data().date);
    } else {
      alert("No such document!");
    }
  // })

/* ============================== [[ 로직 끝]]===================================== */




/* ============================== [[ 뷰 시작]]===================================== */

/* ===== 삭제하기 ===== */
  const delbtn = document.querySelector('#delete');
  delbtn.addEventListener('click', () => {
    //console.log(1);
    const ok = confirm("정말 삭제하시겠습니까?");
    
    if ( ok ){
      deleteDoc(doc(db, "QUESTION", id))
      .then(()=>{
      console.log("사용자가 삭제를 선택한 id : "+id)
      alert("삭제었습니다.")
        location.href = "/mypage/question";
      })
      
    }else{
      alert("삭제가 취소되었습니다.");
      console.log("삭제 취소되었음");
      location.href = "/mypage/question";
      
  }
})
})
/* ============================== [[ 뷰 끝]]===================================== */
