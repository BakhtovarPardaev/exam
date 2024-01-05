const back = document.getElementById("back");
const next = document.getElementById("next");
const search = document.getElementById("search");
const fill = document.getElementById("fill");
let table = document.getElementById("table");

async function getData(){
    const dannie = await fetch("");
    const data = await dannie.json();
    return data;
}


next.onclick = function(){
    table=table.insertAdjacentHTML("beforeend", `<table id="tableRoute">
    <thead>
        <tr>
            <th>Название1</th>
            <th>Описание1</th>
            <th>Объекты1</th>
            <th>Достопримечательности1</th>
        </tr>
    </thead>

    <tbody>
        <tr>
            <td>Новичек1</td>
            <td>Для новичков1</td>
            <td>Красная площадь1</td>
            <td>
                <button class="select-button" onclick="">Выбрать1</button>
                <div class="checkbox-list">
                    <input type="checkbox" id="checkbox1"> <label for="checkbox1">1</label><br>
                    <input type="checkbox" id="checkbox2"> <label for="checkbox2">2</label><br>
                    <input type="checkbox" id="checkbox3"> <label for="checkbox3">3</label>
                </div>
            </td>
        </tr>

        <tr>
            <td>почти новичек1</td>
            <td>Для почти новичков1</td>
            <td>Красная площадь и москва сити1</td>
            <td>
                <button class="select-button" onclick="">Выбрать1</button>
                <div class="checkbox-list">
                    <input type="checkbox" id="checkbox1"> <label for="checkbox1">1</label><br>
                    <input type="checkbox" id="checkbox2"> <label for="checkbox2">2</label><br>
                    <input type="checkbox" id="checkbox3"> <label for="checkbox3">3</label>
                </div>
            </td>
        </tr>
    </tbody>
</table>` )

}

search.oninput = function(){
    console.log("Pidr" + search.value);
}

console.log(search.id);
