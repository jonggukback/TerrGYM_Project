window.onload = ()=>{
    console.log('window.onload 호출 성공');
    const login = document.getElementById('nav-login');

    const loginOff = document.createElement('a');
    const loginOn = document.createElement('a');

    fetch('/islogin',{
        method : "POST",
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            console.log(res.profile);
            loginOn.setAttribute('href','/mypage/record');
            loginOn.setAttribute('class','btn btn-primary px-3 d-none d-lg-flex');
            loginOn.innerHTML = `마이페이지`
            login.appendChild(loginOn);
        }else {
            loginOff.setAttribute('href','/login');
            loginOff.setAttribute('class','btn btn-primary px-3 d-none d-lg-flex');
            loginOff.innerHTML = '로그인';
            login.appendChild(loginOff);
        }
    })
};

(function ($) {
    // // Initiate the wowjs
    // new WOW().init();
    // Sticky Navbar - navbar 상단에 붙이기
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.nav-bar').addClass('sticky-top');
        } else {
            $('.nav-bar').removeClass('sticky-top');
        }
    });

    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);