
// création des variables
var texteDebut = true
var player
var cursors
var tileset
var keySpace
var atk
var shift
var interagir
var intangible = false
var vol = false
var PLAYER_SPEED = 200
var playerDegat = false 
var playerLife = 5 
var playerOpacity
var gameOver
var lockTouche = false

// collision
var collisiongrille
var collisiontrou
var collisioneau

// competence
var obtention
var flaconAcquis = false
var aileAcquis = false
var feuAcquis = false

// interface
var flacon
var aile
var blocFlacon
var blocAile
var blocBleu
var blocRouge
var scorePiece
var scoreBleu
var scoreRouge
var textBox
var lifeUI

// texte
var debut1
var debut2

var grille1
var grille2

var eau1
var eau2

var trou1
var trou2

var fontaine1
var fontaine2

var voeu1
var voeu2

var flacon1
var flacon2

var bleu1

var over1
var over2

var firstChute = false
var firstGrille = false
var firstEau = false
var firstBleu = false

// collectable
var piece1
var piece2
var piece3
var piece4
var piece5
var piece6
var piece7
var piece8
var piece9
var piece10

var nombre = 0
var nombreBleu = 0
var nombreRouge = 0

var coeur1
var coeur2
var coeur3

// obstacle

var brume1
var brume2
var brume3

// ennemi

var ennemi1
var ennemi2
var ennemi3

var poursuite1 = false
var poursuite2 = false

var ennemi1InitialX = 1535
var ennemi1TargetX = 1900
var ennemi1Speed = 50
var ennemi1Direction = 1

var mort1 = false
var mort2 = false
var mort3 = false

var loot1
var loot2
var loot3

// element externe

var torche1
var torcheFeu1
var torche2
var torcheFeu2
var torcheFeu3
var torche4
var torcheFeu4
var allumage4 = false


// variables de la carte du jardin
var carteDuJardin
var calque_sous_sol_ja
var calque_sol_ja
var calque_sur_sol_ja
var calque_eau_ja
var calque_trou_ja
var calque_obstacle_ja
var calque_fontaine_ja
var calque_grille_ja
var calque_decor_ja
var calque_decor_bis_ja


export class jardin extends Phaser.Scene{
    constructor(){
        super("jardin");
    }

    init(data){
        this.entrance = data.entrance
        this.majVie = data.transfertVie
        this.majGold = data.transfertGold
        this.majBleu = data.transfertBleu
        this.majRouge = data.transfertRouge
    }

