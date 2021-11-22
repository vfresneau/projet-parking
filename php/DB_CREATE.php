<?php
header("Access-Control-Allow-Origin: *");
require('CLASS_PARKING.php');
ini_set('display_errors', 1);
error_reporting(E_ALL);
//CREATE
$donnees = json_decode($_POST["create"],true); //On récupère et décode les données du nouveau héros dans un tableau

function add_dbc() {
    global $donnees; // permet de récupérer la variable globale $donnees
    $user = "charley"; // Identifiant
    $pass = "@JuNiRMdv5GZb"; // Mot de passe
    // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
        // envoie d'une requete à la base de données
        $donnees = implode(',',$donnees); // on concatène le tableau en chaîne, la requête par PDO ne permet pas d'accéder directement aux éléments du tableau...
        $request = "INSERT INTO `quartiers`(`nom_quartier`, `nom_parking`, `adresse_parking`, `nombre_place`, `tarif`, `heure_ouverture`, `reservation`, `lien_maps`) VALUES ($donnees)"; // on construit la requête, pas obligé de préciser les colonnes mais on le fait parce qu'on est des bons !
        echo $request; //pour debug
        $stmt = $dbh->query($request); // on envoie la purée

    } catch (PDOException $e) {
        print "Erreur !: " . $e->getMessage() . "<br/>";
        die();
    }
}

add_dbc();

?>