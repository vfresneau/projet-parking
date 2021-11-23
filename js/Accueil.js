var mesParkings; // variable qui contiendra la BDD des parkings
ReadDBParkings(); // On lit la BDD et on exécute la fonction principale Main

function Main(){
    var park = document.getElementById("quartier"); // permet d'acceder à l'élément HTML avec l'id quartier //
    
    var phrase = ultimateHTMLGenerator('h6',"Optez pour une gestion intelligente de votre parking !",["ma_phrase"],park)
    
    var mon_logo = ultimateHTMLGenerator('img',"",["mon_logo"],phrase);
    mon_logo.src = "../image/logo_parking.png";
    mon_logo.alt = "logo";

    var mon_titre = ultimateHTMLGenerator("div","SMART PARK",["mon_titre"],phrase);



    var ligne1 = ultimateHTMLGenerator("div","",["row"],park); //creer une ligne avec l'élément html "row" dans la var "park"//

    //var titre = ultimateHTMLGenerator("div","AD",["col-12"],ligne1 ); //ajout de la class cardbody dans la cards//

    var button2 = ultimateHTMLGenerator("a","ADMINISTRATEUR",["btn","btn-outline-info"],ligne1); //ajout d'un boutton dans la cardBody//
    button2.href = "administrateur.html";


    for (var i=0; i< mesParkings.GogoParking.length; i++){ //Pour l'ensemble des elements du tableau "mesParkings.GogoParking" * //
        var compteurPlace = 0 ; // creation de variable pour utiliser un compteur // 
        compteurReservation = 0
        var temp = ultimateHTMLGenerator("div","",["col-3"],ligne1); //* je créer une colonne et affiche le contenu dans ligne1, pour autant qu'il y a d'élément nom_parking //

        var cards = ultimateHTMLGenerator("div","",["card"],temp); //creation de cards dans les colonnes//
        cards.classList.add("titlecards"); // ajout de la class titlecards dans la cards //

        var cardBody = ultimateHTMLGenerator("div","",["card-body"],cards); //ajout de la class cardbody dans la cards//
        var cardTitle = ultimateHTMLGenerator("h3",mesParkings.GogoParking[i]._NOM_PARKING,["card-title", "iframe"],cardBody); //ajout des noms de parking dans titre h5 "cardTtitle" dans la cardBody//

        var cardText = ultimateHTMLGenerator("p",mesParkings.GogoParking[i]._ADRESSE_PARKING,["card-text"],cardBody); //ajout de paragraphe dans cardbody//
        for (var j=0; j< mesParkings.GogoParking[i]._PLACES.length; j++){ //Pour l'ensemble des places du parking//
            if(mesParkings.GogoParking[i]._PLACES[j]._DISPO === "Disponible" ){ // si place de parking disponible //
                compteurPlace++ //ajouter 1 à compteurPlace //
            }
        }
        
        if(mesParkings.GogoParking[i]._RESERVATION==="oui"){ // si reservation ==="oui" //
            compteurReservation = ultimateHTMLGenerator("p","Réservation disponible",["card-text"],cardBody); //Afficher la reservation possible dans la cards //
        }

        var cardText3 = ultimateHTMLGenerator("p","Nombre de place disponible:"+ compteurPlace+"/"+ mesParkings.GogoParking[i]._NOMBRE_PLACE,["card-text"],cardBody); //ajout de paragraphe3 "nombre de place" dans cardbody//
        var button = ultimateHTMLGenerator("a","+ d'info",["btn","btn-primary"],cardBody); //ajout d'un boutton dans la cardBody//
        button.href = "parking.html"
    }
}
        //Fonction qui génère mes lignes et colonnes//  
function ultimateHTMLGenerator(typeElement,contenu,tableauClassCss,destinationElement){ 
    // on crer un element html donné en paramètre (1er paramètre)
    var ultimateElement = document.createElement(typeElement);
    // on attribut du contenu (paramètre 2) à l'element html précedement fabriqué
    ultimateElement.textContent = contenu;
    // on souhaite ajouter plusieurs class CSS à l'element html précedement créé
    for(var i = 0;i<tableauClassCss.length;i++){
        // on ajoute la class css contenu dans le tableau de class css passé en paramètre 3
        ultimateElement.classList.add(tableauClassCss[i]);
    }
    // on fait apparaitre l'element dans celui passé en 4ème paramètre
    destinationElement.appendChild(ultimateElement);
    return ultimateElement;
} 

function ReadDBParkings(){
    // Création de la variable qui stockera la base de données des héros
    let xhr = new XMLHttpRequest; // Création d'une nouvelle requête XMLHTTP pour aller récupérer la base de données
    xhr.onreadystatechange = function(){ // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){ // Si la requête se termine
            mesParkings = JSON.parse(xhr.responseText); // on récupère le résultat de la requête dans la variable mesHeros, et on la convertit en objet JSON
            Main(); // On exécute la fonction principale
        }
    }
    xhr.open("GET","http://141.94.223.96/Luc/GogoParking/php/DB_READ.php", true); // On indique la méthode (ce que doit faire la requête, dans ce cas récupérer une ressource) et l'adresse de la ressource (fichier php)
    xhr.send(); // On envoie !
}


