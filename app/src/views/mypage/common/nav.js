const logoutbtn = document.querySelector('#logoutbtn');

logoutbtn.addEventListener('click', ()=>{
    fetch('/logout',{
        method : "POST",
    })
    .then(res=>res.json())
    .then((res)=>{
        if (res.success) {
            alert(res.msg);
            location.href = '/';
        }else {
            alert(res.msg);
        }
    })
})