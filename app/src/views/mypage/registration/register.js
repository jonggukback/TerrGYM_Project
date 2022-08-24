window.onload = ()=>{
    console.log('window.onload 호출 성공');

    fetch('/mypage/register/getlist',{
        method : "POST",
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            console.log(res.list);

            // modalList(res.list);

            let count = 0;

            for(let key in res.list){
                ++count
                const template = `
                <tr>
                  <td>${res.list[key].강의번호}</td>
                  <td colspan="3">
                    <div id="classname" data-bs-toggle="modal" data-bs-target="#exampleModal${count}">
                      ${res.list[key].강의명}
                    </div>
                  </td>
                  <td>${res.list[key].강사명}</td>
                  <td>${res.list[key].강의시간}</td>
                  <td>${res.list[key].신청인원}</td>
                  <td>${res.list[key].제한인원}</td>
                </tr>
                `;

                const modal = `
                <div class="modal fade" id="exampleModal${count}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                      <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">수강 신청</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <form method="post" action="/mypage/register/setlist">
                      <input type=hidden name="강의번호" value="${res.list[key].강의번호}">
                      <input type=hidden name="강의명" value="${res.list[key].강의명}">
                      <input type=hidden name="강사명" value="${res.list[key].강사명}">
                      <input type=hidden name="강의분류" value="GX">
                      <input type=hidden name="강의시간" value="${res.list[key].강의시간}">
                      <input type=hidden name="신청일자" value="${new Date()}">
                        <div class="modal-body">
                          <fieldset>
                            <img src="${res.list[key].이미지}" class="img-thumbnail" alt="...">
                            <legend class="classname mt-3 fs-2"></legend>
                            <div class="mb-3">
                              <label for="disabledTextInput" class="form-label fw-light fs-6 ps-2">강의번호</label>
                              <div class="classnum text-dark shadow rounded fs-5 ps-2 mb-3">${res.list[key].강의번호}</div>

                              <label for="disabledTextInput" class="form-label fw-light fs-6 ps-2">강의명</label>
                              <div class="classname text-dark shadow rounded fs-5 ps-2 mb-3">${res.list[key].강의명}</div>
                              
                              <label for="disabledTextInput" class="form-label fw-light fs-6 ps-2">강사명</label>
                              <div id="teacher" class="text-dark shadow rounded fs-5 ps-2 mb-3">${res.list[key].강사명}</div>
                              
                              <label for="disabledTextInput" class="form-label fw-light fs-6 ps-2">강의시간</label>
                              <div class="classtime text-dark shadow rounded fs-5 ps-2 mb-3">${res.list[key].강의시간}</div>
                            </div>
                          </fieldset>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                          <button id="insert" type="submit" class="btn btn-primary">신청하기</button>
                        </div>
                      </form>
                  </div>
                </div>
                </div>
                `
                $('#modal').append(modal)
                $('.class-content').append(template)
            }

        }else {
            alert(res.msg);
            location.href ='/login';
        }
    })
};