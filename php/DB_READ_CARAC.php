<?php
header("Access-Control-Allow-Origin: *");
require('CLASS_PARKING.php');
require('CLASS_PLACES.php');
require('CLASS_CARACTERISTIQUES.php');
ini_set('display_errors', 1);
error_reporting(E_ALL);
//READ

// function get_parkings() {
//     $mesParkings = array();
//     $user = "charley"; // Identifiant
//     $pass = "@JuNiRMdv5GZb"; // Mot de passe
//     // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse local)
//     try {
//         // connexion à la base de donnée
//         $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
//         // envoie d'une requete à la base de données
//         $stmt = $dbh->query("SELECT * from quartiers");
//         // pour chaque ligne trouvé
//         while ($row = $stmt->fetch()) {
//             $leParking = new PARKING();
//             // pour appeler une fonction : ->
//             $leParking->set_ID($row['id']);
//             $leParking->set_NOM_PARKING($row['nom_parking']);
//             $leParking->set_NOM_QUARTIER($row['nom_quartier']);
//             $leParking->set_ADRESSE_PARKING($row['adresse_parking']);
//             $leParking->set_NOMBRE_PLACE($row['nombre_place']);
//             $leParking->set_TARIF($row['tarif']);
//             $leParking->set_HEURE_OUVERTURE($row['heure_ouverture']);
//             $leParking->set_RESERVATION($row['reservation']);
//             $leParking->set_LIEN_MAPS($row['lien_maps']);
//             $leParking->set_IMG($row['img']);
//             $leParking->set_CARACTERISTIQUES(get_carac_by_id($leParking->get_ID($row['id'])));
//             $leParking->set_PLACES(get_places_by_id($leParking->get_ID($row['id'])));

//             array_push($mesParkings, $leParking);   
//         }

//         $monTab = array();
//         $i = 0;
//         // on transforme l'objet en tableau (récursif sur les objets)
//         foreach($mesParkings as $parking){
//             $array = $parking->toArray($parking);
//             $monTab[$i] = $array;
//             $i+=1;
//         }
//         // ob_end_clean();
//         // on transforme le tableau en json pour le javascript
//         $monjSon = '{"GogoParking":'.json_encode($monTab)."}";
//         echo $monjSon;
//         $dbh = null;
//     } catch (PDOException $e) {
//         print "Erreur !: " . $e->getMessage() . "<br/>";
//         die();
//     }
// }

function get_carac() {
    $caracteristiques = array();
    $user = "charley"; // Identifiant
    $pass = "@JuNiRMdv5GZb"; // Mot de passe
    // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse local)
    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
        // envoie d'une requete à la base de données
        $stmt = $dbh->prepare("SELECT * FROM caracteristiques");
        $stmt->execute();
        // pour chaque ligne trouvé
        while ($row = $stmt->fetch()) {
            $carac = new CARACTERISTIQUES();
            // pour appeler une fonction : ->
            $carac->set_DESCRIPTION_CARAC($row['description']);
            array_push($caracteristiques, $carac);   
        }
        $monTabC = array();
        $i = 0;
            
        // on transforme l'objet en tableau (récursif sur les objets)
        foreach($caracteristiques as $caracter){
            $array = $caracter->toArray($caracter);
            $monTabC[$i] = $array;
            $i+=1;
        }
                // ob_end_clean();
        // on transforme le tableau en json pour le javascript
        $monjSon = '{"GogoParking":'.json_encode($monTabC)."}";
        echo $monjSon;
        $dbh = null;
    } catch (PDOException $e) {
        print "Erreur !: " . $e->getMessage() . "<br/>";
        die();
    }
}

get_carac();

?>