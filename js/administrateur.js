var mesParkings; // Variable qui contiendra la BDD des Parkings

// Tableau des caractéristiques (fixe)
var refCaracteristiques = ["Restrictions de hauteur: 2.10m",
    "Espaces handicapés",
    "Restrictions de hauteur: 1.90m",
    "Aucune restriction de hauteur",
    "Restrictions de hauteur: 2.60m",
    "Charge de voiture électrique"
];

// On récupère les containers de la page dont on a besoin
var park = document.getElementById("quartier");
var titre = document.getElementById("titre");

//ajout du logo //
var mon_logo = document.createElement('img');
mon_logo.classList.add("mon_logo");
mon_logo.src = "../image/logo_parking.png";
mon_logo.alt = "logo";
titre.appendChild(mon_logo);

// Création de la ligne et du bouton permettant de revenir à l'accueil
var ligne0 = ultimateHTMLGenerator("div", "", ["row"], "", park); //creer une ligne avec l'élément html "row" dans la var "park"//
var button2 = ultimateHTMLGenerator("a", "Accueil", ["btn", "btn-outline-info", "col-2","mx-auto"], "", ligne0); //ajout d'un boutton dans la cardBody//
button2.href = "Accueil.html";

ReadDBParkings(); // On exécute la fonction permettant de récupérer les parkings depuis la BDD

let ligneRow;


// _______________________________ Fonction générant l'affichage des parking ____________________________________________
function generateDisplay() {

    let monContainer = document.getElementById("mon_container");
    // Permet de détruire le contenu avant de la reconstruire (pour l'affichage de nouveau parking ou la suppression d'un parking)
    monContainer.innerHTML = "";


    // Pour chaque parking
    for (var i = 0; i < mesParkings.GogoParking.length; i++) {
        if (i % 2 == 0) {
            ligneRow = document.createElement("div");
            ligneRow.classList.add("row");
            monContainer.appendChild(ligneRow);
        }

        // fabrication de la colonne
        let maColonne = document.createElement("div");
        maColonne.classList.add("col-6");
        maColonne.classList.add("card");
        maColonne.classList.add("custom-card");
        maColonne.dataset.idDb = mesParkings.GogoParking[i]._ID;
        maColonne.id = i;

        // Fabrication du card body
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // Ajout de l'image de fond
        var imgcard = ultimateHTMLGenerator("img", "", ["img-responsive","card-img-top","img-custom"], "",cardBody);
        imgcard.src = mesParkings.GogoParking[i]._IMG;


        // fabrication  du titre de la carte
        let montitre = document.createElement("h5");
        montitre.textContent = mesParkings.GogoParking[i]._NOM_QUARTIER;
        montitre.classList.add("card-title");
        montitre.classList.add("custom-card-title")
        montitre.id = i + "nom_quartier";
        cardBody.appendChild(montitre);

        // ajout du card body à la card
        maColonne.appendChild(cardBody);

        // Fabrication de la liste à puce
        let maListeAPuce = document.createElement("ul");
        maListeAPuce.classList.add("liste-custom");

        // Création du contenu de chaque carte
        let puce_nom_parking = ultimateHTMLGenerator('li',"Nom du parking : "+ mesParkings.GogoParking[i]._NOM_PARKING, ['nom_parking'], i + "nom_parking", maListeAPuce);
        let puce_adresse_parking = ultimateHTMLGenerator('li',"Adresse : "+ mesParkings.GogoParking[i]._ADRESSE_PARKING, ['adresse_parking'], i + "adresse_parking", maListeAPuce);
        let puce_nombre_place = ultimateHTMLGenerator('li',"", ['nom_place'], i + "nombre_place", maListeAPuce);
        let puce_tarif = ultimateHTMLGenerator('li', "Tarif : " + mesParkings.GogoParking[i]._TARIF, ['tarif'], i + "tarif", maListeAPuce);
        let puce_heure_ouverture = ultimateHTMLGenerator('li', "Heure d'ouverture : " + mesParkings.GogoParking[i]._HEURE_OUVERTURE, ['heure_ouverture'], i + "heure_ouverture", maListeAPuce);
        let puce_reservation = ultimateHTMLGenerator('li', "Réservation : " + mesParkings.GogoParking[i]._RESERVATION, ['reservation'], i + "reservation", maListeAPuce);
        let puce_lien_maps = ultimateHTMLGenerator('li',"Lien Maps : "+ mesParkings.GogoParking[i]._LIEN_MAPS, ['lien_maps'], i + "lien_maps", maListeAPuce);
        let puce_img = ultimateHTMLGenerator('li',"Source Image : "+ mesParkings.GogoParking[i]._IMG, ['imgcard'], i + "imgcard", maListeAPuce);
        
        // Création du lien vers la page permettant de modifier le nombre de places
        let lien_nombre_place = document.createElement("a");
        lien_nombre_place.classList.add("lien_nbr_place_cus")
        lien_nombre_place.textContent = "Nombre de place : "+ mesParkings.GogoParking[i]._NOMBRE_PLACE + " places";
        lien_nombre_place.href ="LIEN DE LA PAGE A METTRE ICI";
        puce_nombre_place.appendChild(lien_nombre_place);
        

        // Pour chaque caractéristiques du parking en cours
        for (var j = 0; j < mesParkings.GogoParking[i]._CARACTERISTIQUES.length; j++) {
            // On fabrique un element li
            let puce_caracteristiques = ultimateHTMLGenerator('li', mesParkings.GogoParking[i]._CARACTERISTIQUES[j]._DESCRIPTION_CARAC, [], i.toString() + j.toString() + "caracteristiques", maListeAPuce);
        }

        // bouton supprimmer
        let sup = document.createElement("button");
        sup.type = "button";
        sup.classList.add("btn");
        sup.classList.add("button_cus");
        sup.classList.add("btn-danger");
        sup.textContent = "Supprimer le parking";
        // on donne un id unique au bouton de suppression pour savoir quel id on dois supprimer de la liste
        sup.dataset.idSuppression = mesParkings.GogoParking[i]._ID;
        // On ajoute une fonction sur l'evenement click du bouton
        sup.onclick = function() { DeleteParking(sup.dataset.idSuppression); }


        // bouton modifier
        let modif = document.createElement("button");
        modif.type = "button";
        modif.classList.add("btn");
        modif.classList.add("button_cus");
        modif.classList.add("btn-danger");
        modif.textContent = "Modifier";
        modif.onclick = function() { Modification(maColonne.id); };

        // on donne un id unique au bouton de suppression pour savoir quel id on dois supprimer de la liste
        modif.id = i + "button";


        // fabrication du texte
        let cardText = document.createElement("p");
        cardText.classList.add("card-text");
        cardText.classList.add("custom-card-text");
        // on ajoute la liste à puce dans le texte de la carte
        cardText.appendChild(maListeAPuce);
        //on ajoute le bouton supprimer au texte de la carte
        cardText.appendChild(sup);
        //on ajoute le bouton modifier au texte de la carte
        cardText.appendChild(modif);

        // on ajoute le texte de la carte dans la colonne
        maColonne.appendChild(cardText);

        // on ajoute la colonne dans la ligne
        ligneRow.appendChild(maColonne);
    }
}

