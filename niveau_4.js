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
var spawnY = 1050
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
var position_ennemi_B
var groupe_ennemi_B
var position_ennemi_C
var groupe_ennemi_C
var position_ennemi_D
var groupe_ennemi_D

var distance
var distanceX
var distanceY

// variables de la carte niveau 2
var tileset
var carteNiveau4
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

// variables pour définir l'aller ou le retour
var aller = true
var retour = false

export class niveau_4 extends Phaser.Scene {
    constructor() {
        super("niveau_4");
    }

    init(data){
        playerLife = data.transfertVie
        this.entrance = data.entrance
    }

    // préchargement de tous les éléments nécessaires au fonctionnement de la scène
    preload() {

        // chargement du background
        this.load.image("fond0", "asset/niveau4/background_0.png");
        this.load.image("fond1", "asset/niveau4/background_1.png");
        this.load.image("fond2", "asset/niveau4/background_2.png");
        this.load.image("fond3", "asset/niveau4/background_3.png");
        this.load.image("fond4", "asset/niveau4/background_4.png");

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu", "asset/carte/tileset.png");
        this.load.tilemapTiledJSON("carteNiveau4", "asset/carte/niveau_4.json");

        // chargement de l'interface utilisateur
        this.load.image("atterrissage", "asset/interface/atterrissage.png");
        this.load.image("coup", "asset/interface/coup.png");
        this.load.image("dash", "asset/interface/dash.png");
        this.load.image("saut", "asset/interface/saut.png");
        this.load.image("tir", "asset/interface/tir.png");
        this.load.image("vol", "asset/interface/vol.png");
        this.load.image("combat","asset/interface/armure_combat.png")
        this.load.image("distance","asset/interface/armure_distance.png")
        this.load.image("vitesse","asset/interface/armure_vitesse.png")

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
        this.load.image("purple", "asset/ennemi/violet.png");

        // chargement des projectiles
        this.load.image("projectile", "asset/objet/projectile.png");
    }

