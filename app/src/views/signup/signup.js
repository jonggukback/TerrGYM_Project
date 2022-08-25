const email = document.querySelector('#email'),
    pw = document.querySelector('#password'),
    pw2 = document.querySelector('#password2'),
    firstname = document.querySelector('#name'),
    gender = document.querySelector('#gender'),
    address = document.querySelector('#address'),
    address2 = document.querySelector('#detail_address'),
    phone = document.querySelector('#phone'),
    btn = document.querySelector('#signinbtn');

btn.addEventListener('click',()=>{
    if(pw.value !== pw2.value) return alert('비밀번호가 다릅니다.');

    const req = {
        id: email.value,
        pw: pw.value,
        name: firstname.value,
        gender: gender.options[gender.selectedIndex].text,
        address: address.value,
        address2: address2.value,
        phone: phone.value,
    }

    console.log(req);

    fetch("/signup", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            alert(res.msg);
            location.href = '/login';
        }else {
            alert(res.msg);
        }
    })
    .catch((err)=>{
        console.error(new Error('회원가입 중 에러 발생!'));
        alert('에러가 발생했습니다 다시 시도해주세요');
        location.reload();
    })
})