//___________________________________ Fonction de modification d'une fiche parking_________________________________________________


/*Fonction qui permet de récupérer le texte de chaque élément d'une carte, créer des champs de formulaires, y mettre les valeurs texte
précédemment récupérées, puis détruire les anciens éléments ; remplace donc le contenu original de la carte par des champs de formulaire,
et vice-versa ! */
function Modification(id) {
    var carte = document.getElementById(id);
    if (carte.lastChild.lastChild.textContent == "Modifier") { // Première possibilité : on va créer des formulaires
        var title = ultimateHTMLGenerator("input", carte.firstChild.lastChild.textContent, ["form-control"], carte.firstChild.lastChild.id);
        for (z = 0; z < 8; z++) { // Première boucle = propriétés du parking (nombre fixe)
            var element = ultimateHTMLGenerator("input", carte.lastChild.firstChild.children[0].textContent, ["form-control"], carte.lastChild.firstChild.children[0].id);
            carte.lastChild.firstChild.children[0].remove();
            carte.lastChild.firstChild.appendChild(element);
        }
        for (y = 1; y <= 6; y++) { // Dexuième boucle = caractéristiques du parking (nombre fixe)
            var element = ultimateHTMLGenerator("input", "", ["form-check-input"], carte.id + "check" + y);
            element.type = "checkbox";
            element.dataset.idCarac = carte.id + y;
            var element2 = ultimateHTMLGenerator("label", refCaracteristiques[y - 1], ["form-check-label"], "");
            element2.for = element.id;
            carte.lastChild.firstChild.appendChild(element);
            carte.lastChild.firstChild.appendChild(element2);
        }
        for (x = 1; x <= carte.lastChild.firstChild.children.length; x++) { // on récupère les caractéristiques existantes et on supprime au fur et à mesure
            if (carte.lastChild.firstChild.children[0].id.includes("caracteristiques") && carte.lastChild.firstChild.children[0].textContent == carte.lastChild.firstChild.children[x].textContent) {
                carte.lastChild.firstChild.children[x - 1].checked = true;
                carte.lastChild.firstChild.children[0].remove();
            }
        }
        // on supprime les anciens éléments et on transforme le bouton
        carte.firstChild.lastChild.remove();
        carte.firstChild.appendChild(title);
        carte.lastChild.lastChild.classList.remove("btn-danger");
        carte.lastChild.lastChild.classList.add("btn-success");
        carte.lastChild.lastChild.textContent = "Enregistrer";

    } else { // Opération inverse, on récupère le contenu des formulaires et on recrée la carte.
        var title2 = ultimateHTMLGenerator("h5", carte.firstChild.lastChild.value, [], carte.firstChild.lastChild.id)
        var tableaucarac = [];
        for (z = 0; z < carte.lastChild.firstChild.children.length;) {
            if (carte.lastChild.firstChild.children[0].id.includes("check") && carte.lastChild.firstChild.children[0].checked) {
                var element = ultimateHTMLGenerator("li", carte.lastChild.firstChild.children[1].textContent, [], z + "caracteristiques")
                tableaucarac.push(carte.lastChild.firstChild.children[0].checked);
                carte.lastChild.firstChild.children[0].remove();
                carte.lastChild.firstChild.children[0].remove();
                carte.lastChild.firstChild.appendChild(element);
                z++;
            } else if (carte.lastChild.firstChild.children[0].classList.contains("form-control")) {
                var element = ultimateHTMLGenerator("li", carte.lastChild.firstChild.children[0].value, [], carte.lastChild.firstChild.children[0].id)
                carte.lastChild.firstChild.children[0].remove();
                carte.lastChild.firstChild.appendChild(element);
                z++;
            } else {
                tableaucarac.push(carte.lastChild.firstChild.children[0].checked);
                carte.lastChild.firstChild.children[0].remove();
                carte.lastChild.firstChild.children[0].remove();
            }
        }
        // on supprime les anciens éléments et on transforme le bouton
        carte.firstChild.lastChild.remove();
        carte.firstChild.appendChild(title2);
        MajParking(carte.dataset.idDb, carte.id, tableaucarac);
        carte.lastChild.lastChild.classList.remove("btn-success");
        carte.lastChild.lastChild.classList.add("btn-danger");
        carte.lastChild.lastChild.textContent = "Modifier";
    }
}

