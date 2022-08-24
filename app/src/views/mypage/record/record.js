window.onload = ()=>{
    console.log('window.onload 호출 성공');

    fetch('/mypage/record/getlist',{
        method : "POST",
    })
    .then((res)=>res.json())
    .then((res)=>{
        if (res.success) {
            console.log(res.list);
            list = res.list;
            drawchart_line(res.list);
            drawchart_inbody(res.list);
            drawchart_bar(res.list);

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
    tbody = document.querySelector('#tbody'),
    modaldata1 = document.querySelector('#modaldata1'),
    modaldata2 = document.querySelector('#modaldata2'),
    modaldata3 = document.querySelector('#modaldata3'),
    modaldata4 = document.querySelector('#modaldata4'),
    modaldata5 = document.querySelector('#modaldata5'),
    modaldata6 = document.querySelector('#modaldata6'),
    modaldata7 = document.querySelector('#modaldata7');

let list;

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
        console.log(list[date]);
        const modalList = list[date];
        modaldata1.innerText = modalList.날짜;
        modaldata2.innerText = modalList.오늘의운동;
        modaldata3.innerText = modalList.운동시간;
        modaldata4.innerText = modalList.체중;
        modaldata5.innerText = modalList.체지방량;
        modaldata6.innerText = modalList.골격근량;
        modaldata7.innerText = modalList.BMI;
    }
});


function addRow(list){

    const date = list.날짜;
    const exercise = list.오늘의운동;

    const tr = document.createElement('tr');

    const td_date = document.createElement('td');
    td_date.innerHTML = date;

    const td_exercise = document.createElement('td');
    td_exercise.innerHTML = exercise;

    const td_btn1 = document.createElement('td');
    const button1 = document.createElement('button');
    td_btn1.appendChild(button1);
    button1.innerHTML = '상세보기'
    button1.setAttribute('type','button');
    button1.setAttribute('class','btn btn-primary btn-sm');
    button1.setAttribute('id','detail');
    button1.setAttribute('data-date', date.replace(/\-/g, ''));
    button1.setAttribute('data-bs-toggle','modal');
    button1.setAttribute('data-bs-target','#exampleModal2');

    const td_btn2 = document.createElement('td');
    const button2 = document.createElement('button');
    td_btn2.appendChild(button2);
    button2.innerHTML = '삭제'
    button2.setAttribute('type','button');
    button2.setAttribute('class','btn btn-danger btn-sm');
    button2.setAttribute('id', 'delete');
    button2.setAttribute('data-date', date.replace(/\-/g, ''));

    tr.appendChild(td_date);
    tr.appendChild(td_exercise);
    tr.appendChild(td_btn1);
    tr.appendChild(td_btn2);
    tbody.appendChild(tr);
}

const lineChart = document.querySelector('#line-chart');
const barChart = document.querySelector('#bar-chart');
const doughnutChart = document.querySelector('#doughnut-chart');

function drawchart_line(list){
    const labels = [];
    const kg = [];

    for (let key in list) {
        kg.push(Number(list[key].체중));
        labels.push(key.substring(4));
    }

    const scalesMin = kg[0]-10;
    const scalesMax = kg[0]+10;

    const firstdate = labels[0];
    const lastdate = labels[labels.length - 1];
    const text = `최근 일주일 체중변화(${firstdate}~${lastdate})`;

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
            scales: {
                y: {
                    suggestedMin: scalesMin,
                    suggestedMax: scalesMax,
                }
            }
        },
    };
    
    new Chart(lineChart, config);
}

function drawchart_bar(list){
    const labels = [];
    const 골격근 = [];
    const 체지방 = [];

    for (let key in list) {
        골격근.push(Number(list[key].골격근량));
        체지방.push(Number(list[key].체지방량));
        labels.push(key.substring(4));
    }

    const firstdate = labels[0];
    const lastdate = labels[labels.length - 1];
    const text = `최근 일주일 신체변화(${firstdate}~${lastdate})`;

    const data = {
        labels: labels,
        datasets: [{
            label: '골격근량',
            data: 골격근,
            backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
            'rgb(255, 99, 132)',
            ],
            borderWidth: 1
        },
        {
            label: '체지방량',
            data: 체지방,
            backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
            'rgb(255, 159, 64)',
            ],
            borderWidth: 1
        }
    ]
    };

        const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        },            
        plugins: {
            title: {
                display: true,
                text:text,
            }
        },
    },
    };

    new Chart(barChart, config);
}

function drawchart_inbody(list){

    const index = Object.keys(list)
    const key = index[index.length-1];
    const text = `최근 날짜(${key.substring(2)}) 인바디`;
    const todayrecord = [];

    todayrecord.push(list[key].골격근량);
    todayrecord.push(list[key].체지방량);
    todayrecord.push(list[key].BMI);

    const data = {
        labels: [
            '골격근량',
            '체지방량',
            'BMI'
        ],
        datasets: [{
            label: 'today record',
            data: todayrecord,
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
        options: {
            plugins: {
                title: {
                    display: true,
                    text: text,
                }
            },
        }
    };
    new Chart(doughnutChart, config);
}