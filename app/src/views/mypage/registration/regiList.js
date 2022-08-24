window.onload = ()=>{
    console.log('window.onload 호출 성공');

    fetch('/mypage/register/getlist2',{
        method : "POST",
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            console.log(res);

            let clickId;
            let num;

            for(let key in res.list){
                const template = `
                <div class="card mb-3 mt-3 active">
                  <h5 class="card-header fs-6">${res.list[key].신청일자}</h5>
                  <div class="card-body">
                    <h5 class="card-title fw-bold">${res.list[key].강의명}</h5>
                    <p class="card-text fs-6 fw-semibold">
                      ${res.list[key].강의번호} | 강사명 : ${res.list[key].강사명} | 강의시간 : ${res.list[key].강의시간} (50분)
                    </p>
                  </div>
                </div>
                `;
                $('.list-container').append(template);
            }

            $('.card').click(function(e) {
              
                // clickId는 전역변수로 빼야 사용가능!!
                // a.id 값을 clickId에 담기
                clickId = $(this).find('.card-header').text();
                console.log(clickId);
                
                $('.card').css("border","") // 나머지는 bordr 스타일X
                $(this).css("border","3px solid #03a9f4") // 클릭한 카드만 스타일적용
              
              });

              $('#btn_cancel').unbind("click");
      
              $('#btn_cancel').bind("click",function() {
                // yes, no 확인창
                if(clickId) {
                  if(confirm("선택한 수강을 취소하시겠습니까?")) {
                        deleteRow(clickId);
                    } else {
                    // no
                    console.log("cancelled");
                    }
                }
                else {
                  alert("취소할 내역을 선택해 주세요.");
                }   
              })

        }else {
            alert(res.msg);
            location.href ='/login';
        }
    })
};

function deleteRow(clickId,num){
    // alert('삭제 성공');
    console.log(clickId);

    fetch('/mypage/register/deleteList',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({ 신청날짜 : clickId, 강의번호 : num}),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            alert(res.msg);
            location.reload();
        }else {
            alert(res.msg);
        }
    })
}