// création des variables
// variables du clavier
var cursors
var a
var z
var e
var r
var esc
var shift
var space
var lockTouche = false

// variables du joueur
var player
var lifeUI
var playerDegat = false
var playerOpacity = false
var gameOver = false
var munition
var playerLife = 4
var playerVitesse = 300
var majVitesse = 300
var playerGravity = 1500
var playerSaut = 900
var respawnX = 150
var spawnX = 150
var respawnY = 1050
var spawnY = 500
var chute = 1700

// bloc d'affichage des capacités
var capa_Atterrissage
var capa_Coup
var capa_Dash
var capa_Saut
var capa_Tir
var capa_Vol

// bloc d'affichage des armures
var interface_combat
var interface_distance
var interface_vitesse

// voir si la compétence est active
var actif_Atterrisage = false
var actif_Coup = false
var actif_Dash = false
var actif_Saut = false
var actif_Tir = false
var actif_Vol = false

var tir_gauche = false
var tir_droit = false

var dash_droit = false
var dash_gauche = false

// voir si le cooldown est actif
var cld_Atterrisage = false
var cld_Coup = false
var cld_Dash = false
var cld_Saut = false
var cld_Tir = false
var cld_Vol = false

// variables permettant de changer les valeurs des capacités
var cooldownDash = 3000
var tempsDash = 1000
var vitesseDash = 1000

var cooldownSaut = 3000
var tempsSaut = 1
var hauteurSaut = 1000

var cooldownCoup = 3000

var cooldownAtterrissage = 3000
var tempsAtterrissage = 1000
var vitesseAtterrissage = 3000

var cooldownTir = 1000
var vitesseTir = 900
var tempsRecul = 10
var vitesseRecul = 1000

var cooldownVol = 3000
var tempsVol = 1000
var vitesseVol = 200
var chuteVol = 30

// variables permettant de changer les valeurs de l'utilisation de la batterie
var consommation = 10
var regeneration = 20

var activDash = 15
var activSaut = 15
var activAtterrissage = 15
var activCoup = 15
var activVol = 15
var activTir =15

var regenBatterie = 20

// variables pour les ennemis
var position_ennemi_A
var groupe_ennemi_A

var distance
var distanceX
var distanceY

// variables de la carte niveau 2
var tileset
var carteCinematique
var calque_sol
var calque_plateforme
var calque_mur_rouge
var calque_mur_bleu
var calque_mur_vert
var calque_checkpoint

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
var batterie
var position_batterie
var rechargement = false

// variables pour les plateformes mobiles
var plateforme
var position_plateforme

// variables pour les écrans d'interface
var ecranPause
var ecranMort
var boutonPartir
var boutonRecommencer
var boutonReprendre

var message

export class cinematique extends Phaser.Scene {
    constructor() {
        super("cinematique");
    }

    // préchargement de tous les éléments nécessaires au fonctionnement de la scène
    preload() {

        // chargement du background et du foreground
        this.load.image("fond", "asset/cinematique/background_0.png");
        this.load.image("devant", "asset/cinematique/foreground.png");

        // chargement du message
        this.load.image("message", "asset/cinematique/texte.png");

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu", "asset/carte/tileset.png");
        this.load.tilemapTiledJSON("carteCinematique", "asset/carte/cinematique.json");

        // chargement du personnage
        this.load.image("persoBase", "asset/personnage/basique.png");
        this.load.image("persoCombat", "asset/personnage/combat.png");
        this.load.image("persoDistance", "asset/personnage/distance.png");
        this.load.image("persoVitesse", "asset/personnage/vitesse.png");
    }

    // création du niveau
    create() {

        playerLife = 4;
        gameOver = false;
        playerDegat = false;

        combat = false;
        vitesse = false;
        distance = false;
        basique = true;


        // chargement de la carte 
        carteCinematique = this.add.tilemap("carteCinematique");

        // chargement du jeu de tuile
        tileset = carteCinematique.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage du background
        this.add.image(0, 0, "fond").setOrigin(0, 0);

        // affichage des calques
        calque_sol = carteNiveau4.createLayer(
            "sol",
            tileset
        );

        // affichage du personnage
        player = this.physics.add.sprite(spawnX, spawnY, "persoBase");
        player.setGravityY(playerGravity);

        // reprendre l'affichage des calques en mettant le decor
        this.add.image(0, 0, "devant").setOrigin(0, 0);

        // affciher le message
        message = this.add.image(0, 0, "message").setVisible(false).setOrigin(0, 0);

        // afficher les animations du personnage lorsqu'il se déplace

        // création de la détéction du clavier
        cursors = this.input.keyboard.createCursorKeys();

        // intégration des nouvelles touches
        a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // intégrer les commandes d'une manette

        // définir les collisions
        calque_sol.setCollisionByProperty({ solide: true });

        // faire en sorte que le joueur collide avec le sol
        this.physics.add.collider(player, calque_sol);

        // création de la caméra
        // taille de la caméra
        this.cameras.main.setSize(1920, 1080);
        // faire en sorte que la caméra suive le personnage et qu'elle ne sorte pas de l'écran
        this.cameras.main.startFollow(player);
        this.cameras.main.setDeadzone(100, 100);
        this.cameras.main.setBounds(0,0,6400,1280); 
    }

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update() {

        // faire avancer le joeur

        // le stopper

        // afficher le message

        // faire reculer le joueur

        // vérifier la position du joueur pour terminer le niveau
        if (player.x >= 6336) {
            this.sceneOverworld();
        }




    }


    sceneNiveau4() {
        this.scene.start("niveau_4",{
            transfertVie : 4,
            entrance : "retour",
        })
    }


};