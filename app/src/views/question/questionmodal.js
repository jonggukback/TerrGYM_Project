import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { getDoc, doc, addDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDegzcOZjxNyw-GY8ATv97gEjHaKFs6HEQ",
          authDomain: "semi-project-7a423.firebaseapp.com",
          databaseURL: "https://semi-project-7a423-default-rtdb.asia-southeast1.firebasedatabase.app",
          projectId: "semi-project-7a423",
          storageBucket: "semi-project-7a423.appspot.com",
          messagingSenderId: "660861448017",
          appId: "1:660861448017:web:640334735d21f4977bed70"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* const questioncontent = $('#question_content');
let num = 0;

const q = query(collection(db, "QUESTION"), orderBy("작성일", "asc"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.data());
  const template = `
    <tr>
      <th scope="row">${++num}</th>
      <td><a href="./questionmodal.html?id=${doc.id}">${doc.data().제목}</a></td>
      <td>${doc.data().작성자}</td>
      <td>${doc.data().작성일}</td>
    </tr>
  `;
  questioncontent.append(template)
}) */

/* ======= 클릭했을 때 모달 창에 데이터 불러오기 ========= */
//화면이 렌더링되는 것과 스크립트 처리사이에 시간차
$(document).ready(function(){
  const params = new URLSearchParams(document.location.search);
  const id = params.get("id");
  console.log("사용자가 선택한 id : "+id);
  $('#staticBackdrop').modal("show");
  const readModal = document.getElementById('staticBackdrop');
  readModal.addEventListener('shown.bs.modal', async () => {

    const docRef = doc(db, "QUESTION", id);
    const docSnap = await getDoc(docRef);

    /* let value = document.getElementById('select_value'); */


    if (docSnap.exists()) {
      $('#staticBackdropLabel').text(docSnap.data().title);

      //$("#staticcontent").text(docSnap.data().content);
      $('.title').text(docSnap.data().title);
      $('.typeof').text(docSnap.data().type);
      $('.content').text(docSnap.data().content);
      $('.writer').text(docSnap.data().writer);
      $('.date').text(docSnap.data().date);
    } else {
      alert("No such document!");
    }
  })

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
        location.href = "./question.html";
      })
      
    }else{
      alert("삭제가 취소되었습니다.");
      console.log("삭제 취소되었음");
      location.href = "./question.html";
      
  }
})
})

// const closebtn = document.querySelector('#close');
// closebtn.addEventListener('click',function(){
//   location.href = 'http://127.0.0.1:62865/question.html';
// })


// /*  값 입력하기 */
// const  upload = document.querySelector('#upload')
// const  reload = document.querySelector('#reload'),
//        cancel = document.querySelector('#cancel'),
//          title = document.querySelector('#title'),
//      /*  type = document.querySelector('#select_value'), */
// /* const  type = document.querySelector('#typeof') */
//         type = document.querySelector('#select_value'),
//      content = document.querySelector('#content'),
//           pw = document.querySelector('#password'),
//       writer = document.querySelector('#writer'),
//         value = document.querySelector('#select_value'),
//         date = newdate();

// upload.addEventListener('click',()=>{
//   const data = {
//     title : title.value,
//     type : select_value.value,
//     date : date,
//     writer : writer.value,
//     content : content.value,
//   }
//   console.log(db);
  
//   const docRef = addDoc(collection(db, "QUESTION"), data).then(()=>{
//    location.reload();
//  }).catch( (error) => console.log(error));
//  console.log(1);
// });



// function newdate(){
//   let today = new Date();

//   var hours = ('0' + today.getHours()).slice(-2); 
//   var minutes = ('0' + today.getMinutes()).slice(-2);
//   var seconds = ('0' + today.getSeconds()).slice(-2); 
  
//   var timeString = hours + ':' + minutes  + ':' + seconds;

//   let year = today.getFullYear();
//   let month = ('0' + (today.getMonth() + 1)).slice(-2);
//   let day = ('0' + today.getDate()).slice(-2);

//   let dateString = year + '-' + month  + '-' + day;
//   return dateString+" ["+timeString+"]"; 
// }

// tbody.addEventListener('click',function(e){
//   console.log(e.target);
// })
