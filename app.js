const PIN_CORRETTO = "1234";

let dati = JSON.parse(localStorage.getItem("dati")) || [];

function login(){
    let pin = document.getElementById("pin").value;

    if(pin === PIN_CORRETTO){
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
        aggiorna();
    } else {
        alert("PIN errato");
    }
}

function salva(){
    let frigo = document.getElementById("frigo").value;
    let temp = document.getElementById("temp").value;
    let data = new Date().toLocaleString();

    dati.push({frigo, temp, data});

    localStorage.setItem("dati", JSON.stringify(dati));

    aggiorna();
}

function aggiorna(){
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    dati.forEach(d => {
        lista.innerHTML += `<li>${d.frigo} - ${d.temp}°C - ${d.data}</li>`;
    });
}

function esportaPDF(){
    let testo = "REGISTRO HACCP\n\n";

    dati.forEach(d => {
        testo += `${d.frigo} - ${d.temp}°C - ${d.data}\n`;
    });

    const blob = new Blob([testo], {type: "text/plain"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "haccp.txt";
    a.click();
}
