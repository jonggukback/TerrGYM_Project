
//////////////// 스크롤 스파이 이벤트 ///////////////////
$(function(){

    const link = $('#sidebar a.dot');
    link.on('click',function(e){
        //href 속성을 통해, section id 타겟을 잡음
        const target = $($(this).attr('href')); 

        //target section의 좌표를 통해 꼭대기로 이동
        $('html, body').animate({
            scrollTop: target.offset().top
            },700);

        //active 클래스 부여
        $(this).addClass('active');

        //앵커를 통해 이동할때, URL에 #id가 붙지 않도록 함.
        e.preventDefault();
    });

    $(window).on('scroll',function(){
        findPosition();
        });

    function findPosition(){
        $('section').each(function(){
            if( ($(this).offset().top - $(window).scrollTop() ) < 20){
                link.removeClass('active');
                $('#sidebar').find('[data-scroll="'+ $(this).attr('id') +'"]').addClass('active');
                }
            });
        }

    findPosition();
});

/////////////////////////////////////////////////


///////////////// 센터 소개 콤보박스 ////////////////
const cmbbox = document.querySelector('#select_value'); // <select>

const items = document.querySelector('.items'); // <ul>


function getValue() {
    alert(cmbbox.options[cmbbox.selectedIndex].value
        + cmbbox.options[cmbbox.selectedIndex].text);
}

function addItem() {
    const option = cmbbox.options[cmbbox.selectedIndex].text;

    const item = createItem(option); // createItem 함수
    items.appendChild(item);
}

function createItem(option) {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class','item_row');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const item_name = document.createElement('span');
    item_name.setAttribute('class','item_name');
    item_name.innerHTML = option;

    // div에 name 넣기
    item.appendChild(item_name);

    // li 태그에 div넣기 
    itemRow.appendChild(item);
}



// 셀렉트 박스에서 아이템 선택했을 때 이벤트
cmbbox.addEventListener('change', () => {
    getValue();
    });




//////////////////////////////////////////////////////////