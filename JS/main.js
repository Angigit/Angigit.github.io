//Keys of cards
let keys = ["id", "Megnevezés1", "Nyelv1", "Megnevezés2", "Nyelv2", "Témakör"];
let index = 0;

//Get data from the server.
function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin"
    };
    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    );
}

function getPreviousCard() {
    getServerData("https://my-json-server.typicode.com/angigit/angigit.github.io/cards").then(
        data => {
            previousCardBody(data, "cardBody")
        }
    );
}

let cardTitle = document.querySelector("#cardTitle");
let cardsubTitle = document.querySelector("#subtitle1");
let cardTitle2 = document.querySelector("#cardTitle2");
let cardsubTitle2 = document.querySelector("#subtitle2");
let theme = document.querySelector("#theme");

function previousCardBody(data, cardID) {
    let card = document.querySelector(`#${cardID}`);
    if (!card) {
        console.error(`Card "${cardID}" is not found.`);
        return;
    }
    //let keys = ["id", "megnev1", "nyelv1", "megnev2", "nyelv2", "tema"];
    if (index > 0) {
        index--;
        cardTitle.innerHTML = data[index][keys[1]];
        cardsubTitle.innerHTML = data[index][keys[2]];
        cardTitle2.innerHTML = data[index][keys[3]];
        cardsubTitle2.innerHTML = data[index][keys[4]];
        
        //Change fontcolor
        switch (data[index][keys[5]]) {
            case "Bemutatkozás": theme.innerHTML = data[index][keys[5]].fontcolor("maroon");
                break;
            case "Otthon": theme.innerHTML = data[index][keys[5]].fontcolor("purple");
                break;
            case "Munkahely": theme.innerHTML = data[index][keys[5]].fontcolor("green");
                break;
            case "Iskola": theme.innerHTML = data[index][keys[5]].fontcolor("blue");
                break;
            case "Étterem": theme.innerHTML = data[index][keys[5]].fontcolor("olive");
                break;
            case "Utazás": theme.innerHTML = data[index][keys[5]].fontcolor("orange");
                break;
            case "Orvosnál": theme.innerHTML = data[index][keys[5]].fontcolor("red");
                break;
            case "Vásárlás": theme.innerHTML = data[index][keys[5]].fontcolor("hotpink");
                break;
            case "Állatok": theme.innerHTML = data[index][keys[5]].fontcolor("skyblue");
                break;
            case "Színek": theme.innerHTML = data[index][keys[5]].fontcolor("coral");
                break;
            case "Számok": theme.innerHTML = data[index][keys[5]].fontcolor("skyblue");
                break;
            default: theme.innerHTML = data[index][keys[5]].fontcolor("white");
        }
    }
    console.log(data[index][keys[1]]);
}

function getNextCard() {
    getServerData("https://my-json-server.typicode.com/angigit/angigit.github.io/cards").then(
        data => {
            nextCardBody(data, "cardBody")
        }
    );
}

function nextCardBody(data, cardID) {
    let card = document.querySelector(`#${cardID}`);
    if (!card) {
        console.error(`Card "${cardID}" is not found.`);
        return;
    }

    //let keys = ["id", "megnev1", "nyelv1", "megnev2", "nyelv2", "tema"];
    if (index < data.length) {
        index++;
        cardTitle.innerHTML = data[index][keys[1]];
        cardsubTitle.innerHTML = data[index][keys[2]];
        cardTitle2.innerHTML = data[index][keys[3]];
        cardsubTitle2.innerHTML = data[index][keys[4]];
        
        //Change fontcolor
        switch (data[index][keys[5]]) {
            case "Bemutatkozás": theme.innerHTML = data[index][keys[5]].fontcolor("maroon");
                break;
            case "Otthon": theme.innerHTML = data[index][keys[5]].fontcolor("purple");
                break;
            case "Munkahely": theme.innerHTML = data[index][keys[5]].fontcolor("green");
                break;
            case "Iskola": theme.innerHTML = data[index][keys[5]].fontcolor("blue");
                break;
            case "Étterem": theme.innerHTML = data[index][keys[5]].fontcolor("olive");
                break;
            case "Utazás": theme.innerHTML = data[index][keys[5]].fontcolor("orange");
                break;
            case "Orvosnál": theme.innerHTML = data[index][keys[5]].fontcolor("red");
                break;
            case "Vásárlás": theme.innerHTML = data[index][keys[5]].fontcolor("hotpink");
                break;
            case "Állatok": theme.innerHTML = data[index][keys[5]].fontcolor("skyblue");
                break;
            case "Színek": theme.innerHTML = data[index][keys[5]].fontcolor("coral");
                break;
            case "Számok": theme.innerHTML = data[index][keys[5]].fontcolor("skyblue");
                break;
            default: theme.innerHTML = data[index][keys[5]].fontcolor("white");
        }
    }
    console.log(data[index][keys[1]]);
}

