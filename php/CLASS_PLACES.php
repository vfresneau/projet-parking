<?php
Class PLACES{

	/*_____________________________ Attributs ________________________________________________*/
	// private $_ID_PLACE;
    // private $_ID_QUARTIER;
    private $_NUM_PLACE;
    private $_HEURE_DERNIERE_UT;
    private $_DISPO;

	// on va chercher les données d'un id
	public function retrieve_places(){
		$user = "charley"; // Identifiant
		$pass = "@JuNiRMdv5GZb"; // Mot de passe
		// 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
		try {
			// connexion à la base de donnée
			$dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
			// envoie d'une requete à la base de données --> on récup le héro correspondant à l'id
			$stmt = $dbh->prepare("SELECT * from places");
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
			// pour chaque ligne trouvé--> y en à qu'un ici
			while ($row = $stmt->fetch()) {
				// pour appeler une fonction : ->
				// $this->set_ID_PLACE($row['id']);
				// $this->set_ID_QUARTIER($row['id_quartier']);
				$this->set_NUM_PLACE($row['num_place']);
				$this->set_HEURE_DERNIERE_UT($row['heure_derniere_ut']);
				$this->set_DISPO($row['dispo']);
			}
			$dbh = null;
		} catch (PDOException $e) {
			print "Erreur !: " . $e->getMessage() . "<br/>";
			die();
		}
	}

    public function get_ID_PLACE(){
		return $this->_ID_PLACE;
	}

	public function set_ID_PLACE($_ID_PLACE){
		$this->_ID_PLACE = $_ID_PLACE;
	}
    public function get_ID_QUARTIER(){
		return $this->_ID_QUARTIER;
	}

	public function set_ID_QUARTIER($_ID_QUARTIER){
		$this->_ID_QUARTIER = $_ID_QUARTIER;
	}

    public function get_NUM_PLACE(){
		return $this->_NUM_PLACE;
	}

	public function set_NUM_PLACE($_NUM_PLACE){
		$this->_NUM_PLACE = $_NUM_PLACE;
	}

    public function get_HEURE_DERNIERE_UT(){
		return $this->_HEURE_DERNIERE_UT;
	}

	public function set_HEURE_DERNIERE_UT($_HEURE_DERNIERE_UT){
		$this->_HEURE_DERNIERE_UT = $_HEURE_DERNIERE_UT;
	}

    public function get_NOMBRE_PLACE(){
		return $this->_NOMBRE_PLACE;
	}

	public function set_NOMBRE_PLACE($_NOMBRE_PLACE){
		$this->_NOMBRE_PLACE = $_NOMBRE_PLACE;
	}

    public function get_DISPO(){
		return $this->_DISPO;
	}

	public function set_DISPO($_DISPO){
		$this->_DISPO = $_DISPO;
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