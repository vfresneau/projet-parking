<?php
Class CARACTERISTIQUES{

	/*_____________________________ Attributs ________________________________________________*/
	// private $_ID_CARAC;
    private $_DESCRIPTION_CARAC;

	// on va chercher les données d'un id
	public function retrieve_caracteristiques($idparking){
		$user = "charley"; // Identifiant
		$pass = "@JuNiRMdv5GZb"; // Mot de passe
		// 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
		try {
			// connexion à la base de donnée
			$dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
			// envoie d'une requete à la base de données --> on récup le héro correspondant à l'id
			$stmt = $dbh->prepare("SELECT * FROM caracteristiques");
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
			// pour chaque ligne trouvé--> y en à qu'un ici
			while ($row = $stmt->fetch()) {
				// pour appeler une fonction : ->
				$this->set_ID_CARAC($row['id']);
				$this->set_DESCRIPTION_CARAC($row['description']);
			}
			$dbh = null;
		} catch (PDOException $e) {
			print "Erreur !: " . $e->getMessage() . "<br/>";
			die();
		}
	}

    public function get_ID_CARAC(){
		return $this->_ID_CARAC;
	}

	public function set_ID_CARAC($_ID_CARAC){
		$this->_ID_CARAC = $_ID_CARAC;
	}

    public function get_DESCRIPTION_CARAC(){
		return $this->_DESCRIPTION_CARAC;
	}

	public function set_DESCRIPTION_CARAC($_DESCRIPTION_CARAC){
		$this->_DESCRIPTION_CARAC = $_DESCRIPTION_CARAC;
	}


    /*_____________________________  toArray ________________________________________*/
	// permet de créer un json contenant les objets des objets
	public function toArray(){
		$array = get_object_vars($this);
		unset($array['_parent'], $array['_index']);
		array_walk_recursive($array, function (&$property) {
			if (is_object($property) && method_exists($property, 'toArray')) {
				$property = $property->toArray();
			}
		});
		return $array;
	}
}

?>