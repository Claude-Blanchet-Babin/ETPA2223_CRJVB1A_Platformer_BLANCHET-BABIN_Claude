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
var spawnX = 100
var spawnY = 850

// variables de la carte overworld
var carteOverworld
var calque_sol
var calque_niveau_1
var calque_niveau_2
var calque_niveau_3
var calque_niveau_4

// variables des pré vsisuels
var ferme_1
var ouvert_1
var ferme_2
var ouvert_2
var ferme_3
var ouvert_3
var ferme_4
var ouvert_4

// variables des niveaux disponibles
var lvl1Dispo = true
var lvl2Dispo = false
var lvl3Dispo = false
var lvl4Dispo = false

export class overworld extends Phaser.Scene{
    constructor(){
        super("overworld");
    }

    init(data){
        this.entrance = data.entrance
    }

    // préchargement de tous les éléments nécessaires au fonctionnement de la scène
    preload(){

        // chargement du background
        this.load.image("fond0","asset/overworld/background.png");

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu","asset/carte/tileset.png");
        this.load.tilemapTiledJSON("carteOverworld","asset/carte/overworld.json");

        // chargement des pré visuels de niveau
        this.load.image("1ferme","asset/overworld/1_ferme.png");
        this.load.image("1ouvert","asset/overworld/1_ouvert.png");
        this.load.image("2ferme","asset/overworld/2_ferme.png");
        this.load.image("2ouvert","asset/overworld/2_ouvert.png");
        this.load.image("3ferme","asset/overworld/3_ferme.png");
        this.load.image("3ouvert","asset/overworld/3_ouvert.png");
        this.load.image("4ferme","asset/overworld/4_ferme.png");
        this.load.image("4ouvert","asset/overworld/4_ouvert.png");


        // chargement du personnage
        this.load.image("persoBase","asset/personnage/basique.png");
        this.load.image("persoCombat","asset/personnage/combat.png");
        this.load.image("persoDistance","asset/personnage/distance.png");
        this.load.image("persoVitesse","asset/personnage/vitesse.png");

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

        // affichage des prévisuels
        ouvert_1 = this.add.image(750,450,"1ouvert")
        
        ouvert_2 = this.add.image(1400,450,"2ouvert")
        ferme_2 = this.add.image(1400,450,"2ferme")

        ouvert_3 = this.add.image(2050,450,"3ouvert")
        ferme_3 = this.add.image(2050,450,"3ferme")

        ouvert_4 = this.add.image(2700,450,"4ouvert")
        ferme_4 = this.add.image(2700,450,"4ferme")

        // vérifier si le joueur vient de finir le niveau ou pas
        if (this.entrance == 'win1'){
            ferme_2.setVisible(false);
            lvl2Dispo = true;
            spawnX = 768;
        }

        if (this.entrance == 'win2'){
            ferme_2.setVisible(false);
            ferme_3.setVisible(false);
            lvl3Dispo = true;
            spawnX = 1408
        }

        if (this.entrance == 'win3'){
            ferme_2.setVisible(false);
            ferme_3.setVisible(false);
            ferme_4.setVisible(false);
            lvl4Dispo = true;
            spawnX = 2048
        }

        if (this.entrance == 'loose1'){
            spawnX = 768;
        }

        if (this.entrance == 'loose2'){
            ferme_2.setVisible(false);
            spawnX = 1408;
        }

        if (this.entrance == 'loose3'){
            ferme_2.setVisible(false);
            ferme_3.setVisible(false);
            spawnX = 2048;
        }

        if (this.entrance == 'loose4'){
            ferme_2.setVisible(false);
            ferme_3.setVisible(false);
            ferme_4.setVisible(false);
            spawnX = 2688;
        }

        if(lvl2Dispo == true){
            ferme_2.setVisible(false);
        }

        if(lvl3Dispo == true){
            ferme_3.setVisible(false);
        }

        if(lvl4Dispo == true){
            ferme_4.setVisible(false);
        }

        // affichage du personnage
        player = this.physics.add.sprite(spawnX, spawnY, "persoBase");
        player.setGravityY(1200);

        // afficher les animations du personnage lorsqu'il se déplace

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
        if (enter.isDown && lvl1Dispo == true){
            this.sceneNiveau_1();
        }
    }

    niveau2(){
        if (enter.isDown && lvl2Dispo == true){
            this.sceneNiveau_2();
        }
    }

    niveau3(){
        if (enter.isDown && lvl3Dispo == true){
            this.sceneNiveau_3();
        }
    }

    niveau4(){
        if (enter.isDown && lvl4Dispo == true){
            this.sceneNiveau_4();
        }
    }

    sceneNiveau_1(){
        this.scene.start("niveau_1",{
            entrance: "overworld",
        })
    }

    sceneNiveau_2(){
        this.scene.start("niveau_2",{
            entrance: "overworld",
        })
    }

    sceneNiveau_3(){
        this.scene.start("niveau_3",{
            entrance: "overworld",
        })
    }

    sceneNiveau_4(){
        this.scene.start("niveau_4",{
            entrance: "overworld",
        })
    }

};