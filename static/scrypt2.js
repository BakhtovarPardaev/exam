let table = document.getElementById('zayavkiTable');
let tBody = document.createElement('tbody');
let posData2 = {
    date: "",
    time: "",
    duration: 3,
    persons: "",
    price: 0,
    optionFirst: 0,
    optionSecond: 0,
}

/*async function getDataOrders() {
    try {
        const responce = await fetch('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd', {
            method: 'GET'
        });
        
        const data = await responce.json();
        return data;
        
    } catch {
        console.error('Error in getDataOrders:');
    }
}

async function getDataRoutes() {
    try {
        const responce = await fetch('http://exam-2023-1-api.std.900.ist.mospolytech.ru/api/routes?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd', {
            method: 'POST'
        });
        const data = await responce.json();
        return data;
    } catch {
        console.error('Error in getDataRoutes:');
    }
}

async function DeleteOrders(oId) {
    try {
        const responce = await fetch(`http://exam-2023-1-api.std.900.ist.mospolytech.ru/api/orders/${oId}?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd`, {
            method: 'DELETE'
        });
        const data = await responce.json();
        return data;

    } catch {
        console.error('Error in DeleteOrders:');
    }
}

async function getOrders(oId) {
    try {
        const responce = await fetch(`http://exam-2023-1-api.std.900.ist.mospolytech.ru/api/orders/${oId}?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd`, {
            method: 'GET'
        });
        
        const data = await responce.json();
        return data;

    } catch {
        console.error('Error in getOrders:');
    }
}

async function getGide(oId) {
    try {
        const responce = await fetch(`http://exam-2023-1-api.std.900.ist.mospolytech.ru/api/guides/${oId}?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd`, {
            method: 'GET'
        });
        const data = await responce.json();
        return data;

    } catch {
        console.error('Error in getGide:');
    }
}*/

async function getDataOrders() {
    const responce = await fetch('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd');
    const data = await responce.json();
    return data;
}

async function getDataRoutes() {
    const responce = await fetch('http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd');
    const data = await responce.json();
    return data;
}

async function DeleteOrders(oId) {
    const responce = await fetch(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders/${oId}?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd`, {
        method: 'DELETE'
    });
    const data = await responce.json();
    return data;
}

async function getOrders(oId) {
    const responce = await fetch(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders/${oId}?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd`, {
        method: 'GET'
    });
    const data = await responce.json();
    return data;
}

