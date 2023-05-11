// création des variables
var player
var cursors
var tileset
var enter

// variables de la carte overworld
var carteOverworld
var calque_sol
var calque_niveau_1
var calque_niveau_2

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

        // affichage du personnage
        player = this.physics.add.sprite(100, 1500, "persoBase");

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

        // faire en sorte que le joueur collide avec le sol
        this.physics.add.collider(player, calque_sol);

        // détecter si le joueur collide avec un calque pour lancer le niveau
        this.physics.add.collider(player, calque_niveau_1,this.niveau1,null,this);
        this.physics.add.collider(player, calque_niveau_2,this.niveau2,null,this);

        // création de la caméra
        // taille de la caméra
        this.cameras.main.setSize(1920,1080);
        // faire en sorte que la caméra suive le personnage et qu'elle ne sorte pas de l'écran
        this.cameras.main.startFollow(player);
        this.cameras.main.setDeadzone(100,100);
        //this.cameras.main.setBounds(0,0,4160,3456);
    }

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update(){

        // ajout des moyens de déplacement du personnage
        if (cursors.left.isDown){ //si la touche gauche est appuyée
            player.setVelocityX(-1000); //alors vitesse négative en X
            }
            else if (cursors.right.isDown){ //sinon si la touche droite est appuyée
            player.setVelocityX(1000); //alors vitesse positive en X
            }
            else{ // sinon
            player.setVelocityX(0); //vitesse nulle
            }
            if (cursors.up.isDown){
            //si touche haut appuyée ET que le perso touche le sol
            player.setVelocityY(-330); //alors vitesse verticale négative
            //(on saute)
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

    sceneNiveau_1(){
        this.scene.start("niveau_1")
    }

    sceneNiveau_2(){
        this.scene.start("niveau_2")
    }

};