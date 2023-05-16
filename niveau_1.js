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
var playerLife = 4
var playerDegat = false
var playerOpacity = false
var playerVitesse = 700
var playerSaut = 1000
var gameOver = false
var respawnX = 100
var respawnY = 1500
var capa_Atterrissage
var capa_Coup
var capa_Dash
var capa_Saut
var capa_Tir
var capa_Vol

// variables pour les ennemis
var ennemiTest1
var ennemiTest2
var ennemiTest3

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
var batterie
var rechargement = false

// variables pour les écrans d'interface
var ecranPause
var ecranMort
var boutonPartir
var boutonRecommencer
var boutonReprendre

export class niveau_1 extends Phaser.Scene {
    constructor() {
        super("niveau_1");
    }

    init(data){
        playerLife = data.transfertVie
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
        this.load.image("atterrissage", "asset/interface/atterrissage.png");
        this.load.image("coup", "asset/interface/coup.png");
        this.load.image("dash", "asset/interface/dash.png");
        this.load.image("saut", "asset/interface/saut.png");
        this.load.image("tir", "asset/interface/tir.png");
        this.load.image("vol", "asset/interface/vol.png");

        this.load.spritesheet("niveauVie", "asset/interface/brisure.png",
        {frameWidth : 1920, frameHeight: 1080});

        // chargement des écrans et de leurs boutons
        this.load.image("pause", "asset/ecran/pause.png");
        this.load.image("partir", "asset/ecran/partir.png");
        this.load.image("recommencer", "asset/ecran/recommencer.png");
        this.load.image("reprendre", "asset/ecran/reprendre.png");

        this.load.image("gameOver", "asset/ecran/game_over.png");

        // chargement des collectables
        this.load.image("objCombat", "asset/objet/combat.png");
        this.load.image("objVitesse", "asset/objet/vitesse.png");
        this.load.image("objDistance", "asset/objet/distance.png");
        this.load.image("batterie", "asset/objet/batterie.png");

        // chargement des plateformes qui bougent
        this.load.image("plateforme", "asset/objet/plateforme.png");

        // chargement du personnage
        this.load.image("persoBase", "asset/personnage/basique.png");
        this.load.image("persoCombat", "asset/personnage/combat.png");
        this.load.image("persoDistance", "asset/personnage/distance.png");
        this.load.image("persoVitesse", "asset/personnage/vitesse.png");

        // chargement des ennemis
        this.load.image("red", "asset/ennemi/rouge.png");
        this.load.image("blue", "asset/ennemi/bleu.png");
        this.load.image("green", "asset/ennemi/vert.png");
    }