async function getGide(oId) {
    const responce = await fetch(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/guides/${oId}?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd`, {
        method: 'GET'
    });
    const data = await responce.json();
    return data;
}

function getRName(routes, Rid) {
    for (let route of routes) {
        if (route.id == Rid) return route.name
    }
}

function getGName(gids, Gid) {
    for (let gid of gids) {
        if (gid.id == Gid) return gid.name
    }
}

function getGName(gids, Gid) {
    for (let gid of gids) {
        if (gid.id == Gid) return gid.name
    }
}

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

async function ordersDraw() {
    const orders = await getDataOrders();
    const routes = await getDataRoutes();
    let htmlTR = "";
    for (let z = 0; z < orders.length; z++) {
        htmlTR += `<tr>
                <td>${orders[z].id}</td> 
                <td>${getRName(routes, orders[z].route_id)}</td> 
                <td>${orders[z].date}</td> 
                <td>${orders[z].price}</td> 
                <td>
                    <span>  
                        <button class="seeButton"><img src="static/image/eye.png" width="15px" height="15px" ></button> 
                        <button class="changeButton"><img src="static/image/change.png" width="15px" height="15px" ></button>
                        <button class="trashButton"><img src="static/image/trashcan.png" width="25px" height="15px" ></button>
                    </span> 
                </td>
            </tr>`;
        tBody.innerHTML = htmlTR;
        table.appendChild(tBody);
    }
    seeBLis()
    changeBLis()
    trashBLis()
}

ordersDraw()

function seeBLis() {
    document.querySelectorAll('.seeButton').forEach(button => {
        button.addEventListener('click', clickBSee);
    });
}

function changeBLis() {
    document.querySelectorAll('.changeButton').forEach(button => {
        button.addEventListener('click', clickBChange);
    });
}

function trashBLis() {
    document.querySelectorAll('.trashButton').forEach(button => {
        button.addEventListener('click', clickBDelete);
    });
}

function okonchanie(kol) {
    if (kol == 1)
        return kol + ' час'
    else
        return kol + ' часа'
}

function Opcii(order) {
    if (order.optionFirst) return "Сурдопереводчик:"
    if (order.optionSecond) return "Скидка пенсионерам:"
}

function detaliOpcii(opciya, Hkol) {
    if (opciya == 'Сурдопереводчик:') {
        if (Hkol <= 5)
            return "Наценка 15%"
        else
            return "Наценка 25%"
    }
    else if (opciya == 'Скидка пенсионерам:') return "Скиндка 25%"
    else return "errrrror"
}

async function clickBDelete(event) {                            //нажатие кнопок 
    const selectedRow = event.target.closest('tr');
    orderId = selectedRow.querySelector('td:nth-child(1)').textContent;

    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();

    document.getElementById('DeleteBtn').addEventListener('click', async function () {
        deleteModal.hide();
        await DeleteOrders(orderId);

    });
}

async function clickBSee(event) {                               //нажатие кнопок 
    const selectedRow = event.target.closest('tr');
    OrId = selectedRow.querySelector('td:nth-child(1)').textContent;
    nname = selectedRow.querySelector('td:nth-child(2)').textContent;
    OrderDate = selectedRow.querySelector('td:nth-child(3)').textContent;
    OrderPrice = selectedRow.querySelector('td:nth-child(4)').textContent;

    const deleteModal = new bootstrap.Modal(document.getElementById('seeOrders'));
    const order = await getOrders(OrId);
    const gidInfo = await getGide(order.guide_id)

    const Gid = document.getElementById('selGid')
    const Route = document.getElementById('selRoute')
    const date = document.getElementById('seldate')
    const Nachalo = document.getElementById('selNachalo')
    const Duration = document.getElementById('selDuration')
    const HQuantity = document.getElementById('selHQuantity')
    const Prace = document.getElementById('TotPrace')
    const options = document.getElementById('Options')
    const optDet = document.getElementById('OptDetail')

    Gid.innerHTML = `${gidInfo.name}`
    Route.innerHTML = `${nname}`
    date.innerHTML = `${OrderDate}`
    Nachalo.innerHTML = `${order.time}`
    Duration.innerHTML = `${okonchanie(order.duration)}`
    HQuantity.innerHTML = `${order.persons}`
    options.innerHTML = `${Opcii(order)}`
    optDet.innerHTML = `${detaliOpcii(Opcii(order), order.persons)}`
    Prace.innerHTML = `${OrderPrice}`

    deleteModal.show();

}

async function clickBChange(event) {                               //нажатие кнопок 
    const selectedRow = event.target.closest('tr');
    OrId = selectedRow.querySelector('td:nth-child(1)').textContent;
    nname = selectedRow.querySelector('td:nth-child(2)').textContent;
    OrderDate = selectedRow.querySelector('td:nth-child(3)').textContent;
    OrderPrice = selectedRow.querySelector('td:nth-child(4)').textContent;

    const ChangModal = new bootstrap.Modal(document.getElementById('changeOrders'));
    const order = await getOrders(OrId);
    const gidInfo = await getGide(order.guide_id)

    const Gid = document.getElementById('FIO')
    const Route = document.getElementById('RouteN')
    const date = document.getElementById('newChislo')
    const Nachalo = document.getElementById('newTime')
    const Duration = document.getElementById('durationSelect')
    const HQuantity = document.getElementById('Hkolich')
    const options = document.getElementById('OPT')
    const SendButton = document.getElementById('submitBtnModal')

    const Prace = document.getElementById('Tprice')

    function calculate() {
        let rez
        rez = (Number(gidInfo.pricePerHour) * Number(Duration.value))

        options.addEventListener('change', function pprice() {
            if (options.value == 1) {
                if (HQuantity.value <= 10) {
                    posData2.optionFirst = 1
                    if (HQuantity.value <= 5)
                        Prace.innerHTML = Math.ceil(rez * 1.15)
                    else
                        Prace.innerHTML = Math.ceil(rez * 1.25)
                }
                else {
                    console.log("Количество людей больше 10")
                }
            }

            else if (options.value == 2) {
                posData2.optionSecond = 1
                Prace.innerHTML = Math.ceil(rez * 0.75)
            }
            else
                Prace.innerHTML = rez
        })

    }

    Gid.innerHTML = `${gidInfo.name}`
    Route.innerHTML = `${nname}`
    calculate()

    SendButton.addEventListener('click', function send() {
        posData2.date = date.value,
            posData2.time = Nachalo.value,
            posData2.persons = Number(HQuantity.value),
            posData2.duration = Number(Duration.value)
            posData2.price= Number(Prace.innerHTML)

        let formData = new URLSearchParams();
        for (const [key, value] of Object.entries(posData2)) {
            formData.append(key, value);
        }

        fetch(`http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders/${OrId}?api_key=e228b9a7-e4f8-4fc7-8b70-0974917b46fd`, {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded"
            }),
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log("Успешно отправлено:", data);
                // alerts.style.display = 'block'
                // OK.style.display = 'block'
                // alerts.style.backgroundColor = 'rgb(138, 215, 138)'
            })
            .catch(error => {
                console.error("Ошибка отправки запроса:", error);
                // alerts.style.display = 'block'
                // NotOk.style.display = 'block'
                // alerts.style.backgroundColor = 'rgb(224, 106, 129)'
            });
            ChangModal.hide();
    })
    ChangModal.show();
}







