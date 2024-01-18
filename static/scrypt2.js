let table = document.getElementById('zayavkiTable');
let tBody = document.createElement('tbody');


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



function getRName(routes, Rid) {
    for (let route of routes) {
        if (route.id == Rid) return route.name
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
    orderId = selectedRow.querySelector('td:nth-child(1)').textContent;

    const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();

    document.getElementById('DeleteBtn').addEventListener('click', async function () {   
        deleteModal.hide();
        await DeleteOrders(orderId);

    });

}

async function clickBChange(event) {                               //нажатие кнопок 
    const selectedRow = event.target.closest('tr');



}







