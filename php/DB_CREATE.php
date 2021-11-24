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
        $stmt = $dbh->prepare("INSERT INTO `quartiers`(`nom_quartier`, `nom_parking`, `adresse_parking`, `nombre_place`, `tarif`, `heure_ouverture`, `reservation`, `lien_maps`, `img`) VALUES (".$donnees["nom_quartier"].", ".$donnees["nom_parking"].", ".$donnees["adresse_parking"].", ".$donnees["nombre_place"].", ".$donnees["tarif"].", ".$donnees["heure_ouverture"].", ".$donnees["reservation"].", ".$donnees["lien_maps"].", ".$donnees["img"].")");
        $stmt->execute();
        $id = $dbh->lastInsertId();
        echo($donnees["nom_quartier"]);
        $dbh = null;
    } catch (PDOException $e) {
        print "Erreur !: " . $e->getMessage() . "<br/>";
        die();
    }

    echo($id);
    for ($index = 1; $index <= $donnees["nombre_place"]; $index++){
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
            // envoie d'une requete à la base de données
            $stmt = $dbh->prepare("INSERT INTO `places`(`id_quartier`, `num_place`, `dispo`) VALUES (".$id.", ".$index.", 0)");
            $stmt->execute();
            $dbh = null;
            echo("place créée : ".$index);
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}

add_dbc();

?>