    // création du niveau
    create() {

        playerLife = 4;
        gameOver = false;
        playerDegat = false;

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
        player.setGravityY(800);

        // reprendre l'affichage des calques en mettant le decor

        // afficher les animations du personnage lorsqu'il se déplace

        // affichage des ennemis
        ennemiTest1 = this.physics.add.image(2300, 1500, "red");
        ennemiTest2 = this.physics.add.image(2800, 1500, "blue");
        ennemiTest3 = this.physics.add.image(3200, 1500, "green");

        // créer les animations des ennemis

        // faire en sorte que les ennemis colide avec le sol
        this.physics.add.collider(ennemiTest1, calque_sol);
        this.physics.add.collider(ennemiTest2, calque_sol);
        this.physics.add.collider(ennemiTest3, calque_sol);

        // test de perte de vie en touchant un ennemi
        this.physics.add.collider(player, ennemiTest1, this.degat, null, this);

        // afficher les collectables
        objCombat = this.physics.add.image(400, 1500, "objCombat");
        objVitesse = this.physics.add.image(1000, 1500, "objVitesse");
        objDistance = this.physics.add.image(1600, 1500, "objDistance");

        batterie = this.physics.add.image(2000, 1500, "batterie");

        // test de collecte de batterie
        this.physics.add.overlap(player, batterie, this.collecteBatterie, null, this);

        // faire en sorte que les collectables collide avec le sol
        this.physics.add.collider(objCombat, calque_sol);
        this.physics.add.collider(objVitesse, calque_sol);
        this.physics.add.collider(objDistance, calque_sol);
        this.physics.add.collider(batterie, calque_sol);

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
        esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

        // afficher les cooldown de capacités
        capa_Atterrissage = this.add.image(250, 100, 'atterrissage').setVisible(false).setScrollFactor(0);
        capa_Coup = this.add.image(450, 100,'coup').setVisible(false).setScrollFactor(0);
        capa_Dash = this.add.image(250, 100, 'dash').setVisible(false).setScrollFactor(0);
        capa_Saut = this.add.image(450, 100, 'saut').setVisible(false).setScrollFactor(0);
        capa_Tir = this.add.image(450, 100, 'tir').setVisible(false).setScrollFactor(0);
        capa_Vol = this.add.image(250, 100, 'vol').setVisible(false).setScrollFactor(0);

        // affichage de l'interface
        lifeUI = this.add.sprite(960,540, "niveauVie").setScrollFactor(0);

        // affichage de l'écran de mort
        ecranMort = this.add.image(960, 540, 'gameOver').setVisible(false).setScrollFactor(0);


        // affichage de l'écran de pause et des boutons
        ecranPause = this.add.image(960, 540, 'pause').setVisible(false).setScrollFactor(0);
        boutonPartir = this.add.image(300, 950, 'partir').setVisible(false).setInteractive().setScrollFactor(0).setInteractive();
        boutonReprendre = this.add.image(960, 950, 'reprendre').setVisible(false).setInteractive().setScrollFactor(0).setInteractive();
        boutonRecommencer = this.add.image(1600, 950, 'recommencer').setVisible(false).setInteractive().setScrollFactor(0).setInteractive();

        boutonPartir.once('pointerup',this.sceneOverworld,this);
        boutonRecommencer.once('pointerup',this.sceneNiveau1,this);
        boutonReprendre.once('pointerup',this.Reprendre,this);


        // création des nieaux de vie
        this.anims.create({
            key: 'vie0',
            frames: [{ key: 'niveauVie' , frame :  0}],
        })

        this.anims.create({
            key: 'vie1',
            frames: [{ key: 'niveauVie' , frame :  1}],
        })

        this.anims.create({
            key: 'vie2',
            frames: [{ key: 'niveauVie' , frame :  2}],
        })

        this.anims.create({
            key: 'vie3',
            frames: [{ key: 'niveauVie' , frame :  3}],
        })

        this.anims.create({
            key: 'vie4',
            frames: [{ key: 'niveauVie' , frame :  4}],
        })
    }

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update() {

        console.log(playerLife)

        // ajout des moyens de déplacement du personnage
        if (cursors.left.isDown && lockTouche == false){ //si la touche gauche est appuyée
            player.setVelocityX(- playerVitesse); //alors vitesse négative en X
            //player.anims.play('left', true); //et animation => gauche
        }
        else if (cursors.right.isDown && lockTouche == false){ //sinon si la touche droite est appuyée
            player.setVelocityX(playerVitesse); //alors vitesse positive en X
            //player.anims.play('right', true); //et animation => droite
        }
        else{ // sinon
            player.setVelocityX(0); //vitesse nulle
            //player.anims.play('turn'); //animation fait face caméra
        }
        if (cursors.up.isDown && player.body.blocked.down && lockTouche == false){
            //si touche haut appuyée ET que le perso touche le sol
            player.setVelocityY(-playerSaut); //alors vitesse verticale négative
            //(on saute)
        }

        // animation de la jauge de vie
        if (playerLife == 4){
            lifeUI.anims.play('vie0', true);
        }
        if (playerLife == 3){
            lifeUI.anims.play('vie1', true);
        }
        if (playerLife == 2){
            lifeUI.anims.play('vie2', true);
        }
        if (playerLife == 1){
            lifeUI.anims.play('vie3', true);
        }
        if (playerLife == 0){
            lifeUI.anims.play('vie4', true);
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
        if (player.x >= 15000) {
            this.sceneOverworld();
        }

        // vérifier si une armure est activé pour faire perdre de l'énergie sur la jauge
        if (distance == true || combat == true || vitesse == true) {
            this.jaugeValeur = this.jaugeValeur + 10 / 60; // 1/60 pour 1% par seconde
            this.majJauge();
        }

        // nécessaire pour faire en sorte que le joueur puisse reprendre de la batterie lorsqu'il n'a pas d'armure
        if (basique==true){
            this.majJauge();
        }

        // activation des capacités selon l'armure équipé
        // armure de vitesse
        // dash
        if (vitesse == true && shift.isDown){

        }

        // double saut
        if (vitesse == true && space.isDown){

        }

        // armure de combat
        // coup
        if (combat == true && shift.isDown){

        }

        // atterrissage
        if (combat == true && Phaser.Input.Keyboard.JustDown(space)){
            player.setVelocityY(3000)
            this.jaugeValeur = this.jaugeValeur + 15
        }

        // armure à distance
        // tir
        if (distance == true && shift.isDown){

        }

        // vol
        if (distance == true && Phaser.Input.Keyboard.JustDown(space)){
            player.setGravityY(1)
            this.jaugeValeur = this.jaugeValeur + 15
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

            capa_Atterrissage.setVisible(false);
            capa_Coup.setVisible(false);
            capa_Dash.setVisible(false);
            capa_Saut.setVisible(false);
            capa_Tir.setVisible(false);
            capa_Vol.setVisible(false);

        }

        if (this.jaugeValeur < -100) {
            this.jaugeValeur = -100
            rechargement = false
        }

        if (rechargement == true) {
            this.jaugeValeur = this.jaugeValeur - 20 / 60;
            this.majJauge();
        }

        // mettre en place le système de checkpoint
        // faire réaparaitre le joueur lorsqu'il tombe dans le vide
        if (player.y > 1900){
            player.x = respawnX
            player.y = respawnY
        }

        // premier checkpoint
        if (player.x > 7000){
            respawnX = 7000
        }

        // mise en place de la pause
        if(esc.isDown){
            boutonPartir.setVisible(true);
            boutonRecommencer.setVisible(true);
            boutonReprendre.setVisible(true);
            ecranPause.setVisible(true);
        }

        // mise en place du game over
        if (playerLife == 0){
            gameOver = true;
        }

        if(gameOver){
            boutonPartir.setVisible(true);
            boutonRecommencer.setVisible(true);
            ecranMort.setVisible(true);
            return;
        }

        // retirer l'écran de game Over si la vie est égale à 4
        if(playerLife == 4){
            boutonPartir.setVisible(false);
            boutonRecommencer.setVisible(false);
            ecranMort.setVisible(false); 
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
        playerLife = 4

        // afficher l'interface correspondant à l'armure
        capa_Atterrissage.setVisible(false);
        capa_Coup.setVisible(false);
        capa_Dash.setVisible(true);
        capa_Saut.setVisible(true);
        capa_Tir.setVisible(false);
        capa_Vol.setVisible(false);
    }

    armureCombat() {
        player.setTexture("persoCombat")
        combat = true
        basique = false
        vitesse = false
        distance = false
        playerLife = 4

        // afficher l'interface correspondant à l'armure
        capa_Atterrissage.setVisible(true);
        capa_Coup.setVisible(true);
        capa_Dash.setVisible(false);
        capa_Saut.setVisible(false);
        capa_Tir.setVisible(false);
        capa_Vol.setVisible(false);
    }

    armureDistance() {
        player.setTexture("persoDistance")
        distance = true
        basique = false
        combat = false
        vitesse = false
        playerLife = 4

        // afficher l'interface correspondant à l'armure
        capa_Atterrissage.setVisible(false);
        capa_Coup.setVisible(false);
        capa_Dash.setVisible(false);
        capa_Saut.setVisible(false);
        capa_Tir.setVisible(true);
        capa_Vol.setVisible(true);
    }

    formeBasique() {
        player.setTexture("persoBase")
        basique = true
        distance = false
        combat = false
        vitesse = false

        // afficher l'interface correspondant à l'armure
        capa_Atterrissage.setVisible(false);
        capa_Coup.setVisible(false);
        capa_Dash.setVisible(false);
        capa_Saut.setVisible(false);
        capa_Tir.setVisible(false);
        capa_Vol.setVisible(false);
    }

    HorsService() {
        player.setTexture("persoBase")
        basique = true
        distance = false
        combat = false
        vitesse = false
        this.jaugeValeur = 0

        // afficher l'interface correspondant à l'armure
        capa_Atterrissage.setVisible(false);
        capa_Coup.setVisible(false);
        capa_Dash.setVisible(false);
        capa_Saut.setVisible(false);
        capa_Tir.setVisible(false);
        capa_Vol.setVisible(false);
    }

    sceneOverworld() {
        this.scene.start("overworld")
    }

    sceneNiveau1() {
        this.scene.start("niveau_1",{
            transfertVie : 4,
            entrance : "restart",
        })
    }

    Reprendre() {
        boutonPartir.setVisible(false);
        boutonRecommencer.setVisible(false);
        boutonReprendre.setVisible(false);
        ecranPause.setVisible(false);
    }

    degat(){
        // le joueur perd de la batterie si une armure est active

        // vérifier que le cooldown de degat est disponible
        if (playerDegat == false && basique== false){
            
            // retirer de la vie au joueur
            // répercuter directement dans la jauge de vie
            this.jaugeValeur = this.jaugeValeur + 15;
            playerDegat = true;
            playerOpacity = true;
    
            // montrer l'invulnérabilité du personnage ne le faisant clignoter avec l'opacité
            this.time.addEvent({        
                delay : 100,
                callback : () => {
                    if(playerOpacity){
                        player.alpha = 0.25;
                        playerOpacity = false
                    }
                    else {
                        player.alpha = 1;
                        playerOpacity = true;
                    }
                },
                repeat : 19
            })
    
            // activation du cooldown de degat
            this.time.delayedCall(2000, () => {
                playerDegat = false;
                player.alpha = 1;
            });  
        }

        // le joueur perd de la vie s'il n'a pas d'armure

        if (playerDegat == false && basique== true){
            
            // retirer de la vie au joueur
            // répercuter directement dans la jauge de vie
            playerLife = playerLife - 1;
            playerDegat = true;
            playerOpacity = true;
    
            // montrer l'invulnérabilité du personnage ne le faisant clignoter avec l'opacité
            this.time.addEvent({        
                delay : 100,
                callback : () => {
                    if(playerOpacity){
                        player.alpha = 0.25;
                        playerOpacity = false
                    }
                    else {
                        player.alpha = 1;
                        playerOpacity = true;
                    }
                },
                repeat : 19
            })
    
            // activation du cooldown de degat
            this.time.delayedCall(2000, () => {
                playerDegat = false;
                player.alpha = 1;
            });  
        }
    }

    collecteBatterie(){
        batterie.disableBody(true, true);
        this.jaugeValeur= this.jaugeValeur - 20
    }

};