function getDataToPDF() {
    getServerData("https://my-json-server.typicode.com/angigit/angigit.github.io/cards").then(
        data => {
            exportToPDF(data, "cardsTable")
        }
    );
}

//Export data into PDF
function exportToPDF(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}" is not found.`);
        return;
    }

    const pdfDocGenerator = pdfMake.createPdf(dd);
    var dd = {
        content: [],
        styles: {
            f18: {
                fontSize: 18
            },
            strong: {
                bold: true
            }
        },
    }

    dd.content.push({ text: 'Lista', style: ['f18', 'strong'] });
    for (let row of data) {
        dd.content.push({ columns: [{ text: row }] });
        dd.content.push(' ');
        for (let k of keys) {
            dd.content.push({ columns: [{ text: k, bold: true }, { text: row[k] }] });
            //dd.content.push(' ');
        }
    }

    pdfMake.createPdf(dd).open();
    //pdfMake.createPdf(docDefinition).download();
}

function getCards() {
    getServerData("https://my-json-server.typicode.com/angigit/angigit.github.io/cards").then(
        data => fillDataTable(data, "cardsTable")
    );
}

//Fill table with server data
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`); 
    if (!table) {
        console.error(`Table "${tableID}" is not found.`);
        return;
    }

    //Add new row to the table
    let tBody = table.querySelector("tbody"); 
    tBody.innerHTML = '';
    for (let row of data) { 
        let tr = createAnyElement("tr");
        for (let k of keys) {
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            tr.appendChild(td);
        }
        tBody.appendChild(tr);
    }
}

//Létrehozunk egy függvényt, amivel bármilyen html elemet le tudunk gyártani.
function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

function getFilteredCards() {
    getServerData("https://my-json-server.typicode.com/angigit/angigit.github.io/cards").then(
        data => filterTable(data, "cardsTable")
    );
}

//Filter table
function filterTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);
    if (!table) {
        console.error(`Table "${tableID}" is not found.`);
        return;
    }

    let filter, txtValue;
    let searchInput = document.getElementById("listInput");
    filter = searchInput.value.toUpperCase();
    let tBody = table.querySelector("tbody");
    tBody.innerHTML = '';

    for (let row of data) { 
        let tr = createAnyElement("tr");
        for (let k of keys) {
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            if (td) {
                txtValue = td.textContext || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {

                    tr.appendChild(td);
                } else {
                    console.log("Nincs találat!");
                }
            }
            tBody.appendChild(tr);
        }
    }
}

//Create new card - Össze kell szedni az adatokat az input-okból
function createCard() {
    let data = getFormData();
    delete data.id;  //hogy ne adjon hozzá új id-t, mert a json szerver figyeli és automatikusan létrehozza az új id-t.

    //felparaméterezzük a fetch-et (plusz két paraméter: headers és body)
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    //elindítjuk a fetch-et a szerver felé
    //https://my-json-server.typicode.com/<your-username>/<your-repo>
    fetch("https://my-json-server.typicode.com/angigit/angigit.github.io/cards", fetchOptions).then(
        resp => resp.json(),  //kapunk egy json választ
        err => console.error(err)
    ).then(
        data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          }
    );
    //console.log(data);
}

function getFormData() {
    let form = document.querySelector("#cardForm");
    let inputs = form.querySelectorAll("input.form-control"); //meg kell keresni benne az összes input-ot
    let selects = form.querySelectorAll("select.form-control"); //és az összes select-et
    let data = {};
    let i, j;

    //ki kell belőlük olvasni az adatokat
    for (i = 0; i < inputs.length; i++) {
        for (j = 0; j < selects.length; j++) {
            //és az input nevével ellátva kell belőlük készíteni kulcs-érték párokkal egy objektumot
            data[inputs[i].name] = inputs[i].value;
            data[selects[j].name] = selects[j].value;
        }
    }
    return data;
}

function getCardsAfterDelete() {
    getServerData("https://my-json-server.typicode.com/angigit/angigit.github.io/cards").then(
        data => fillDataTable2(data, "cardsTable")
    );
}

//Fill table with server data
function fillDataTable2(data, tableID) {
    let table = document.querySelector(`#${tableID}`); 
    if (!table) {
        console.error(`Table "${tableID}" is not found.`);
        return;
    }

    //Add new row to the table
    let tBody = table.querySelector("tbody");
    tBody.innerHTML = '';
    for (let row of data) { 
        let tr = createAnyElement("tr");
        for (let k of keys) {
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            tr.appendChild(td);
        }
        //Add delete button to the row
        let btnGroup = createBtnGroup();
        tr.appendChild(btnGroup);
        tBody.appendChild(tr);
    }
}

