window.onload = ()=>{
    console.log('window.onload 호출 성공');

    fetch('/islogin',{
        method : "POST",
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            alert(res.msg);
            console.log(res);
        }else {
            alert(res.msg);
            location.href ='/login';
        }
    })
};

const logoutbtn = document.querySelector('#logoutbtn');

logoutbtn.addEventListener('click', ()=>{
    fetch('/islogin',{
        method : "POST",
    })
    .then(res=>res.json())
    .then((res)=>{
        if (res.success) {
            alert(res.msg);
            location.href = '/login';
        }else {
            alert(res.msg);
        }
    })
})

