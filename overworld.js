// création des variables
var player
var cursors
var tileset
var enter

// variables du joueur
var player
var lifeUI
var playerDegat = false
var playerOpacity = false
var gameOver = false
var munition
var playerLife = 4
var playerVitesse = 500
var majVitesse = 300
var playerGravity = 1500
var playerSaut = 900
var respawnX = 100
var respawnY = 1100

// variables de la carte overworld
var carteOverworld
var calque_sol
var calque_niveau_1
var calque_niveau_2
var calque_niveau_3
var calque_niveau_4

export class overworld extends Phaser.Scene{
    constructor(){
        super("overworld");
    }

    // préchargement de tous les éléments nécessaires au fonctionnement de la scène
    preload(){

        // chargement du background
        this.load.image("fond0","asset/overworld/background.png");

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu","asset/carte/tileset.png");
        this.load.tilemapTiledJSON("carteOverworld","asset/carte/overworld.json");

        // chargement de l'interface utilisateur

        // chargement des collectables

        // chargement des plateformes qui bougent

        // chargement du personnage
        this.load.image("persoBase","asset/personnage/basique.png");
        this.load.image("persoCombat","asset/personnage/combat.png");
        this.load.image("persoDistance","asset/personnage/distance.png");
        this.load.image("persoVitesse","asset/personnage/vitesse.png");

        // chargement des ennemis
    }

    // création du niveau
    create(){

        // chargement de la carte 
        carteOverworld = this.add.tilemap("carteOverworld");

        // chargement du jeu de tuile
        tileset = carteOverworld.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage du background
        this.add.image(0,0,"fond0").setOrigin(0,0);

        // affichage des calques
        calque_sol = carteOverworld.createLayer(
            "sol",
            tileset
        );

        calque_niveau_1 = carteOverworld.createLayer(
            "niveau_1",
            tileset
        );

        calque_niveau_2 = carteOverworld.createLayer(
            "niveau_2",
            tileset
        );

        calque_niveau_3 = carteOverworld.createLayer(
            "niveau_3",
            tileset
        );

        calque_niveau_4 = carteOverworld.createLayer(
            "niveau_4",
            tileset
        );

        // affichage du personnage
        player = this.physics.add.sprite(100, 500, "persoBase");
        player.setGravityY(1200);

        // reprendre l'affichage du des calques en mettant le decor

        // afficher les animations du personnage lorsqu'il se déplace

        // affichage des ennemis

        // créer les animations des ennemis

        // création de la détéction du clavier
        cursors = this.input.keyboard.createCursorKeys();

        // intégration des nouvelles touches
        enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // intégrer les commandes d'une manette

        // définir les collisions
        calque_sol.setCollisionByProperty({ solide: true });
        calque_niveau_1.setCollisionByProperty({ solide: true });
        calque_niveau_2.setCollisionByProperty({ solide: true });
        calque_niveau_3.setCollisionByProperty({ solide: true });
        calque_niveau_4.setCollisionByProperty({ solide: true });

        // faire en sorte que le joueur collide avec le sol
        this.physics.add.collider(player, calque_sol);

        // détecter si le joueur collide avec un calque pour lancer le niveau
        this.physics.add.collider(player, calque_niveau_1,this.niveau1,null,this);
        this.physics.add.collider(player, calque_niveau_2,this.niveau2,null,this);
        this.physics.add.collider(player, calque_niveau_3,this.niveau3,null,this);
        this.physics.add.collider(player, calque_niveau_4,this.niveau4,null,this);

        // création de la caméra
        // taille de la caméra
        this.cameras.main.setSize(1920,1080);
        // faire en sorte que la caméra suive le personnage et qu'elle ne sorte pas de l'écran
        this.cameras.main.startFollow(player);
        this.cameras.main.setDeadzone(100,100);
        this.cameras.main.setBounds(0,0,3520,640);
    }
    

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update(){

        // ajout des moyens de déplacement du personnage
        if (cursors.left.isDown){ //si la touche gauche est appuyée
            player.setVelocityX(-playerVitesse); //alors vitesse négative en X
            }
            else if (cursors.right.isDown){ //sinon si la touche droite est appuyée
            player.setVelocityX(playerVitesse); //alors vitesse positive en X
            }
            else{ // sinon
            player.setVelocityX(0); //vitesse nulle
            }
        
    }

    niveau1(){
        if (enter.isDown){
            this.sceneNiveau_1();
        }
    }

    niveau2(){
        if (enter.isDown){
            this.sceneNiveau_2();
        }
    }

    niveau3(){
        if (enter.isDown){
            this.sceneNiveau_3();
        }
    }

    niveau4(){
        if (enter.isDown){
            this.sceneNiveau_4();
        }
    }

    sceneNiveau_1(){
        this.scene.start("niveau_1")
    }

    sceneNiveau_2(){
        this.scene.start("niveau_2")
    }

    sceneNiveau_3(){
        this.scene.start("niveau_3")
    }

    sceneNiveau_4(){
        this.scene.start("niveau_4")
    }

};