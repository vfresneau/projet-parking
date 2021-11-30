var mesParkings; // variable qui contiendra la BDD des parkings
var StartPagination = 0;
var Intervalle = 6;
ReadDBParkings(); // On lit la BDD et on exécute la fonction principale Main

function GenererCartes(row,DebutCartes,NombreCartes){

    for (var i = DebutCartes; i < NombreCartes+DebutCartes; i++) { //Pour l'ensemble des elements du tableau "mesParkings.GogoParking" * //
        var compteurPlace = 0; // creation de variable pour utiliser un compteur // 
        compteurReservation = 0

        var temp = ultimateHTMLGenerator("div", "", ["col", "wrap"], row); //* je créer une colonne et affiche le contenu dans ligne1, pour autant qu'il y a d'élément nom_parking //

        var cards = ultimateHTMLGenerator("div", "", ["card", "tile","mx-auto"], temp); //creation de cards dans les colonnes//
        cards.classList.add("titlecards"); // ajout de la class titlecards dans la cards //

        var imgcard = ultimateHTMLGenerator("img", "", ["card-img"], cards);
        imgcard.src = mesParkings.GogoParking[i]._IMG;

        var divimg = ultimateHTMLGenerator("div", "", ["card-img-overlay"], cards);

        // var cardBody = ultimateHTMLGenerator("div", "", ["card-body"], divimg); //ajout de la class cardbody dans la cards//
        var cardTitle = ultimateHTMLGenerator("h1", mesParkings.GogoParking[i]._NOM_PARKING, ["card-title"], divimg); //ajout des noms de parking dans titre h5 "cardTtitle" dans la cardBody//

        var cardText = ultimateHTMLGenerator("h2", mesParkings.GogoParking[i]._ADRESSE_PARKING, ["card-text", "animate-text"], divimg); //ajout de paragraphe dans cardbody//
        for (var j = 0; j < mesParkings.GogoParking[i]._PLACES.length; j++) { //Pour l'ensemble des places du parking//
            if (mesParkings.GogoParking[i]._PLACES[j]._DISPO === "0") { // si place de parking disponible //
                compteurPlace++; //ajouter 1 à compteurPlace //
            }
        }

        if (mesParkings.GogoParking[i]._RESERVATION === "oui") { // si reservation ==="oui" //
            compteurReservation = ultimateHTMLGenerator("p", "Réservation disponible", ["card-text", "animate-text"], divimg); //Afficher la reservation possible dans la cards //
        }

        var cardText3 = ultimateHTMLGenerator("p", "Nombre de place disponible:" + compteurPlace + "/" + mesParkings.GogoParking[i]._NOMBRE_PLACE, ["card-text", "animate-text"], divimg); //ajout de paragraphe3 "nombre de place" dans cardbody//
        // var button = ultimateHTMLGenerator("a", "+ d'info", ["btn", "btn-secondary"], divimg); //ajout d'un boutton dans la cardBody//
        // button.href = "parking.html?parking=" + i;
        var link = ultimateHTMLGenerator("a", "", [], divimg);
        link.href = "parking.html?parking=" + i;
        var dots = ultimateHTMLGenerator("div", "", ["dots"], link);
        for (s = 0; s < 3; s++) {
            var span = ultimateHTMLGenerator("span", "", [], dots);
        }
    }

    var Previous = document.getElementById("previousbutton");
    var Next = document.getElementById("nextbutton");
    if (StartPagination !=0){
        var ActiveNav = document.getElementById("nav"+((StartPagination/Intervalle)+1));
    } else {
        var ActiveNav = document.getElementById("nav1");
    }
    let Navs = document.getElementsByTagName("li");
    for (let u = 0;u< Navs.length;u++){
        if (Navs[u].classList.contains("active")){
            Navs[u].classList.remove("active");
        }
    }
    ActiveNav.classList.add("active");

    if (StartPagination == 0){
        Previous.classList.add("disabled");
    } 
    if (StartPagination != 0){
        Previous.classList.remove("disabled");
    }
    if (StartPagination+Intervalle > mesParkings.GogoParking.length){
        Next.classList.add("disabled");
    } else {
        Next.classList.remove("disabled");
    }
}