// Fonction qui permet de récupérer les données du formulaire de MAJ et les formate avant envoi
function MajParking(idDb, id, tableaucarac) {
    var nom_quartier = document.getElementById(id + "nom_quartier").textContent;
    var nom_parking = document.getElementById(id + "nom_parking").textContent;
    nom_parking = nom_parking.substring("Nom du parking : ".length, nom_parking.length);
    var adresse_parking = document.getElementById(id + "adresse_parking").textContent;
    adresse_parking = adresse_parking.substring("Adresse : ".length, adresse_parking.length);
    var nombre_place = document.getElementById(id + "nombre_place").textContent;
    nombre_place = parseInt(nombre_place.substr("Nombre de place : ".length, nombre_place.length - " places".length));
    var tarif = document.getElementById(id + "tarif").textContent;
    tarif = tarif.substr("Tarif : ".length, tarif.length - "Tarif : ".length);
    var heure_ouverture = document.getElementById(id + "heure_ouverture").textContent;
    heure_ouverture = heure_ouverture.substr("Heure d'ouverture : ".length, heure_ouverture.length - "Heure d'ouverture : ".length);
    var reservation = document.getElementById(id + "reservation").textContent;
    reservation = reservation.substr("Réservation : ".length, reservation.length);
    var url_map = document.getElementById(id + "lien_maps").textContent;
    url_map = url_map.substring("Lien Maps : ".length, url_map.length);
    var imgcard = document.getElementById(id + "imgcard").textContent;
    imgcard = imgcard.substring("Source Image : ".length, imgcard.length);


    // On fabrique un model vide de parking
    var ParkingMisAJour = ParkingModel();
    // On change les valeurs avant vide par le contenu des inputs
    ParkingMisAJour.nom_quartier = nom_quartier;
    ParkingMisAJour.nom_parking = nom_parking;
    ParkingMisAJour.adresse_parking = adresse_parking;
    ParkingMisAJour.nombre_place = nombre_place;
    ParkingMisAJour.tarif = tarif;
    ParkingMisAJour.heure_ouverture = heure_ouverture;
    ParkingMisAJour.reservation = reservation;
    ParkingMisAJour.lien_maps = url_map;
    ParkingMisAJour.img = imgcard;
    ParkingMisAJour.caracteristiques = tableaucarac;
    ParkingMisAJour.id = idDb;
    // on envoie au serveur pour mise à jour dans la BDD
    UpdateParking(ParkingMisAJour);
}

