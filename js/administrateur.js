var mesParkings; // Variable qui contiendra la BDD des Parkings

ReadDBParkings(); // on lit la BDD et on exécute la fonction principale generateDisplay

// _______________________________ Fonction générant l'affichage des parking ____________________________________________
function generateDisplay(){

    var monContainer = document.getElementById("mon_container");
    // Permet de détruire le contenu avant de la reconstruire (pour l'afficahge de nouveau héro ou la suppression d'un héro)
    monContainer.innerHTML = "";
    
    let ligneRow;
    // Pour chaque parking
    for(var i =0; i < mesParkings.GogoParking.length; i++){
        if(i%2 == 0){
            ligneRow = document.createElement("div");
            ligneRow.classList.add("row");
            monContainer.appendChild(ligneRow);
        }
    
        // fabrication de la colonne
        let maColonne = document.createElement("div");
        maColonne.classList.add("col-6");
        maColonne.classList.add("card");
        // maColonne.classList.add("text-white");
        // maColonne.classList.add("bg-dark");
        // maColonne.classList.add("h-100");
        maColonne.id = i;
        
        // Fabrication du card body
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
    
        // fabrication  du titre de la carte
        let montitre = document.createElement("h5");
        montitre.textContent = mesParkings.GogoParking[i]._NOM_QUARTIER;
        montitre.classList.add("card-title");
        cardBody.appendChild(montitre);
    
        // ajout du card body à la card
        maColonne.appendChild(cardBody);
      
        // Fabrication de la liste à puce
        let maListeAPuce = document.createElement("ul");


        let puce_nom_parking = ultimateHTMLGenerator('li',mesParkings.GogoParking[i]._NOM_PARKING,['nom_parking'],i+"nom_parking",maListeAPuce);
        let puce_adresse_parking =ultimateHTMLGenerator('li',mesParkings.GogoParking[i]._ADRESSE_PARKING,['adresse_parking'],i+"adresse_parking",maListeAPuce);
        let puce_nombre_place =ultimateHTMLGenerator('li',mesParkings.GogoParking[i]._NOMBRE_PLACE + " places",['nom_place'],i+"nombre_place",maListeAPuce);
        let puce_tarif =ultimateHTMLGenerator('li',"Tarif : " + mesParkings.GogoParking[i]._TARIF,['tarif'],i+"tarif",maListeAPuce);
        let puce_heure_ouverture =ultimateHTMLGenerator('li',"Heure d'ouverture : " + mesParkings.GogoParking[i]._HEURE_OUVERTURE,['heure_ouverture'],i+"heure_ouverture",maListeAPuce);
        let puce_reservation =ultimateHTMLGenerator('li',"Réservation : " + mesParkings.GogoParking[i]._RESERVATION,['reservation'],i+"reservation",maListeAPuce);
        // let puce_lien_maps =ultimateHTMLGenerator('li',mesParkings.GogoParking[i]._LIEN_MAPS,['lien_maps'],"",maListeAPuce);
       
        // Pour chaque caractéristiques du parking en cours
        for(var j=0; j<mesParkings.GogoParking[i]._CARACTERISTIQUES.length ;j++){
            // On fabrique un element li
            let puce_caracteristiques = ultimateHTMLGenerator('li',mesParkings.GogoParking[i]._CARACTERISTIQUES[j]._DESCRIPTION_CARAC,"",i.toString()+j.toString()+"caracteristiques",maListeAPuce);
        }
        
        // bouton supprimmer
        let sup = document.createElement("button");
        sup.type="button";
        sup.classList.add("btn");
        sup.classList.add("btn-danger");
        sup.textContent="Supprimer le parking";
        // on donne un id unique au bouton de suppression pour savoir quel id on dois supprimer de la liste
        // sup.id = i;
        // On ajoute une fonction sur l'evenement click du bouton
        sup.addEventListener('click', function() {
            // permet de supprimer de la liste le parking qui à pour index l'id du bouton
            mesParkings.GogoParking.splice(this.id, 1);
            // on refait l'affichage
            generateDisplay();
        });


        // bouton modifier
        let modif = document.createElement("button");
        modif.type="button";
        modif.classList.add("btn");
        modif.classList.add("btn-danger");
        modif.textContent="Modifier";
        modif.onclick = function(){Modification(maColonne.id);};

        // on donne un id unique au bouton de suppression pour savoir quel id on dois supprimer de la liste
        modif.id = i+"button";
        // On ajoute une fonction sur l'evenement click du bouton
        // modif.addEventListener('click', modif_park());



        // fabrication du texte
        let cardText = document.createElement("p");
        cardText.classList.add("card-text");
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

// Fonction de modification d'une fiche parking

function Modification(id){
    var carte = document.getElementById(id);
    if (carte.lastChild.lastChild.textContent == "Modifier"){
        // var Group = ultimateHTMLGenerator("div","","input-group",id+"group","");
        for (z = 0; z < carte.lastChild.firstChild.children.length;z++){
            var element = ultimateHTMLGenerator("input",carte.lastChild.firstChild.children[0].textContent,["form-control"],carte.lastChild.firstChild.children[0].id);
            carte.lastChild.firstChild.children[0].remove();
            carte.lastChild.firstChild.appendChild(element);
        }
        // carte.lastChild.firstChild.appendChild(Group);
        carte.lastChild.lastChild.textContent = "Enregistrer";
    
    } else {
        for (z = 0; z < carte.lastChild.firstChild.children.length;z++){
            var element2 = ultimateHTMLGenerator("li",carte.lastChild.firstChild.children[0].value,[],carte.lastChild.firstChild.children[0].id)
            carte.lastChild.firstChild.children[0].remove();
            carte.lastChild.firstChild.appendChild(element2);
        }
        // carte.lastChild.firstChild.appendChild(liste);
        carte.lastChild.lastChild.textContent = "Modifier";
    }

}

// _______________________________ Fonction de création de parking depuis le HTML ____________________________________________
function CreerParking(){
    // On récupère les valeurs des inputs depuis le html
    var quartier = document.getElementById("quartier").value;
    var nom_quartier = document.getElementById("nom_quartier").value;
    var adresse_parking = document.getElementById("adresse_parking").value;
    var nombre_place = document.getElementById("nombre_place").value;
    var tarif = document.getElementById("tarif").value;
    var heure_ouverture = document.getElementById("heure_ouverture").value;
    var reservation = document.getElementById("reservation").value;
    var url_map = document.getElementById("url").value;
    var caracteristiques1 = document.getElementById("caracteristiques1").value;
    var caracteristiques2 = document.getElementById("caracteristiques2").value;
    var caracteristiques3 = document.getElementById("caracteristiques3").value;

    var caracteristiques = [caracteristiques1,caracteristiques2,caracteristiques3];

    // On fabrique un model vide de parking
    var nouveauParking = ParkingModel();
    // On change les valeurs avant vide par le contenu des inputs
    nouveauParking.quartier = quartier;
    nouveauParking.nom_quartier = nom_quartier;
    nouveauParking.adresse_parking = adresse_parking;
    nouveauParking.nombre_place = nombre_place;
    nouveauParking.tarif = tarif;
    nouveauParking.heure_ouverture = heure_ouverture;
    nouveauParking.reservation = reservation;
    nouveauParking.lien_maps = url_map;
    nouveauParking.caracteristiques = caracteristiques;


    
    // On ajoute à la liste des parking du json un nouveau parking fraichement créé
    mesParkings.GogoParking.push(nouveauParking);
    // On regénére l'affichage pour prendre en compte le nouveau parking
    generateDisplay();
}

// _______________________________ Fonction générant un parking vide ____________________________________________
function ParkingModel(){
    return {
        "quartier":"",
        "nom_parking":"",
        "adresse_parking":"",
        "nombre_place":0,
        "tarif":"",
        "heure_ouverture":"",
        "reservation":"",
        "lien_maps":"",
        "caracteristiques":[]
    
    };
}

//__________________Fonction permettant de faire apparaitre le formulaire en cliquant sur le bouton _______________________
function afficherFormulaire(){
    var mes_formulaires = document.getElementById("mes_formulaires");
    var mon_bouton = document.getElementById("formulaire");
    mes_formulaires.style.display="block";
    mon_bouton.style.display="none";
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
function ultimateHTMLGenerator(typeElement,contenu,tableauClassCss,id,destinationElement){
    // on crer un element html donné en paramètre (1er paramètre)
    var ultimateElement = document.createElement(typeElement);
    // on attribut du contenu (paramètre 2) à l'element html précedement fabriqué
    ultimateElement.textContent = contenu;
    ultimateElement.value = contenu;
    // on souhaite ajouter plusieurs class CSS à l'element html précedement créé
    for(var i = 0;i<tableauClassCss.length;i++){
        // on ajoute la class css contenu dans le tableau de class css passé en paramètre 3
        ultimateElement.classList.add(tableauClassCss[i]);
    }
    ultimateElement.id = id;
    // on fait apparaitre l'element dans celui passé en 4ème paramètre
    if (destinationElement != null){
        destinationElement.appendChild(ultimateElement);
    }
    return ultimateElement;
} 
//_________________________________________________________________________________________

function ReadDBParkings(){
    // Création de la variable qui stockera la base de données des héros
    let xhr = new XMLHttpRequest; // Création d'une nouvelle requête XMLHTTP pour aller récupérer la base de données
    xhr.onreadystatechange = function(){ // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){ // Si la requête se termine
            mesParkings = JSON.parse(xhr.responseText); // on récupère le résultat de la requête dans la variable mesHeros, et on la convertit en objet JSON
            generateDisplay(); // On exécute la fonction principale
        }
    }
    xhr.open("GET","http://141.94.223.96/Luc/GogoParking/php/DB_READ.php", true); // On indique la méthode (ce que doit faire la requête, dans ce cas récupérer une ressource) et l'adresse de la ressource (fichier php)
    xhr.send(); // On envoie !
}