// variables du joueur
var player
var playerDegat = false
var gameOver = false
var playerLife = 4
var playerGravity = 1500
var spawnX = 50
var spawnY = 600

// variables de la carte niveau 2
var tileset
var carteCinematique
var calque_sol

// variables du message
var message

// variable sur l'état du joueur
var avancer = false
var reculer = false

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
        calque_sol = carteCinematique.createLayer(
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


        avancer = false
        reculer = false

        // faire avancer le joeur
        this.time.delayedCall(3000, () => {
            avancer = true
        });

        this.time.delayedCall(10500, () => {
            avancer = false
        });

        this.time.delayedCall(12000, () => {
            message.setVisible(true);
        });

        this.time.delayedCall(15000, () => {
            reculer = true
        });
    }

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update() {


        console.log(avancer)

        console.log(reculer)

        // faire une pause au joueur
        if (avancer == false && reculer == false){
            player.setVelocityX(0)
        }

        // faire reculer le joueur
        if (reculer == true && avancer == false){
            player.setVelocityX(-300);
        }

        // faire avancer le joueur
        if (avancer == true && reculer == false){
            player.setVelocityX(100);
        }

        // le stopper

        // afficher le message

        // faire reculer le joueur

        // vérifier la position du joueur pour terminer le niveau
        if (player.x <= -50) {
            this.sceneNiveau4();
        }

    }


    sceneNiveau4() {
        this.scene.start("niveau_4",{
            transfertVie : 4,
            entrance : "retour",
        })
    }


};