    // création du niveau
    create() {

        aller = true;
        retour = false;

        // vérifier s'il s'agit de l'aller ou du retour
        if(this.entrance=="overworld"){
            aller = true;
            retour = false;
        }

        if(this.entrance=="retour"){
            aller=false;
            retour=true;
        }

        playerLife = 4;
        gameOver = false;
        playerDegat = false;

        combat = false;
        vitesse = false;
        distance = false;
        basique = true;

        combatObtenu = false
        distanceObtenu = false
        vitesseObtenu = false

        // chargement de la carte 
        carteNiveau4 = this.add.tilemap("carteNiveau4");

        // chargement du jeu de tuile
        tileset = carteNiveau4.addTilesetImage(
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
        calque_sol = carteNiveau4.createLayer(
            "sol",
            tileset
        );

        calque_plateforme = carteNiveau4.createLayer(
            "plateforme",
            tileset
        );

        calque_mur_rouge = carteNiveau4.createLayer(
            "mur_rouge",
            tileset
        );

        calque_mur_vert = carteNiveau4.createLayer(
            "mur_vert",
            tileset
        );

        calque_mur_bleu = carteNiveau4.createLayer(
            "mur_bleu",
            tileset
        );

        calque_checkpoint = carteNiveau4.createLayer(
            "checkpoint",
            tileset
        );

        // changer le spawn pour le retour
        if (retour==true){
            spawnX = 6080
            spawnY = 576

            respawnX = 6080
            respawnY = 576
        }

        // affichage du personnage
        player = this.physics.add.sprite(spawnX, spawnY, "persoBase");
        player.setGravityY(playerGravity);

        // affichage des plateformes mobiles
        position_plateforme=carteNiveau4.getObjectLayer("plateforme_spawn")
        plateforme = this.physics.add.group();

        position_plateforme.objects.forEach(plat => {
            plateforme.create(plat.x,plat.y, "plateforme").body.setImmovable(true);
        })

        this.physics.add.collider(player,plateforme,this.suivrePlateforme,null,this);

        // définir les mouvements des plateformes
        this.tweens.add({
            targets : plateforme.children.entries[0],
            x: 2304,
            duration: 2000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : plateforme.children.entries[1],
            x: 2432,
            duration: 2000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : plateforme.children.entries[2],
            y: 512,
            duration: 3000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : plateforme.children.entries[3],
            y: 256,
            duration: 3000,
            repeat : -1,
            yoyo : true
        });

        // reprendre l'affichage des calques en mettant le decor

        // afficher les animations du personnage lorsqu'il se déplace

        // affichage des ennemis
        // créer un groupe d'ennemi à partir d'un calque
        position_ennemi_A = carteNiveau4.getObjectLayer("ennemi_A_spawn");

        // créer un groupe d'ennemi
        groupe_ennemi_A = this.physics.add.group();

        // faire apparaitre un ennemi selon les emplacements et leur donner une gravité
        position_ennemi_A.objects.forEach(ennemi => {
            groupe_ennemi_A.create(ennemi.x,ennemi.y, "red").body.setGravityY(500);
        })

        console.log(groupe_ennemi_A.children.entries[0]);

        // agir sur un seul ennemi  // children.each pour agir sur tous
        //groupe_ennemi_A.children.entries[0].setVelocityX(-500);

        // deuxième groupe d'ennemi
        position_ennemi_B = carteNiveau4.getObjectLayer("ennemi_B_spawn");
        groupe_ennemi_B = this.physics.add.group();
        position_ennemi_B.objects.forEach(ennemi => {
            groupe_ennemi_B.create(ennemi.x,ennemi.y, "blue").body.setGravityY(500);
        })

        // troisième groupe d'ennemi
        position_ennemi_C = carteNiveau4.getObjectLayer("ennemi_C_spawn");
        groupe_ennemi_C = this.physics.add.group();
        position_ennemi_C.objects.forEach(ennemi => {
            groupe_ennemi_C.create(ennemi.x,ennemi.y, "green").body.setGravityY(500);
        })

        // quatrième groupe d'ennemi
        position_ennemi_D = carteNiveau4.getObjectLayer("ennemi_D_spawn");
        groupe_ennemi_D = this.physics.add.group();
        position_ennemi_D.objects.forEach(ennemi => {
            groupe_ennemi_D.create(ennemi.x,ennemi.y, "purple").body.setGravityY(500);
        })

        // ajouter une collision entre les ennemis et le sol
        this.physics.add.collider(groupe_ennemi_A, calque_sol);
        this.physics.add.collider(groupe_ennemi_A, calque_plateforme);
        this.physics.add.collider(groupe_ennemi_B, calque_sol);
        this.physics.add.collider(groupe_ennemi_B, calque_plateforme);
        this.physics.add.collider(groupe_ennemi_C, calque_sol);
        this.physics.add.collider(groupe_ennemi_C, calque_plateforme);
        this.physics.add.collider(groupe_ennemi_D, calque_sol);
        this.physics.add.collider(groupe_ennemi_D, calque_plateforme);

        // créer les animations des ennemis

        // faire perdre de la vie au joueur lorsqu'un ennemi le touche
        this.physics.add.collider(player, groupe_ennemi_A, this.degat, null, this);
        this.physics.add.collider(player, groupe_ennemi_B, this.degat, null, this);
        this.physics.add.collider(player, groupe_ennemi_C, this.degat, null, this);
        this.physics.add.collider(player, groupe_ennemi_D, this.degat, null, this);

        // création d'un groupe balle
        munition = this.physics.add.group();

        // faire en sorte que les balles touchent les ennemis
        this.physics.add.overlap(munition,groupe_ennemi_A,this.degatEnnemi,null,this);

        // afficher les collectables
        objCombat = this.physics.add.image(1175, 650, "objCombat");
        objCombat.setGravityY(100);
        
        objVitesse = this.physics.add.image(750, 950, "objVitesse");
        objVitesse.setGravityY(100);

        objDistance = this.physics.add.image(500, 1150, "objDistance");
        objDistance.setGravityY(100);

        // retirer les objets armures et activer toutes les armures
        if (retour==true){
            objCombat.setVisible(false);
            objVitesse.setVisible(false);
            objDistance.setVisible(false);

            combatObtenu = true;
            vitesseObtenu = true;
            distanceObtenu = true;
        }

        // afficher les batteries à partir d'un calque objet
        position_batterie = carteNiveau4.getObjectLayer("batterie_spawn");

        batterie = this.physics.add.group();

        position_batterie.objects.forEach(batery => {
            batterie.create(batery.x,batery.y, "batterie").body.setGravityY(500);
        })


        //collecte de batterie
        this.physics.add.overlap(player, batterie, this.collecteBatterie, null, this);

        // faire en sorte que les collectables collide avec le sol
        this.physics.add.collider(objCombat, calque_sol);
        this.physics.add.collider(objCombat, calque_plateforme);

        this.physics.add.collider(objVitesse, calque_sol);
        this.physics.add.collider(objVitesse, calque_plateforme);

        this.physics.add.collider(objDistance, calque_sol);
        this.physics.add.collider(objDistance, calque_plateforme);

        this.physics.add.collider(batterie, calque_sol);
        this.physics.add.collider(batterie, calque_plateforme);

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
        this.cameras.main.setBounds(0,0,6400,1280);

        // intégrer une jauge
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xffffff, 0.5); // couleur, alpha du fond de la jauge
        this.graphics.fillRect(20, 20, 75, 1000).setScrollFactor(0); // position x,y, largeur, hauteur du fond de la jauge
        this.graphics.fillStyle(0xffffff, 1) // couleur de la partie remplie de la jauge
        this.jaugeValeur = -100; //pourcentage de la jauge
        this.jauge = this.graphics.fillRect(20, 20 + 1000, 75, 1000 * (this.jaugeValeur / 100)).setScrollFactor(0);

        // afficher les cooldown de capacités
        capa_Atterrissage = this.add.image(250, 100, 'atterrissage').setVisible(false).setScrollFactor(0);
        capa_Coup = this.add.image(450, 100,'coup').setVisible(false).setScrollFactor(0);
        capa_Dash = this.add.image(450, 100, 'dash').setVisible(false).setScrollFactor(0);
        capa_Saut = this.add.image(250, 100, 'saut').setVisible(false).setScrollFactor(0);
        capa_Tir = this.add.image(450, 100, 'tir').setVisible(false).setScrollFactor(0);
        capa_Vol = this.add.image(250, 100, 'vol').setVisible(false).setScrollFactor(0);

        // afficher les armures disponibles
        interface_combat = this.add.image(650, 100,'combat').setVisible(false).setScrollFactor(0);
        interface_vitesse = this.add.image(850, 100,'vitesse').setVisible(false).setScrollFactor(0);
        interface_distance = this.add.image(1050, 100,'distance').setVisible(false).setScrollFactor(0);

        // affichage de l'interface
        lifeUI = this.add.sprite(960,540, "niveauVie").setScrollFactor(0);

        // affichage de l'écran de mort
        ecranMort = this.add.image(960, 540, 'gameOver').setVisible(false).setScrollFactor(0);


        // affichage de l'écran de pause et des boutons
        ecranPause = this.add.image(960, 540, 'pause').setVisible(false).setScrollFactor(0);
        boutonPartir = this.add.image(300, 950, 'partir').setVisible(false).setInteractive().setScrollFactor(0).setInteractive();
        boutonReprendre = this.add.image(960, 950, 'reprendre').setVisible(false).setInteractive().setScrollFactor(0).setInteractive();
        boutonRecommencer = this.add.image(1600, 950, 'recommencer').setVisible(false).setInteractive().setScrollFactor(0).setInteractive();

        boutonPartir.once('pointerup',this.sceneOverworldQuit,this);
        boutonRecommencer.once('pointerup',this.sceneNiveau4,this);
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

        // lancer le changement d'armure
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

        // afficher une interface si une armure est obtenue
        if(vitesseObtenu == true){
            interface_vitesse.setVisible(true);
        }

        if(combatObtenu == true){
            interface_combat.setVisible(true);
        }

        if(distanceObtenu == true){
            interface_distance.setVisible(true);
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
        if (player.x >= 6336 && aller==true) {
            this.sceneCinematique();
        }

        if (player.x <= 0 && retour==true) {
            this.sceneNiveau3();
        }

        // vérifier si une armure est activé pour faire perdre de l'énergie sur la jauge
        if (distance == true || combat == true || vitesse == true) {
            this.jaugeValeur = this.jaugeValeur + consommation / 60; // 1/60 pour 1% par seconde
            this.majJauge();
        }

        // nécessaire pour faire en sorte que le joueur puisse reprendre de la batterie lorsqu'il n'a pas d'armure
        if (basique==true){
            this.majJauge();
        }

        // vérification de la distance entre un ennemi et le joueur
        // sur l'axe X


        // sur l'axe Y

        // activation des capacités selon l'armure équipé
        // armure de vitesse
        // dash à droite
        if (vitesse == true && cld_Dash == false && shift.isDown && Phaser.Input.Keyboard.JustDown(cursors.right)){
            actif_Dash=true;
            cld_Dash=true;
            dash_droit=true;
            capa_Dash.alpha = 0.5;
            this.jaugeValeur = this.jaugeValeur + activDash;

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsDash, () => {
                actif_Dash = false;
                dash_droit = false;
                player.setGravityY(playerGravity);
            });

            // réglage du cooldown de la capacité
            this.time.delayedCall(cooldownDash, () => {
                cld_Dash = false;
                capa_Dash.alpha = 1;
            });
        }

        // activation de la capacité
        if(actif_Dash == true && dash_droit == true){
            player.setGravityY(0);
            player.setVelocityY(0);
            player.setVelocityX(vitesseDash);
        }

        // dash à gauche
        if (vitesse == true && cld_Dash == false && shift.isDown && Phaser.Input.Keyboard.JustDown(cursors.left)){
            actif_Dash=true;
            cld_Dash=true;
            dash_gauche=true;
            capa_Dash.alpha = 0.5;
            this.jaugeValeur = this.jaugeValeur + activDash;

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsDash, () => {
                actif_Dash = false;
                dash_gauche = false;
                player.setGravityY(playerGravity);
            });

            // réglage du cooldown de la capacité
            this.time.delayedCall(cooldownDash, () => {
                cld_Dash = false;
                capa_Dash.alpha = 1;
            });
        }

