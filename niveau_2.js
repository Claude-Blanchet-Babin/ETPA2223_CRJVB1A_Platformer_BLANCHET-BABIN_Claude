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
var platformTouch = false

// variables du joueur
var player
var lifeUI
var playerDegat = false
var playerOpacity = false
var gameOver = false
var munition
var playerLife = 4
var playerVitesse = 280
var majVitesse = 280
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
var tempsDash = 200
var vitesseDash = 1000

var cooldownSaut = 2500
var tempsSaut = 1
var hauteurSaut = 1000

var cooldownCoup = 1000
var porteCoup = 140

var cooldownAtterrissage = 5000
var tempsAtterrissage = 350
var vitesseAtterrissage = 3000

var cooldownTir = 1500
var vitesseTir = 900
var tempsRecul = 10
var vitesseRecul = 1000

var cooldownVol = 3000
var tempsVol = 1000
var vitesseVol = 150
var chuteVol = 30

// variables permettant de changer les valeurs de l'utilisation de la batterie
var consommation = 3
var regeneration = 10

var activDash = 10
var activSaut = 10
var activAtterrissage = 10
var activCoup = 10
var activVol = 10
var activTir =10

var regenBatterie = 25

// variables pour les ennemis
var position_ennemi_A
var groupe_ennemi_A
var position_ennemi_B
var groupe_ennemi_B
var position_ennemi_C
var groupe_ennemi_C
var position_ennemi_D
var groupe_ennemi_D

var munitionEnnemi
var cldShootEnnemi = false
var cooldownShoot = 1000
var etatCooldown = true

var distanceTriggerFollow
var distanceTriggerFuite
var distanceTriggerShoot

var distanceKillA
var distanceKillB
var distanceKillC
var distanceKillD

var distanceXa
var distanceYa

var distanceXb
var distanceYb

var distanceXc
var distanceYc

var distanceXd
var distanceYd

// variables de la carte niveau 2
var tileset
var carteNiveau2
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

export class niveau_2 extends Phaser.Scene {
    constructor() {
        super("niveau_2");
    }

