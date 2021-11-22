
 
var park = document.getElementById("quartier"); // permet d'acceder à l'élément HTML avec l'id quartier //
var ligne1 = ultimateHTMLGenerator("div","",["row"],park); //creer une ligne avec l'élément html "row" dans la var "park"//

//var titre = ultimateHTMLGenerator("div","AD",["col-12"],ligne1 ); //ajout de la class cardbody dans la cards//

var button2 = ultimateHTMLGenerator("a","ADMINISTRATEUR",["btn","btn-primary"],ligne1); //ajout d'un boutton dans la cardBody//
button2.href = "gogo_parking.html";


for (var i=0; i< monParking.length; i++){ //Pour l'ensemble des elements du tableau "monParking" * //
    var compteurPlace = 0 ; // creation de variable pour utiliser un compteur // 
    compteurReservation = 0
    var temp = ultimateHTMLGenerator("div","",["col-3"],ligne1); //* je créer une colonne et affiche le contenu dans ligne1, pour autant qu'il y a d'élément nom_parking //

    var cards = ultimateHTMLGenerator("div","",["card"],temp); //creation de cards dans les colonnes//
    cards.classList.add("titlecards"); // ajout de la class titlecards dans la cards //

    var cardBody = ultimateHTMLGenerator("div","",["card-body"],cards); //ajout de la class cardbody dans la cards//
    var cardTitle = ultimateHTMLGenerator("h3",monParking[i].nom_parking,["card-title", "iframe"],cardBody); //ajout des noms de parking dans titre h5 "cardTtitle" dans la cardBody//

    var cardText = ultimateHTMLGenerator("p",monParking[i].adresse_parking,["card-text"],cardBody); //ajout de paragraphe dans cardbody//
  for (var j=0; j< monParking[i].place.length; j++){ //Pour l'ensemble des places du parking//
        if(monParking[i].place[j].dispo === "Disponible" ){ // si place de parking disponible //
            compteurPlace++ //ajouter 1 à compteurPlace //
        }
    }
    
        if(monParking[i].reservation==="oui"){ // si reservation ==="oui" //
            
            compteurReservation = ultimateHTMLGenerator("p","Réservation disponible",["card-text"],cardBody); //Afficher la reservation possible dans la cards //
        }

    

    var cardText3 = ultimateHTMLGenerator("p","Nombre de place disponible:"+ compteurPlace+"/"+ monParking[i].nombre_place,["card-text"],cardBody); //ajout de paragraphe3 "nombre de place" dans cardbody//
    var button = ultimateHTMLGenerator("a","+ d'info",["btn","btn-primary"],cardBody); //ajout d'un boutton dans la cardBody//
      button.href = "administrateur.html"
            

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