        // activation de la capacité
        if(actif_Dash == true && dash_gauche == true){
            player.setGravityY(0);
            player.setVelocityY(0);
            player.setVelocityX(-vitesseDash);
        }

        // double saut
        if (vitesse == true && cld_Saut == false && space.isDown){
            actif_Saut=true;
            cld_Saut=true;
            capa_Saut.alpha = 0.5;
            this.jaugeValeur = this.jaugeValeur + activSaut;

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsSaut, () => {
                actif_Saut = false;
            });

            // réglage du cooldown de la capacité
            this.time.delayedCall(cooldownSaut, () => {
                cld_Saut = false;
                capa_Saut.alpha = 1;
            });
        }

        // activation de la capacité
        if (actif_Saut == true){
            player.setVelocityY(-hauteurSaut);
        }


        // armure de combat
        // coup
        if (combat == true && cld_Coup == false && shift.isDown){
            cld_Coup = true;
            capa_Coup.alpha = 0.5;
            this.jaugeValeur = this.jaugeValeur + activCoup;

            groupe_ennemi_A.getChildren().forEach(function(enemy){
                distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

                if(distance<300){
                    this.frappeEnnemi(enemy);
                }
            },this)
    
            console.log(distance);


            // réglage du cooldown de la capacité
            this.time.delayedCall(cooldownCoup, () => {
                cld_Coup = false;
                capa_Coup.alpha = 1;
            });

        }

        // atterrissage
        if (combat == true && cld_Atterrisage == false && Phaser.Input.Keyboard.JustDown(space)){
            actif_Atterrisage=true;
            cld_Atterrisage=true;
            capa_Atterrissage.alpha = 0.5;
            this.jaugeValeur = this.jaugeValeur + activAtterrissage;

            playerDegat = true;

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsAtterrissage, () => {
                actif_Atterrisage = false;
                playerDegat = false;
            });  

            // réglage du cooldown de la capacité
            this.time.delayedCall(cooldownAtterrissage, () => {
                cld_Atterrisage = false;
                capa_Atterrissage.alpha = 1;
            });  
        }

        

        // activation de la capacité
        if (actif_Atterrisage == true){
            player.setVelocityY(vitesseAtterrissage);

            groupe_ennemi_A.getChildren().forEach(function(enemy){
                distance = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

                distanceX = Math.abs(player.x - enemy.x);
                distanceY = Math.abs(player.y - enemy.y);

                if(distanceY <= 257 && distanceX <=200){
                    this.frappeEnnemi(enemy);
                }

                console.log(distanceX)

            },this)
        }


        // armure à distance
        // tir à droite
        if (distance == true && cld_Tir == false && shift.isDown && cursors.right.isDown){
            actif_Tir= true;
            tir_droit = true;
            cld_Tir = true;
            capa_Tir.alpha = 0.5;
            this.jaugeValeur = this.jaugeValeur + activTir;

            munition.create(player.x, player.y, "projectile").body.setVelocityX(vitesseTir);

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsRecul, () => {
                actif_Tir = false;
                tir_droit=false;
            });

            // réglage du cooldown de la capacité
            this.time.delayedCall(cooldownTir, () => {
                cld_Tir = false;
                capa_Tir.alpha = 1;
            });
        }

        // ativation d'un léger recul avec le tir
        if (actif_Tir==true && tir_droit== true){
            player.setVelocityX(-vitesseRecul)
        }

        // tir à gauche
        if (distance == true && cld_Tir == false && shift.isDown && cursors.left.isDown){
            cld_Tir = true;
            tir_gauche = true;
            capa_Tir.alpha = 0.5;
            this.jaugeValeur = this.jaugeValeur + activTir;

            munition.create(player.x, player.y, "projectile").body.setVelocityX(-vitesseTir);

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsRecul, () => {
                actif_Tir = false;
                tir_gauche=false;
            });

            // réglage du cooldown de la capacité
            this.time.delayedCall(cooldownTir, () => {
                cld_Tir = false;
                capa_Tir.alpha = 1;
            });
        }

        // ativation d'un léger recul avec le tir
        if (actif_Tir==true && tir_gauche== true){
            player.setVelocityX(vitesseRecul)
        }

        // vol
        if (distance == true && cld_Vol == false && Phaser.Input.Keyboard.JustDown(space)){
            actif_Vol=true;
            cld_Vol = true;
            playerVitesse = vitesseVol;
            capa_Vol.alpha = 0.5;
            this.jaugeValeur = this.jaugeValeur + activVol;

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsVol, () => {
                actif_Vol = false;
                playerVitesse = majVitesse;
            });  

            // réglage du cooldown de la capacité
            this.time.delayedCall(cooldownVol, () => {
                cld_Vol = false;
                capa_Vol.alpha = 1;
            });
        }

        // activation de la capacité
        if(actif_Vol==true){
            player.setVelocityY(chuteVol);
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
            this.jaugeValeur = this.jaugeValeur - regeneration / 60;
            this.majJaugeRecharge();
        }

        // mettre en place le système de checkpoint
        // premier checkpoint
        if (player.x > 1408 && aller==true){
            respawnX = 1408
        }

        if (player.x < 1408 && retour==true){
            respawnX = 1408
        }

        // faire réaparaitre le joueur lorsqu'il tombe dans le vide
        if (player.y > 1900){
            player.x = respawnX
            player.y = respawnY
            // remettre la forme basique
            this.formeBasique();
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


    }

    majJauge() {
        this.graphics.clear();
        this.graphics.fillStyle(0xffffff, 0.5); // couleur, alpha du fond de la jauge
        this.graphics.fillRect(20, 20, 75, 1000).setScrollFactor(0); // position x,y, largeur, hauteur du fond de la jauge
        this.graphics.fillStyle(0xffffff, 1) // couleur de la partie remplie de la jauge
        this.jauge = this.graphics.fillRect(20, 20 + 1000, 75, 1000 * (this.jaugeValeur / 100)).setScrollFactor(0);
    }

    majJaugeRecharge() {
        this.graphics.clear();
        this.graphics.fillStyle(0xffffff, 0.5); // couleur, alpha du fond de la jauge
        this.graphics.fillRect(20, 20, 75, 1000).setScrollFactor(0); // position x,y, largeur, hauteur du fond de la jauge
        this.graphics.fillStyle(0xff4444, 1) // couleur de la partie remplie de la jauge
        this.jauge = this.graphics.fillRect(20, 20 + 1000, 75, 1000 * (this.jaugeValeur / 100)).setScrollFactor(0);
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

    sceneOverworldQuit() {
        this.scene.start("overworld",{
            entrance : "loose4"
        })
    }

    sceneOverworldWin() {
        this.scene.start("overworld",{
            entrance : "win4",
        })
    }

    sceneCinematique() {
        this.scene.start("cinematique")
    }

    sceneNiveau4() {
        this.scene.start("niveau_4",{
            transfertVie : 4,
            entrance : "restart",
        })
    }

    sceneNiveau3() {
        this.scene.start("niveau_3",{
            transfertVie : 4,
            entrance : "retour",
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

    collecteBatterie(player,batterie){
        batterie.disableBody(true, true);
        this.jaugeValeur= this.jaugeValeur - regenBatterie
    }

    degatEnnemi (balle,ennemi){
        balle.disableBody(true,true);
        ennemi.disableBody(true,true);

        batterie.create(ennemi.x, ennemi.y, "batterie").body.setGravityY(500);
    }

    frappeEnnemi (ennemi){
        ennemi.destroy();

        batterie.create(ennemi.x, ennemi.y, "batterie").body.setGravityY(500);
    }

    suivrePlateforme(player,plateforme){
        player.setVelocityX(plateforme.body.velocity.x);
    }

};