    init(data){
        playerLife = data.transfertVie
        this.entrance = data.entrance
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

        // chargement du background
        this.load.image("fond0_lvl2", "asset/niveau2/background_0.2.png");
        this.load.image("fond1_lvl2", "asset/niveau2/background_1.2.png");
        this.load.image("fond2_lvl2", "asset/niveau2/background_2.2.png");
        this.load.image("fond3_lvl2", "asset/niveau2/background_3.2.png");
        this.load.image("fond4_lvl2", "asset/niveau2/background_4.2.png");

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu", "asset/carte/tileset.png");
        this.load.tilemapTiledJSON("carteNiveau2", "asset/carte/niveau_2.json");

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

        // chargement des projectiles
        this.load.image("projectile", "asset/objet/projectile.png");
        this.load.image("projectile_ennemi", "asset/objet/projectile_ennemi.png");

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
    create() {

        this.attaque_anim=false;
        this.air=false;

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

        this.music.play();
        this.music.setVolume(0.2);

        this.dammage.setVolume(0.5);
        this.shoot.setVolume(2);
        this.destruction.setVolume(1.5);
        this.transform.setVolume(0.6);

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

        console.log(this.entrance)
        console.log(aller)
        console.log(retour)

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

        cldShootEnnemi = false;
        etatCooldown = true;

        cld_Atterrisage = false
        cld_Coup = false
        cld_Dash = false
        cld_Saut = false
        cld_Tir = false
        cld_Vol = false

        // chargement de la carte 
        carteNiveau2 = this.add.tilemap("carteNiveau2");

        // chargement du jeu de tuile
        tileset = carteNiveau2.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage du background
        this.backgroundParallax2 = this.add.tileSprite(0,0,9600,1280,"fond0_lvl2");
        this.backgroundParallax2.setOrigin(0,0);
        this.backgroundParallax2.setScrollFactor(1,1);
    
        this.quatriemePlanParallax2 = this.add.tileSprite(0,0,9600,1280,"fond1_lvl2");
        this.quatriemePlanParallax2.setOrigin(0,0);
        this.quatriemePlanParallax2.setScrollFactor(0.6,1);
    
        this.troisiemePlanParallax2 = this.add.tileSprite(0,0,9600,1280,"fond2_lvl2");
        this.troisiemePlanParallax2.setOrigin(0,0);
        this.troisiemePlanParallax2.setScrollFactor(0.7,1);
    
        this.secondPlanParallax2 = this.add.tileSprite(0,0,9600,1280,"fond3_lvl2");
        this.secondPlanParallax2.setOrigin(0,0);
        this.secondPlanParallax2.setScrollFactor(0.8,1);
    
        this.premierPlanPrallax2 = this.add.tileSprite(0,0,9600,1280,"fond4_lvl2");
        this.premierPlanPrallax2.setOrigin(0,0);
        this.premierPlanPrallax2.setScrollFactor(0.9,1);

        // affichage des calques
        calque_sol = carteNiveau2.createLayer(
            "sol",
            tileset
        );

        calque_plateforme = carteNiveau2.createLayer(
            "plateforme",
            tileset
        );

        calque_mur_rouge = carteNiveau2.createLayer(
            "mur_rouge",
            tileset
        );

        calque_mur_vert = carteNiveau2.createLayer(
            "mur_vert",
            tileset
        );

        calque_mur_bleu = carteNiveau2.createLayer(
            "mur_bleu",
            tileset
        );

        calque_checkpoint = carteNiveau2.createLayer(
            "checkpoint",
            tileset
        );

        // changer le spawn pour le retour
        if (retour==true){
            spawnX = 9400
            spawnY = 1088

            respawnX = 9400
            respawnY = 1088
        }

        if (aller==true){
            respawnX = 150
            spawnX = 150
            
            respawnY = 1050
            spawnY = 1050
        }

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


        // affichage des plateformes mobiles
        position_plateforme=carteNiveau2.getObjectLayer("plateforme_spawn")
        plateforme = this.physics.add.group();

        position_plateforme.objects.forEach(plat => {
            plateforme.create(plat.x,plat.y, "plateforme").body.setImmovable(true);
        })

        this.physics.add.collider(player,plateforme,this.suivrePlateforme,null,this);

        // définir les mouvements des plateformes
        this.tweens.add({
            targets : plateforme.children.entries[0],
            y: 320,
            duration: 6000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : plateforme.children.entries[1],
            y: 320,
            duration: 6000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : plateforme.children.entries[3],
            y: 704,
            duration: 6000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : plateforme.children.entries[4],
            y: 1152,
            duration: 6000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : plateforme.children.entries[5],
            y: 704,
            duration: 6000,
            repeat : -1,
            yoyo : true
        });


        // reprendre l'affichage des calques en mettant le decor

        // afficher les animations du personnage lorsqu'il se déplace

        // affichage des ennemis
        // créer un groupe d'ennemi à partir d'un calque
        position_ennemi_A = carteNiveau2.getObjectLayer("ennemi_A_spawn");

        // créer un groupe d'ennemi
        groupe_ennemi_A = this.physics.add.group();

        // faire apparaitre un ennemi selon les emplacements et leur donner une gravité
        position_ennemi_A.objects.forEach(ennemi => {
            groupe_ennemi_A.create(ennemi.x,ennemi.y, "red").body.setGravityY(500).setImmovable(true);
        })

        console.log(groupe_ennemi_A.children.entries[0]);

        // correction de la gravité selon l'ennemi
        groupe_ennemi_A.children.entries[0].setGravity(0);
        groupe_ennemi_A.children.entries[6].setGravity(0);

        this.tweens.add({
            targets : groupe_ennemi_A.children.entries[0],
            y: 640,
            duration: 3000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : groupe_ennemi_A.children.entries[6],
            y: 64,
            duration: 3000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : groupe_ennemi_A.children.entries[1],
            x: 2752,
            duration: 3000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : groupe_ennemi_A.children.entries[2],
            x: 2432,
            duration: 3000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : groupe_ennemi_A.children.entries[3],
            x: 5888,
            duration: 3000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : groupe_ennemi_A.children.entries[4],
            x: 6848,
            duration: 3000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : groupe_ennemi_A.children.entries[5],
            x: 6592,
            duration: 3000,
            repeat : -1,
            yoyo : true
        });

        // deuxième groupe d'ennemi
        position_ennemi_B = carteNiveau2.getObjectLayer("ennemi_B_spawn");
        groupe_ennemi_B = this.physics.add.group();
        position_ennemi_B.objects.forEach(ennemi => {
            groupe_ennemi_B.create(ennemi.x,ennemi.y, "blue").body.setGravityY(500);
        })

        // troisième groupe d'ennemi
        position_ennemi_C = carteNiveau2.getObjectLayer("ennemi_C_spawn");
        groupe_ennemi_C = this.physics.add.group();
        position_ennemi_C.objects.forEach(ennemi => {
            groupe_ennemi_C.create(ennemi.x,ennemi.y, "green").body.setGravityY(500).setImmovable(true);
        })

        // quatrième groupe d'ennemi
        position_ennemi_D = carteNiveau2.getObjectLayer("ennemi_D_spawn");
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

        // faire perdre de la vie au joueur lorsqu'un ennemi le touche
        this.physics.add.collider(player, groupe_ennemi_A, this.degat, null, this);
        this.physics.add.collider(player, groupe_ennemi_B, this.degat, null, this);
        this.physics.add.collider(player, groupe_ennemi_C, this.degat, null, this);
        this.physics.add.collider(player, groupe_ennemi_D, this.degat, null, this);

        // création d'un groupe balle
        munition = this.physics.add.group();
        munitionEnnemi = this.physics.add.group();

        // ajout de la collision entre les balles ennemis et le joueur
        this.physics.add.overlap(munitionEnnemi,player, this.degatBalle, null, this);

        // faire en sorte que les balles touchent les ennemis
        this.physics.add.overlap(munition,groupe_ennemi_A,this.degatEnnemi,null,this);
        this.physics.add.overlap(munition,groupe_ennemi_B,this.degatEnnemi,null,this);
        this.physics.add.overlap(munition,groupe_ennemi_C,this.degatEnnemi,null,this);
        this.physics.add.overlap(munition,groupe_ennemi_D,this.degatEnnemiD,null,this);

        this.physics.add.collider(munitionEnnemi,calque_sol, this.destructionBalle, null, this);
        this.physics.add.collider(munitionEnnemi,calque_plateforme, this.destructionBalle, null, this);
        this.physics.add.collider(munitionEnnemi,calque_mur_bleu, this.destructionBalle, null, this);
        this.physics.add.collider(munitionEnnemi,calque_mur_rouge, this.destructionBalle, null, this);
        this.physics.add.collider(munitionEnnemi,calque_mur_vert, this.destructionBalle, null, this);

        this.physics.add.collider(munition,calque_sol, this.destructionBalle2, null, this);
        this.physics.add.collider(munition,calque_plateforme, this.destructionBalle2, null, this);
        this.physics.add.collider(munition,calque_mur_bleu, this.destructionBalle2, null, this);
        this.physics.add.collider(munition,calque_mur_rouge, this.destructionBalle2, null, this);
        this.physics.add.collider(munition,calque_mur_vert, this.destructionBalle2, null, this);

        // afficher les collectables
        objCombat = this.physics.add.image(5440, 768, "objCombat");
        objCombat.setGravityY(100);
        
        objVitesse = this.physics.add.image(1280, 704, "objVitesse");
        objVitesse.setGravityY(100);

        objDistance = this.physics.add.image(1600, 1500, "objDistance");
        objDistance.setGravityY(100);

        // retirer les objets armures et activer toutes les armures
        if (retour==true){
            objCombat.setVisible(false);
            objVitesse.setVisible(false);
            objDistance.setVisible(false);

            combatObtenu = true;
            vitesseObtenu = true;
            distanceObtenu = true;

            this.music.stop();

            this.lootbox.setVolume(0);
        }

        // afficher les batteries à partir d'un calque objet
        position_batterie = carteNiveau2.getObjectLayer("batterie_spawn");

        batterie = this.physics.add.group();

        position_batterie.objects.forEach(batery => {
            batterie.create(batery.x,batery.y, "batterie").body.setGravityY(500);
        })

        //collecte de batterie
        this.physics.add.overlap(player, batterie, this.collecteBatterie, null, this);

        // faire en sorte que les collectables collide avec le sol
        this.physics.add.collider(objCombat, calque_sol);
        this.physics.add.collider(objCombat, calque_plateforme);
        this.physics.add.collider(objCombat, calque_mur_bleu);

        this.physics.add.collider(objVitesse, calque_sol);
        this.physics.add.collider(objVitesse, calque_plateforme);

        this.physics.add.collider(objDistance, calque_sol);
        this.physics.add.collider(objDistance, calque_plateforme);

        this.physics.add.collider(batterie, calque_sol);
        this.physics.add.collider(batterie, calque_plateforme);
        this.physics.add.collider(batterie, calque_mur_rouge);
        this.physics.add.collider(batterie, calque_mur_vert);
        this.physics.add.collider(batterie, calque_mur_bleu);

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

        // afficher les armures disponibles
        interface_combat = this.add.image(961, 85,'combat').setVisible(false).setScrollFactor(0);
        interface_vitesse = this.add.image(860, 85,'vitesse').setVisible(false).setScrollFactor(0);
        interface_distance = this.add.image(1060, 85,'distance').setVisible(false).setScrollFactor(0);

        // création de la caméra
        // taille de la caméra
        this.cameras.main.setSize(1920, 1080);
        // faire en sorte que la caméra suive le personnage et qu'elle ne sorte pas de l'écran
        this.cameras.main.startFollow(player);
        this.cameras.main.setDeadzone(100, 100);
        this.cameras.main.setBounds(0,0,9600,1280);

        // intégrer une jauge
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xffffff, 0.5); // couleur, alpha du fond de la jauge
        this.graphics.fillRect(40, 80, 50, 950).setScrollFactor(0); // position x,y, largeur, hauteur du fond de la jauge
        this.graphics.fillStyle(0xffffff, 1) // couleur de la partie remplie de la jauge
        this.jaugeValeur = -100; //pourcentage de la jauge
        this.jauge = this.graphics.fillRect(40, 80 + 950, 50, 950 * (this.jaugeValeur / 100)).setScrollFactor(0);

        // afficher les cooldown de capacités
        capa_Atterrissage = this.add.image(250, 100, 'atterrissage').setVisible(false).setScrollFactor(0);
        capa_Coup = this.add.image(450, 100,'coup').setVisible(false).setScrollFactor(0);
        capa_Dash = this.add.image(450, 100, 'dash').setVisible(false).setScrollFactor(0);
        capa_Saut = this.add.image(250, 100, 'saut').setVisible(false).setScrollFactor(0);
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

        boutonPartir.once('pointerup',this.sceneOverworldQuit,this);
        boutonRecommencer.once('pointerup',this.sceneNiveau2,this);
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

        groupe_ennemi_A.getChildren().forEach(function(enemy){

            this.time.addEvent({
                delay: 3000,
                repeat: -1,
                callback : function (){
                    //enemy.setFlipX(!enemy.flipX);
                    enemy.flipX=true;
                }
            });
            
            this.time.addEvent({
                delay: 6000,
                repeat: -1,
                callback : function (){
                    enemy.flipX=false;
                }
            });
            

        },this)

        
    }

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update() {

        munitionEnnemi.getChildren().forEach(function(ammo){

            if (ammo.body.velocity.x <= 0){
                ammo.flipX = false;
            }

            if (ammo.body.velocity.x >= 0){
                ammo.flipX = true;
            }


        },this)

        groupe_ennemi_A.getChildren().forEach(function(enemy){

            if (enemy.body.velocity.x <= 0){
                //enemy.flipX = false;
                enemy.play('marche_rouge', true);
            }

            /*
            if (enemy.body.velocity.x >= 0){
                enemy.flipX = true;
                enemy.play('marche_rouge', true);
            }
            */

        },this)

        groupe_ennemi_B.getChildren().forEach(function(enemy){

            if (enemy.body.velocity.x >= 0){
                enemy.flipX = true;
                enemy.play('marche_bleu', true);
            }

            if (enemy.body.velocity.x <= 0){
                enemy.flipX = false;
                enemy.play('marche_bleu', true);
            }

        },this)

        groupe_ennemi_C.getChildren().forEach(function(enemy){
            enemy.play('marche_vert',true);

        },this)

        groupe_ennemi_D.getChildren().forEach(function(enemy){

            if (enemy.body.velocity.x >= 0){
                enemy.flipX = true;
                enemy.play('marche_violet', true);
            }

            if (enemy.body.velocity.x <= 0){
                enemy.flipX = false;
                enemy.play('marche_violet', true);
            }

        },this)

        // definir le comportement des plateformes
        if(plateforme.children.entries[2].x >= 7808){
            plateforme.children.entries[2].setVelocityX(-100);
        }

        if(plateforme.children.entries[2].x <= 7450){
            plateforme.children.entries[2].setVelocityX(100);
        }

        // definir le comportement ennemi
        /*
        if (groupe_ennemi_A.children.entries[1].body.velocity.x <= 0){
            groupe_ennemi_A.children.entries[1].flipX = false;
            groupe_ennemi_A.children.entries[1].play('marche_rouge', true);
        }

        if (groupe_ennemi_A.children.entries[1].body.velocity.x >= 0){
            groupe_ennemi_A.children.entries[1].flipX = true;
            groupe_ennemi_A.children.entries[1].play('marche_rouge', true);
        }

        if (groupe_ennemi_A.children.entries[2].body.velocity.x <= 0){
            groupe_ennemi_A.children.entries[2].flipX = false;
            groupe_ennemi_A.children.entries[2].play('marche_rouge', true);
        }

        if (groupe_ennemi_A.children.entries[2].body.velocity.x >= 0){
            groupe_ennemi_A.children.entries[2].flipX = true;
            groupe_ennemi_A.children.entries[2].play('marche_rouge', true);
        }

        if (groupe_ennemi_A.children.entries[3].body.velocity.x <= 0){
            groupe_ennemi_A.children.entries[3].flipX = false;
            groupe_ennemi_A.children.entries[3].play('marche_rouge', true);
        }

        if (groupe_ennemi_A.children.entries[3].body.velocity.x >= 0){
            groupe_ennemi_A.children.entries[3].flipX = true;
            groupe_ennemi_A.children.entries[3].play('marche_rouge', true);
        }

        if (groupe_ennemi_A.children.entries[4].body.velocity.x <= 0){
            groupe_ennemi_A.children.entries[4].flipX = false;
            groupe_ennemi_A.children.entries[4].play('marche_rouge', true);
        }

        if (groupe_ennemi_A.children.entries[4].body.velocity.x >= 0){
            groupe_ennemi_A.children.entries[4].flipX = true;
            groupe_ennemi_A.children.entries[4].play('marche_rouge', true);
        }

        if (groupe_ennemi_A.children.entries[5].body.velocity.x <= 0){
            groupe_ennemi_A.children.entries[5].flipX = false;
            groupe_ennemi_A.children.entries[5].play('marche_rouge', true);
        }

        if (groupe_ennemi_A.children.entries[5].body.velocity.x >= 0){
            groupe_ennemi_A.children.entries[5].flipX = true;
            groupe_ennemi_A.children.entries[5].play('marche_rouge', true);
        }
        */

        // comportement des ennemis avec routine

        // comportement des ennemis qui suivent
        groupe_ennemi_B.getChildren().forEach(function(enemy){
            distanceTriggerFollow = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

            if(distanceTriggerFollow<300){
                this.suivreEnnemi(enemy);
            }
        },this)

        // comportement des ennemis qui doivent tirer
        groupe_ennemi_C.getChildren().forEach(function(enemy){
            distanceTriggerShoot = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

            //console.log(distanceTriggerFollow)

            if(distanceTriggerShoot<300 && (player.x - enemy.x < 0)){
                this.shootEnnemiDevant(enemy);
            }

            if(distanceTriggerShoot<300 && (player.x - enemy.x > 0)){
                this.shootEnnemiDerriere(enemy);               
            }

            console.log(cldShootEnnemi)

        },this)

        // comportement des ennemis qui doivent fuir
        groupe_ennemi_D.getChildren().forEach(function(enemy){
            distanceTriggerFuite = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

            if(distanceTriggerFuite<300 && (player.x - enemy.x < 0)){
                this.fuiteEnnemiReculer(enemy);
            }

            if(distanceTriggerFuite<300 && (player.x - enemy.x > 0)){
                this.fuiteEnnemiAvancer(enemy);
            }

            //console.log(distanceTriggerFuite)

        },this)

        console.log(playerLife)

        // ajout des moyens de déplacement du personnage
        if (cursors.left.isDown){ //si la touche gauche est appuyée
            player.setVelocityX(- playerVitesse); //alors vitesse négative en X
            lockTouche=false
            player.flipX = true;

            if(basique==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('droite', true);
            }
            if(combat==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('droite_combat', true);
            }
            if(distance==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('droite_distance', true);
            }
            if(vitesse==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('droite_vitesse', true);
            }
        }

        else if (cursors.right.isDown){ //sinon si la touche droite est appuyée
            player.setVelocityX(playerVitesse); //alors vitesse positive en X
            lockTouche=false
            player.flipX = false;

            if(basique==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('droite', true);
            }
            if(combat==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('droite_combat', true);
            }
            if(distance==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('droite_distance', true);
            }
            if(vitesse==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('droite_vitesse', true);
            }

        }
        else if (lockTouche == true){ // sinon
                 //vitesse nulle
            platformTouch = true

            if(basique==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('idle', true);
            }
            if(combat==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('idle_combat', true);
            }
            if(distance==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('idle_distance', true);
            }
            if(vitesse==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('idle_vitesse', true);
            }
            //player.anims.play('turn'); //animation fait face caméra
        }
        else{
            player.setVelocityX(0);

            if(basique==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('idle', true);
            }
            if(combat==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('idle_combat', true);
            }
            if(distance==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('idle_distance', true);
            }
            if(vitesse==true&& this.attaque_anim==false && this.air==false){
                player.anims.play('idle_vitesse', true);
            }
        }
        if (cursors.up.isDown && player.body.blocked.down){

            //this.mouvement.play();

            //si touche haut appuyée ET que le perso touche le sol
            player.setVelocityY(-playerSaut); //alors vitesse verticale négative
            lockTouche=false
            //(on saute)

            this.air=true;

            // réglage du cooldown de l'animation
            this.time.delayedCall(1200, () => {
                this.air=false;
            });
        }

        if (this.air==true){
            if(basique==true){
                player.anims.play('sautbasique', true);
            }

            if(combat==true){
                player.anims.play('sautcombat', true);
            }

            if(distance==true){
                player.anims.play('sautdistance', true);
            }

            if(vitesse==true){
                player.anims.play('sautvitesse', true);
            }
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

        // lancer le changement d'armure
        if (a.isDown && vitesseObtenu == true && this.jaugeValeur < 0 && rechargement == false) {
            this.transform.play();
            this.armureVitesse();
        }

        if (z.isDown && combatObtenu == true && this.jaugeValeur < 0 && rechargement == false) {
            this.transform.play();
            this.armureCombat();
        }

        if (e.isDown && distanceObtenu == true && this.jaugeValeur < 0 && rechargement == false) {
            this.transform.play();
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
        if (player.x >= 9664 && aller==true) {
            this.sceneOverworldWin();
        }

        if (player.x <= 0 && retour==true) {
            this.sceneNiveau1();
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

            this.attaque_anim=true;

            this.air=false;
            player.anims.play('dash_vitesse', true);

            this.mouvement.play();

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsDash, () => {
                actif_Dash = false;
                dash_droit = false;
                player.setGravityY(playerGravity);
                this.attaque_anim=false;
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

            this.air=false;
            this.attaque_anim=true;
            player.anims.play('dash_vitesse', true);

            this.mouvement.play();

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsDash, () => {
                actif_Dash = false;
                dash_gauche = false;
                player.setGravityY(playerGravity);
                this.attaque_anim=false;
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

            this.air=false;
            this.attaque_anim=true;
            player.anims.play('double_saut_vitesse', true);

            this.mouvement.play();

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsSaut, () => {
                actif_Saut = false;
            });

            // réglage du cooldown de la capacité
            this.time.delayedCall(cooldownSaut, () => {
                cld_Saut = false;
                capa_Saut.alpha = 1;
            });

            // réglage du cooldown de l'animation
            this.time.delayedCall(1200, () => {
                this.attaque_anim=false;
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

            this.air=false;

            this.attaque_anim=true;
            player.anims.play('attaque_combat', true);

            groupe_ennemi_A.getChildren().forEach(function(enemy){
                distanceKillA = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

                if(distanceKillA<porteCoup){
                    this.frappeEnnemi(enemy);
                }
            },this)

            groupe_ennemi_B.getChildren().forEach(function(enemy){
                distanceKillB = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

                if(distanceKillB<porteCoup){
                    this.frappeEnnemi(enemy);
                }
            },this)

            groupe_ennemi_C.getChildren().forEach(function(enemy){
                distanceKillC = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

                if(distanceKillC<porteCoup){
                    this.frappeEnnemi(enemy);
                }
            },this)

            groupe_ennemi_D.getChildren().forEach(function(enemy){
                distanceKillD = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

                if(distanceKillD<porteCoup){
                    this.frappeEnnemiD(enemy);
                }
            },this)

            // réglage du cooldown de l'animation
            this.time.delayedCall(400, () => {
                this.attaque_anim=false;
            });

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

            this.attaque_anim=true;

            this.air=false;

            player.anims.play('atterrissage_combat', true);

            this.atterrir.play();

            playerDegat = true;

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsAtterrissage, () => {
                actif_Atterrisage = false;
                playerDegat = false;

                this.attaque_anim=false;
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
                distanceKillA = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

                distanceXa = Math.abs(player.x - enemy.x);
                distanceYa = Math.abs(player.y - enemy.y);

                if(distanceYa <= 150 && distanceXa <=100){
                    this.frappeEnnemi(enemy);
                }

            },this)

            groupe_ennemi_B.getChildren().forEach(function(enemy){
                distanceKillB = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

                distanceXb = Math.abs(player.x - enemy.x);
                distanceYb = Math.abs(player.y - enemy.y);

                if(distanceYb <= 150 && distanceXb <=100){
                    this.frappeEnnemi(enemy);
                }

            },this)

            groupe_ennemi_C.getChildren().forEach(function(enemy){
                distanceKillC = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

                distanceXc = Math.abs(player.x - enemy.x);
                distanceYc = Math.abs(player.y - enemy.y);

                if(distanceYc <= 150 && distanceXc <=100){
                    this.frappeEnnemi(enemy);
                }

            },this)

            groupe_ennemi_D.getChildren().forEach(function(enemy){
                distanceKillD = Phaser.Math.Distance.Between(player.x, player.y, enemy.x, enemy.y);

                distanceXd = Math.abs(player.x - enemy.x);
                distanceYd = Math.abs(player.y - enemy.y);

                if(distanceYd <= 150 && distanceXd <=100){
                    this.frappeEnnemiD(enemy);
                }

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

            this.shoot.play();

            this.air=false;

            this.attaque_anim=true;
            player.anims.play('attaque_distance', true);

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

            // réglage du cooldown de l'animation
            this.time.delayedCall(300, () => {
                this.attaque_anim=false;
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

            this.shoot.play();

            this.air=false;

            this.attaque_anim=true;
            player.anims.play('attaque_distance', true);

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

            // réglage du cooldown de l'animation
            this.time.delayedCall(300, () => {
                this.attaque_anim=false;
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

            this.air=false;
            this.attaque_anim=true;
            player.anims.play('vol_distance', true);

            this.vol.play();

            // réglage de la durée de la capacité
            this.time.delayedCall(tempsVol, () => {
                actif_Vol = false;
                playerVitesse = majVitesse;
                this.attaque_anim=false;
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

            this.carburant.play();

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
        if (player.x > 4800 && aller==true){
            respawnX = 4800
            respawnY= 832
        }

        if (player.x < 4800 && retour==true){
            respawnX = 4800
            respawnY= 832
        }
        // faire réaparaitre le joueur lorsqu'il tombe dans le vide
        if (player.y > chute){
            player.x = respawnX
            player.y = respawnY

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
        this.graphics.fillRect(40,80,50,950).setScrollFactor(0); // position x,y, largeur, hauteur du fond de la jauge
        this.graphics.fillStyle(0xffffff, 1) // couleur de la partie remplie de la jauge
        this.jauge = this.graphics.fillRect(40, 80 + 950, 50, 950 * (this.jaugeValeur / 100)).setScrollFactor(0);
    }

    majJaugeRecharge() {
        this.graphics.clear();
        this.graphics.fillStyle(0xffffff, 0.5); // couleur, alpha du fond de la jauge
        this.graphics.fillRect(40, 80, 50, 950).setScrollFactor(0); // position x,y, largeur, hauteur du fond de la jauge
        this.graphics.fillStyle(0xff4444, 1) // couleur de la partie remplie de la jauge
        this.jauge = this.graphics.fillRect(40, 80 + 950, 50, 950 * (this.jaugeValeur / 100)).setScrollFactor(0);
    }

    collecteVitesse() {

        this.lootbox.play();

        objVitesse.disableBody(true, true);
        vitesseObtenu = true;
    }

    collecteCombat() {

        this.lootbox.play();

        objCombat.disableBody(true, true);
        combatObtenu = true;
    }

    collecteDistance() {

        this.lootbox.play();

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
        if(aller==true){
            this.music.stop();
            this.scene.start("overworld",{
                entrance : "loose2"
            })
        }

        if(retour==true){
            this.music.stop();
            this.scene.start("overworld",{
                entrance : "loose4"
            })
        }
    }

    sceneOverworldWin() {
        this.music.stop();
        this.scene.start("overworld",{
            entrance : "win2",
        })
    }

    sceneNiveau2() {
        if(aller==true){
            this.music.stop();
            this.scene.start("niveau_2",{
                transfertVie : 4,
                entrance : "overworld",
            })
        }

        if(retour==true){
            this.music.stop();
            this.scene.start("niveau_2",{
                transfertVie : 4,
                entrance : "retour",
            })
        }
    }

    sceneNiveau1() {
        this.scene.start("niveau_1",{
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

            this.dammage.play();
            
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

            this.dammage.play();
            
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

    degatBalle(player,balle){

        // le joueur perd de la batterie si une armure est active

        // vérifier que le cooldown de degat est disponible
        if (playerDegat == false && basique== false){

            this.dammage.play();
            
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

            this.dammage.play();
            
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

        balle.disableBody(true,true);
    }

    collecteBatterie(player,batterie){

        this.loot.play();

        batterie.disableBody(true, true);
        this.jaugeValeur= this.jaugeValeur - regenBatterie
    }

    degatEnnemi (balle,ennemi){

        this.destruction.play();

        balle.destroy();
        ennemi.destroy();

        batterie.create(ennemi.x, ennemi.y, "batterie").body.setGravityY(500);
    }

    degatEnnemiD (balle,ennemi){

        this.destruction.play();

        balle.destroy();
        ennemi.destroy();

        batterie.create(ennemi.x, ennemi.y, "batterie").body.setGravityY(500);
        batterie.create(ennemi.x+64, ennemi.y, "batterie").body.setGravityY(500);
        batterie.create(ennemi.x-64, ennemi.y, "batterie").body.setGravityY(500);
    }

    frappeEnnemi (ennemi){

        this.destruction.play();

        ennemi.destroy();

        batterie.create(ennemi.x, ennemi.y, "batterie").body.setGravityY(500);
    }

    frappeEnnemiD (ennemi){

        this.destruction.play();

        ennemi.destroy();

        batterie.create(ennemi.x, ennemi.y, "batterie").body.setGravityY(500);
        batterie.create(ennemi.x+64, ennemi.y, "batterie").body.setGravityY(500);
        batterie.create(ennemi.x-64, ennemi.y, "batterie").body.setGravityY(500);
    }

    suivrePlateforme(player,plateforme){
        lockTouche=true;
        if(platformTouch==true){
            player.setVelocityX(plateforme.body.velocity.x);
        }
    }

    suivreEnnemi(ennemi){
        this.physics.moveTo(ennemi,player.x,ennemi.y,100)
    }

    fuiteEnnemiAvancer(ennemi){
        ennemi.setVelocityX(-100)
    }

    fuiteEnnemiReculer(ennemi){
        ennemi.setVelocityX(100)
    }

    shootEnnemiDevant(ennemi){
        if (cldShootEnnemi == false){
            munitionEnnemi.create(ennemi.x, ennemi.y, "projectile_ennemi").body.setVelocityX(-vitesseTir);
        }

        cldShootEnnemi = true;

        if (etatCooldown == true){
            etatCooldown=false;
            this.time.delayedCall(cooldownShoot, () => {
                cldShootEnnemi = false
                etatCooldown = true;
            });
        }
    }    

    shootEnnemiDerriere(ennemi){
        if(cldShootEnnemi == false){
            munitionEnnemi.create(ennemi.x, ennemi.y, "projectile_ennemi").body.setVelocityX(vitesseTir);
        }

        cldShootEnnemi = true;

        if (etatCooldown == true){
            etatCooldown=false;
            this.time.delayedCall(cooldownShoot, () => {
                cldShootEnnemi = false;
                etatCooldown = true;
            });
        }

    }

    destructionBalle(balle){
        balle.destroy();
    }

    destructionBalle2(balle){
        balle.destroy();
    }


};