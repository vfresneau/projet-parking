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
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=MES_HEROS_LUC', $user, $pass);
        // envoie d'une requete à la base de données
        $request = "DELETE FROM quartiers WHERE quartiers.id = ".$donnees; // on construit la requête, pas obligé de préciser les colonnes mais on le fait parce qu'on est des bons !
        echo $request; //pour debug
        $stmt = $dbh->query($request); // on envoie la purée
        // unlink("../img/".$donnees); // on supprime l'image du héros sur le serveur

    } catch (PDOException $e) {
        print "Erreur !: " . $e->getMessage() . "<br/>";
        die();
    }
}

delete_dbc ();

?>