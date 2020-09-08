//Keys of cards
let keys = ["id", "megnev1", "nyelv1", "megnev2", "nyelv2", "tema"];

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

//kiszervezzük egy külön függvénybe a getServerData-t
function getCards() {
    getServerData("http://localhost:3000/cards").then(
        //data => console.log(data)
        data => fillDataTable(data, "cardsTable")
    );
}

function getServerData2(url) {
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
    getServerData2("http://localhost:3000/cards").then(
        data => {
            fillCardBody(data, "cardBody")
        }
    );
}

function getNextCard() {
    getServerData2("http://localhost:3000/cards").then(
        data => {
            fillCardBody(data, "cardBody")
        }
    );
}

function fillCardBody(data, cardID) {
    let card = document.querySelector(`#${cardID}`);
    let cardTitle = document.querySelector("#cardTitle");
    let cardsubTitle = document.querySelector("#subtitle1");
    let cardTitle2 = document.querySelector("#cardTitle2");
    let cardsubTitle2 = document.querySelector("#subtitle2");
    let theme = document.querySelector("#theme");

    if (!card) {
        console.error(`Card "${cardID}" is not found.`);
        return;
    }

    let index = 0;
    for (let row of data) {
        while (index < data.length) {
            //let keys = ["id", "megnev1", "nyelv1", "megnev2", "nyelv2", "tema"];      
            index++;
            cardTitle.innerHTML = row[keys[1]];
            cardsubTitle.innerHTML = row[keys[2]];
            cardTitle2.innerHTML = row[keys[3]];
            cardsubTitle2.innerHTML = row[keys[4]];
            theme.innerHTML = row[keys[5]];
        }
    }
}



/*A listak.html-ben megadtam a gombnak egy id-t, majd itt megírom hozzá az eseménykezelőt, hogy a getServerData függvény egy gomb megnyomására fusson le és kérje le az adatokat a szerverről.*/
//document.querySelector("#listBtn").addEventListener("click", startGetCards);

/*Feltöltjük a táblázatot a szerveradatokkal. A függvény univerzális, tehát más táblázatokhoz is használható.*/
//Fill table with server data
function fillDataTable(data, tableID) {
    let table = document.querySelector(`#${tableID}`);  /*kiválasztjuk a táblázatot a table id alapján --> behelyettesítettük a selektor stringbe a kapott tableID-t*/
    if (!table) {
        console.error(`Table "${tableID}" is not found.`); //hibaüzenet, ha nincs tábla
        return;
    }

    //Add new user row to the table
    let tBody = table.querySelector("tbody"); //ebbe fogjuk az adatokat beletölteni.
    tBody.innerHTML = ''; //kiürítjük a tbody-t, hogy mindig frissen legyenek benne az adatok
    //let newRow = newUserRow(); //létrehozunk egy új sort
    //tBody.appendChild(newRow); //hozzáadjuk a tbody-hoz az új sort appendChild-al
    //for ciklussal fixen kirajzoljuk a táblázat sorait.  
    //A createAnyElement függvény után létrehozzuk a tr és td elemeket és hozzáadjuk őket az appendChild-al.
    for (let row of data) { //az adatsorokat egyesével kiolvassuk a data tömbből

        let tr = createAnyElement("tr");
        for (let k of keys) {
            let td = createAnyElement("td");

            let input = createAnyElement("input", {
                class: "form-control",
                value: row[k],
                name: k
            });
            if (k == "id") {
                input.setAttribute("readonly", true);
            }
            td.appendChild(input);
            tr.appendChild(td);
        }

        /*A createBtnGroup függvényt elmentjük egy változóba és hozzáadjuk a sorokhoz (tr) a btnGroup-ot és a td-t appendChild-al.*/
        /* let btnGroup = createBtnGroup();
        tr.appendChild(btnGroup);*/
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


/* //Create new user row
function newUserRow(row) {
    let tr = createAnyElement("tr");
    for (let k of keys) {
        let td = createAnyElement("td");
        let input = createAnyElement("input", {
            class: "form-control",
            name: k
        });
        td.appendChild(input);
        tr.appendChild(td);
    }

    let newBtn = createAnyElement("button", {
        class: "btn btn-success",
        onclick: "createUser(this)"
    });

    newBtn.innerHTML = '<i class="fa fa-plus-circle" aria-hidden="true"></i>';
    let td = createAnyElement("td");
    td.appendChild(newBtn);
    tr.appendChild(td);
    return tr;
} */

//Create new user - Össze kell szedni az adatokat az input-okból
function createUser() {
    //let tr = btn.parentElement.parentElement.parentElement;  //ki kell választani a gomb szülői közül a tr-t. Mivel nincs gomb csoportban, ezért csak két szülője van.
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
    fetch(`http://localhost:3000/cards`, fetchOptions).then(
        resp => resp.json(),  //kapunk egy választ, ez json lesz
        err => console.error(err)  //a hibát lekezeljük - ha hiba van írja ki a konzolra
    ).then(  //mivel visszatér a json-el, arra is meghívjuk a then-t
        //data =>  //így megmaradnak az adatok a képernyőn
        data => console.log(data)  //az adat ami jött a szerverről kilogoljuk, hogy lássuk mit küldött vissza a szerver 
    );

    console.log(data);
}

function getFormData() {
    //let inputs = tr.querySelectorAll("input.form-control");  //meg kell keresni benne az összes input-ot
    /* for (let i = 0; i < inputs.length; i++) {  //ki kell belőlük olvasni az adatokat
        data[inputs[i].name] = inputs[i].value;  //az input nevével ellátva kell belőlük készíteni kulcs-érték párokkal egy objektumot
    } */

    let inputs = document.getElementsByClassName("form-control");
    let data = {};
    let i;
    for (i = 0; i < inputs.length; i++) {
        data[inputs[i].name] = inputs[i].value;
    }

    /* let name1 = document.getElementById("name1").name;
    data[name1.megnev1] = name1.value;
    
    let selectNyelv1 = document.getElementById("selectNyelv1");
    selectNyelv1.options[selectNyelv1.selectedIndex].text;
    data[selectNyelv1.nyelv1] = selectNyelv1.value;

    let name2 = document.getElementById("name2").name;
    data[name2.megnev2] = name2.value;

    let selectNyelv2 = document.getElementById("selectNyelv2");
    selectNyelv2.options[selectNyelv2.selectedIndex].text;
    data[selectNyelv2.nyelv2] = selectNyelv2.value;

    let selectTema = document.getElementById("selectTema");
    selectTema.options[selectTema.selectedIndex].text;
    data[selectTema.tema] = selectTema.value; */

    return data;
}

/* //Set data
function setRow(btn) {
    let tr = btn.parentElement.parentElement.parentElement;
    let data = getFormData(tr);

    let fetchOptions = {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/cards/${data.id}`, fetchOptions).then(
        resp => resp.json(), //parse-oljuk a kapott adatokat
        err => console.error(err) //a hibát kezeljük
    ).then(
        data => startGetCards() //ha sikerült a parse-olás, akkor újra lekérjük az adatokat az adatbázisból a startGetCards-el.
    );
} */