function Main() {
    var park = document.getElementById("quartier"); // permet d'acceder à l'élément HTML avec l'id quartier //
    var titre = document.getElementById("titre");
    var containerheader = document.getElementById("containerheader");

    var mon_logo = document.createElement("img");
    mon_logo.classList.add("mon_logo");
    containerheader.prepend(mon_logo); // Permet de créer le logo en premier dans le container (avant les autres éléments)

    var optez = ultimateHTMLGenerator("div", "", ["wrapper"], titre);

    var titreffet = ultimateHTMLGenerator("h1", "Optez pour une gestion intelligente de votre parking !", ["wrapper"], optez);

    //var phrase = ultimateHTMLGenerator('h1', "Optez pour une gestion intelligente de votre parking !", ["wrapper"], titre)

    mon_logo.src = "../image/logo_parking.png";
    mon_logo.alt = "logo";

    var button2 = ultimateHTMLGenerator("a", "ADMINISTRATEUR", ["btn", "btn-outline-info","boutonadmin"], containerheader); //ajout d'un boutton dans la cardBody//
    button2.id = "adminbutton";
    button2.href = "administrateur.html";

    var ligne1 = ultimateHTMLGenerator("div", "", ["row"], park); //creer une ligne avec l'élément html "row" dans la var "park"//
    ligne1.id = "ligne1";


    //* Block de navigation
    var navblock = ultimateHTMLGenerator("nav","",[],park);
    var ul = ultimateHTMLGenerator("ul","",["pagination","justify-content-center","navblock"],navblock);
    for(let p = 1; p <= ((mesParkings.GogoParking.length /Intervalle)+1);p++){
        if (p == 1){
            var PreviousLi = ultimateHTMLGenerator("li","",["page-item"],ul)
            PreviousLi.id = "previousbutton";
            var PreviousA = ultimateHTMLGenerator("a","",["page-link"],PreviousLi);
            PreviousA.href = "#";
            PreviousA.onclick = function(){EffaceCartes((StartPagination-Intervalle),Intervalle,"previous");};
            PreviousA.tabindex = "-1";
            var PreviousSymbol = ultimateHTMLGenerator("span","«",[],PreviousA);
        }
        var Item = ultimateHTMLGenerator("li","",["page-item"],ul);
        Item.id = "nav"+p;
        var ItemA = ultimateHTMLGenerator("a",p,["page-link"],Item);
        ItemA.href = "#";
        ItemA.onclick = function(){EffaceCartes(((Intervalle*p)-Intervalle),Intervalle,"none");};
    }

    var NextLi = ultimateHTMLGenerator("li","",["page-item"],ul);
    NextLi.id = "nextbutton";
    var NextA = ultimateHTMLGenerator("a","",["page-link"],NextLi);
    NextA.href = "#";
    NextA.onclick = function(){EffaceCartes((StartPagination+Intervalle),Intervalle,"next");};
    var NextSymbol = ultimateHTMLGenerator("span","»",[],NextA);

    GenererCartes(ligne1,StartPagination,Intervalle);


    var footer = ultimateHTMLGenerator('div', "", ["footer"], park);
    var contact = ultimateHTMLGenerator('p', "Contact : Monsieur Gogo -  Adresse: 26 rue de la préfecture 37000 Tours - Téléphone : 06 85 79 51 69", ["text-center", "text-footer"], footer);
    var copy = ultimateHTMLGenerator('p', "Copyright @2021 | Designed by Les lutins de Mr Gogo", ["text-center", "text-footer"], footer);
    var social_footer_ul = ultimateHTMLGenerator('ul', "", ['social_footer_ul'], footer);

    var facebook_lien = ultimateHTMLGenerator('a', "", [], social_footer_ul);
    var facebook = ultimateHTMLGenerator('img', "", ["icone"], facebook_lien)
    facebook.src = "../image/facebook_ic.png";
    facebook_lien.href = "https://fr-fr.facebook.com/";

    var twitter_lien = ultimateHTMLGenerator('a', "", [], social_footer_ul);
    var twitter = ultimateHTMLGenerator('img', "", ["icone"], twitter_lien)
    twitter.src = "../image/twitter-ic.png";
    twitter_lien.href = "https://twitter.com/?lang=fr";

    var instagram_lien = ultimateHTMLGenerator('a', "", [], social_footer_ul);
    var instagram = ultimateHTMLGenerator('img', "", ["icone"], instagram_lien)
    instagram.src = "../image/instagram_ic.png";
    instagram_lien.href = "https://www.instagram.com/accounts/login/?source=auth_switcher";

}
//Fonction qui génère mes lignes et colonnes//  
function ultimateHTMLGenerator(typeElement, contenu, tableauClassCss, destinationElement) {
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

function ReadDBParkings() {
    // Création de la variable qui stockera la base de données des héros
    let xhr = new XMLHttpRequest; // Création d'une nouvelle requête XMLHTTP pour aller récupérer la base de données
    xhr.onreadystatechange = function() { // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) { // Si la requête se termine
            mesParkings = JSON.parse(xhr.responseText); // on récupère le résultat de la requête dans la variable mesHeros, et on la convertit en objet JSON
            Main(); // On exécute la fonction principale
        }
    }
    xhr.open("GET", "http://141.94.223.96/Luc/GogoParking/php/DB_READ.php", true); // On indique la méthode (ce que doit faire la requête, dans ce cas récupérer une ressource) et l'adresse de la ressource (fichier php)
    xhr.send(); // On envoie !
}

function EffaceCartes(start,interval, sens){
    var ligne1 = document.getElementById("ligne1");
    ligne1.remove();
    var ligne1 = document.createElement("div");
    ligne1.classList.add("row");
    ligne1.id = "ligne1";
    document.getElementById("ligne0").after(ligne1);
    switch (sens){
        case "previous":
            StartPagination = StartPagination - Intervalle;
            break;
        case "next":
            StartPagination = StartPagination + Intervalle;
            break;
        default:
            StartPagination = start;
            break;
    }
    if (StartPagination+Intervalle > mesParkings.GogoParking.length){
        GenererCartes(ligne1,start,mesParkings.GogoParking.length - StartPagination);

    } else {
        GenererCartes(ligne1,start,interval);
    }
}