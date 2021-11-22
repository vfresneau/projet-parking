//Permet de savoir si le fichier json parking à bien été chargé
console.log(monParking);

generateDisplay();

// _______________________________ Fonction générant l'affichage des parking ____________________________________________
function generateDisplay(){

    var monContainer = document.getElementById("mon_container");
    // Permet de détruire le contenu avant de la reconstruire (pour l'afficahge de nouveau héro ou la suppression d'un héro)
    monContainer.innerHTML = "";
    
    let ligneRow;
    // Pour chaque parking
    for(var i =0; i < monParking.length; i++){
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

        
        // Fabrication du card body
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
    
        // fabrication  du titre de la carte
        let montitre = document.createElement("h5");
        montitre.textContent = monParking[i].quartier;
        montitre.classList.add("card-title");
        cardBody.appendChild(montitre);
    
        // ajout du card body à la card
        maColonne.appendChild(cardBody);
      
        // Fabrication de la liste à puce
        let maListeAPuce = document.createElement("ul");


        let puce_nom_parking = ultimateHTMLGenerator('li',monParking[i].nom_parking,['nom_parking'],maListeAPuce);
        let puce_adresse_parking =ultimateHTMLGenerator('li',monParking[i].adresse_parking,['adresse_parking'],maListeAPuce);
        let puce_nombre_place =ultimateHTMLGenerator('li',monParking[i].nombre_place + " places",['nom_place'],maListeAPuce);
        let puce_tarif =ultimateHTMLGenerator('li',"Tarif : " + monParking[i].tarif,['tarif'],maListeAPuce);
        let puce_heure_ouverture =ultimateHTMLGenerator('li',"Heure d'ouverture : " + monParking[i].heure_ouverture,['heure_ouverture'],maListeAPuce);
        let puce_reservation =ultimateHTMLGenerator('li',"Réservation : " + monParking[i].reservation,['reservation'],maListeAPuce);
        // let puce_lien_maps =ultimateHTMLGenerator('li',monParking[i].lien_maps,['lien_maps'],maListeAPuce);
       
        // Pour chaque caractéristiques du parking en cours
        for(var j=0; j<monParking[i].caracteristiques.length ;j++){
            // On fabrique un element li
            let puce_caracteristiques = document.createElement("li");
            // le contenu de l'element li est le pouvoir en cours du héro en cours
            puce_caracteristiques.textContent = monParking[i].caracteristiques[j];
            // on ajoute le li a l a liste à puce ul
            maListeAPuce.appendChild(puce_caracteristiques);
        }
        // bouton supprimmer
        let sup = document.createElement("button");
        sup.type="button";
        sup.classList.add("btn");
        sup.classList.add("btn-danger");
        sup.textContent="Supprimer le parking";
        // on donne un id unique au bouton de suppression pour savoir quel id on dois supprimer de la liste
        sup.id = i;
        // On ajoute une fonction sur l'evenement click du bouton
        sup.addEventListener('click', function() {
            // permet de supprimer de la liste le parking qui à pour index l'id du bouton
            monParking.splice(this.id, 1);
            // on refait l'affichage
            generateDisplay();
        });


        // bouton modifier
        let modif = document.createElement("button");
        modif.type="button";
        modif.classList.add("btn");
        modif.classList.add("btn-danger");
        modif.textContent="Modifier";
        // on donne un id unique au bouton de suppression pour savoir quel id on dois supprimer de la liste
        modif.id = j;
        // On ajoute une fonction sur l'evenement click du bouton
        modif.addEventListener('click', modif_park());

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


function modif_park(){

    console.log("test pour luc, mais pas que")
    console.log("test pour luc ok")

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
    monParking.push(nouveauParking);
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
rowJS_2 = ultimateHTMLGenerator("div","",["row"],maGrilleJS);
var maNewCol= ultimateHTMLGenerator("div","",["col", "couleurColonne"],rowJS_2);
ultimateHTMLGenerator("h1", "Batman", [],maNewCol);
*/
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
//_________________________________________________________________________________________

