window.onload = ()=>{
  console.log('window.onload 호출 성공');

  fetch('/mypage/member/getprofile',{
      method : "POST",
  })
  .then((res)=>res.json())
  .then((res)=>{
      if (res.success) {
        console.log(res.profile);
        const profile = res.profile;
        name1.innerHTML = profile.name;
        email.innerHTML = profile.email;
        phone.innerHTML = profile.phone;
        adress.innerHTML = `${profile.address} ${profile.address2}`;

        Mname.value = profile.name;
        Memail.value = profile.email;
        Mphone.value = profile.phone;
        Maddress.value = profile.address;
        Maddress2.value = profile.address2;
      }else {
          alert(res.msg);
          location.href ='/login';
      }
  })
};

const name1 = document.querySelector('#name'),
        email = document.querySelector('#email'),
        phone = document.querySelector('#phone'),
        adress = document.querySelector('#address');
        
const deleteuser = document.querySelector('#delete');

deleteuser.addEventListener('click',()=>{

  if(confirm('정말 탈퇴하시겠습니까?')){
    fetch('/mypage/member/userdelete', {
      method: "POST",
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
          alert('탈퇴가 완료되었습니다. 이용해주셔서 감사했습니다.')
          location.href = "/";
        }else {
          alert('다시 시도해주세요.')
          location.reload();
        }
    })
  }else {
    alert('취소되었습니다.');
  }
})

const update = document.querySelector('#update'),
      Mname = document.querySelector('#Mname'),
      Memail = document.querySelector('#Memail'),
      Mphone = document.querySelector('#Mphone'),
      Maddress = document.querySelector('#Maddress'),
      Maddress2 = document.querySelector('#Maddress2');

update.addEventListener('click',()=>{
  const req = {
    name : Mname.value,
    email : Memail.value,
    phone : Mphone.value,
    address : Maddress.value,
    address2 : Maddress2.value
  }
  console.log(req);

  if(confirm('위와 같이 변경하시겠습니까?')){
    fetch('/mypage/member/userupdate',{
      method : 'POST',
      headers : {
          "Content-Type" : "application/json",
      },
      body: JSON.stringify(req),
      })
      .then((res)=>res.json())
      .then((res)=>{
          if (res.success) {
              alert('변경이 완료되었습니다.');
              location.reload();
          }else {
              alert(res.msg);
              location.href ='/login';
          }
      })
  }else {
    alert('취소 되었습니다.')
  }

})