    // préchargement de tous les éléments nécessaires au fonctionnement de la scène
    preload(){

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu","assetsjeu/image/tileset.png");
        this.load.tilemapTiledJSON("cartejardin","assetsjeu/carte_jardin.json")

        // chargement de l'interface utilisateur
        this.load.image("cadre","assetsjeu/image/cadre_ui.png");
        this.load.image("bloc_flacon","assetsjeu/image/bloc_flacon.png");
        this.load.image("bloc_aile","assetsjeu/image/bloc_aile.png");
        this.load.image("bloc_bleu","assetsjeu/image/bloc_bleu.png");
        this.load.image("bloc_rouge","assetsjeu/image/bloc_rouge.png");
        this.load.image("piece_ui","assetsjeu/image/piece_ui.png");
        this.load.image("textbox","assetsjeu/image/textbox.png");
        this.load.spritesheet("niveauVie","assetsjeu/image/vie.png",
        {frameWidth : 100, frameHeight: 100});

        // chargement des collectables
        this.load.image("flacon","assetsjeu/image/flacon.png");
        this.load.image("aile","assetsjeu/image/aile.png");
        this.load.image("flamme_bleu","assetsjeu/image/flamme_bleu.png");
        this.load.image("flamme_rouge","assetsjeu/image/flamme_rouge.png");
        this.load.image("lumiere","assetsjeu/image/lumiere_alpha.png");
        this.load.image("piece","assetsjeu/image/piece.png");

        // chargement des elements externes
        this.load.image("nuage","assetsjeu/image/nuage.png");
        this.load.image("pierre","assetsjeu/image/rocher.png");
        this.load.image("pierre_2a","assetsjeu/image/pierre_2a.png");
        this.load.image("pierre_2b","assetsjeu/image/pierre_2b.png");
        this.load.image("pierre_3a","assetsjeu/image/pierre_3a.png");
        this.load.image("pierre_3b","assetsjeu/image/pierre_3b.png");
        this.load.image("pierre_4","assetsjeu/image/pierre_4.png");
        this.load.image("pierre_6a","assetsjeu/image/pierre_6a.png");
        this.load.image("pierre_6b","assetsjeu/image/pierre_6b.png");
        this.load.image("pierre_9","assetsjeu/image/pierre_9.png");
        this.load.image("torche","assetsjeu/image/torche.png");
        this.load.image("torche_feu","assetsjeu/image/torche_feu.png");

        // chargement du personnage
        this.load.spritesheet("perso","assetsjeu/image/perso.png",
        { frameWidth: 96, frameHeight: 128 });  
        
        // chargement des ennemis
        this.load.spritesheet("ennemi_alpha","assetsjeu/image/ennemi_alpha_animation.png",
        { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("ennemi_beta","assetsjeu/image/ennemi_beta_animation.png",
        { frameWidth: 96, frameHeight: 64 });

    }

    // création du niveau
    create(){

        // chargement de la carte 
        carteDuJardin = this.add.tilemap("cartejardin");

        // chargement du jeu de tuile
        tileset = carteDuJardin.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage des calques
 
        calque_sous_sol_ja = carteDuJardin.createLayer(
            "soussol",
            tileset
        );

        calque_sol_ja = carteDuJardin.createLayer(
            "sol",
            tileset
        );

        calque_sur_sol_ja = carteDuJardin.createLayer(
            "sursol",
            tileset
        );

        calque_eau_ja = carteDuJardin.createLayer(
            "eau",
            tileset
        );
        
        calque_trou_ja = carteDuJardin.createLayer(
            "trou",
            tileset
        );

        calque_obstacle_ja = carteDuJardin.createLayer(
            "obstacle",
            tileset
        );

        calque_fontaine_ja = carteDuJardin.createLayer(
            "fontaine",
            tileset
        );

        calque_grille_ja = carteDuJardin.createLayer(
            "grille",
            tileset
        );

        // affichage du personnage
        player = this.physics.add.sprite(2080, 256, 'perso');
        player.setSize(20,15).setOffset(38,75);


        // reprendre l'affichage du des calques en mettant le decor
        calque_decor_ja = carteDuJardin.createLayer(
            "decor",
            tileset
        );

        calque_decor_bis_ja = carteDuJardin.createLayer(
            "decorbis",
            tileset
        );

        // afficher les animations du personnage lorsqu'il se déplace
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('perso', {start:0,end:4}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'gauche',
            frames: this.anims.generateFrameNumbers('perso', {start:5,end:9}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'droite',
            frames: this.anims.generateFrameNumbers('perso', {start:20,end:24}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'dos',
            frames: this.anims.generateFrameNumbers('perso', {start:15,end:19}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'face',
            frames: this.anims.generateFrameNumbers('perso', {start:10,end:14}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attaque',
            frames: this.anims.generateFrameNumbers('perso', {start:25,end:29}),
            frameRate: 10,
            repeat: -1,
        });    
        // bug : l'animation ne se déclenche pas entièrement
    


        // affichage des ennemis
        ennemi1 = this.physics.add.sprite(1000,1680,"ennemi_alpha");
        ennemi1.setSize(25,32).setOffset(20,20);

        //ennemi1 = this.physics.add.sprite(1535,1680,"ennemi_alpha");
        //ennemi1.setSize(25,32).setOffset(20,20);
        //ennemi1.setVelocityX(ennemi1Speed * ennemi1Direction);

        ennemi2 = this.physics.add.sprite(730,2350,"ennemi_alpha");
        ennemi2.setSize(25,32).setOffset(20,20);

        ennemi3 = this.physics.add.sprite(900,920,"ennemi_alpha");
        ennemi3.setSize(25,32).setOffset(20,20);

        // affichage de leur loot et de l'intercation possible avec le joueur
        loot1 = this.physics.add.sprite(1535,1680,"flamme_bleu").setVisible(false);
        this.physics.add.overlap(player,loot1,this.recuperation1,null,this);

        loot2 = this.physics.add.sprite(730,2350,"flamme_bleu").setVisible(false);
        this.physics.add.overlap(player,loot2,this.recuperation2,null,this);

        loot3 = this.physics.add.sprite(1075,850,"flamme_bleu").setVisible(false);
        this.physics.add.overlap(player,loot3,this.recuperation3,null,this);


        // créer les animations des ennemis
        this.anims.create({
            key: 'alpha',
            frames: this.anims.generateFrameNumbers('ennemi_alpha', {start:0,end:33}),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'beta',
            frames: this.anims.generateFrameNumbers('ennemi_beta', {start:0,end:43}),
            frameRate: 5,
            repeat: -1
        });



        // définition de leur comportement

        this.tweens.add({
            targets : ennemi1,
            x: 1930,
            duration: 8000,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : ennemi2,
            x: 930,
            duration: 2500,
            repeat : -1,
            yoyo : true
        });

        this.tweens.add({
            targets : ennemi3,
            x: 1400,
            duration: 6000,
            repeat : -1,
            yoyo : true
        });

        // definir les collisions entre les ennemis et le decor
        this.physics.add.collider(ennemi1, calque_obstacle_ja,);
        this.physics.add.collider(ennemi2, calque_obstacle_ja,);
        this.physics.add.collider(ennemi3, calque_obstacle_ja,);



        // affichage de l'objet débloquant la nouvelle capacité
        flacon = this.physics.add.image(320,2850,"flacon");

        // affichage des pièces pouvant être ramassées pour faire monter le score
        piece1 = this.physics.add.image(250,250,"piece");
        piece2 = this.physics.add.image(3900,250,"piece");
        piece3 = this.physics.add.image(3900,1325,"piece");
        piece4 = this.physics.add.image(3850,2100,"piece");
        piece5 = this.physics.add.image(3400,2080,"piece");
        piece6 = this.physics.add.image(2370,2080,"piece");
        piece7 = this.physics.add.image(2080,1000,"piece");
        piece8 = this.physics.add.image(2900,1000,"piece");
        piece9 = this.physics.add.image(320,2100,"piece");
        piece10 = this.physics.add.image(1720,2550,"piece");

        // affichage des fragments de lumière permettant de faire remonter la vie du personnage
        coeur1 = this.physics.add.image(250,1325,"lumiere");
        coeur2 = this.physics.add.image(2880,1560,"lumiere");
        coeur3 = this.physics.add.image(3850,2850,"lumiere");

        // affichage de la brume
        brume1 = this.physics.add.image(1520,2280,"nuage");
        brume1.body.setImmovable(true);
        brume2 = this.physics.add.image(2550,2080,"nuage");
        brume2.body.setImmovable(true);
        brume3 = this.physics.add.image(3200,2080,"nuage");
        brume3.body.setImmovable(true);

        // affichage des torches et preparation de l'interaction avec
        torche1 = this.physics.add.image(1300,850,"torche").setVisible(false);
        torcheFeu1 = this.physics.add.image(1300,850,"torche_feu");

        torche2 = this.physics.add.image(600,850,"torche");
        torcheFeu2 = this.physics.add.image(600,850,"torche_feu").setVisible(false);

        torcheFeu3 = this.physics.add.image(1680,1600,"torche_feu")

        torche4 = this.physics.add.image(900,2250,"torche");
        torcheFeu4 = this.physics.add.image(900,2250,"torche_feu").setVisible(false);

        this.physics.add.overlap(player, torcheFeu1, this.lumiere1, null,this);
        this.physics.add.overlap(player, torche2, this.allume2, null,this);

        this.physics.add.overlap(player, torcheFeu3, this.lumiere3, null,this);

        this.physics.add.overlap(player, torche4, this.allume4, null,this);
        this.physics.add.overlap(player, torcheFeu4, this.lumiere4, null,this);
    
        // création de la détéction du clavier
        cursors = this.input.keyboard.createCursorKeys();
        // intégration des nouvelles touches
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        atk = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        interagir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // intégrer les commandes d'une manette
        this.input.gamepad.once('connected', function (pad) {
            this.controller = pad;
        },this);

        // définir les collisions

        calque_eau_ja.setCollisionByProperty({ solide: true });
        calque_trou_ja.setCollisionByProperty({ solide: true });
        calque_obstacle_ja.setCollisionByProperty({ solide: true });
        calque_fontaine_ja.setCollisionByProperty({ solide: true });
        calque_grille_ja.setCollisionByProperty({ solide: true });

        // faire en sorte que le joueur collide avec les obstacles

        this.physics.add.collider(player, calque_obstacle_ja,);
        this.physics.add.collider(player, calque_fontaine_ja,this.msgFontaine,null,this);

        // integration de la collision avec une variable pour pouvoir la désactiver ensuite
        collisiongrille = this.physics.add.collider(player, calque_grille_ja,this.msgGrille, null,this);

        // faire en sorte que le joueur collide avec la brume
        this.physics.add.collider(player, brume1,);
        this.physics.add.collider(player, brume2,);
        this.physics.add.collider(player, brume3,);

        // création de la caméra
        // taille de la caméra
        this.cameras.main.setSize(708,400);

        // faire en sorte que la caméra suive le personnage et qu'elle ne sorte pas de l'écran
        this.cameras.main.startFollow(player);
        this.cameras.main.setDeadzone(100,100);
        this.cameras.main.setBounds(0,0,4160,3456);

        console.log(playerLife)
        // affichage de l'interface utilisateur
        this.add.sprite(0,0,"cadre").setOrigin(0,0).setScrollFactor(0);
        this.add.sprite(550,40,"piece_ui").setOrigin(0,0).setScrollFactor(0);
        blocFlacon = this.add.sprite(2,110,"bloc_flacon").setVisible(false).setOrigin(0,0).setScrollFactor(0);
        blocAile = this.add.sprite(2,180,"bloc_aile").setVisible(false).setOrigin(0,0).setScrollFactor(0);
        blocBleu = this.add.sprite(2,250,"bloc_bleu").setVisible(false).setOrigin(0,0).setScrollFactor(0);
        blocRouge = this.add.sprite(2,320,"bloc_rouge").setVisible(false).setOrigin(0,0).setScrollFactor(0);
        textBox = this.add.sprite(100,260,"textbox").setVisible(false).setOrigin(0,0).setScrollFactor(0);
        lifeUI = this.add.sprite(40,10,"niveauVie").setOrigin(0,0).setScrollFactor(0);
        scorePiece = this.add.text(620,50,"0",{fontSize:'40px',fill:'#FFFFFF', fontWeight : 'bold'}).setOrigin(0,0).setScrollFactor(0);
        scoreBleu = this.add.text(55,275,"0",{fontSize:'20px',fill:'#FFFFFF', fontWeight : 'bold'}).setVisible(false).setOrigin(0,0).setScrollFactor(0);
        scoreRouge = this.add.text(55,345,"0",{fontSize:'20px',fill:'#FFFFFF', fontWeight : 'bold'}).setVisible(false).setOrigin(0,0).setScrollFactor(0);

        // création de toutes les phrases nécessaires
        // message du debut
        debut1 = this.add.text(165,305, "Il semble que les ténèbres ont contaminé cette zone",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        debut2 = this.add.text(240,350, "Je vais devoir purifier tout ça",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // message collision barrière première fois
        grille1 = this.add.text(255,305, "Si seulement j'avais un moyen",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        grille2 = this.add.text(255,350, "pour traverser ces barrières",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // message collision eau première fois
        eau1 = this.add.text(250,305, "Cette eau n'est pas bénite",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        eau2 = this.add.text(250,350, "mieux vaut ne pas la toucher",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // message chute dans trou première fois
        trou1 = this.add.text(240,305, "Je devrais faire plus attention",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        trou2 = this.add.text(300,350, "la prochaine fois",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // message fontaine sans pièce
        fontaine1 = this.add.text(250,305, "Cette fontaine est spéciale",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        fontaine2 = this.add.text(250,350, "Je devrais revenir plus tard",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // message fontaine avec pièce
        voeu1 = this.add.text(270,305, "Voulez vous jetez une pièce",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        voeu2 = this.add.text(300,350, "et faire un voeu ?",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // message loot flacon
        flacon1 = this.add.text(190,305, "Il semble que le coeur d'un autre gardien",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        flacon2 = this.add.text(200,350, "se trouve à l'intérieur de ce flaxon doré",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // message loot flamme bleu
        bleu1 = this.add.text(250,305, "Ces flammes sont si lumineuse",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // message game over
        over1 = this.add.text(260,305, "Votre lumière s'est éteinte",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        over2 = this.add.text(240,350, "(appuyez sur F5 pour recommencer)",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        
        // séparation des calques selon l'effet souhaité sur le personnage

        // le joueur prend des dégâts s'il touche l'eau
        collisioneau = this.physics.add.collider(player, calque_eau_ja, this.degatEau, null, this);

        // le joueur est téléporté au début du niveau s'il tombe dans un trou
        collisiontrou = this.physics.add.collider(player, calque_trou_ja, this.chute, null, this);

        // le personnage perd de la vie s'il touche un ennemi
        this.physics.add.collider(player, ennemi1, this.degat, null, this);
        this.physics.add.collider(player, ennemi2, this.degat, null, this);
        this.physics.add.collider(player, ennemi3, this.degat, null, this);

        // le score change s'il attrape une pièce
        this.physics.add.overlap(player,piece1,this.collecte1,null,this);
        this.physics.add.overlap(player,piece2,this.collecte2,null,this);
        this.physics.add.overlap(player,piece3,this.collecte3,null,this);
        this.physics.add.overlap(player,piece4,this.collecte4,null,this);
        this.physics.add.overlap(player,piece5,this.collecte5,null,this);
        this.physics.add.overlap(player,piece6,this.collecte6,null,this);
        this.physics.add.overlap(player,piece7,this.collecte7,null,this);
        this.physics.add.overlap(player,piece8,this.collecte8,null,this);
        this.physics.add.overlap(player,piece9,this.collecte9,null,this);
        this.physics.add.overlap(player,piece10,this.collecte10,null,this);

        // la vie remonte s'il ramasse un fragment de lumière
        this.physics.add.overlap(player,coeur1,this.soin1,null,this);
        this.physics.add.overlap(player,coeur2,this.soin2,null,this);
        this.physics.add.overlap(player,coeur3,this.soin3,null,this);

        // le personnage obtient une nouvelle capacité s'il ramasse un objet
        this.physics.add.overlap(player,flacon,this.obtention,null,this);

        // création des différents niveaux de vie dans l'interface
        this.anims.create({
            key: 'vie5',
            frames: [{ key: 'niveauVie' , frame :  0}],
        })
    
        this.anims.create({
            key: 'vie4',
            frames: [{ key: 'niveauVie' , frame :  1}],
        })
    
        this.anims.create({
            key: 'vie3',
            frames: [{ key: 'niveauVie' , frame :  2}],
        })
    
        this.anims.create({
            key: 'vie2',
            frames: [{ key: 'niveauVie' , frame :  3}],
        })
    
        this.anims.create({
            key: 'vie1',
            frames: [{ key: 'niveauVie' , frame :  4}],
        })
    
        this.anims.create({
            key: 'vie0',
            frames: [{ key: 'niveauVie' , frame :  5}],
        })

        // Mettre à jour les informations de l'inventaire

        if (this.entrance == 'cimetiere'){
            nombre = this.majGold;
            playerLife = this.majVie;
            nombreBleu = this.majBleu;
            nombreRouge = this.majRouge;

            scorePiece.setText (+nombre);
            scoreBleu.setText (+nombreBleu);
            scoreRouge.setText (+nombreRouge);
        }
    }

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update(){

        // ajout des moyens de déplacement du personnage

        // les controles à la manette ont été ajoutés mais ils entrainent un bug qui empeche de jouer

        if ((cursors.left.isDown /*|| this.controller.left*/)&& (!cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown /*&& !this.controller.right && !this.controller.down && !this.controller.up*/) &&(lockTouche == false)){
            //this.playerState.isMoving = true;
            //this.player.direction = {x : -1, y : 0};
            player.setVelocityX(-PLAYER_SPEED); 
            player.setVelocityY(0);
            player.anims.play('gauche', true); 
        }

        if (((cursors.left.isDown && cursors.up.isDown) /*||(this.controller.left && this.controller.up)*/)&& (!cursors.right.isDown && !cursors.down.isDown /*&& !this.controller.down && !this.controller.right*/)&&(lockTouche == false)){
            player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2)/2); 
            player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2/2)); 
            player.anims.play('gauche', true); 
        }

        if (((cursors.left.isDown && cursors.down.isDown) /*||(this.controller.left && this.controller.down)*/) && (!cursors.right.isDown && !cursors.up.isDown /*&& !this.controller.right && !this.controller.up*/)&&(lockTouche == false)){
            player.setVelocityX(-PLAYER_SPEED * (Math.SQRT2/2));
            player.setVelocityY(PLAYER_SPEED * (Math.SQRT2/2));
            player.anims.play('gauche', true); 
        }


        if ((cursors.right.isDown /*|| this.controller.right*/) && (!cursors.left.isDown && !cursors.down.isDown && !cursors.up.isDown /*&& !this.controller.left && !this.controller.down && !this.controller.up*/ )&&(lockTouche == false)){ //sinon si la touche droite est appuyée
            player.setVelocityX(PLAYER_SPEED);
            player.setVelocityY(0);
            player.anims.play('droite', true); 
        }

        if (((cursors.right.isDown && cursors.down.isDown) /*||(this.controller.right && this.controller.down)*/) && (!cursors.left.isDown && !cursors.up.isDown /*&& !this.controller.left && !this.controller.up*/)&&(lockTouche == false)){
            player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
            player.setVelocityY(PLAYER_SPEED * (Math.SQRT2)/2);
            player.anims.play('droite', true); 
        }

        if (((cursors.right.isDown && cursors.up.isDown) /*||(this.controller.right && this.controller.up)*/) && (!cursors.left.isDown && !cursors.down.isDown /*&& !this.controller.down && !this.controller.left*/)&&(lockTouche == false)){
            player.setVelocityX(PLAYER_SPEED * (Math.SQRT2)/2); 
            player.setVelocityY(-PLAYER_SPEED * (Math.SQRT2)/2);
            player.anims.play('droite', true); 
        }

        if ((cursors.down.isDown /*|| this.controller.down*/) && (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown /*&& !this.controller.right && !this.controller.left && !this.controller.up*/)&&(lockTouche == false)){
            player.setVelocityX(0);
            player.setVelocityY(PLAYER_SPEED);
            player.anims.play('face',true);
        }

        if ((cursors.up.isDown /*|| this.controller.up*/)&& (!cursors.right.isDown && !cursors.down.isDown && !cursors.left.isDown  /*&& !this.controller.right && !this.controller.down && !this.controller.left*/)&&(lockTouche == false)){
            player.setVelocityX(0);
            player.setVelocityY(-PLAYER_SPEED);
            player.anims.play('dos',true);
        }

        if ((!cursors.left.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown && lockTouche == false) /*|| (!this.controller.left && !this.controller.right && !this.controller.up && this.controller.down && lockTouche == false)*/){ 
            player.setVelocityX(0);
            player.setVelocityY(0); 
            player.anims.play('idle',true); 
        }

        if (atk.isDown &&!cursors.left.isDown && !cursors.right.isDown && !cursors.down.isDown && !cursors.up.isDown && (lockTouche == false)){ 
            player.setVelocityX(0);
            player.setVelocityY(0); 
            player.anims.play('attaque',true); 
        }

        // animation de la jauge de vie
        if (playerLife == 5){
            lifeUI.anims.play('vie5', true);
        }
        if (playerLife == 4){
            lifeUI.anims.play('vie4', true);
        }
        if (playerLife == 3){
            lifeUI.anims.play('vie3', true);
        }
        if (playerLife == 2){
            lifeUI.anims.play('vie2', true);
        }
        if (playerLife == 1){
            lifeUI.anims.play('vie1', true);
        }
        if (playerLife == 0){
            lifeUI.anims.play('vie0', true);
        }

        // faire un message pour le début de la partie
        if (this.entrance == "menu" && texteDebut == true){
            textBox.setVisible(true);
            debut1.setVisible(true);
            debut2.setVisible(true);

            setTimeout(() => {
                debut1.setVisible(false);
                debut2.setVisible(false);
                textBox.setVisible(false);
                texteDebut = false
            },5000);
        }

        // mise en place du game over
        if (playerLife <=0 ){
            gameOver = true;
            lockTouche = true;
        }
    
        if(gameOver){
            textBox.setVisible(true);
            over1.setVisible(true);
            over2.setVisible(true);
            return;
        }

        // animation des ennemis
        ennemi1.anims.play('alpha',true);
        ennemi2.anims.play('alpha',true);
        ennemi3.anims.play('alpha',true);

        // création d'une varaiante de comportement
        // les autres ennemis doivent poursuivre le joueur

        // vérifier la position du joueur par rapport à un ennemi afin que celui le poursuive
        // Calculer la distance entre le joueur et l'ennemi1

        // Si la distance est inférieure à 50 pixels, l'ennemi1 suit le joueur
        //if (!poursuite1 && distance1 < 200) {

        //    ennemi1.setVelocity(0);
        //    poursuite1 = true
        //}

        //if (poursuite1){
            // Calculez le vecteur de direction du joueur à l'ennemi1
        //    var directionX = player.x - ennemi1.x;
        //    var directionY = player.y - ennemi1.y;

            // supprimer la routine de deplacement

            // Normalisez le vecteur de direction
        //    var length = Math.sqrt(directionX * directionX + directionY * directionY);
        //    directionX /= length;
        //    directionY /= length;

            // Déplacez l'ennemi1 dans la direction du joueur avec une vitesse de 2 pixels par frame
        //    ennemi1.x += directionX * 1;
        //    ennemi1.y += directionY * 1;
        

        //} else {

            // Si l'ennemi1 ne suit pas le joueur, vérifier s'il a atteint sa position cible ou sa position initiale
        //    if ((ennemi1.x <= ennemi1InitialX && ennemi1Direction === -1) || (ennemi1.x >= ennemi1TargetX && ennemi1Direction === 1)) {
        //        ennemi1Direction *= -1; // Inverser la direction de déplacement de l'ennemi1
        //        ennemi1.setVelocityX(ennemi1Speed * ennemi1Direction); // Mettre à jour la vitesse horizontale de l'ennemi1 dans sa nouvelle direction
        //    }
        //}

        // vérifier la position du joueur par rapport à l'ennemi pour le détruire

        

        // faire la même chose pour le deuxième ennemi



        // vérifier si les 2 ennemis du jardin en bas à gauche sont mort pour faire disparaitre la brume
        if (mort1 == true && mort2 == true){
            brume1.disableBody(true,true);
        }


        // vérifier la position du joueur pour lancer le changement de scène
        if (player.y <= 50){ 
            this.sceneCimetiere();
        };

        // activation de la capacité à devenir intangible
        console.log (intangible)
        if (shift.isDown && flaconAcquis == true){

            intangible = true;
            collisiongrille.active = false;
            player.alpha = 0.3;

            this.time.delayedCall(3000, () => {
                collisiongrille.active = true;
                intangible = false;
                player.alpha = 1;
            });  
        }

        // activation de la capacité à voler
        if (keySpace.isDown && aileAcquis == true){

            vol = true;
            collisioneau.active = false;
            collisiontrou.active = false;
            player.setScale(1.5);

            this.time.delayedCall(3000, () => {
                collisioneau.active = true;
                collisiontrou.active = true;
                player.setScale(1);
                vol = false;
            });  
        }

        // vérifier si le joueur possède des flammes bleues pour les afficher dans l'inventaire
        if (nombreBleu > 0){
            blocBleu.setVisible(true);
            scoreBleu.setVisible(true);
        }

        // vérifier si le joueur possède des flammes rouges pour les afficher dans l'inventaire
        if (nombreRouge > 0){
            blocRouge.setVisible(true);
            scoreRouge.setVisible(true);
        }

        // vérifier si le joueur n'a plus de flamme pour les retirer de l'invenatire
        if (nombreBleu == 0){
            blocBleu.setVisible(false);
            scoreBleu.setVisible(false);
        }
        if (nombreRouge == 0){
            blocRouge.setVisible(false);
            scoreRouge.setVisible(false);
        }
        
    }

    degat(){

        // vérifier que le cooldown de degat est disponible
        if (playerDegat == false && intangible == false){
            

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

    degatEau(){

        // vérifier que le cooldown de degat est disponible
        if (playerDegat == false && intangible == false){
            

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

            // si c'est la première fois que le joueur touche de l'eau, le prévenir

            if (firstEau == false){
                textBox.setVisible(true);
                eau1.setVisible(true);
                eau2.setVisible(true);
    
                setTimeout(() => {
                    eau1.setVisible(false);
                    eau2.setVisible(false);
                    textBox.setVisible(false);
                    firstEau = true;
                },5000);
            }
        }
    }

    chute(){
        player.x = 2080
        player.y = 256
        playerLife = playerLife - 1;
        if (nombre >> 0){
            nombre = nombre -1;
        }
        scorePiece.setText ( + nombre);

        // si c'est la première fois que le joueur tombe dans un trou, le prévenir
        if(firstChute == false){
            textBox.setVisible(true);
            trou1.setVisible(true);
            trou2.setVisible(true);

            setTimeout(() => {
                trou1.setVisible(false);
                trou2.setVisible(false);
                textBox.setVisible(false);
                firstChute = true;
            },5000);
        }
    }

    obtention(){

        // l'icone de l'objet ramassé apparait dans l'interface
        blocFlacon.setVisible(true);
        // l'objet disparait de la carte
        flacon.disableBody(true,true);
        // activer la variable pour rendre disponible la nouvelle capacité
        flaconAcquis = true;

        // affichage d'un message expliquant la situation
        textBox.setVisible(true);
        flacon1.setVisible(true);
        flacon2.setVisible(true);

        setTimeout(() => {
            flacon1.setVisible(false);
            flacon2.setVisible(false);
            textBox.setVisible(false);
        },5000);

    }

    // si c'est la première fois que le joueur touche une grille, le prévenir
    msgGrille(){
        if (firstGrille == false){
            textBox.setVisible(true);
            grille1.setVisible(true);
            grille2.setVisible(true);

            setTimeout(() => {
                grille1.setVisible(false);
                grille2.setVisible(false);
                textBox.setVisible(false);
                firstGrille = true;
            },5000);
        }
    }

    // avertir le joueur de la fonction de la fontaine
    msgFontaine(){
        if(nombre == 0 ){
            textBox.setVisible(true);
            fontaine1.setVisible(true);
            fontaine2.setVisible(true);

            setTimeout(() => {
                fontaine1.setVisible(false);
                fontaine2.setVisible(false);
                textBox.setVisible(false);
            },5000);
        }

        if (nombre > 0){
            textBox.setVisible(true);
            voeu1.setVisible(true);
            voeu2.setVisible(true);

            // prévoir séquence d'achat ici

            if (interagir.isDown){
                nombre = nombre - 1
                scorePiece.setText ( + nombre);

                nombreRouge = nombreRouge + 1
                scoreRouge.setText (+nombreRouge);
            }

            setTimeout(() => {
                voeu1.setVisible(false);
                voeu2.setVisible(false);
                textBox.setVisible(false);
            },5000);
        }
    }

    // ramassage des pièces
    collecte1(){
        piece1.disableBody(true,true);
        nombre = nombre +1;
        scorePiece.setText ( + nombre);
    }
    collecte2(){
        piece2.disableBody(true,true);
        nombre = nombre +1;
        scorePiece.setText ( + nombre);
    }
    collecte3(){
        piece3.disableBody(true,true);
        nombre = nombre +1;
        scorePiece.setText ( + nombre);
    }
    collecte4(){
        piece4.disableBody(true,true);
        nombre = nombre +1;
        scorePiece.setText ( + nombre);
    }
    collecte5(){
        piece5.disableBody(true,true);
        nombre = nombre +1;
        scorePiece.setText ( + nombre);
    }
    collecte6(){
        piece6.disableBody(true,true);
        nombre = nombre +1;
        scorePiece.setText ( + nombre);
    }
    collecte7(){
        piece7.disableBody(true,true);
        nombre = nombre +1;
        scorePiece.setText ( + nombre);
    }
    collecte8(){
        piece8.disableBody(true,true);
        nombre = nombre +1;
        scorePiece.setText ( + nombre);
    }
    collecte9(){
        piece9.disableBody(true,true);
        nombre = nombre +1;
        scorePiece.setText ( + nombre);
    }
    collecte10(){
        piece10.disableBody(true,true);
        nombre = nombre +1;
        scorePiece.setText ( + nombre);
    }

    // vérifier si la vie du joueur est pleine avant de le soigner
    soin1(){
        if (playerLife <= 4){
            coeur1.disableBody(true,true);
            playerLife = playerLife +1;
        }
    }
    soin2(){
        if (playerLife <= 4){
            coeur2.disableBody(true,true);
            playerLife = playerLife +1;
        }
    }
    soin3(){
        if (playerLife <= 4){
            coeur3.disableBody(true,true);
            playerLife = playerLife +1;
        }
    }

    // récupérer le loot des ennemis
    recuperation1(){
        if (mort1 == true){
            loot1.disableBody (true,true);
            nombreBleu = nombreBleu +1;
            scoreBleu.setText ( + nombreBleu);

            if (firstBleu == false){
                textBox.setVisible(true);
                bleu1.setVisible(true);

                setTimeout(() => {
                    bleu1.setVisible(false);
                    textBox.setVisible(false);
                    firstBleu = true;
                },3000);
            }
        }
    }

    recuperation2(){
        if (mort2 == true){
            loot2.disableBody (true,true);
            nombreBleu = nombreBleu +1;
            scoreBleu.setText ( + nombreBleu);

            if (firstBleu == false){
                textBox.setVisible(true);
                bleu1.setVisible(true);

                setTimeout(() => {
                    bleu1.setVisible(false);
                    textBox.setVisible(false);
                    firstBleu = true;
                },3000);
            }
        }
    }

    recuperation3(){
        if (mort3 == true){
            loot3.disableBody (true,true);
            nombreBleu = nombreBleu +1;
            scoreBleu.setText ( + nombreBleu);

            if (firstBleu == false){
                textBox.setVisible(true);
                bleu1.setVisible(true);

                setTimeout(() => {
                    bleu1.setVisible(false);
                    textBox.setVisible(false);
                    firstBleu = true;
                },3000);
            }
        }
    }

    // tuer un ennemi en étant sous une torche
    lumiere1(){
        var distance3 = Phaser.Math.Distance.Between(player.x, player.y, ennemi3.x, ennemi3.y);
        if (distance3 <100 && atk.isDown && intangible == false){
            ennemi3.disableBody(true,true);
            mort3 = true;
            // faire apparaitre un loot 
            loot3.setVisible(true);
        }
    }

    // allumer une torche
    allume2(){
        if (nombreBleu > 0 && interagir.isDown){
            torche2.disableBody (true,true);
            torcheFeu2.setVisible(true);
            nombreBleu = nombreBleu -1;
            scoreBleu.setText ( + nombreBleu);
        }
    }

    lumiere3(){
        var distance1 = Phaser.Math.Distance.Between(player.x, player.y, ennemi1.x, ennemi1.y);
        if (distance1 <100 && atk.isDown && intangible == false){
            ennemi1.disableBody(true,true);
            mort1 = true;
            // faire apparaitre un loot 
            loot1.setVisible(true);
        }
    }

    allume4 (){
        if (nombreBleu > 0 && interagir.isDown){
            torche4.disableBody (true,true);
            torcheFeu4.setVisible(true);
            allumage4 = true;
            nombreBleu = nombreBleu -1;
            scoreBleu.setText ( + nombreBleu);
        }

    }

    lumiere4(){
        var distance2 = Phaser.Math.Distance.Between(player.x, player.y, ennemi2.x, ennemi2.y);
        if (distance2 <100 && atk.isDown && intangible == false && allumage4 == true){
            //this.x = ennemi2.x;
            //this.y = ennemi2.y;
            ennemi2.disableBody(true,true);
            mort2 = true;
            loot2.setVisible(true);

            // autre variante d'apparition du loot

            // faire apparaitre le loot à l'endroit de la mort de l'ennemi
            // problème : il y a trop d'apparitions
            //this.loot = this.physics.add.sprite(this.x, this.y, 'flamme_bleu');
            //this.physics.add.overlap(player, this.loot, () => {
                //nombreBleu = nombreBleu +1;
               // scoreBleu.setText ( + nombreBleu);
                //this.loot.destroy();
            //});

            // bug : trop de loot aparaisse
        }
    }

    // lancer la scène cimetière et prévenir quelle entré doir être utilisé
    sceneCimetiere(){
        this.scene.start("cimetiere",{
            entrance : "jardin", 
            transfertVie : playerLife, 
            transfertGold : nombre,
            transferBleu : nombreBleu,
            transfertRouge : nombreRouge,
        })

    }

};
