<?php
header("Access-Control-Allow-Origin: *"); // permet le debug en local
require('CLASS_PARKING.php'); // Classe Parking, peut-être pas nécessaire dans ce cas
ini_set('display_errors', 1); // affiche toutes les erreurs
error_reporting(E_ALL); // affiche toutes les erreurs

$donnees = json_decode($_POST["create"],true); //On récupère et décode les données du nouveau parking dans un tableau

function add_dbc() {
    global $donnees; // permet de récupérer la variable globale $donnees
    $user = "charley"; // Identifiant BDD
    $pass = "@JuNiRMdv5GZb"; // Mot de passe BDD

    // En premier, on crée le parking (ou quartier) dans la base de données
    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass); // on crée un objet PDO avec l'adresse, identifiant et mdp
        // on prépare notre requête SQL
        $stmt = $dbh->prepare("INSERT INTO `quartiers`(`nom_quartier`, `nom_parking`, `adresse_parking`, `nombre_place`, `tarif`, `heure_ouverture`, `reservation`, `lien_maps`, `img`) VALUES (:nom_quartier, :nom_parking, :adresse_parking, :nombre_place, :tarif, :heure_ouverture, :reservation, :lien_maps, :img)");
        //avec bindParam, on remplace les valeurs indiquées comme ceci :valeur par les vraies valeurs du nouveau parking, en évitant l'injection SQL
        $stmt->bindParam(":nom_quartier", $donnees["nom_quartier"]);
        $stmt->bindParam(":nom_parking", $donnees["nom_parking"]);
        $stmt->bindParam(":adresse_parking", $donnees["adresse_parking"]);
        $stmt->bindParam(":nombre_place", $donnees["nombre_place"]);
        $stmt->bindParam(":tarif", $donnees["tarif"]);
        $stmt->bindParam(":heure_ouverture", $donnees["heure_ouverture"]);
        $stmt->bindParam(":reservation", $donnees["reservation"]);
        $stmt->bindParam(":lien_maps", $donnees["lien_maps"]);
        $stmt->bindParam(":img", $donnees["img"]);
        $stmt->execute(); // On envoie notre requête SQL au serveur
        $id = $dbh->lastInsertId(); // On en profite pour récupérer l'ID de l'enregistrement créé, utilisé pour la suite du script
        $dbh = null; // on vide la requête pour être sûr de ne pas avoir de conflit par la suite
    } catch (PDOException $e) { // s'il y a une erreur quelconque, on exécutera le code suivant
        print "Erreur !: " . $e->getMessage() . "<br/>"; // on affiche le détail de l'erreur
        die(); // et on arrête le script
    }

    // Ensuite, on crée les places d'après le nombre de places indiquées par l'utilisateuer

    for ($index = 1; $index <= $donnees["nombre_place"]; $index++){ // On fait une boucle autant de fois qu'il y a de places
        try {
            // connexion à la base de donnée
            $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass); // on crée un objet PDO avec l'adresse, identifiant et mdp
            // on prépare notre requête SQL
            $stmt = $dbh->prepare("INSERT INTO `places`(`id_quartier`, `num_place`, `dispo`) VALUES (:id,:index, 0)");
            $stmt->bindParam(":id", $id); //on rajoute l'id du quartier (par BindParam, évite les injections SQL)
            $stmt->bindParam(":index", $index); //on indique le numéro de la place(par BindParam, évite les injections SQL)
            $stmt->execute(); // On envoie notre requête SQL au serveur
            $dbh = null;  // on vide la requête pour être sûr de ne pas avoir de conflit par la suite
        } catch (PDOException $e) { // s'il y a une erreur quelconque, on exécutera le code suivant
            print "Erreur !: " . $e->getMessage() . "<br/>"; // on affiche le détail de l'erreur
            die(); // et on arrête le script
        }
    }

    // Puis enfin, on ajoute les caractéristiques liées au parking en liant l'id du parking aux ID des caractéristiques dans la base q_p

    for ($index = 0; $index < count($donnees["caracteristiques"]); $index++){ // On fait une boucle sur le tableau des caractéristiques du nouveau parking
        $decalageID = $index + 1; // on décale l'index pour identifier la caractéristique car l'id en BDD commence à 1, alors qu'il commence à 0 dans le JS...
        if ($donnees["caracteristiques"][$index] == TRUE){ // Si la caractéristique en cours est à TRUE, autrement dit si le parking a cette caractéristique...
            echo("<br> ajout de la caracteristique avec l'id : ".$index); // DEBUG
            try { // ...on va la rajouter !
                // connexion à la base de données
                $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass); // on crée un objet PDO avec l'adresse, identifiant et mdp
                // on prépare notre requête SQL
                $stmt = $dbh->prepare("INSERT INTO `q_p`(`id_quartier`, `id_caracteristique`) VALUES (:id, :index)");
                $stmt->bindParam(":id", $id); //on rajoute l'id du quartier (par BindParam, évite les injections SQL)
                $stmt->bindParam(":index", $decalageID); //on rajoute l'id de la caractéristique (par BindParam, évite les injections SQL)
                $stmt->execute(); // On envoie notre requête SQL au serveur
                $dbh = null;  // on vide la requête
            } catch (PDOException $e) { // s'il y a une erreur quelconque, on exécutera le code suivant
                print "Erreur !: " . $e->getMessage() . "<br/>"; // on affiche le détail de l'erreur
                die(); // et on arrête le script
            }
        }
    }
}

add_dbc(); //on exécute la fonction principale !

?>