//Create delete button
function createBtnGroup() {
    let group = createAnyElement("div", { class: "btn btn-group" });
    let delBtn = createAnyElement("button", { class: "btn btn-danger", onclick: "delCard(this)" });
    delBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';

    group.appendChild(delBtn);

    let td = createAnyElement("td");
    td.appendChild(group);
    return td;
}

//Delete card
function delCard(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let id = tr.querySelector("td:first-child").innerHTML;

    //megadjuk a fetch beállítást
    let fetchOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
    };

    //majd elindítjuk a fetch-et a szerver felé
    //a fetchOption-ből fogja tudni a szerver, hogy ez egy delete lesz.
    if (confirm("Biztosan törli a kártyát?")) {
        fetch(`https://my-json-server.typicode.com/angigit/angigit.github.io/cards/${id}`, fetchOptions).then(
            resp => resp.json(),
            err => console.log(err)
        ).then(
            data => {
                getCardsAfterDelete();
            }
        );
    }
}

//Checking test results
function checkTest1() {
    /* for (let j = 0; j < checks.length; j++) {
        checks[j].innerHTML = " Helyes válasz!";
        checks[j].style.display = "inline";
    }
    for (let l = 0; l < closes.length; l++) {
        closes[l].style.display = "inline";
    } */
    let checks = document.querySelectorAll("#test1 h1.fa.fa-check");
    let closes = document.querySelectorAll("#test1 h1.fa.fa-close");
    let radioChecked = document.querySelectorAll('#test1 input[type="radio"]:checked');
    //quetsion 1
    for (let i = 0; i < radioChecked.length; i++) {
        let radio1 = document.getElementById("radio1");
        if (radio1.checked) {
            checks[0].innerHTML = " Helyes válasz!";
            checks[0].style.display = "inline";
        } else if (radioChecked[i].value == "airplanes") {
            closes[0].style.display = "inline";
            closes2[0].style.display = "inline";
        } else if (radioChecked[i].value == "airplane") {
            closes[1].style.display = "inline";
            closes2[1].style.display = "inline";
        } else if (radioChecked[i].value == "the airplanes") {
            closes[2].style.display = "inline";
            closes2[2].style.display = "inline";
        }
        //quetsion 2
        let radio2 = document.getElementById("radio2");
        if (radio2.checked) {
            checks[1].innerHTML = " Helyes válasz!";
            checks[1].style.display = "inline";
        } else if (radioChecked[i].value == "She is") {
            closes[3].style.display = "inline";
        } else if (radioChecked[i].value == "You are") {
            closes[4].style.display = "inline";
        } else if (radioChecked[i].value == "Are their") {
            closes[5].style.display = "inline";
        }
        //quetsion 3
        let radio3 = document.getElementById("radio3");
        if (radio3.checked) {
            checks[2].innerHTML = " Helyes válasz!";
            checks[2].style.display = "inline";
        } else if (radioChecked[i].value == "his friends") {
            closes[6].style.display = "inline";
        } else if (radioChecked[i].value == "our boyfriend") {
            closes[7].style.display = "inline";
        } else if (radioChecked[i].value == "our friends") {
            closes[8].style.display = "inline";
        }
        //quetsion 4
        let radio4 = document.getElementById("radio4");
        if (radio4.checked) {
            checks[3].innerHTML = " Helyes válasz!";
            checks[3].style.display = "inline";
        } else if (radioChecked[i].value == "was") {
            closes[9].style.display = "inline";
        } else if (radioChecked[i].value == "have got") {
            closes[10].style.display = "inline";
        } else if (radioChecked[i].value == "have") {
            closes[11].style.display = "inline";
        }
        //quetsion 5
        let radio5 = document.getElementById("radio5");
        if (radio5.checked) {
            checks[4].innerHTML = " Helyes válasz!";
            checks[4].style.display = "inline";
        } else if (radioChecked[i].value == "am") {
            closes[12].style.display = "inline";
        } else if (radioChecked[i].value == "are") {
            closes[13].style.display = "inline";
        } else if (radioChecked[i].value == "aren't") {
            closes[14].style.display = "inline";
        }
        //question 6
        let radio6 = document.getElementById("radio6");
        if (radio6.checked) {
            checks[5].innerHTML = " Helyes válasz!";
            checks[5].style.display = "inline";
        } else if (radioChecked[i].value == "our") {
            closes[15].style.display = "inline";
        } else if (radioChecked[i].value == "live") {
            closes[16].style.display = "inline";
        } else if (radioChecked[i].value == "come from") {
            closes[17].style.display = "inline";
        }
        //quetsion 7
        let radio7 = document.getElementById("radio7");
        if (radio7.checked) {
            checks[6].innerHTML = " Helyes válasz!";
            checks[6].style.display = "inline";
        } else if (radioChecked[i].value == "They are") {
            closes[18].style.display = "inline";
        } else if (radioChecked[i].value == "There is") {
            closes[19].style.display = "inline";
        } else if (radioChecked[i].value == "There's") {
            closes[20].style.display = "inline";
        }
        //quetsion 8
        let radio8 = document.getElementById("radio8");
        if (radio8.checked) {
            checks[7].innerHTML = " Helyes válasz!";
            checks[7].style.display = "inline";
        } else if (radioChecked[i].value == "an apple") {
            closes[21].style.display = "inline";
        } else if (radioChecked[i].value == "a apple") {
            closes[22].style.display = "inline";
        } else if (radioChecked[i].value == "apple") {
            closes[23].style.display = "inline";
        }
        //quetsion 9
        let radio9 = document.getElementById("radio9");
        if (radio9.checked) {
            checks[8].innerHTML = " Helyes válasz!";
            checks[8].style.display = "inline";
        } else if (radioChecked[i].value == "Has she") {
            closes[24].style.display = "inline";
        } else if (radioChecked[i].value == "Have they") {
            closes[25].style.display = "inline";
        } else if (radioChecked[i].value == "Have she got") {
            closes[26].style.display = "inline";
        }
        //question 10
        let radio10 = document.getElementById("radio10");
        if (radio10.checked) {
            checks[9].innerHTML = " Helyes válasz!";
            checks[9].style.display = "inline";
        } else if (radioChecked[i].value == "She have") {
            closes[27].style.display = "inline";
        } else if (radioChecked[i].value == "They are") {
            closes[28].style.display = "inline";
        } else if (radioChecked[i].value == "We haven't") {
            closes[29].style.display = "inline";
        }
    }
}

