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
var spawnY = 1024

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

        // chargement du son
        this.load.audio("atterrir","asset/son/atterrir.mp3");
        this.load.audio("carburant","asset/son/carburant.mp3");
        this.load.audio("dammage","asset/son/dammage.mp3");
        this.load.audio("destruction","asset/son/destruction.mp3");
        this.load.audio("loot","asset/son/loot.mp3");
        this.load.audio("lootbox","asset/son/lootbox.mp3");
        this.load.audio("mouvement","asset/son/mouvement.mp3");
        this.load.audio("musique","asset/son/musique.mp3");
        this.load.audio("musique_tableau","asset/son/musique_tableau.mp3");
        this.load.audio("musique_titre","asset/son/musique_titre.mp3");
        this.load.audio("musique_victoire","asset/son/musique_victoire.mp3");
        this.load.audio("shoot","asset/son/shoot.mp3");
        this.load.audio("transformation","asset/son/transformation.mp3");
        this.load.audio("vol","asset/son/vol.mp3");

        // chargement du background
        this.load.image("fond0","asset/overworld/background_0.png");
        this.load.image("fond1","asset/overworld/background_1.png");
        this.load.image("fond2","asset/overworld/background_2.png");
        this.load.image("fond3","asset/overworld/background_3.png");
        this.load.image("fond4","asset/overworld/background_4.png");
        this.load.image("fond5","asset/overworld/background_5.png");

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
        //this.load.image("persoBase","asset/personnage/basique.png");

        // chargement du personnage
        this.load.spritesheet("persoBase","asset/personnage/basique_sprite.png",
        { frameWidth: 128, frameHeight: 128 });

        //this.load.image("persoBase", "asset/personnage/basique.png");

        this.load.spritesheet("persoCombat","asset/personnage/combat_sprite.png",
        { frameWidth: 128, frameHeight: 128 });

        //this.load.image("persoCombat", "asset/personnage/combat.png");

        this.load.spritesheet("persoDistance","asset/personnage/distance_sprite.png",
        { frameWidth: 128, frameHeight: 128 });

        //this.load.image("persoDistance", "asset/personnage/distance.png");

        this.load.spritesheet("persoVitesse","asset/personnage/vitesse_sprite.png",
        { frameWidth: 128, frameHeight: 128 });

        //this.load.image("persoVitesse", "asset/personnage/vitesse.png");

        // chargement des ennemis
        this.load.spritesheet("red", "asset/ennemi/rouge_sprite.png",
        {frameWidth: 90, frameHeight: 90});

        //this.load.image("red", "asset/ennemi/rouge.png");

        this.load.spritesheet("blue", "asset/ennemi/bleu_sprite.png",
        {frameWidth: 90, frameHeight: 90});

        //this.load.image("blue", "asset/ennemi/bleu.png");

        this.load.spritesheet("green", "asset/ennemi/vert_sprite.png",
        {frameWidth: 90, frameHeight: 90});

        //this.load.image("green", "asset/ennemi/vert.png");

        this.load.spritesheet("purple", "asset/ennemi/violet_sprite.png",
        {frameWidth: 90, frameHeight: 90});

        //this.load.image("purple", "asset/ennemi/violet.png");

        this.load.spritesheet("saut_basique", "asset/personnage/saut_basique.png",
        {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet("saut_combat", "asset/personnage/saut_combat.png",
        {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet("saut_distance", "asset/personnage/saut_distance.png",
        {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet("saut_vitesse", "asset/personnage/saut_vitesse.png",
        {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet("atterrissage_anim", "asset/personnage/atterrissage.png",
        {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet("vol_anim", "asset/personnage/vol.png",
        {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet("dash_anim", "asset/personnage/dash.png",
        {frameWidth: 128, frameHeight: 128});

        this.load.spritesheet("double_saut", "asset/personnage/double_saut.png",
        {frameWidth: 128, frameHeight: 128});


    }

    // création du niveau
    create(){

        this.atterrir=this.sound.add("atterrir",{loop:false});
        this.carburant=this.sound.add("carburant",{loop:false});
        this.dammage=this.sound.add("dammage",{loop:false});
        this.destruction=this.sound.add("destruction",{loop:false});
        this.loot=this.sound.add("loot",{loop:false});
        this.lootbox=this.sound.add("lootbox",{loop:false});
        this.mouvement=this.sound.add("mouvement",{loop:false});
        this.music = this.sound.add("musique",{loop:true});
        this.music_tableau=this.sound.add("musique_tableau",{loop:true});
        this.music_titre=this.sound.add("musique_titre",{loop:true});
        this.music_victoire=this.sound.add("musique_victoire",{loop:false});
        this.shoot=this.sound.add("shoot",{loop:false});
        this.transform = this.sound.add("transformation",{loop:false});
        this.vol=this.sound.add("vol",{loop:false});

        this.music_tableau.play();
        this.music_tableau.setVolume(0.7);

        // chargement de la carte 
        carteOverworld = this.add.tilemap("carteOverworld");

        // chargement du jeu de tuile
        tileset = carteOverworld.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage du background
        this.backgroundParallax0 = this.add.tileSprite(0,0,5632,1280,"fond0");
        this.backgroundParallax0.setOrigin(0,0);
        this.backgroundParallax0.setScrollFactor(1,1);
    
        this.quatriemePlanParallax0 = this.add.tileSprite(0,0,5632,1280,"fond1");
        this.quatriemePlanParallax0.setOrigin(0,0);
        this.quatriemePlanParallax0.setScrollFactor(0.9,1);
    
        this.troisiemePlanParallax0 = this.add.tileSprite(0,0,5632,1280,"fond2");
        this.troisiemePlanParallax0.setOrigin(0,0);
        this.troisiemePlanParallax0.setScrollFactor(0.6,1);

        this.secondPlanParallax0 = this.add.tileSprite(0,0,5632,1280,"fond3");
        this.secondPlanParallax0.setOrigin(0,0);
        this.secondPlanParallax0.setScrollFactor(0.3,1);

        this.premierPlanParallax0 = this.add.tileSprite(0,0,5632,1280,"fond4");
        this.premierPlanParallax0.setOrigin(0,0);
        this.premierPlanParallax0.setScrollFactor(0.6,1);

        this.firstPlanParallax0 = this.add.tileSprite(0,0,5632,1280,"fond5");
        this.firstPlanParallax0.setOrigin(0,0);
        this.firstPlanParallax0.setScrollFactor(0.3,1);

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
        ouvert_1 = this.add.image(1200,640,"1ouvert")
        
        ouvert_2 = this.add.image(2400,640,"2ouvert")
        ferme_2 = this.add.image(2400,640,"2ferme")

        ouvert_3 = this.add.image(3600,640,"3ouvert")
        ferme_3 = this.add.image(3600,640,"3ferme")

        ouvert_4 = this.add.image(4800,640,"4ouvert")
        ferme_4 = this.add.image(4800,640,"4ferme")

        // vérifier si le joueur vient de finir le niveau ou pas
        if (this.entrance == 'win1'){
            ferme_2.setVisible(false);
            lvl2Dispo = true;
            spawnX = 1152;
        }

        if (this.entrance == 'win2'){
            ferme_2.setVisible(false);
            ferme_3.setVisible(false);
            lvl3Dispo = true;
            spawnX = 2368;
        }

        if (this.entrance == 'win3'){
            ferme_2.setVisible(false);
            ferme_3.setVisible(false);
            ferme_4.setVisible(false);
            lvl4Dispo = true;
            spawnX = 3584;
        }

        if (this.entrance == 'loose1'){
            spawnX = 1152;
        }

        if (this.entrance == 'loose2'){
            ferme_2.setVisible(false);
            spawnX = 2368;
        }

        if (this.entrance == 'loose3'){
            ferme_2.setVisible(false);
            ferme_3.setVisible(false);
            spawnX = 3584;
        }

        if (this.entrance == 'loose4'){
            ferme_2.setVisible(false);
            ferme_3.setVisible(false);
            ferme_4.setVisible(false);
            spawnX = 4800;
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
        player.setSize(64,128).setOffset(32,0);

        // afficher les animations du personnage lorsqu'il se déplace
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('persoBase', {start:0,end:8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'droite',
            frames: this.anims.generateFrameNumbers('persoBase', {start:9,end:42}),
            frameRate: 40,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_combat',
            frames: this.anims.generateFrameNumbers('persoCombat', {start:0,end:8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'droite_combat',
            frames: this.anims.generateFrameNumbers('persoCombat', {start:9,end:42}),
            frameRate: 40,
            repeat: -1
        });
        

        this.anims.create({
            key: 'idle_distance',
            frames: this.anims.generateFrameNumbers('persoDistance', {start:0,end:8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'droite_distance',
            frames: this.anims.generateFrameNumbers('persoDistance', {start:9,end:42}),
            frameRate: 40,
            repeat: -1
        });

        this.anims.create({
            key: 'idle_vitesse',
            frames: this.anims.generateFrameNumbers('persoVitesse', {start:0,end:8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'droite_vitesse',
            frames: this.anims.generateFrameNumbers('persoVitesse', {start:9,end:42}),
            frameRate: 40,
            repeat: -1
        });

        this.anims.create({
            key: 'attaque_combat',
            frames: this.anims.generateFrameNumbers('persoCombat', {start:43,end:52}),
            frameRate: 50,
            repeat: -1
        });

        this.anims.create({
            key: 'attaque_distance',
            frames: this.anims.generateFrameNumbers('persoDistance', {start:43,end:52}),
            frameRate: 50,
            repeat: 0
        });

        // créer les animations des ennemis
        this.anims.create({
            key: 'marche_rouge',
            frames: this.anims.generateFrameNumbers('red', {start:0,end:9}),
            frameRate: 60,
            repeat: -1
        });

        this.anims.create({
            key: 'marche_bleu',
            frames: this.anims.generateFrameNumbers('blue', {start:0,end:9}),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'marche_vert',
            frames: this.anims.generateFrameNumbers('green', {start:0,end:9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'marche_violet',
            frames: this.anims.generateFrameNumbers('purple', {start:0,end:9}),
            frameRate: 60,
            repeat: -1
        });



        this.anims.create({
            key: 'sautbasique',
            frames: this.anims.generateFrameNumbers('saut_basique', {start:0,end:9}),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'sautcombat',
            frames: this.anims.generateFrameNumbers('saut_combat', {start:0,end:9}),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'sautdistance',
            frames: this.anims.generateFrameNumbers('saut_distance', {start:0,end:9}),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'sautvitesse',
            frames: this.anims.generateFrameNumbers('saut_vitesse', {start:0,end:9}),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'atterrissage_combat',
            frames: this.anims.generateFrameNumbers('atterrissage_anim', {start:0,end:9}),
            frameRate: 40,
            repeat: 0
        });

        this.anims.create({
            key: 'vol_distance',
            frames: this.anims.generateFrameNumbers('vol_anim', {start:0,end:9}),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: 'dash_vitesse',
            frames: this.anims.generateFrameNumbers('dash_anim', {start:0,end:9}),
            frameRate: 50,
            repeat: 0
        });

        this.anims.create({
            key: 'double_saut_vitesse',
            frames: this.anims.generateFrameNumbers('double_saut', {start:0,end:9}),
            frameRate: 50,
            repeat: 0
        });



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
        this.cameras.main.setBounds(0,0,5632,1280);

    }
    

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update(){

        // ajout des moyens de déplacement du personnage
        if (cursors.left.isDown){ //si la touche gauche est appuyée
            player.setVelocityX(-playerVitesse); //alors vitesse négative en X
            player.flipX = true;
            player.anims.play('droite', true);
            }
            else if (cursors.right.isDown){ //sinon si la touche droite est appuyée
            player.setVelocityX(playerVitesse); //alors vitesse positive en X
            player.anims.play('droite', true);
            player.flipX = false;
            }
            else{ // sinon
            player.setVelocityX(0); //vitesse nulle
            player.anims.play('idle', true);
            }
        
    }

    niveau1(){
        if (enter.isDown && lvl1Dispo == true){
            this.music_tableau.stop();
            this.sceneNiveau_1();
        }
    }

    niveau2(){
        if (enter.isDown && lvl2Dispo == true){
            this.music_tableau.stop();
            this.sceneNiveau_2();
        }
    }

    niveau3(){
        if (enter.isDown && lvl3Dispo == true){
            this.music_tableau.stop();
            this.sceneNiveau_3();
        }
    }

    niveau4(){
        if (enter.isDown && lvl4Dispo == true){
            this.music_tableau.stop();
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