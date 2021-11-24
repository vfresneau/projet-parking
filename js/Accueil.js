

var mesParkings; // variable qui contiendra la BDD des parkings
ReadDBParkings(); // On lit la BDD et on exécute la fonction principale Main

function Main() {
    var park = document.getElementById("quartier"); // permet d'acceder à l'élément HTML avec l'id quartier //
    var titre = document.getElementById("titre");

    var mon_logo = ultimateHTMLGenerator('img', "", ["mon_logo"], titre);

    var optez= ultimateHTMLGenerator("div","",["wrapper"],titre);

    var titreffet= ultimateHTMLGenerator("h1","Optez pour une gestion intelligente de votre parking !",["wrapper"],optez);

    //var phrase = ultimateHTMLGenerator('h1', "Optez pour une gestion intelligente de votre parking !", ["wrapper"], titre)

    mon_logo.src = "../image/logo_parking.png";
    mon_logo.alt = "logo";


    var ligne0 = ultimateHTMLGenerator("div", "", ["row"], park); //creer une ligne avec l'élément html "row" dans la var "park"//

    var button2 = ultimateHTMLGenerator("a", "ADMINISTRATEUR", ["btn", "btn-outline-info", "col-2", "text-right"], ligne0); //ajout d'un boutton dans la cardBody//
    button2.href = "administrateur.html";

    var ligne1 = ultimateHTMLGenerator("div", "", ["row"], park); //creer une ligne avec l'élément html "row" dans la var "park"//


    for (var i = 0; i < mesParkings.GogoParking.length; i++) { //Pour l'ensemble des elements du tableau "mesParkings.GogoParking" * //
        var compteurPlace = 0; // creation de variable pour utiliser un compteur // 
        compteurReservation = 0
        var temp = ultimateHTMLGenerator("div", "", ["col", "wrap"], ligne1); //* je créer une colonne et affiche le contenu dans ligne1, pour autant qu'il y a d'élément nom_parking //

        var cards = ultimateHTMLGenerator("div", "", ["card", "tile"], temp); //creation de cards dans les colonnes//
        cards.classList.add("titlecards"); // ajout de la class titlecards dans la cards //

        var imgcard = ultimateHTMLGenerator("img", "", ["card-img", "imgpark"], cards);
        imgcard.src = mesParkings.GogoParking[i]._IMG;

        var divimg = ultimateHTMLGenerator("div", "", ["card-img-overlay"], cards);

        var cardTitle = ultimateHTMLGenerator("h1", mesParkings.GogoParking[i]._NOM_PARKING, ["card-title"], divimg); //ajout des noms de parking dans titre h5 "cardTtitle" dans la cardBody//

        var cardText = ultimateHTMLGenerator("h2", mesParkings.GogoParking[i]._ADRESSE_PARKING, ["card-text", "animate-text"], divimg); //ajout de paragraphe dans cardbody//
        for (var j = 0; j < mesParkings.GogoParking[i]._PLACES.length; j++) { //Pour l'ensemble des places du parking//
            if (mesParkings.GogoParking[i]._PLACES[j]._DISPO === "0") { // si place de parking disponible //
                compteurPlace++ //ajouter 1 à compteurPlace //
            }
        }

        if (mesParkings.GogoParking[i]._RESERVATION === "oui") { // si reservation ==="oui" //
            compteurReservation = ultimateHTMLGenerator("p", "Réservation disponible", ["card-text", "animate-text"], divimg); //Afficher la reservation possible dans la cards //
        }

        var cardText3 = ultimateHTMLGenerator("p", "Nombre de place disponible:" + compteurPlace + "/" + mesParkings.GogoParking[i]._NOMBRE_PLACE, ["card-text", "animate-text"], divimg); //ajout de paragraphe3 "nombre de place" dans cardbody//
        var link = ultimateHTMLGenerator("a", "", [], divimg);
        link.href = "parking.html?parking=" + i;
        var dots = ultimateHTMLGenerator("div", "", ["dots"], link);
        for (s = 0; s < 3; s++) {
            var span = ultimateHTMLGenerator("span", "", [], dots);
        }
    }


    var contact = ultimateHTMLGenerator('div', "Contact : Monsieur Gogo -  Adresse: 26 rue de la préfecture 37000 Tours - Téléphone : 06 85 79 51 69", ["mon_contact"], park);
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