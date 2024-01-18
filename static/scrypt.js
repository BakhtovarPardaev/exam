const sB = document.getElementById("sB");
const search = document.getElementById("search");
const fill = document.getElementById("fill");
let table = document.getElementById('tableRoute');
let pagination = document.querySelector('.pagination');
let selectB = document.getElementById('sfill')
let mmain = document.querySelector('.gidy')
let modW = document.getElementById('modalWin')
let ZbtnCancel = document.getElementById('Zcancel')
let ZbtnSend = document.getElementById('Zsend')
let tripDl = document.getElementById('Dlit')
let Ooptions = document.getElementById('Options')
let fio = document.querySelector('.FIO')
let price = document.getElementById('Price')
let Rname = document.querySelector('.rName')
let SOption = document.getElementById('Options')
let Oclass = document.querySelector('.options')
let hKol = document.getElementById('HQuan')
let alerts = document.getElementById('alerts')
let OK = document.getElementById('allOk')
let NotOk = document.getElementById('allNotOk')
let predupr = "сурдопереводчик не доступен. MAX количество 10 человек"
let RoName = {
    Rname: "",
    RId: "",
    GID: {

    },
    DGID: {

    }
}                                                    //RouteName
let items = [];
let posData = {
    id: "",
    guide_id: "",
    route_id: "",
    date: "",
    time: "",
    duration: 3,
    persons: "",
    price: 0,
    optionFirst: false,
    optionSecond: false,
    student_id: "",
}


let tBody = document.createElement('tbody');
let iPages = 10;            //кол-во марш на стр
let thisPage = 0;

async function getData() {
    try {
        const responce = await fetch('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd');
        const data = await responce.json();
        //console.log(typeof(data.length));
        return data;

    } catch (error) {
        console.log("ERROR", error)
    }
}

async function getDataGid(Rid) {
    try {
        const responce = await fetch(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${Rid}/guides?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd`);
        const data = await responce.json();
        //console.log(typeof(data.length));
        return data;
    } catch (error) {
        console.log("ERROR", error)
    }
}

async function getZayavka(Rid) {
    try {
        const responce = await fetch(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd/orders/33`);
        const data = await responce.json();
        //console.log(typeof(data.length));
        return data;

    } catch (error) {
        console.log("ERROR", error)
    }
}

async function parser() {
    let oObject = [];
    let dataq = await getData();
    let rez
    for (let i = 0; i < dataq.length; i++) {
        rez = "";

        for (let k = 0; k < dataq[i].mainObject.length; k++) {

            if (dataq[i].mainObject[k] == "-" || dataq[i].mainObject[k] == "," || dataq[i].mainObject[k] == "." || dataq[i].mainObject[k] == "n") {
                if (rez.length > 4 && rez.length < 50) {
                    oObject.push(rez);
                    rez = ""
                }
            }
            else {
                rez += dataq[i].mainObject[k];
            }
        }
    }

    return oObject;
}

async function selectBB() {
    let ggData = await parser();
    let optn = document.createElement('option');
    optn.value = 0;
    optn.text = "не выбрано";
    selectB.appendChild(optn);

    for (let i = 0; i < ggData.length; i++) {
        let optn = document.createElement('option');
        optn.value = i + 1;
        optn.text = ggData[i];
        selectB.appendChild(optn);
    }
}

selectBB();


async function pagDraw() {
    let nData;
    const oData = await getData();
    nData = Math.ceil(oData.length / 10);
    let BtnB = document.createElement("button")
    BtnB.id = "back";
    BtnB.innerHTML = "Назад";
    pagination.appendChild(BtnB);

    for (let i = 1; i <= nData; i++) {
        let li = document.createElement('li');
        li.innerHTML = i;
        pagination.appendChild(li);
        items.push(li);
    }

    let BtnN = document.createElement("button")
    BtnN.id = "next";
    BtnN.innerHTML = "Вперед";
    pagination.appendChild(BtnN);


    for (let item of items) {
        item.addEventListener('click', async function () {                    //DOM = item
            thisPage = Number(this.innerHTML);
            let start = (thisPage - 1) * iPages;
            let end = start + iPages;

            let zapisi = (await getData()).slice(start, end);

            let htmlTR = "";
            for (let zapis of zapisi) {
                htmlTR += `<tr>
                <td>${zapis.name}</td> 
                <td>${zapis.description}</td> 
                <td>${zapis.mainObject}</td> 
                <td>
                    <button class="select-button">Выбрать</button>
                </td>
            </tr>`;
                tBody.innerHTML = htmlTR;
                table.appendChild(tBody);
            }
        });
    }

    BtnN.addEventListener('click', async function () {
        thisPage < nData ? thisPage++ : console.log("error");
        let start = (thisPage - 1) * iPages;
        let end = start + iPages;

        let zapisi = (await getData()).slice(start, end);

        let htmlTR = "";
        for (let zapis of zapisi) {
            htmlTR += `<tr>
                <td>${zapis.name}</td> 
                <td>${zapis.description}</td> 
                <td>${zapis.mainObject}</td> 
                <td>
                    <button class="select-button" onclick="">Выбрать</button>
                </td>
            </tr>`;
            tBody.innerHTML = htmlTR;
            table.appendChild(tBody);
        }
    })

    BtnB.addEventListener('click', async function () {
        thisPage <= 0 ? console.log("error") : thisPage--;
        let start = (thisPage - 1) * iPages;
        let end = start + iPages;

        let zapisi = (await getData()).slice(start, end);

        let htmlTR = "";
        for (let zapis of zapisi) {
            htmlTR += `<tr>
                <td>${zapis.name}</td> 
                <td>${zapis.description}</td> 
                <td>${zapis.mainObject}</td> 
                <td>
                    <button class="select-button" onclick="">Выбрать</button>
                </td>
            </tr>`;
            tBody.innerHTML = htmlTR;
            table.appendChild(tBody);
        }
    })

    // Добавление слушателей событий для кнопок "Выбрать"
    addSlBLis();
}

