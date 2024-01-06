const back = document.getElementById("back");
const next = document.getElementById("next");
const sB = document.getElementById("sB");
const search = document.getElementById("search");
const fill = document.getElementById("fill");
let table = document.getElementById('tableRoute');
let pagination = document.querySelector('.pagination');
let items = [];

let tBody = document.createElement('tbody');
let iPages = 10;            //кол-во марш на стр
let thisPage = 0;

async function getData() {
    const responce = await fetch('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd');
    const data = await responce.json();
    console.log(typeof(data.length));
    return data;
}

async function pagDraw() {
    let ii;
    const ppp = await getData();
    ii = Math.ceil(ppp.length / 10);
    let BtnB = document.createElement("button")
    BtnB.id = "back";
    BtnB.innerHTML = "Назад";
    pagination.appendChild(BtnB);

    for (let i = 1; i <= ii; i++) {
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
        item.addEventListener('click', async function () {
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
                    <button class="select-button" onclick="">Выбрать</button>
                    <div class="checkbox-list">
                        <input type="checkbox" id="checkbox1"> <label for="checkbox1">1</label><br>
                        <input type="checkbox" id="checkbox2"> <label for="checkbox2">2</label><br>
                        <input type="checkbox" id="checkbox3"> <label for="checkbox3">3</label>
                    </div>
                </td>
            </tr>`;
                tBody.innerHTML = htmlTR;
                table.appendChild(tBody);
            }
        });
    }

    BtnN.addEventListener('click', async function () {
        thisPage < ii ? thisPage++ : console.log("error");
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
                    <div class="checkbox-list">
                        <input type="checkbox" id="checkbox1"> <label for="checkbox1">1</label><br>
                        <input type="checkbox" id="checkbox2"> <label for="checkbox2">2</label><br>
                        <input type="checkbox" id="checkbox3"> <label for="checkbox3">3</label>
                    </div>
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
                    <div class="checkbox-list">
                        <input type="checkbox" id="checkbox1"> <label for="checkbox1">1</label><br>
                        <input type="checkbox" id="checkbox2"> <label for="checkbox2">2</label><br>
                        <input type="checkbox" id="checkbox3"> <label for="checkbox3">3</label>
                    </div>
                </td>
            </tr>`;
            tBody.innerHTML = htmlTR;
            table.appendChild(tBody);
        }
    })
}


pagDraw();



function searchPodstr(str, pstr) {
    let k = 0;
    let rez=[];
    for (let q = 0; q < str.length; q++) {
        k = str[q].name.indexOf(pstr);
        if (k !== -1) {

            for (let i = 0; i < pstr.length; i++) {

                if (pstr[i] != str[q].name[k+i]) {
                    break;
                }

                if((pstr[i] == str[q].name[k+i]) && (i==pstr.length-1))
                {
                    rez.push(str[q].id);
                }
            }
        }
    }
    return rez;
}

sB.onclick = function () {
    getData().then((datJ)=>{
        let DATA= []
        let zapisi= []
        let newData = searchPodstr(datJ, search.value);
        
        for(let i=0; i<newData.length; i++)
        {
            DATA.push(datJ[newData[i]-2])
        }

        thisPage = Number(this.innerHTML);
        let start = (thisPage - 1) * iPages;
        let end = start + iPages;
        console.log("start", start)
        console.log("thisPage", thisPage)
        console.log("end", end)

        DATA.length>10? zapisi = DATA.slice(start, end): 
        zapisi = DATA
        console.log("zapisi", zapisi)

        let htmlTR = "";
        for (let zapis of zapisi) {
            htmlTR += `<tr>
                <td>${zapis.name}</td> 
                <td>${zapis.description}</td> 
                <td>${zapis.mainObject}</td> 
                <td>
                    <button class="select-button" onclick="">Выбрать</button>
                    <div class="checkbox-list">
                        <input type="checkbox" id="checkbox1"> <label for="checkbox1">1</label><br>
                        <input type="checkbox" id="checkbox2"> <label for="checkbox2">2</label><br>
                        <input type="checkbox" id="checkbox3"> <label for="checkbox3">3</label>
                    </div>
                </td>
            </tr>`;
            tBody.innerHTML = htmlTR;
            table.appendChild(tBody);
        }

    })
}


