// création des variables
var player
var cursors
var a
var z
var e
var r

// variables de la carte niveau 1
var tileset
var carteNiveau1
var calque_sol
var calque_plateforme
var calque_mur_rouge
var calque_mur_bleu
var calque_mur_vert

// variables pour l'activation de la collision
var collisionBleu
var collisionRouge
var collisionVert

// variables pour les armures
var objCombat
var objDistance
var objVitesse

var combatObtenu = false
var distanceObtenu = false
var vitesseObtenu = false

var basique = true
var vitesse = false
var combat = false
var distance = false

// variables pour la batterie

var rechargement = false

export class niveau_1 extends Phaser.Scene {
    constructor() {
        super("niveau_1");
    }

    // préchargement de tous les éléments nécessaires au fonctionnement de la scène
    preload() {

        // chargement du background
        this.load.image("fond0", "asset/niveau1/background_0.png");
        this.load.image("fond1", "asset/niveau1/background_1.png");
        this.load.image("fond2", "asset/niveau1/background_2.png");
        this.load.image("fond3", "asset/niveau1/background_3.png");
        this.load.image("fond4", "asset/niveau1/background_4.png");

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu", "asset/carte/tileset.png");
        this.load.tilemapTiledJSON("carteNiveau1", "asset/carte/niveau_1.json");

        // chargement de l'interface utilisateur

        // chargement des collectables
        this.load.image("objCombat", "asset/objet/combat.png");
        this.load.image("objVitesse", "asset/objet/vitesse.png");
        this.load.image("objDistance", "asset/objet/distance.png");

        // chargement des plateformes qui bougent

        // chargement du personnage
        this.load.image("persoBase", "asset/personnage/basique.png");
        this.load.image("persoCombat", "asset/personnage/combat.png");
        this.load.image("persoDistance", "asset/personnage/distance.png");
        this.load.image("persoVitesse", "asset/personnage/vitesse.png");

        // chargement des ennemis
    }

    // création du niveau
    create() {

        // chargement de la carte 
        carteNiveau1 = this.add.tilemap("carteNiveau1");

        // chargement du jeu de tuile
        tileset = carteNiveau1.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage du background
        this.add.image(0, 0, "fond0").setOrigin(0, 0);
        this.add.image(0, 0, "fond1").setOrigin(0, 0);
        this.add.image(0, 0, "fond2").setOrigin(0, 0);
        this.add.image(0, 0, "fond3").setOrigin(0, 0);
        this.add.image(0, 0, "fond4").setOrigin(0, 0);

        // affichage des calques
        calque_sol = carteNiveau1.createLayer(
            "sol",
            tileset
        );

        calque_plateforme = carteNiveau1.createLayer(
            "plateforme",
            tileset
        );

        calque_mur_rouge = carteNiveau1.createLayer(
            "mur_rouge",
            tileset
        );

        calque_mur_vert = carteNiveau1.createLayer(
            "mur_vert",
            tileset
        );

        calque_mur_bleu = carteNiveau1.createLayer(
            "mur_bleu",
            tileset
        );

        // affichage du personnage
        player = this.physics.add.sprite(100, 1500, "persoBase");

        // reprendre l'affichage du des calques en mettant le decor

        // afficher les animations du personnage lorsqu'il se déplace

        // affichage des ennemis

        // créer les animations des ennemis

        // afficher les collectables
        objCombat = this.physics.add.image(400, 1500, "objCombat");
        objVitesse = this.physics.add.image(1000, 1500, "objVitesse");
        objDistance = this.physics.add.image(1600, 1500, "objDistance");

        // faire en sorte que les collectables collide avec le sol
        this.physics.add.collider(objCombat, calque_sol);
        this.physics.add.collider(objVitesse, calque_sol);
        this.physics.add.collider(objDistance, calque_sol);

        // faire en sorte que le joueur puisse ramasser les collectables
        this.physics.add.overlap(player, objCombat, this.collecteCombat, null, this);
        this.physics.add.overlap(player, objVitesse, this.collecteVitesse, null, this);
        this.physics.add.overlap(player, objDistance, this.collecteDistance, null, this);

        // création de la détéction du clavier
        cursors = this.input.keyboard.createCursorKeys();

        // intégration des nouvelles touches
        a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // intégrer les commandes d'une manette

        // définir les collisions
        calque_sol.setCollisionByProperty({ solide: true });
        calque_plateforme.setCollisionByProperty({ solide: true });
        calque_mur_rouge.setCollisionByProperty({ solide: true });
        calque_mur_vert.setCollisionByProperty({ solide: true });
        calque_mur_bleu.setCollisionByProperty({ solide: true });

        // faire en sorte que le joueur collide avec le sol
        this.physics.add.collider(player, calque_sol);
        this.physics.add.collider(player, calque_plateforme);

        // créer des collisions que l'on peut désactiver
        collisionRouge = this.physics.add.collider(player, calque_mur_rouge);
        collisionVert = this.physics.add.collider(player, calque_mur_vert);
        collisionBleu = this.physics.add.collider(player, calque_mur_bleu);

        // création de la caméra
        // taille de la caméra
        this.cameras.main.setSize(1920, 1080);
        // faire en sorte que la caméra suive le personnage et qu'elle ne sorte pas de l'écran
        this.cameras.main.startFollow(player);
        this.cameras.main.setDeadzone(100, 100);
        //this.cameras.main.setBounds(0,0,4160,3456);

        // intégrer une jauge
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xffffff, 0.5); // couleur, alpha du fond de la jauge
        this.graphics.fillRect(20, 20, 100, 900).setScrollFactor(0); // position x,y, largeur, hauteur du fond de la jauge
        this.graphics.fillStyle(0xffffff, 1) // couleur de la partie remplie de la jauge
        this.jaugeValeur = -100; //pourcentage de la jauge
        this.jauge = this.graphics.fillRect(20, 20 + 900, 100, 900 * (this.jaugeValeur / 100)).setScrollFactor(0);