function checkTest2() {
    let checks2 = document.querySelectorAll("#test2 h1.fa.fa-check");
    let closes2 = document.querySelectorAll("#test2 h1.fa.fa-close");
    let radioChecked2 = document.querySelectorAll('#test2 input[type="radio"]:checked');
    //quetsion 1
    for (let j = 0; j < radioChecked2.length; j++) {
        let radio21 = document.getElementById("radio2-1");
        if (radio21.checked) {
            checks2[0].innerHTML = " Helyes válasz!";
            checks2[0].style.display = "inline";
        } else if (radioChecked2[j].value == "no any") {
            closes2[0].style.display = "inline";
        } else if (radioChecked2[j].value == "a") {
            closes2[1].style.display = "inline";
        } else if (radioChecked2[j].value == "any") {
            closes2[2].style.display = "inline";
        }
        //quetsion 2
        let radio22 = document.getElementById("radio2-2");
        if (radio22.checked) {
            checks2[1].innerHTML = " Helyes válasz!";
            checks2[1].style.display = "inline";
        } else if (radioChecked2[j].value == "are") {
            closes2[3].style.display = "inline";
        } else if (radioChecked2[j].value == "haven't") {
            closes2[4].style.display = "inline";
        } else if (radioChecked2[j].value == "have got") {
            closes2[5].style.display = "inline";
        }
        //quetsion 3
        let radio23 = document.getElementById("radio2-3");
        if (radio23.checked) {
            checks2[2].innerHTML = " Helyes válasz!";
            checks2[2].style.display = "inline";
        } else if (radioChecked2[j].value == "Is it any") {
            closes2[6].style.display = "inline";
        } else if (radioChecked2[j].value == "There is some") {
            closes2[7].style.display = "inline";
        } else if (radioChecked2[j].value == "Are there much") {
            closes2[8].style.display = "inline";
        }
        //quetsion 4
        let radio24 = document.getElementById("radio2-4");
        if (radio24.checked) {
            checks2[3].innerHTML = " Helyes válasz!";
            checks2[3].style.display = "inline";
        } else if (radioChecked2[j].value == "Has she") {
            closes2[9].style.display = "inline";
        } else if (radioChecked2[j].value == "Have she got") {
            closes2[10].style.display = "inline";
        } else if (radioChecked2[j].value == "Have you") {
            closes2[11].style.display = "inline";
        }
        //quetsion 5
        let radio25 = document.getElementById("radio2-5");
        if (radio25.checked) {
            checks2[4].innerHTML = " Helyes válasz!";
            checks2[4].style.display = "inline";
        } else if (radioChecked2[j].value == "am take") {
            closes2[12].style.display = "inline";
        } else if (radioChecked2[j].value == "take") {
            closes2[13].style.display = "inline";
        } else if (radioChecked2[j].value == "taking") {
            closes2[14].style.display = "inline";
        }
        //question 6
        let radio26 = document.getElementById("radio2-6");
        if (radio26.checked) {
            checks2[5].innerHTML = " Helyes válasz!";
            checks2[5].style.display = "inline";
        } else if (radioChecked2[j].value == "studying") {
            closes2[15].style.display = "inline";
        } else if (radioChecked2[j].value == "studies") {
            closes2[16].style.display = "inline";
        } else if (radioChecked2[j].value == "doesn't study") {
            closes2[17].style.display = "inline";
        }
        //quetsion 7
        let radio27 = document.getElementById("radio2-7");
        if (radio27.checked) {
            checks2[6].innerHTML = " Helyes válasz!";
            checks2[6].style.display = "inline";
        } else if (radioChecked2[j].value == "Comes she") {
            closes2[18].style.display = "inline";
        } else if (radioChecked2[j].value == "Do you come") {
            closes2[19].style.display = "inline";
        } else if (radioChecked2[j].value == "She coming") {
            closes2[20].style.display = "inline";
        }
        //quetsion 8
        let radio28 = document.getElementById("radio2-8");
        if (radio28.checked) {
            checks2[7].innerHTML = " Helyes válasz!";
            checks2[7].style.display = "inline";
        } else if (radioChecked2[j].value == "Do your friend work") {
            closes2[21].style.display = "inline";
        } else if (radioChecked2[j].value == "Works she") {
            closes2[22].style.display = "inline";
        } else if (radioChecked2[j].value == "Work you") {
            closes2[23].style.display = "inline";
        }
        //quetsion 9
        let radio29 = document.getElementById("radio2-9");
        if (radio29.checked) {
            checks2[8].innerHTML = " Helyes válasz!";
            checks2[8].style.display = "inline";
        } else if (radioChecked2[j].value == "going to") {
            closes2[24].style.display = "inline";
        } else if (radioChecked2[j].value == "will getting") {
            closes2[25].style.display = "inline";
        } else if (radioChecked2[j].value == "is going") {
            closes2[26].style.display = "inline";
        }
        //question 10
        let radio210 = document.getElementById("radio2-10");
        if (radio210.checked) {
            checks2[9].innerHTML = " Helyes válasz!";
            checks2[9].style.display = "inline";
        } else if (radioChecked2[j].value == "isn't answering") {
            closes2[27].style.display = "inline";
        } else if (radioChecked2[j].value == "will not be answer") {
            closes2[28].style.display = "inline";
        } else if (radioChecked2[j].value == "doesn't answer") {
            closes2[29].style.display = "inline";
        }
    }
}

