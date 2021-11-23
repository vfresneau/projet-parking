var tableau = [1,2,3];
var a = document.getElementById("container");
var compteur = 0 
var quartier = document.getElementById("titre1");
var nom = document.getElementById("titre2")
var adresse = document.getElementById("titre3");
var nombre = document.getElementById("titre4");
var tariff = document.getElementById("titre5");
var heure =  document.getElementById("titre6");
var reservationn =  document.getElementById("titre7");
var caracteristique =  document.getElementById("titre8");
var carte = document.getElementById("google");
var google = document.createElement("iframe");
var col12 = document.getElementById("google");
var numeroparking = processUser(); // récupère le parking envoyé depuis l'URL
var mesParkings; // variable qui contiendra la BDD

ReadDBParkings(); // Lit la BDD pour charger les infos parkings

function processUser(){
    var parameters = location.search.substring(1).split("&");
    var temp = parameters[0].split("=");
    l = unescape(temp[1]);
    return l;
}

function parking(){
    quartier.classList.add("monquartier");
    adresse.classList.add("titre");
    nombre.classList.add("titre");
    tariff.classList.add("titre");
    heure.classList.add("titre");
    reservationn.classList.add("titre");
    caracteristique.classList.add("titre");
    nom.classList.add("titre");

    for (var z=1; z<=1; z++){
        var ligne1 = document.createElement("div");
        ligne1.classList.add("row");
        ligne1.classList.add("a");
        a.appendChild(ligne1);

        for (var i=0; i<mesParkings.GogoParking[numeroparking]._PLACES.length; i++){
            var colonne1 = document.createElement("div");
            colonne1.classList.add("col");
            colonne1.classList.add("a");
            ligne1.appendChild(colonne1);
            colonne1.textContent = "Disponible";
            colonne1.id = compteur;
                
            if (mesParkings.GogoParking[numeroparking]._PLACES[i]._DISPO=="1"){ 
                colonne1.classList.add("rouge");
                colonne1.textContent = "Occupée depuis : "+mesParkings.GogoParking[numeroparking]._PLACES[i]._HEURE_DERNIERE_UT;
            }
        }
    }

    quartier.textContent = mesParkings.GogoParking[numeroparking]._NOM_QUARTIER;
    nom.textContent = mesParkings.GogoParking[numeroparking]._NOM_PARKING;
    adresse.textContent = "Adresse : "+mesParkings.GogoParking[numeroparking]._ADRESSE_PARKING;
    nombre.textContent = "Places : "+ mesParkings.GogoParking[numeroparking]._NOMBRE_PLACE;
    tariff.textContent = "Tarif : "+ mesParkings.GogoParking[numeroparking]._TARIF;
    heure.textContent = "Heure d'ouverture : "+mesParkings.GogoParking[numeroparking]._HEURE_OUVERTURE;
    reservationn.textContent = "Reservation : "+mesParkings.GogoParking[numeroparking]._RESERVATION;
    caracteristique.textContent = "Restriction :";
    for (let y = 0; y < mesParkings.GogoParking[numeroparking]._CARACTERISTIQUES.length;y++){
        if (y ==0){
            caracteristique.textContent = caracteristique.textContent+" "+mesParkings.GogoParking[numeroparking]._CARACTERISTIQUES[y]._DESCRIPTION_CARAC;
        } else {
            caracteristique.textContent = caracteristique.textContent+", "+mesParkings.GogoParking[numeroparking]._CARACTERISTIQUES[y]._DESCRIPTION_CARAC;
        }
    }
    // caracteristique.textContent = "Restriction : "+mesParkings.GogoParking[numeroparking]._CARACTERISTIQUES;

    google.src = mesParkings.GogoParking[numeroparking]._LIEN_MAPS;
    google.classList.add("centrer");
    col12.appendChild(google);
}


function ReadDBParkings(){
    // Création de la variable qui stockera la base de données des héros
    let xhr = new XMLHttpRequest; // Création d'une nouvelle requête XMLHTTP pour aller récupérer la base de données
    xhr.onreadystatechange = function(){ // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){ // Si la requête se termine
            mesParkings = JSON.parse(xhr.responseText); // on récupère le résultat de la requête dans la variable mesHeros, et on la convertit en objet JSON
            parking(); // On exécute la fonction principale
        }
    }
    xhr.open("GET","http://141.94.223.96/Luc/GogoParking/php/DB_READ.php", true); // On indique la méthode (ce que doit faire la requête, dans ce cas récupérer une ressource) et l'adresse de la ressource (fichier php)
    xhr.send(); // On envoie !
}