// _______________________________ Fonction de création de parking depuis le HTML ____________________________________________
function CreerParking() {
    // On récupère les valeurs des inputs depuis le html
    var nom_quartier = document.getElementById("nom_quartier").value;
    var nom_parking = document.getElementById("nom_parking").value;
    var adresse_parking = document.getElementById("adresse_parking").value;
    var nombre_place = document.getElementById("nombre_place").value;
    var tarif = document.getElementById("tarif").value;
    var heure_ouverture = document.getElementById("heure_ouverture").value;
    var reservation = document.getElementById("reservation").value;
    var url_map = document.getElementById("url").value;
    var img = document.getElementById("img").value;
    var caracteristiques = [];
    for (g = 1; g <= document.getElementsByClassName("form-check-input").length; g++) {
        var checkbox = document.getElementById("check" + g);
        caracteristiques.push(checkbox.checked);
    }


    // On fabrique un model vide de parking
    var nouveauParking = ParkingModel();
    // On change les valeurs avant vide par le contenu des inputs
    nouveauParking.nom_quartier = nom_quartier;
    nouveauParking.nom_parking = nom_parking;
    nouveauParking.adresse_parking = adresse_parking;
    nouveauParking.nombre_place = nombre_place;
    nouveauParking.tarif = tarif;
    nouveauParking.heure_ouverture = heure_ouverture;
    nouveauParking.reservation = reservation;
    nouveauParking.lien_maps = url_map;
    nouveauParking.img = img;
    nouveauParking.caracteristiques = caracteristiques;

    // on crée le nouveau parking dans la DB
    console.log(nouveauParking);
    CreateParking(nouveauParking);
}

// _______________________________ Fonction générant un parking vide ____________________________________________
function ParkingModel() {
    return {
        "id": "",
        "nom_quartier": "",
        "nom_parking": "",
        "adresse_parking": "",
        "nombre_place": 0,
        "tarif": "",
        "heure_ouverture": "",
        "reservation": "",
        "lien_maps": "",
        "img": "",
        "caracteristiques": []
    };
    
}

//__________________Fonction permettant de faire apparaitre le formulaire en cliquant sur le bouton _______________________
function afficherFormulaire() {
    var mes_formulaires = document.getElementById("mes_formulaires");
    var mon_bouton = document.getElementById("formulaire");
    mes_formulaires.style.display = "block";
    mon_bouton.style.display = "none";
}


