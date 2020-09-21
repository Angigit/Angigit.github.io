//Keys of cards
let keys = ["id", "Megnevezés1", "Nyelv1", "Megnevezés2", "Nyelv2", "Témakör"];
let index = 0;

//Get data from the server.
function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    };
    return fetch(url, fetchOptions).then(
        response => response.json(),
        err => console.error(err)
    );
}

function getPreviousCard() {
    getServerData("https://my-json-server.typicode.com/angigit/angigit.github.io").then(
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
        theme.innerHTML = data[index][keys[5]];
    }
    console.log(data[index][keys[1]]);
}

function getNextCard() {
    //https://jsonplaceholder.typicode.com/db
    getServerData("https://jsonplaceholder.typicode.com/db").then(
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
        theme.innerHTML = data[index][keys[5]];
    }
    console.log(data[index][keys[1]]);
}

//Export data into PDF with jQuery
/* $('#downloadBtn').click(() => {
    var pdf = new jsPDF();
    pdf.addHTML(document.querySelector("#cardsTable"),function() {
        pdf.save('lista.pdf');
    });
}) */

function getDataToPDF() {
    getServerData("https://my-json-server.typicode.com/angigit/angigit.github.io").then(
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
            dd.content.push(' ');
        }
    }

    pdfMake.createPdf(dd).open();
    //pdfMake.createPdf(docDefinition).download();
}

/* $(document).ready(function () {
    $('#cardsTable').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}); */

//kiszervezzük egy külön függvénybe a getServerData-t
function getCards() {
    getServerData("https://my-json-server.typicode.com/angigit/angigit.github.io").then(
        data => fillDataTable(data, "cardsTable")
    );
}

/*Feltöltjük a táblázatot a szerveradatokkal. A függvény univerzális, tehát más táblázatokhoz is használható.*/
//Fill table with server data
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);  /*kiválasztjuk a táblázatot a table id alapján --> behelyettesítettük a selektor stringbe a kapott tableID-t*/
    if (!table) {
        console.error(`Table "${tableID}" is not found.`);
        return;
    }

    //Add new user row to the table
    let tBody = table.querySelector("tbody"); //ebbe fogjuk az adatokat beletölteni.
    tBody.innerHTML = '';
    for (let row of data) { //az adatsorokat egyesével kiolvassuk a data tömbből
        let tr = createAnyElement("tr");
        for (let k of keys) {
            let td = createAnyElement("td");
            td.innerHTML = row[k];
            tr.appendChild(td);
        }
        tBody.appendChild(tr);
    }

    /* $('#cardsTable').dataTable({
        data: data,
        columns: [
            { data: 'id' },
            { data: 'megnev1' },
            { data: 'nyelv1' },
            { data: 'megnev2' },
            { data: 'nyelv2' },
            { data: 'tema' }
        ]
    }); */
}

//Létrehozunk egy függvényt, amivel bármilyen html elemet le tudunk gyártani.
function createAnyElement(name, attributes) {
    let element = document.createElement(name);
    for (let k in attributes) {
        element.setAttribute(k, attributes[k]);
    }
    return element;
}

/* function getFilteredCards() {
    getServerData("https://my-json-server.typicode.com/angigit/angigit.github.io").then(
        data => filterTable(data, "cardsTable")
    );
} */

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
    let tBody = table.querySelector("tbody"); //ebbe fogjuk az adatokat beletölteni.
    tBody.innerHTML = '';

    for (let row of data) { //az adatsorokat egyesével kiolvassuk a data tömbből
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
                //tr.appendChild(td);
            }
            tBody.appendChild(tr);
        }
    }
}

//Create new user - Össze kell szedni az adatokat az input-okból
function createUser() {
    let data = getFormData();
    delete data.id;  //hogy ne adjon hozzá új id-t, mert a json szerver figyeli és automatikusan létrehozza az új id-t.

    //felparaméterezzük a fetch-et (plusz két paraméter: headers és body)
    let fetchOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    //elindítjuk a fetch-et a szerver felé
    //https://my-json-server.typicode.com/<your-username>/<your-repo>
    fetch("https://my-json-server.typicode.com/angigit/angigit.github.io", fetchOptions).then(
        resp => resp.json(),  //kapunk egy json választ
        err => console.error(err)
    ).then(
        data => console.log(data)
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


