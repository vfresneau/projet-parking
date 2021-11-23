let mesParkings; // Variable qui contiendra la base de données des parkings
let pouet; // variable test, pourra être supprimée


sender (mesParkings,"read",test,"");

function test(){ // FONCTION TEST
    pouet = document.getElementById("main"); // on sélectionne le paragraphe de la page HTML de test
    pouet.textContent = mesParkings.GogoParking[0]._NOM_PARKING;   //On récupère le nom du premier parking
}

function sender(a, operation, fonction, datatosend){
    let xhr = new XMLHttpRequest; // Création d'une nouvelle requête XMLHTTP pour aller récupérer la base de données
    xhr.onreadystatechange = function(){ // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){ // Si la requête se termine
            variableretour = JSON.parse(xhr.responseText); // on récupère le résultat de la requête dans la variable mesHeros, et on la convertit en objet JSON
            test(); // On exécute la fonction principale
        }
    }
    switch (operation){
        case "read":
            xhr.open("GET","http://141.94.223.96/Luc/GogoParking/php/DB_READ.php", true);
            xhr.send();
            break;
        case "delete":
            xhr.open("POST","http://141.94.223.96/Luc/GogoParking/php/DB_DELETE.php", true);
            xhr.send("delete="+encodeURIComponent(JSON.stringify(datatosend)));
            break;
        case "update":
            xhr.open("POST","http://141.94.223.96/Luc/GogoParking/php/DB_UPDATE.php", true);
            xhr.send("update="+encodeURIComponent(JSON.stringify(datatosend)));
            break;
        case "create":
            xhr.open("POST","http://141.94.223.96/Luc/GogoParking/php/DB_CREATE.php", true);
            xhr.send("create="+encodeURIComponent(JSON.stringify(datatosend)));
            break;
    }
}


//! TO DELETE !
// // Fonction de lecture de la base de données (va stocker la base de données dans la variable mesParkings au format JSON)
// function ReadDBParkings(){
//     // Création de la variable qui stockera la base de données des héros
//     let xhr = new XMLHttpRequest; // Création d'une nouvelle requête XMLHTTP pour aller récupérer la base de données
//     xhr.onreadystatechange = function(){ // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
//         if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){ // Si la requête se termine
//             mesParkings = JSON.parse(xhr.responseText); // on récupère le résultat de la requête dans la variable mesHeros, et on la convertit en objet JSON
//             // test(); // On exécute la fonction principale
//         }
//     }
//     xhr.open("GET","http://141.94.223.96/Luc/GogoParking/php/DB_READ.php", true); // On indique la méthode (ce que doit faire la requête, dans ce cas récupérer une ressource) et l'adresse de la ressource (fichier php)
//     xhr.send(); // On envoie !
// }

// // Fonction de MAJ d'un parking (lui passer l'objet parking complet à modifier)
// function UpdateParking(update){
//     let xhrupdate = new XMLHttpRequest; // on crée une variable XMLHTTPRequest pour fabriquer notre requête
//     xhrupdate.open("POST","http://141.94.223.96/Luc/GogoParking/php/DB_UPDATE.php", true); // On utilise la méthode POST pour envoyer des données, sur l'URL du fichier PHP qui permet d'écrire le fichier json
//     xhrupdate.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // On définit les en-têtes pour que l'envoi soit correctement interprété par le serveur
//     xhrupdate.onreadystatechange = function(){ // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
//         if (xhrupdate.readyState == XMLHttpRequest.DONE && xhrupdate.status == 200){ // Si la requête se termine
//             // Fonction(); // On exécute la fonction 
//         }
//     }
//     xhrupdate.send("update="+encodeURIComponent(JSON.stringify(update))); // On envoie notre requête, dans une variable PHP mesHeros à laquelle on rajoute le fichier JSON entier
// }

// // Création d'un nouveau parking (Envoie le résultat de AjoutParking)
// function CreateParking(nouveauParking){
//     let xhrinsert = new XMLHttpRequest; // on crée une variable XMLHTTPRequest pour fabriquer notre requête
//     xhrinsert.open("POST","http://141.94.223.96/Luc/GogoParking/php/DB_CREATE.php", true); // On utilise la méthode POST pour envoyer des données, sur l'URL du fichier PHP qui permet d'écrire le fichier json
//     xhrinsert.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // On définit les en-têtes pour que l'envoi soit correctement interprété par le serveur
//     xhrinsert.onreadystatechange = function(){ // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
//         if (xhrinsert.readyState == XMLHttpRequest.DONE && xhrinsert.status == 200){ // Si la requête se termine
//             // Fonction(); // On exécute la fonction
//         }
//     }
//     xhrinsert.send("create="+encodeURIComponent(JSON.stringify(nouveauParking))); // On envoie notre requête, dans une variable PHP mesHeros à laquelle on rajoute le fichier JSON entier
// }

// Fonction EXEMPLE A MODIFIER !!  pour Ajout d'un parking...

function AjoutParking(){ // ANCIENNEMENT FONCTION AJOUT HEROS...
    var nom = document.getElementById("name").value; // On récupère la valeur contenue dans l'élément de formulaire avec l'id name (le nom saisi par l'utilisateur)
    // var pouvoir = document.getElementById("pouvoir").value; // On récupère la valeur contenue dans l'élément de formulaire avec l'id pouvoir (le pouvoir saisi par l'utilisateur)
    // var photo = document.getElementById("photo").value;
    var address = document.getElementById("address").value;
    var capacity = document.getElementById("capacity").value;
    var nouveauParking = ParkingModel(); // on crée un nouvel objet héros vide en appelant la fonction HeroModel
    nouveauParking.name = "\'"+nom+"\'"; // On attribue le nom saisi par l'utilisateur à ce nouveau héros
    // nouveauParking.powers[0] = pouvoir; // On attribue le pouvoir saisi par l'utilisateur à ce nouveau héros
    // nouveauParking.URL = "\'"+photo+"\'" // mesHeros.members.push(nouveauHero); // On rajoute le nouveau héros créé au tableau des héros existants
    nouveauParking.address = "\'"+address+"\'";
    nouveauParking.capacity = capacity;
    CreateParking(nouveauParking); // On exécute la fonction AddJSON pour enregistrer les changement dans le fichier json sur le serveur
}

// // Fonction de suppression d'un parking, lui passer seulement l'id du parking
// function DeleteParking(parking){
//     let xhrdelete = new XMLHttpRequest; // on crée une variable XMLHTTPRequest pour fabriquer notre requête
//     xhrdelete.open("POST","http://141.94.223.96/Luc/GogoParking/php/DB_DELETE.php", true); // On utilise la méthode POST pour envoyer des données, sur l'URL du fichier PHP qui permet d'écrire le fichier json
//     xhrdelete.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // On définit les en-têtes pour que l'envoi soit correctement interprété par le serveur
//     xhrdelete.onreadystatechange = function(){ // on modifie l'attribut onreadystatechange de notre requête qui permet d'exécuter du code en fonction du changement d'état de la requête
//         if (xhrdelete.readyState == XMLHttpRequest.DONE && xhrdelete.status == 200){ // Si la requête se termine
//             //  FonctionPrincipale(); // On exécute la fonction principale
//         }
//     }
//     xhrdelete.send("delete="+encodeURIComponent(JSON.stringify(parking))); // On envoie notre requête, dans une variable PHP mesHeros à laquelle on rajoute le fichier JSON entier
// }