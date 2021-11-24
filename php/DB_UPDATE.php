<?php
header("Access-Control-Allow-Origin: *");
require('CLASS_PARKING.php');
ini_set('display_errors', 1);
error_reporting(E_ALL);
//CREATE
$donnees = json_decode($_POST["update"],true); //On récupère et d&décode les données du nouveau héros dans un tableau

function update_dbc() {
    global $donnees; // permet de récupérer la variable globale $donnees
    $user = "charley"; // Identifiant
    $pass = "@JuNiRMdv5GZb"; // Mot de passe
    // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
        // envoie d'une requete à la base de données
        $stmt = $dbh->prepare("UPDATE `quartiers` SET `nom_quartier`=".$donnees["nom_quartier"].",`nom_parking`=".$donnees["nom_parking"].",`adresse_parking`=".$donnees["adresse_parking"].",`nombre_place`=".$donnees["nombre_place"].",`tarif`=".$donnees["tarif"].",`heure_ouverture`=".$donnees["heure_ouverture"].",`reservation`=".$donnees["reservation"].",`lien_maps`=".$donnees["lien_maps"].",`img`=".$donnees["img"]." WHERE `id` = ".$donnees["id"]);
        $stmt->execute();
        $dbh = null;

    } catch (PDOException $e) {
        print "Erreur !: " . $e->getMessage() . "<br/>";
        die();
    }
}

update_dbc();

?>