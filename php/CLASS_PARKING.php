<?php
Class PARKING{

	/*_____________________________ Attributs ________________________________________________*/
	private $_ID;
    private $_NOM_QUARTIER;
    private $_NOM_PARKING;
    private $_ADRESSE_PARKING;
    private $_NOMBRE_PLACE;
    private $_TARIF;
    private $_HEURE_OUVERTURE;
    private $_RESERVATION;
    private $_LIEN_MAPS;
    private $_IMG;

	// on va chercher les données d'un id
	public function retrieve_parkings(){
		$user = "charley"; // Identifiant
		$pass = "@JuNiRMdv5GZb"; // Mot de passe
		// 127.0.0.1 est l'adresse ip local du serveur (le fichier php étant executer sur le serveur, l'adresse du serveur est donc l'adresse local)
		try {
			// connexion à la base de donnée
			$dbh = new PDO('mysql:host=127.0.0.1;dbname=GogoParking', $user, $pass);
			// envoie d'une requete à la base de données --> on récup le héro correspondant à l'id
			$stmt = $dbh->prepare("SELECT * from quartiers");
			$stmt->bindParam(':id', $this->_ID);
			$stmt->execute();
			// pour chaque ligne trouvé--> y en à qu'un ici
			while ($row = $stmt->fetch()) {
				// pour appeler une fonction : ->
				$this->set_ID($row['id']);
				$this->set_NOM_QUARTIER($row['nom_quartier']);
				$this->set_NOM_PARKING($row['nom_parking']);
				$this->set_ADRESSE_PARKING($row['adresse_parking']);
				$this->set_NOMBRE_PLACE($row['nombre_place']);
				$this->set_TARIF($row['tarif']);
				$this->set_HEURE_OUVERTURE($row['heure_ouverture']);
				$this->set_RESERVATION($row['reservation']);
				$this->set_LIEN_MAPS($row['lien_maps']);
				$this->set_IMG($row['img']);
			}
			$dbh = null;
		} catch (PDOException $e) {
			print "Erreur !: " . $e->getMessage() . "<br/>";
			die();
		}
	}

    public function get_LIEN_MAPS(){
		return $this->_LIEN_MAPS;
	}

	public function set_LIEN_MAPS($_LIEN_MAPS){
		$this->_LIEN_MAPS = $_LIEN_MAPS;
	}

    public function get_IMG(){
		return $this->_IMG;
	}

	public function set_IMG($_IMG){
		$this->_IMG = $_IMG;
	}


    public function get_ID(){
		return $this->_ID;
	}

	public function set_ID($_ID){
		$this->_ID = $_ID;
	}

    public function get_QUARTIER(){
		return $this->_QUARTIER;
	}

	public function set_NOM_QUARTIER($_NOM_QUARTIER){
		$this->_NOM_QUARTIER = $_NOM_QUARTIER;
	}

	public function get_NOM_PARKING(){
		return $this->_NOM_PARKING;
	}

	public function set_NOM_PARKING($_NOM_PARKING){
		$this->_NOM_PARKING = $_NOM_PARKING;
	}

	public function get_ADRESSE_PARKING(){
		return $this->_ADRESSE_PARKING;
	}

    public function set_ADRESSE_PARKING($_ADRESSE_PARKING){
		$this->_ADRESSE_PARKING = $_ADRESSE_PARKING;
	}

    public function get_NOMBRE_PLACE(){
		return $this->_NOMBRE_PLACE;
	}

	public function set_NOMBRE_PLACE($_NOMBRE_PLACE){
		$this->_NOMBRE_PLACE = $_NOMBRE_PLACE;
	}

    public function get_TARIF(){
		return $this->_TARIF;
	}

	public function set_TARIF($_TARIF){
		$this->_TARIF = $_TARIF;
	}

    public function get_HEURE_OUVERTURE(){
		return $this->_HEURE_OUVERTURE;
	}

	public function set_HEURE_OUVERTURE($_HEURE_OUVERTURE){
		$this->_HEURE_OUVERTURE = $_HEURE_OUVERTURE;
	}

    public function get_RESERVATION(){
		return $this->_RESERVATION;
	}

	public function set_RESERVATION($_RESERVATION){
		$this->_RESERVATION = $_RESERVATION;
	}

    public function get_CARACTERISTIQUES(){
		return $this->_CARACTERISTIQUES;
	}

	public function set_CARACTERISTIQUES($_CARACTERISTIQUES){
		$this->_CARACTERISTIQUES = $_CARACTERISTIQUES;
	}

    public function get_PLACES(){
		return $this->_PLACES;
	}

	public function set_PLACES($_PLACES){
		$this->_PLACES = $_PLACES;
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