        console.log(rechargement)
        console.log(this.jaugeValeur)

    }

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update() {

        // ajout des moyens de déplacement du personnage
        if (cursors.left.isDown) { //si la touche gauche est appuyée
            player.setVelocityX(-1000); //alors vitesse négative en X

        }
        else if (cursors.right.isDown) { //sinon si la touche droite est appuyée
            player.setVelocityX(1000); //alors vitesse positive en X

        }
        else { // sinon
            player.setVelocityX(0); //vitesse nulle

        }
        if (cursors.up.isDown) {
            //si touche haut appuyée ET que le perso touche le sol
            player.setVelocityY(-330); //alors vitesse verticale négative
            //(on saute)
        }

        if (a.isDown && vitesseObtenu == true && this.jaugeValeur < 0 && rechargement == false) {
            this.armureVitesse();
        }

        if (z.isDown && combatObtenu == true && this.jaugeValeur < 0 && rechargement == false) {
            this.armureCombat();
        }

        if (e.isDown && distanceObtenu == true && this.jaugeValeur < 0 && rechargement == false) {
            this.armureDistance();
        }

        if (r.isDown) {
            this.formeBasique();
        }

        // vérifier quelle armure est activée pour traverser les murs
        // armure vitesse
        if (vitesse == true) {
            collisionBleu.active = false;
        }
        if (vitesse == false) {
            collisionBleu.active = true;
        }

        // armure combat
        if (combat == true) {
            collisionVert.active = false;
        }
        if (combat == false) {
            collisionVert.active = true;
        }

        // armure distance
        if (distance == true) {
            collisionRouge.active = false;
        }
        if (distance == false) {
            collisionRouge.active = true;
        }

        // vérifier la position du joueur pour terminer le niveau
        if (player.x >= 10000) {
            this.sceneOverworld();
        }

        // vérifier si une armure est activé pour faire perdre de l'énergie sur la jauge
        if (distance == true || combat == true || vitesse == true) {
            this.jaugeValeur = this.jaugeValeur + 10 / 60; // 1/60 pour 1% par seconde
            this.majJauge();
        }

        // vérifier si la jauge est vide, remettre l'armure de base
        if (this.jaugeValeur >= 0) {
            player.setTexture("persoBase")
            basique = true;
            distance = false;
            combat = false;
            vitesse = false;
            this.jaugeValeur = 0;

            rechargement = true;

        }

        if (this.jaugeValeur < -100) {
            this.jaugeValeur = -100
            rechargement = false
        }

        if (rechargement == true) {
            this.jaugeValeur = this.jaugeValeur - 20 / 60;
            this.majJauge();
        }

    }

    majJauge() {
        this.graphics.clear();
        this.graphics.fillStyle(0xffffff, 0.5); // couleur, alpha du fond de la jauge
        this.graphics.fillRect(20, 20, 100, 900).setScrollFactor(0); // position x,y, largeur, hauteur du fond de la jauge
        this.graphics.fillStyle(0xffffff, 1) // couleur de la partie remplie de la jauge
        this.jauge = this.graphics.fillRect(20, 20 + 900, 100, 900 * (this.jaugeValeur / 100)).setScrollFactor(0);
    }

    collecteVitesse() {
        objVitesse.disableBody(true, true);
        vitesseObtenu = true;
    }

    collecteCombat() {
        objCombat.disableBody(true, true);
        combatObtenu = true;
    }

    collecteDistance() {
        objDistance.disableBody(true, true);
        distanceObtenu = true;
    }

    armureVitesse() {
        player.setTexture("persoVitesse")
        vitesse = true
        basique = false
        combat = false
        distance = false
    }

    armureCombat() {
        player.setTexture("persoCombat")
        combat = true
        basique = false
        vitesse = false
        distance = false
    }

    armureDistance() {
        player.setTexture("persoDistance")
        distance = true
        basique = false
        combat = false
        vitesse = false
    }

    formeBasique() {
        player.setTexture("persoBase")
        basique = true
        distance = false
        combat = false
        vitesse = false
    }

    HorsService() {
        player.setTexture("persoBase")
        basique = true
        distance = false
        combat = false
        vitesse = false
        this.jaugeValeur = 0
    }

    sceneOverworld() {
        this.scene.start("overworld")
    }

};