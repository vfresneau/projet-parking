<?php
header("Access-Control-Allow-Origin: *");
require('CLASS_PARKING.php');
ini_set('display_errors', 1);
error_reporting(E_ALL);
//DELETE
$donnees = json_decode($_POST["delete"],true); //On récupère et décode les données du nouveau héros dans un tableau

function delete_dbc() {
    global $donnees; // permet de récupérer la variable globale $donnees
    $user = "charley"; // Identifiant
    $pass = "@JuNiRMdv5GZb"; // Mot de passe
    // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
        // envoie d'une requete à la base de données
        $stmt = $dbh->prepare("DELETE FROM quartiers WHERE quartiers.id = :id");
        $stmt->bindParam(':id', $donnees);
        $stmt->execute();
        $id = $dbh->lastInsertId();

        $dbh = null;

    } catch (PDOException $e) {
        print "Erreur !: " . $e->getMessage() . "<br/>";
        die();
    }
}

delete_dbc ();

?>