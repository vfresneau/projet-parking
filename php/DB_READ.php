<?php
header("Access-Control-Allow-Origin: *");
require('CLASS_PARKING.php');
require('CLASS_PLACES.php');
require('CLASS_CARACTERISTIQUES.php');
ini_set('display_errors', 1);
error_reporting(E_ALL);
//READ

function get_parkings() {
    $mesParkings = array();
    $user = "charley"; // Identifiant
    $pass = "@JuNiRMdv5GZb"; // Mot de passe
    // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse local)
    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
        // envoie d'une requete à la base de données
        $stmt = $dbh->query("SELECT * from quartiers");
        // pour chaque ligne trouvé
        while ($row = $stmt->fetch()) {
            $leParking = new PARKING();
            // pour appeler une fonction : ->
            $leParking->set_ID($row['id']);
            $leParking->set_NOM_PARKING($row['nom_parking']);
            $leParking->set_NOM_QUARTIER($row['nom_quartier']);
            $leParking->set_ADRESSE_PARKING($row['adresse_parking']);
            $leParking->set_NOMBRE_PLACE($row['nombre_place']);
            $leParking->set_TARIF($row['tarif']);
            $leParking->set_HEURE_OUVERTURE($row['heure_ouverture']);
            $leParking->set_RESERVATION($row['reservation']);
            $leParking->set_LIEN_MAPS($row['lien_maps']);
            $leParking->set_IMG($row['img']);
            $leParking->set_CARACTERISTIQUES(get_carac_by_id($leParking->get_ID($row['id'])));
            $leParking->set_PLACES(get_places_by_id($leParking->get_ID($row['id'])));

            array_push($mesParkings, $leParking);   
        }

        $monTab = array();
        $i = 0;
        // on transforme l'objet en tableau (récursif sur les objets)
        foreach($mesParkings as $parking){
            $array = $parking->toArray($parking);
            $monTab[$i] = $array;
            $i+=1;
        }
        // ob_end_clean();
        // on transforme le tableau en json pour le javascript
        $monjSon = '{"GogoParking":'.json_encode($monTab)."}";
        echo $monjSon;
        $dbh = null;
    } catch (PDOException $e) {
        print "Erreur !: " . $e->getMessage() . "<br/>";
        die();
    }
}

function get_carac_by_id($idquartier) {
    $caracteristiques = array();
    $user = "charley"; // Identifiant
    $pass = "@JuNiRMdv5GZb"; // Mot de passe
    // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse local)
    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
        // envoie d'une requete à la base de données
        $stmt = $dbh->prepare("SELECT c.description, q.nom_quartier from caracteristiques c, quartiers q, q_p qp where qp.id_quartier = q.id and qp.id_caracteristique = c.id and q.id = :id");
        $stmt->bindParam(':id', $idquartier);
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
        return $monTabC;  
    } catch (PDOException $e) {
        print "Erreur !: " . $e->getMessage() . "<br/>";
        die();
    }
}

function get_places_by_id($idquartier) {
    $mesPlaces = array();
    $user = "charley"; // Identifiant
    $pass = "@JuNiRMdv5GZb"; // Mot de passe
    // 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant exécuté sur le serveur, l'adresse du serveur est donc l'adresse local)
    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
        // envoie d'une requete à la base de données
        $stmt = $dbh->prepare("SELECT p.num_place, p.dispo, p.heure_derniere_ut FROM places p, quartiers q WHERE p.id_quartier = q.id AND q.id = :id");
        $stmt->bindParam(':id', $idquartier);
        $stmt->execute();
        // pour chaque ligne trouvé
        while ($row = $stmt->fetch()) {
            $laPlace = new PLACES();
            // pour appeler une fonction : ->
            $laPlace->set_NUM_PLACE($row['num_place']);
            $laPlace->set_HEURE_DERNIERE_UT($row['heure_derniere_ut']);
            $laPlace->set_DISPO($row['dispo']);

            array_push($mesPlaces, $laPlace);   
        }
        $monTab = array();
        $i = 0;
            
        // on transforme l'objet en tableau (récursif sur les objets)
        foreach($mesPlaces as $place){
            $array = $place->toArray($place);
            $monTab[$i] = $array;
            $i+=1;
        }  
        return $monTab;
    } catch (PDOException $e) {
        print "Erreur !: " . $e->getMessage() . "<br/>";
        die();
    }
}

get_parkings();

?>