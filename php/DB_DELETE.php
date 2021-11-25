<?php
header("Access-Control-Allow-Origin: *"); // permet le debug en local
ini_set('display_errors', 1); // affiche toutes les erreurs
error_reporting(E_ALL); // affiche toutes les erreurs

$donnees = json_decode($_POST["delete"],true); //On récupère et décode les données pour obtenir l'id du parking

function delete_dbc() {
    global $donnees; // permet de récupérer la variable globale $donnees
    $user = "charley"; // Identifiant BDD
    $pass = "@JuNiRMdv5GZb"; // Mot de passe BDD

    //* NOTE : l'ordre de suppression des enregistrements dans les BDD est important... Dans le mauvais ordre tout ne sera pas supprimé ! 
    
    //* En premier, on supprime les places du parking

    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass); // on crée un objet PDO avec l'adresse, identifiant et mdp
        // on prépare notre requête SQL
        $stmt = $dbh->prepare("DELETE FROM places WHERE `id_quartier` = :id");
        $stmt->bindParam(':id', $donnees); // on rajoute l'id du quartier (par BindParam, évite les injections SQL)
        $stmt->execute(); // On envoie notre requête SQL au serveur
        $dbh = null; // on vide la requête pour être sûr de ne pas avoir de conflit par la suite
    } catch (PDOException $e) { // s'il y a une erreur quelconque, on exécutera le code suivant
        print "Erreur !: " . $e->getMessage() . "<br/>"; // on affiche le détail de l'erreur
        die(); // et on arrête le script
    }

    //* Ensuite, on supprime les caractéristiques associées au parking

    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass); // on crée un objet PDO avec l'adresse, identifiant et mdp
        // on prépare notre requête SQL
        $stmt = $dbh->prepare("DELETE FROM q_p WHERE `id_quartier` = :id");
        $stmt->bindParam(':id', $donnees); // on rajoute l'id du quartier (par BindParam, évite les injections SQL)
        $stmt->execute(); // On envoie notre requête SQL au serveur
        $dbh = null; // on vide la requête pour être sûr de ne pas avoir de conflit par la suite
    } catch (PDOException $e) { // s'il y a une erreur quelconque, on exécutera le code suivant
        print "Erreur !: " . $e->getMessage() . "<br/>"; // on affiche le détail de l'erreur
        die(); // et on arrête le script
    }

    //* Enfin on supprime le quartier (autrement dit le parking)

    try {
        // connexion à la base de donnée
        $dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass); // on crée un objet PDO avec l'adresse, identifiant et mdp
        // on prépare notre requête SQL
        $stmt = $dbh->prepare("DELETE FROM quartiers WHERE quartiers.id = :id");
        $stmt->bindParam(':id', $donnees); // on rajoute l'id du quartier (par BindParam, évite les injections SQL)
        $stmt->execute(); // On envoie notre requête SQL au serveur
        $dbh = null; // on vide la requête
        echo("delete parking...");
    } catch (PDOException $e) { // s'il y a une erreur quelconque, on exécutera le code suivant
        print "Erreur !: " . $e->getMessage() . "<br/>"; // on affiche le détail de l'erreur
        die(); // et on arrête le script
    }
}

delete_dbc (); // on exécute la fonction principale !

?>