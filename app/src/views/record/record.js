window.onload = ()=>{
    console.log('window.onload 호출 성공');

    fetch('/mypage/record/getlist',{
        method : "POST",
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            console.log(res.list);
            let num = 0;

            drawchart_kg(res.list);
            drawchart_inbody();

            for (let key in res.list) {
                addRow(res.list[key], ++num);
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

    }else if(id === 'detail'){
        console.log('상세보기 버튼');

    }
});


function addRow(list, num){

    const date = list.날짜;
    const exercise = list.오늘의운동;

    const tr = document.createElement('tr');

    const td_num = document.createElement('td');
    td_num.innerHTML = num;

    const td_date = document.createElement('td');
    td_date.innerHTML = date;

    const td_exercise = document.createElement('td');
    td_exercise.innerHTML = exercise;

    const td_btn1 = document.createElement('td');
    const button1 = document.createElement('button');
    td_btn1.appendChild(button1);
    button1.innerHTML = '상세보기'
    button1.setAttribute('type','button');
    button1.setAttribute('class','btn btn-primary');
    button1.setAttribute('id','detail');

    const td_btn2 = document.createElement('td');
    const button2 = document.createElement('button');
    td_btn2.appendChild(button2);
    button2.innerHTML = '삭제'
    button2.setAttribute('type','button');
    button2.setAttribute('class','btn btn-danger');
    button2.setAttribute('id', 'delete');
    button2.setAttribute('data-date', date.replace(/\-/g, ''));

    tr.appendChild(td_num);
    tr.appendChild(td_date);
    tr.appendChild(td_exercise);
    tr.appendChild(td_btn1);
    tr.appendChild(td_btn2);
    tbody.appendChild(tr);
}

const lineChart = document.querySelector('#line-chart');
const doughnutChart = document.querySelector('#doughnut-chart');

function drawchart_kg(list){
    const labels = [];
    const kg = [];
    const 골격근 = [];
    const 체지방 = [];

    for (let key in list) {
        kg.push(Number(list[key].체중));
        골격근.push(Number(list[key].골격근량));
        체지방.push(Number(list[key].체지방량));
        labels.push(key.substring(4));
    }

    const scalesMin = kg[0]-10;
    const scalesMax = kg[0]+10;

    const firstdate = labels[0];
    const lastdate = labels[6];
    const text = `최근 일주일 신체변화(${firstdate}~${lastdate})`;

    const data = {
        labels: labels,
        datasets: [
            {
                label: '체중',
                data: kg,
                backgroundColor:'rgba(255,0,0,0.5)',
                borderColor:'rgb(200,0,0)',
                borderWidth:1
            },
            {
                label: '골격근량',
                data: 골격근,
                backgroundColor:'rgba(0,110,255,0.5)',
                borderColor:'rgb(75,137,220)',
                borderWidth:1
            },
            {
                label: '체지방량',
                data: 체지방,
                backgroundColor:'rgba(60, 255, 0,0.5)',
                borderColor:'rgb(4, 255, 25)',
                borderWidth:1
            },
        ]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
            title: {
                display: true,
                text: text,
            }
            },
            // scales: {
            // y: {
            //     suggestedMin: scalesMin,
            //     suggestedMax: scalesMax,
            // }
            // }
        },
    };
    
    new Chart(lineChart, config);
}

function drawchart_inbody(){
    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
    };
    new Chart(doughnutChart, config);
}