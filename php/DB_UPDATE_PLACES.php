<?php
header("Access-Control-Allow-Origin: *"); // permet le debug en local
require('CLASS_PARKING.php'); // Classe Parking, peut-être pas nécessaire dans ce cas
ini_set('display_errors', 1); // affiche toutes les erreurs
error_reporting(E_ALL); // affiche toutes les erreurs

$donnees = json_decode($_POST["update_places"],true); //On récupère et décode les données du parking dans un tableau

function update_place_dbc() {
    global $donnees; // permet de récupérer la variable globale $donnees
    $user = "charley"; // Identifiant BDD
    $pass = "@JuNiRMdv5GZb"; // Mot de passe BDD
    
    //* On met à jour les infos de place individuelle d'un parking
    
    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass); // on crée un objet PDO avec l'adresse, identifiant et mdp
        // on prépare notre requête SQL
        $stmt = $dbh->prepare("UPDATE `places` SET `dispo`=:dispo WHERE `id_quartier` = :id_quartier AND `num_place` = :num_place");
        //avec bindParam, on remplace les valeurs indiquées comme ceci :valeur par les vraies valeurs du parking, en évitant l'injection SQL
        $stmt->bindParam(":id_quartier",$donnees["id_quartier"]);
        $stmt->bindParam(":num_place",$donnees["num_place"]);
        $stmt->bindParam(":dispo",$donnees["dispo"]);

        $stmt->execute(); // On envoie notre requête SQL au serveur
        $dbh = null; // on vide la requête pour être sûr de ne pas avoir de conflit par la suite

    } catch (PDOException $e) { // s'il y a une erreur quelconque, on exécutera le code suivant
        print "Erreur !: " . $e->getMessage() . "<br/>"; // on affiche le détail de l'erreur
        die(); // et on arrête le script
    }
}

update_place_dbc();

?>