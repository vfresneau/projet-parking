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

    for (var i=0; i<monParking[0].place.length; i++){
        var colonne1 = document.createElement("div");
        colonne1.classList.add("col");
        colonne1.classList.add("a");
        ligne1.appendChild(colonne1);
        colonne1.textContent = monParking[0].place[i].heure_derniere_ut+" "+monParking[0].place[i].dispo ;
        colonne1.id = compteur;
            
        if (monParking[0].place[i].dispo=="Occupée"){ 
            colonne1.classList.add("rouge");

        }
    }
}

quartier.textContent = monParking[0].quartier;
nom.textContent = monParking[0].nom_parking;
adresse.textContent = "Adresse : "+monParking[0].adresse_parking;
nombre.textContent = "Places : "+ monParking[0].nombre_place;
tariff.textContent = "Tarif : "+ monParking[0].tarif;
heure.textContent = "Heure d'ouverture : "+monParking[0].heure_ouverture;
reservationn.textContent = "Reservation : "+monParking[0].reservation;
caracteristique.textContent = "Restriction : "+monParking[0].caractéristiques;

google.src = monParking[0].lien_maps;
google.classList.add("centrer");
col12.appendChild(google);



