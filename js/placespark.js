var a = document.getElementById("container"); // je recupere l'id de mon container
var compteur = 0 // nouvelle variable compteur
var nom = document.getElementById("titre1");
var mesParkings;

var boutton = document.createElement("a");
var numeroparking = processUser(); // récupère le parking envoyé depuis l'URL

ReadDBParkings();// Lit la BDD pour charger les infos parkings

function processUser() {
var parameters = location.search.substring(1).split("&");
var temp = parameters[0].split("=");
l = unescape(temp[1]);
return parseInt(l);
}

function pri() { 
    nom.classList.add("titre");
    // creation des lignes pour tableau 
    for (var z = 1; z <= 1; z++) {
        var ligne1 = document.createElement("div");
        ligne1.classList.add("row");
        ligne1.classList.add("a");
        ligne1.classList.add("styleligne");
        a.appendChild(ligne1);
        // creation des colonnes pour tableau 
        for (var i = 0; i < mesParkings.GogoParking[numeroparking]._PLACES.length; i++) {
            var colonne1 = document.createElement("div");
            colonne1.classList.add("col");
            colonne1.classList.add("a");
            ligne1.appendChild(colonne1);
            colonne1.textContent = "Disponible";
            colonne1.id = compteur;
            colonne1.classList.add("stylecol");


   //bouton on/off pour la dispo des parking //

     var tempoff = ultimateHTMLGenerator("label", "", ["switch"],"",colonne1 ) //creation d'un element html label et d'une class "switch" dans la div //

     var tempoff2 = ultimateHTMLGenerator("input", "", ["switch-input"],"toggle-one"+i,tempoff ) //creation d'un input et une class switch-input et un id pour chaque input dans la colonne //
     tempoff2.type = "checkbox"; // ajout le type checkbox dans l'input var tempoff2// 
     tempoff2.onclick = function (){maPlace(tempoff2.id,parseInt(mesParkings.GogoParking[numeroparking]._ID),mesParkings.GogoParking[numeroparking]._PLACES[i])} ;
     var tempoff3 = ultimateHTMLGenerator("span", "", ["switch-label"],"",tempoff ) // creation d'un element html span et une class switch-label  dans la colonne //
     tempoff3.setAttribute("data-on","Libre") ; //dans la span, je met la valeur libre a l'attribut data-one //
     tempoff3.setAttribute("data-off","Occupé") ; // dans la span, je met la valeur occupé  a l'attribut data-off //
     var tempoff4 = ultimateHTMLGenerator("span", "", ["switch-handle"],"",tempoff ) //creation d'un element html span et une class switch-handle dans la colonne //



            if (mesParkings.GogoParking[numeroparking]._PLACES[i]._DISPO == "1") { //Si chaque place de parking occupé, le switch se met sur "occupé" //
                
                colonne1.textContent="occupé depuis :"+mesParkings.GogoParking[numeroparking]._PLACES[i]._HEURE_DERNIERE_UT;
                var tempoff = ultimateHTMLGenerator("label", "", ["switch"],"",colonne1 ) //creation d'un element html label et d'une class "switch" dans la div //

                var tempoff2 = ultimateHTMLGenerator("input", "", ["switch-input"],"toggle-one"+i,tempoff ) //creation d'un input et une class switch-input et un id pour chaque input dans la colonne //
                tempoff2.type = "checkbox"; // ajout le type checkbox dans l'input var tempoff2// 
                var tempoff3 = ultimateHTMLGenerator("span", "", ["switch-label"],"",tempoff ) // creation d'un element html span et une class switch-label  dans la colonne //
                tempoff3.setAttribute("data-on","Libre") ; //dans la span, je met la valeur libre a l'attribut data-one //
                tempoff3.setAttribute("data-off","Occupé") ; // dans la span, je met la valeur occupé  a l'attribut data-off //
                var tempoff4 = ultimateHTMLGenerator("span", "", ["switch-handle"],"",tempoff ) //creation d'un element html span et une class switch-handle dans la colonne //
                tempoff2.checked = true ;
            }
        }
    }
}

nom.textContent = mesParkings.GogoParking[numeroparking]._NOM_PARKING;

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


function ultimateHTMLGenerator(typeElement, contenu, tableauClassCss,id, destinationElement){
    // on crer un element html donné en paramètre (1er paramètre)
    var ultimateElement = document.createElement(typeElement);
    // on attribut du contenu (paramètre 2) à l'element html précedement fabriqué
    ultimateElement.textContent = contenu;
    // on souhaite ajouter plusieurs class CSS à l'element html précedement créé
    for (var i = 0; i < tableauClassCss.length; i++) {
        // on ajoute la class css contenu dans le tableau de class css passé en paramètre 3
        ultimateElement.classList.add(tableauClassCss[i]);
    }
    // on fait apparaitre l'element dans celui passé en 4ème paramètre
    destinationElement.appendChild(ultimateElement);
    return ultimateElement;
         }
    
    
         // Fonction de MAJ de parking dans la BDD
function UpdateParking(update) {
    let xhrupdate = new XMLHttpRequest; // on crée une variable XMLHTTPRequest pour fabriquer notre requête
    xhrupdate.open("POST", "http://141.94.223.96/Luc/GogoParking/php/DB_UPDATE_PLACES.php", true); // On utilise la méthode POST pour envoyer des données, sur l'URL du fichier PHP qui permet d'écrire le fichier json
    xhrupdate.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // On définit les en-têtes pour que l'envoi soit correctement interprété par le serveur
    xhrupdate.onreadystatechange = function() { // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhrupdate.readyState == XMLHttpRequest.DONE && xhrupdate.status == 200) { // Si la requête se termine
            ReadDBParkings(); // On exécute la fonction 
        }
    }
    xhrupdate.send("update_places=" + encodeURIComponent(JSON.stringify(update))); // On envoie notre requête, dans une variable PHP mesHeros à laquelle on rajoute le fichier JSON entier
}

function maPlace(idBouton,idParking,idPlace
    ) {
        var bouton = document.getElementById(idBouton);
    if (idBouton.checked ==true){ //si ma case est coché //
        UpdateParking(idParking,idPlace,1)
        }
        else {
            UpdateParking(idParking,idPlace,0)
        }
}