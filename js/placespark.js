var a = document.getElementById("container"); // je recupere l'id de mon container
var compteur = 0 // nouvelle variable compteur
var nom = document.getElementById("titre1");
var mesParkings;
var idparking = 1;
var boutton = document.createElement("a");
var numeroparking = processUser(); // récupère le parking envoyé depuis l'URL

ReadDBParkings();// Lit la BDD pour charger les infos parkings

function pri() { 
    nom.classList.add("titre");
    
    for (var z = 1; z <= 1; z++) {
        var ligne1 = document.createElement("div");
        ligne1.classList.add("row");
        ligne1.classList.add("a");
        ligne1.classList.add("styleligne");
        a.appendChild(ligne1);
        
        for (var i = 0; i < mesParkings.GogoParking[1]._PLACES.length; i++) {
            var colonne1 = document.createElement("div");
            colonne1.classList.add("col");
            colonne1.classList.add("a");
            ligne1.appendChild(colonne1);
            colonne1.textContent = "Disponible";
            colonne1.id = compteur;
            colonne1.classList.add("stylecol");

            if (mesParkings.GogoParking[1]._PLACES[i]._DISPO == "1") {
                colonne1.classList.add("rouge");
                colonne1.textContent = "Occupée depuis : " + mesParkings.GogoParking[1]._PLACES[i]._HEURE_DERNIERE_UT;
            }
        }
    }
}

nom.textContent = mesParkings.GogoParking[1]._NOM_PARKING;

function ReadDBParkings() {
    // Création de la variable qui stockera la base de données des héros
    let xhr = new XMLHttpRequest; // Création d'une nouvelle requête XMLHTTP pour aller récupérer la base de données
    xhr.onreadystatechange = function() { // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) { // Si la requête se termine
            mesParkings = JSON.parse(xhr.responseText); // on récupère le résultat de la requête dans la variable mesHeros, et on la convertit en objet JSON
            pri(); // On exécute la fonction principale
        }
    }
    xhr.open("GET", "http://141.94.223.96/Luc/GogoParking/php/DB_READ.php", true); // On indique la méthode (ce que doit faire la requête, dans ce cas récupérer une ressource) et l'adresse de la ressource (fichier php)
    xhr.send(); // On envoie !
}

function processUser() {
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    l = unescape(temp[1]);
    return parseInt(l);
}