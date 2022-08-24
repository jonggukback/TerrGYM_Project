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