function checkTest3() {
    let checks3 = document.querySelectorAll("#test3 h1.fa.fa-check");
    let closes3 = document.querySelectorAll("#test3 h1.fa.fa-close");
    let radioChecked3 = document.querySelectorAll('#test3 input[type="radio"]:checked');
    //quetsion 1
    for (let k = 0; k < radioChecked3.length; k++) {
        let radio31 = document.getElementById("radio3-1");
        if (radio31.checked) {
            checks3[0].innerHTML = " Helyes válasz!";
            checks3[0].style.display = "inline";
        } else if (radioChecked3[k].value == "go") {
            closes3[0].style.display = "inline";
        } else if (radioChecked3[k].value == "didn't went") {
            closes3[1].style.display = "inline";
        } else if (radioChecked3[k].value == "don't go") {
            closes3[2].style.display = "inline";
        }
        //quetsion 2
        let radio32 = document.getElementById("radio3-2");
        if (radio32.checked) {
            checks3[1].innerHTML = " Helyes válasz!";
            checks3[1].style.display = "inline";
        } else if (radioChecked3[k].value == "She won't spend her") {
            closes3[3].style.display = "inline";
        } else if (radioChecked3[k].value == "Will she spending her") {
            closes3[4].style.display = "inline";
        } else if (radioChecked3[k].value == "Are you spend your") {
            closes3[5].style.display = "inline";
        }
        //quetsion 3
        let radio33 = document.getElementById("radio3-3");
        if (radio33.checked) {
            checks3[2].innerHTML = " Helyes válasz!";
            checks3[2].style.display = "inline";
        } else if (radioChecked3[k].value == "a few") {
            closes3[6].style.display = "inline";
        } else if (radioChecked3[k].value == "any") {
            closes3[7].style.display = "inline";
        } else if (radioChecked3[k].value == "a lots of") {
            closes3[8].style.display = "inline";
        }
        //quetsion 4
        let radio34 = document.getElementById("radio3-4");
        if (radio34.checked) {
            checks3[3].innerHTML = " Helyes válasz!";
            checks3[3].style.display = "inline";
        } else if (radioChecked3[k].value == "I haven't got") {
            closes3[9].style.display = "inline";
        } else if (radioChecked3[k].value == "I don't") {
            closes3[10].style.display = "inline";
        } else if (radioChecked3[k].value == "I have not") {
            closes3[11].style.display = "inline";
        }
        //quetsion 5
        let radio35 = document.getElementById("radio3-5");
        if (radio35.checked) {
            checks3[4].innerHTML = " Helyes válasz!";
            checks3[4].style.display = "inline";
        } else if (radioChecked3[k].value == "How many friend") {
            closes3[12].style.display = "inline";
        } else if (radioChecked3[k].value == "How much friend") {
            closes3[13].style.display = "inline";
        } else if (radioChecked3[k].value == "How much friends") {
            closes3[14].style.display = "inline";
        }
        //question 6
        let radio36 = document.getElementById("radio3-6");
        if (radio36.checked) {
            checks3[5].innerHTML = " Helyes válasz!";
            checks3[5].style.display = "inline";
        } else if (radioChecked3[k].value == "you will do") {
            closes3[15].style.display = "inline";
        } else if (radioChecked3[k].value == "would you like doing") {
            closes3[16].style.display = "inline";
        } else if (radioChecked3[k].value == "are you going doing") {
            closes3[17].style.display = "inline";
        }
        //quetsion 7
        let radio37 = document.getElementById("radio3-7");
        if (radio37.checked) {
            checks3[6].innerHTML = " Helyes válasz!";
            checks3[6].style.display = "inline";
        } else if (radioChecked3[k].value == "am going visiting") {
            closes3[18].style.display = "inline";
        } else if (radioChecked3[k].value == "can't visit") {
            closes3[19].style.display = "inline";
        } else if (radioChecked3[k].value == "am visiting") {
            closes3[20].style.display = "inline";
        }
        //quetsion 8
        let radio38 = document.getElementById("radio3-8");
        if (radio38.checked) {
            checks3[7].innerHTML = " Helyes válasz!";
            checks3[7].style.display = "inline";
        } else if (radioChecked3[k].value == "Have you been") {
            closes3[21].style.display = "inline";
        } else if (radioChecked3[k].value == "Saw you") {
            closes3[22].style.display = "inline";
        } else if (radioChecked3[k].value == "Did you saw") {
            closes3[23].style.display = "inline";
        }
        //quetsion 9
        let radio39 = document.getElementById("radio3-9");
        if (radio39.checked) {
            checks3[8].innerHTML = " Helyes válasz!";
            checks3[8].style.display = "inline";
        } else if (radioChecked3[k].value == "nicer then") {
            closes3[24].style.display = "inline";
        } else if (radioChecked3[k].value == "more nice than") {
            closes3[25].style.display = "inline";
        } else if (radioChecked3[k].value == "much more nice than") {
            closes3[26].style.display = "inline";
        }
        //question 10
        let radio310 = document.getElementById("radio3-10");
        if (radio310.checked) {
            checks3[9].innerHTML = " Helyes válasz!";
            checks3[9].style.display = "inline";
        } else if (radioChecked3[k].value == "Has she already finish") {
            closes3[27].style.display = "inline";
        } else if (radioChecked3[k].value == "Haven’t she still finished") {
            closes3[28].style.display = "inline";
        } else if (radioChecked3[k].value == "She has finished still") {
            closes2[29].style.display = "inline";
        }
    }
}


