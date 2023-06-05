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

        this.load.audio("musique_ending","asset/son/musique_ending.mp3");

        // chargement du background et du foreground
        this.load.image("fond_cinematique", "asset/cinematique/background_0.png");
        this.load.image("devant", "asset/cinematique/foreground.png");

        // chargement du message
        this.load.image("message", "asset/cinematique/texte.png");

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu", "asset/carte/tileset.png");
        this.load.tilemapTiledJSON("carteCinematique", "asset/carte/cinematique.json");

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
    }

    // création du niveau
    create() {

        this.music_ending=this.sound.add("musique_ending",{loop:true});
        this.music_ending.play();
        this.music_ending.setVolume(0.7);

        // chargement de la carte 
        carteCinematique = this.add.tilemap("carteCinematique");

        // chargement du jeu de tuile
        tileset = carteCinematique.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage du background
        this.add.image(0, 0, "fond_cinematique").setOrigin(0, 0);

        // affichage des calques
        calque_sol = carteCinematique.createLayer(
            "sol",
            tileset
        );

        // affichage du personnage
        player = this.physics.add.sprite(spawnX, spawnY, "persoBase");
        player.setGravityY(playerGravity);
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
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'droite_retour',
            frames: this.anims.generateFrameNumbers('persoBase', {start:9,end:42}),
            frameRate: 60,
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

        // reprendre l'affichage des calques en mettant le decor
        this.add.image(0, 0, "devant").setOrigin(0, 0).setScrollFactor(0);

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
            player.anims.play('idle', true);
        }

        // faire reculer le joueur
        if (reculer == true && avancer == false){
            player.setVelocityX(-300);
            player.flipX = true;
            player.anims.play('droite_retour', true);
            
        }

        // faire avancer le joueur
        if (avancer == true && reculer == false){
            player.setVelocityX(100);
            player.flipX = false;
            player.anims.play('droite', true);
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

        this.music_ending.stop();

        this.scene.start("niveau_4",{
            transfertVie : 4,
            entrance : "retour",
        })
    }


};