async function nachP() {
    thisPage = 1;
    let start = (thisPage - 1) * iPages;
    let end = start + iPages;

    let zapisi = (await getData()).slice(start, end);

    let htmlTR = "";
    for (let zapis of zapisi) {
        htmlTR += `<tr>
                <td>${zapis.name}</td> 
                <td>${zapis.description}</td> 
                <td>${zapis.mainObject}</td> 
                <td>
                    <button class="select-button" onclick="">Выбрать</button>
                </td>
            </tr>`;
        tBody.innerHTML = htmlTR;
        table.appendChild(tBody);
    }
}

nachP();

pagDraw()

function searchPodstr(str, pstr) {
    let k = 0;
    let rez = [];
    for (let q = 0; q < str.length; q++) {
        k = str[q].name.indexOf(pstr);
        if (k !== -1) {

            for (let i = 0; i < pstr.length; i++) {

                if (pstr[i] != str[q].name[k + i]) {
                    break;
                }

                if ((pstr[i] == str[q].name[k + i]) && (i == pstr.length - 1)) {
                    rez.push(str[q].id);
                }
            }
        }
    }
    return rez;
}

function searchPodstrfull(str, pstr) {
    let k = 0;
    let rez = [];
    for (let q = 0; q < str.length; q++) {
        k = str[q].name.indexOf(pstr);
        if (k !== -1) {

            for (let i = 0; i < pstr.length; i++) {

                if (pstr[i] != str[q].name[k + i]) {
                    break;
                }

                if ((pstr[i] == str[q].name[k + i]) && (i == pstr.length - 1)) {
                    rez.push(str[q]);
                }
            }
        }
    }
    return rez;
}

sB.onclick = function () {
    thisPage = 1
    getData().then((datJ) => {
        let DATA = []
        let zapisi = []
        let newData = searchPodstr(datJ, search.value);

        for (let i = 0; i < newData.length; i++) {
            DATA.push(datJ[newData[i] - 2])
        }

        let start = (thisPage - 1) * iPages;
        let end = start + iPages;

        zapisi = DATA.slice(start, end)
        thisPage += end;

        let htmlTR = "";
        for (let zapis of zapisi) {
            htmlTR += `<tr>
                    <td>${zapis.name}</td> 
                    <td>${zapis.description}</td> 
                    <td>${zapis.mainObject}</td> 
                    <td>
                        <button class="select-button">Выбрать</button>
                    </td>
                </tr>`;
            tBody.innerHTML = htmlTR;
            table.appendChild(tBody);
        }

    })
}

function addSlBLis() {
    document.querySelectorAll('.select-button').forEach(button => {
        button.addEventListener('click', SelectBCl);
    });
}

