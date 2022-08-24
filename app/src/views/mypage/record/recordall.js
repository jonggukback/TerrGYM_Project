window.onload = ()=>{
    console.log('window.onload 호출 성공');

    fetch('/mypage/record/getlist',{
        method : "POST",
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            console.log(res.list);

            for (let key in res.list) {
                addRow(res.list[key]);
            }

        }else {
            alert(res.msg);
            location.href ='/login';
        }
    })
};

const insert = document.querySelector('#insert'),
    date = document.querySelector('#date'),
    kg = document.querySelector('#kg'),
    bodyfatpercent = document.querySelector('#bodyfatpercent'),
    skeletalmusclemass = document.querySelector('#skeletalmusclemass'),
    BMI = document.querySelector('#BMI'),
    Exercise = document.querySelector('#Exercise'),
    Exercisetime = document.querySelector('#Exercisetime'),
    tbody = document.querySelector('#tbody');

tbody.addEventListener( 'click', (e)=>{
    const id = e.target.id;
    const date = e.target.dataset.date;
    if (id === 'delete'){
        const req = {
            doc : date,
        }
        fetch('/mypage/record/deleteRow',{
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(req),
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
});

insert.addEventListener('click', ()=>{
    req = {
        날짜 : date.value,
        체중 : kg.value,
        체지방량 : bodyfatpercent.value,
        골격근량 : skeletalmusclemass.value,
        BMI : BMI.value,
        오늘의운동 : Exercise.value,
        운동시간 : Exercisetime.value,
    }

    fetch('/mypage/record/setlist',{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            location.reload();
        }else {
            alert(res.msg);
            location.href ='/login';
        }
    })
})

function addRow(list){

    const date = list.날짜,
        exercise = list.오늘의운동,
        골격근량 = list.골격근량,
        체지방량 = list.체지방량,
        체중 = list.체중,
        BMI = list.BMI,
        운동시간 = list.운동시간;

    const addrow = `
    <tr>
        <td scope="col">${date}</td>
        <td scope="col">${exercise}</td>
        <td scope="col">${운동시간}</td>
        <td scope="col">${체중}</td>
        <td scope="col">${골격근량}</td>
        <td scope="col">${체지방량}</td>
        <td scope="col">${BMI}</td>
        <td>
            <button type="button" class="btn btn-danger btn-sm" id="delete" data-date="${date.replace(/\-/g, '')}">삭제</button>
        </td>
    </tr>
    `
    $("#tbody").append(addrow);
}


