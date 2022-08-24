const item1 = `
<main class="items">
    <div class="text-center mt-4">
        <img class="mt-4 mb-4" src="https://cdn-icons-png.flaticon.com/512/1198/1198314.png" alt="" width="100" height="100">
    </div>

    <div class="form-floating w-75">
        <input type="email" class="form-control" id="email" placeholder="name@example.com">
        <label for="floatingInput">Email</label>
    </div>
    <div class="form-floating w-75">
        <input type="password" class="form-control" id="password" placeholder="Password">
        <label for="floatingPassword">Password</label>
    </div>
    <div class="checkbox mb-3 mt-3">
        <label>
            <input type="checkbox" value="remember-me"> Remember me
        </label>
    </div>
    <button id="login_btn" class="w-75 mb-3 btn btn-lg btn-primary" type="button">Sign-in</button>
    <button id="signup_btn" class="w-75 btn btn-lg btn-primary" type="button">Sign-up</button>
</main>
`;

const item2 = `
<main class="items">
    <div class="text-center mt-4">
        <img class="mt-4 mb-4" src="/login/image/gym.png" alt="" width="100" height="100">
    </div>
    <img class="mb-2 loginimg" src="/login/image/googlelogin.png" width="400" height="auto">
    <img class="mb-2 loginimg" src="/login/image/facebooklogin.png" width="400" height="auto">
    <img class="mb-2 loginimg" src="/login/image/githublogin.png" width="400" height="auto">
    <img class="mb-2 loginimg" src="/login/image/twitterlogin.png" width="400" height="auto">
</main>
`;

const root = document.querySelector('.root'),
    sns_login = document.querySelector('.sns-login'),
    email_login = document.querySelector('.email-login'),
    email = document.querySelector('#email'),
    pw = document.querySelector('#password'),
    login_btn = document.querySelector('#login_btn'),
    signup_btn = document.querySelector('#signup_btn');

signup_btn.addEventListener('click',()=>{
    location.href = '/signup';
})

sns_login.addEventListener('click',()=>{
    root.innerHTML = '';
    root.innerHTML = item2;
    sns_login.classList.replace('li_off', 'li_on');
    email_login.classList.replace('li_on', 'li_off');
})

email_login.addEventListener('click',()=>{
    root.innerHTML = '';
    root.innerHTML = item1;
    email_login.classList.replace('li_off', 'li_on');
    sns_login.classList.replace('li_on', 'li_off');
});

login_btn.addEventListener('click', login);

function login(){
    const req = {
        id : email.value,
        pw : pw.value,
    }

    fetch('/login',{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        console.log(res.uid);
        if (res.success) {
            alert('로그인 성공');
            location.href = '/'
        }else {
            alert(res.msg);
        }
    })
    .catch((err)=>{
        console.error(new Error('로그인 중 에러 발생!'));
    })
}