async function SelectBCl(event) {                                //нажатие кнопки "Выбрать" M
    const selectedRow = event.target.closest('tr');
    const currentColor = selectedRow.style.backgroundColor;

    if (currentColor === 'rgb(143, 197, 248)') {
        selectedRow.style.backgroundColor = '';
        let mainHTML = ""
        mmain.innerHTML = mainHTML

        let tBody2 = document.createElement('tbody');
        let table2 = document.getElementById('tableGid');

        let htmlTR = "";
        tBody2.innerHTML = htmlTR;
        table2.appendChild(tBody2);
    } else {
        selectedRow.style.backgroundColor = 'rgb(143, 197, 248)';
        const nameV = selectedRow.querySelector('td:first-child').textContent;
        RoName.Rname = nameV;
        let strr = await getData();
        let gidID = searchPodstr(strr, nameV)
        RoName.RId = gidID[0];                                     //из-за 3, 31
        let gidData = await getDataGid(RoName.RId);
        RoName.GID = gidData


        let mainHTML = `
        <h2>Доступные гиды</h2>
        <div class="form-container2">
            
            <div class="expirience">
                <span>опыт работы</span>
                <input type="text" placeholder="От" style="width: 50px; height: 25px;">
                <input type="text" placeholder="До" style="width: 50px; height: 25px;">
            </div>
            <div class="table-container2">
                <table id="tableGid">
                    <thead>
                        <tr>
                            <th>Фото</th>
                            <th>ФИО</th>
                            <th>Язык</th>
                            <th>Опыт работы</th>
                            <th>Стоимость р/час</th>
                            <th> </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                           
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            `
        mmain.innerHTML = mainHTML

        let tBody2 = document.createElement('tbody');
        let table2 = document.getElementById('tableGid');
        console.log("dusb 1")

        thisPage = 1;
        let start = (thisPage - 1) * iPages;
        let end = start + iPages;

        let zapisi2 = gidData.slice(start, end);


        let htmlTR = "";

        for (let zap of zapisi2) {
            htmlTR += `<tr>
                <td><img src="static/image/gidPhoto.jpg" alt="gidimage" width="65px" height="55px"></td> 
                <td>${zap.name}</td> 
                <td>${zap.language}</td> 
                <td>${zap.workExperience}</td> 
                <td>${zap.pricePerHour}</td> 
                <td>
                    <button class="select-buttonGid">Выбрать</button>
                </td>
            </tr>`;
            tBody2.innerHTML = htmlTR;
            table2.appendChild(tBody2);
        }
    }
    addSlGidBLis()
}

function addSlGidBLis() {
    document.querySelectorAll('.select-buttonGid').forEach(button => {
        button.addEventListener('click', SelectBGidCl);
    });
}

async function SelectBGidCl(event) {                               //нажатие кнопки "Выбрать" G
    const selectedRow = event.target.closest('tr');
    const currentColor = selectedRow.style.backgroundColor;

    if (currentColor === 'rgb(143, 197, 248)') {
        selectedRow.style.backgroundColor = '';
    } else {
        selectedRow.style.backgroundColor = 'rgb(143, 197, 248)';
        modW.style.display = "block";
        let Gname = selectedRow.querySelector('td:nth-child(2)').textContent;

        RoName.DGID = searchPodstrfull(RoName.GID, Gname)

        fio.innerText = "ФИО Гида: " + RoName.DGID[0].name;
        Rname.innerText = "Название маршрута: " + RoName.Rname;

        tripDl.addEventListener('change', function (event) {
            posData.duration = Number(event.target.value)
            price.innerText = (Number(RoName.DGID[0].pricePerHour) * Number(event.target.value))
            price.text = (Number(RoName.DGID[0].pricePerHour) * Number(event.target.value))

        })

        SOption.addEventListener('change', function (event) {
            if (event.target.value == 0.75) {
                posData.optionSecond = 1
                posData.optionFirst = 0
            }

            if (event.target.value != 3) {
                price.innerHTML = price.text
                price.innerText = Math.ceil(Number(price.innerHTML) * event.target.value);
            }
            else {
                if (hKol.value <= 10) {
                    posData.optionFirst = 1
                    posData.optionSecond = 0
                    Oclass.lastChild.textContent == predupr ? Oclass.lastChild.textContent = "" : console.log("Ok")
                    hKol.value <= 5 ? price.innerText = Math.ceil(Number(price.innerHTML) * 1.15) : price.innerText = Math.ceil(Number(price.innerHTML) * 1.25)

                } else {
                    let i = document.createElement('p')
                    i.className = "translater"
                    i.textContent = predupr
                    Oclass.appendChild(i)
                    price.innerHTML = 0
                }
            }
            console.log("OPTfies", posData.optionFirst)
            console.log("OPTsecond", posData.optionSecond)
        })


        ZbtnCancel.onclick = function () {
            modW.style.display = "none";
            selectedRow.style.backgroundColor = '';
        }

        ZbtnSend.onclick = function () {
            modW.style.display = "none";
            selectedRow.style.backgroundColor = 'green'
            let vremya = document.getElementById('Time')
            let chislo = document.getElementById('Date')

            posData.guide_id = Number(RoName.DGID[0].id),
                posData.route_id = Number(RoName.RId),
                posData.date = chislo.value,
                posData.time = vremya.value,
                posData.persons = Number(hKol.value),
                posData.price = Number(price.text),
                posData.student_id = 25

            let formData = new URLSearchParams();
            for (const [key, value] of Object.entries(posData)) {
                formData.append(key, value);
            }

            fetch("http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/x-www-form-urlencoded"
                }),
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Успешно отправлено:", data);
                    alerts.style.display = 'block'
                    OK.style.display = 'block'
                    alerts.style.backgroundColor = 'rgb(138, 215, 138)'
                })
                .catch(error => {
                    console.error("Ошибка отправки запроса:", error);
                    alerts.style.display = 'block'
                    NotOk.style.display = 'block'
                    alerts.style.backgroundColor = 'rgb(224, 106, 129)'
                });
        }
    }
}