// ____________________________________________________________________________________
// paramètre 1 : le nom de la balise html à creer
// paramètre 2 : le contenu texte de la balise à creer, mettre "" si pas de contenu
// paramètre 3 : un tableau [] contenant la liste des class css à ajouter à l'element (sous forme de chaine de caractère, mettre [] (tableau vide si pas de classe ))
// paramètre 4 : la référence à l'objet javascript dans lesquel ajouter le contenu.
// EXEMPLE d'utilisation : 
/* 
rowJS_2 = ultimateHTMLGenerator("div","",["row"],"",maGrilleJS);
var maNewCol= ultimateHTMLGenerator("div","",["col", "couleurColonne"],"",rowJS_2);
ultimateHTMLGenerator("h1", "Batman", [],"",maNewCol);
*/
function ultimateHTMLGenerator(typeElement, contenu, tableauClassCss, id, destinationElement) {
    // on crer un element html donné en paramètre (1er paramètre)
    var ultimateElement = document.createElement(typeElement);
    // on attribut du contenu (paramètre 2) à l'element html précedement fabriqué
    ultimateElement.textContent = contenu;
    ultimateElement.value = contenu;
    // on souhaite ajouter plusieurs class CSS à l'element html précedement créé
    for (var i = 0; i < tableauClassCss.length; i++) {
        // on ajoute la class css contenu dans le tableau de class css passé en paramètre 3
        ultimateElement.classList.add(tableauClassCss[i]);
    }
    ultimateElement.id = id;
    // on fait apparaitre l'element dans celui passé en 4ème paramètre
    if (destinationElement != null) {
        destinationElement.appendChild(ultimateElement);
    }
    return ultimateElement;
}
//_________________________________________________________________________________________
//Fonction qui récupère les parkings de la BDD
function ReadDBParkings() {
    // Création de la variable qui stockera la base de données des héros
    let xhr = new XMLHttpRequest; // Création d'une nouvelle requête XMLHTTP pour aller récupérer la base de données
    xhr.onreadystatechange = function() { // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) { // Si la requête se termine
            mesParkings = JSON.parse(xhr.responseText); // on récupère le résultat de la requête dans la variable mesHeros, et on la convertit en objet JSON
            generateDisplay(); // On exécute la fonction principale
        }
    }
    xhr.open("GET", "http://141.94.223.96/Luc/GogoParking/php/DB_READ.php", true); // On indique la méthode (ce que doit faire la requête, dans ce cas récupérer une ressource) et l'adresse de la ressource (fichier php)
    xhr.send(); // On envoie !
}

//Fonction qui crée le parking dans la BDD
function CreateParking(nouveauParking) {
    let xhrinsert = new XMLHttpRequest; // on crée une variable XMLHTTPRequest pour fabriquer notre requête
    xhrinsert.open("POST", "http://141.94.223.96/Luc/GogoParking/php/DB_CREATE.php", true); // On utilise la méthode POST pour envoyer des données, sur l'URL du fichier PHP qui permet d'écrire le fichier json
    xhrinsert.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // On définit les en-têtes pour que l'envoi soit correctement interprété par le serveur
    xhrinsert.onreadystatechange = function() { // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhrinsert.readyState == XMLHttpRequest.DONE && xhrinsert.status == 200) { // Si la requête se termine
            ReadDBParkings(); // On exécute la fonction
        }
    }
    xhrinsert.send("create=" + encodeURIComponent(JSON.stringify(nouveauParking))); // On envoie notre requête, dans une variable PHP mesHeros à laquelle on rajoute le fichier JSON entier
}

// Fonction de suppression d'un parking, lui passer seulement l'id du parking
function DeleteParking(parking) {
    let xhrdelete = new XMLHttpRequest; // on crée une variable XMLHTTPRequest pour fabriquer notre requête
    xhrdelete.open("POST", "http://141.94.223.96/Luc/GogoParking/php/DB_DELETE.php", true); // On utilise la méthode POST pour envoyer des données, sur l'URL du fichier PHP qui permet d'écrire le fichier json
    xhrdelete.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // On définit les en-têtes pour que l'envoi soit correctement interprété par le serveur
    xhrdelete.onreadystatechange = function() { // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhrdelete.readyState == XMLHttpRequest.DONE && xhrdelete.status == 200) { // Si la requête se termine
            ReadDBParkings(); // On exécute la fonction principale
        }
    }
    xhrdelete.send("delete=" + encodeURIComponent(JSON.stringify(parking))); // On envoie notre requête, dans une variable PHP mesHeros à laquelle on rajoute le fichier JSON entier
}

// Fonction de MAJ de parking dans la BDD
function UpdateParking(update) {
    let xhrupdate = new XMLHttpRequest; // on crée une variable XMLHTTPRequest pour fabriquer notre requête
    xhrupdate.open("POST", "http://141.94.223.96/Luc/GogoParking/php/DB_UPDATE.php", true); // On utilise la méthode POST pour envoyer des données, sur l'URL du fichier PHP qui permet d'écrire le fichier json
    xhrupdate.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // On définit les en-têtes pour que l'envoi soit correctement interprété par le serveur
    xhrupdate.onreadystatechange = function() { // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhrupdate.readyState == XMLHttpRequest.DONE && xhrupdate.status == 200) { // Si la requête se termine
            ReadDBParkings(); // On exécute la fonction 
        }
    }
    xhrupdate.send("update=" + encodeURIComponent(JSON.stringify(update))); // On envoie notre requête, dans une variable PHP mesHeros à laquelle on rajoute le fichier JSON entier
}