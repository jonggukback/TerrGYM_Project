import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { getDoc, doc, addDoc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"

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
  console.log(data);

  const docRef = addDoc(collection(db, "QUESTION"), data).then((data)=>{
    alert("나의 문의가 등록었습니다.")
    history.back();
    // console.log(data);
  });
  docRef.then(console.log);
});



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

/* tbody.addEventListener('click',function(e){
  console.log(e.target);
}) */






/* document.querySelector("#delete").addEventListener('click', function() {
  db.collection('QUESTION').doc(id.get('id')).delete().then(()=>{
    alert("삭제되었습니다.");
    window.location.href = '/board.html';
  })
}) */


/* /* const del = document.querySelector('#delete'); */
/* const delete = document.querySelector('')
delete.addEventListener('click',()=>{

  }
  const QUESTION = firestore.collection("QUESTION");
  QUESTION.doc(collection(db, "QUESTION"), data).delete;

); */




/* const uploadbtn = document.querySelector('#upload');
uploadbtn.addEventListener('click',function(){
  alert("등록되었습니다.")
})
 */