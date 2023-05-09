
// création des variables
var player
var cursors
var controller
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
var fin = true
var lockTouche = false

// collision
var collisiongrille
var collisiontrou
var collisioneau

//competence
var obtention
var flaconAcquis = true
var aileAcquis = true
var feuAcquis = false

// interface
var flacon
var aile
var feu1
var feu2
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

var over1
var over2

var rouge1
var rouge2

var fin1
var fin2

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

var pierre1
var pierre2
var pierre3
var pierre4
var pierre5
var pierre6
var pierre7

// ennemi

var boss
var ennemi1
var ennemi2

var poursuite1 = false
var poursuite2 = false

var ennemi1InitialX = 1535
var ennemi1TargetX = 1900
var ennemi1Speed = 50
var ennemi1Direction = 1

var mort1 = false
var mort2 = false
var mortboss = false

var loot1
var loot2


// variables de la carte de la crypte

var carteDuCrypte
var calque_sol_cr
var calque_grille_cr
var calque_obstacle_cr
var calque_eau_cr
var calque_rocher_cr
var calque_trou_cr
var calque_decor_cr


export class crypte extends Phaser.Scene{
    constructor(){
        super("crypte");
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
        this.load.tilemapTiledJSON("cartecrypte","assetsjeu/carte_crypte.json")

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
        this.load.spritesheet("ennemi_boss","assetsjeu/image/ennemi_boss_animation.png",
        { frameWidth: 128, frameHeight: 160 });
    }

    // création du niveau
    create(){

        // chargement de la carte 
        carteDuCrypte = this.add.tilemap("cartecrypte");

        // chargement du jeu de tuile
        tileset = carteDuCrypte.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage des calques
 

        calque_sol_cr = carteDuCrypte.createLayer(
            "sol",
            tileset
        );

        calque_grille_cr = carteDuCrypte.createLayer(
            "grille",
            tileset
        );

        calque_obstacle_cr = carteDuCrypte.createLayer(
            "obstacle",
            tileset
        );

        calque_eau_cr = carteDuCrypte.createLayer(
            "eau",
            tileset
        );

        // repérage de la position des rochers
        //calque_rocher_cr = carteDuCrypte.createLayer(
        //    "rocher",
        //    tileset
        //);

        calque_trou_cr = carteDuCrypte.createLayer(
            "trou",
            tileset
        );

        calque_decor_cr = carteDuCrypte.createLayer(
            "decor",
            tileset
        );

        // affichage du personnage
        player = this.physics.add.sprite(2075, 3250, 'perso');
        player.setSize(20,15).setOffset(38,75);

        // reprendre l'affichage du des calques en mettant le decor

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
            repeat: 0,
        }); 

        // affichage des ennemis
        boss = this.physics.add.sprite(2500,200,"ennemi_boss");
        boss.setSize(80,32).setOffset(30,120);
        ennemi1 = this.physics.add.sprite(2000,1500,"ennemi_beta");
        ennemi1.setSize(40,40).setOffset(25,20);

        // affichage de leur loot et de l'intercation possible avec le joueur

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

        this.anims.create({
            key: 'boss',
            frames: this.anims.generateFrameNumbers('ennemi_boss', {start:0,end:13}),
            frameRate: 2,
            repeat: -1
        });

        // définition de leur comportement
        this.tweens.add({
            targets : boss,
            x: 3250,
            duration: 15000,
            repeat : -1,
            yoyo : true
        });

        // definir les collisions entre les ennemis et le decor
        //this.physics.add.collider(boss, calque_obstacle_cr,);

        // affichage de l'objet débloquant une interaction avec le décor
        feu1 = this.physics.add.image(1475,1550,"flamme_rouge");
        feu2 = this.physics.add.image(1400,1550,"flamme_rouge");

        // affichage des pièces pouvant être ramassées pour faire monter le score

        // affichage des fragments de lumière permettant de faire remonter la vie du personnage

        // affichage des rochers
        pierre1 = this.physics.add.image(2000,3040,"pierre_2b");
        pierre1.body.setImmovable(true);

        pierre2 = this.physics.add.image(2130,3040,"pierre_2b");
        pierre2.body.setImmovable(true);

        pierre3 = this.physics.add.image(2060,2190,"pierre_3a");
        pierre3.body.setImmovable(true);

        pierre4 = this.physics.add.image(2725,2725,"pierre_4");
        pierre4.body.setImmovable(true);

        pierre5 = this.physics.add.image(3025,2725,"pierre_6a");
        pierre5.body.setImmovable(true);

        pierre6 = this.physics.add.image(3120,2960,"pierre_3a");
        pierre6.body.setImmovable(true);

        pierre7 = this.physics.add.image(3120,2160,"pierre_3a");
        pierre7.body.setImmovable(true);

        // afficher la brume
        brume1 = this.physics.add.image(1640,1530,"nuage");
        brume1.body.setImmovable(true);
        this.physics.add.collider(player, brume1,);

    
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

        calque_eau_cr.setCollisionByProperty({ solide: true });
        calque_trou_cr.setCollisionByProperty({ solide: true });
        calque_obstacle_cr.setCollisionByProperty({ solide: true });
        calque_grille_cr.setCollisionByProperty({ solide: true });

        // faire en sorte que le joueur collide avec les obstacles
        this.physics.add.collider(player, calque_obstacle_cr,);

        // integration de la collision avec une variable pour pouvoir la désactiver ensuite
        collisiongrille = this.physics.add.collider(player, calque_grille_cr);

        // faire en sorte que le joueur collide avec les rochers mais qu'il puisse les détruire avec les flammes rouges
        this.physics.add.collider(player, pierre1, this.destruction1, null,this);
        this.physics.add.collider(player, pierre2, this.destruction2, null,this);
        this.physics.add.collider(player, pierre3, this.destruction3, null,this);
        this.physics.add.collider(player, pierre4, this.destruction4, null,this);
        this.physics.add.collider(player, pierre5, this.destruction5, null,this);
        this.physics.add.collider(player, pierre6, this.destruction6, null,this);
        this.physics.add.collider(player, pierre7, this.destruction7, null,this);

        // création de la caméra
        // taille de la caméra
        this.cameras.main.setSize(708,400);

        // faire en sorte que la caméra suive le personnage et qu'elle ne sorte pas de l'écran
        this.cameras.main.startFollow(player);
        this.cameras.main.setDeadzone(100,100);
        this.cameras.main.setBounds(0,0,4160,3456);

        // affichage de l'interface utilisateur
        this.add.sprite(0,0,"cadre").setOrigin(0,0).setScrollFactor(0);
        this.add.sprite(550,40,"piece_ui").setOrigin(0,0).setScrollFactor(0);
        blocFlacon = this.add.sprite(2,110,"bloc_flacon").setOrigin(0,0).setScrollFactor(0);
        blocAile = this.add.sprite(2,180,"bloc_aile").setOrigin(0,0).setScrollFactor(0);
        blocBleu = this.add.sprite(2,250,"bloc_bleu").setVisible(false).setOrigin(0,0).setScrollFactor(0);
        blocRouge = this.add.sprite(2,320,"bloc_rouge").setVisible(false).setOrigin(0,0).setScrollFactor(0);
        textBox = this.add.sprite(100,260,"textbox").setVisible(false).setOrigin(0,0).setScrollFactor(0);
        lifeUI = this.add.sprite(40,10,"niveauVie").setOrigin(0,0).setScrollFactor(0);
        scorePiece = this.add.text(620,50,"0",{fontSize:'40px',fill:'#FFFFFF', fontWeight : 'bold'}).setOrigin(0,0).setScrollFactor(0);
        scoreBleu = this.add.text(55,275,"0",{fontSize:'20px',fill:'#FFFFFF', fontWeight : 'bold'}).setVisible(false).setOrigin(0,0).setScrollFactor(0);
        scoreRouge = this.add.text(55,345,"0",{fontSize:'20px',fill:'#FFFFFF', fontWeight : 'bold'}).setVisible(false).setOrigin(0,0).setScrollFactor(0);

        // préparation des messages
        // message game over
        over1 = this.add.text(260,305, "Votre lumière s'est éteinte",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        over2 = this.add.text(240,350, "(appuyez sur F5 pour recommencer)",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        
        // message loot flamme rouge
        rouge1 = this.add.text(250,305, "Ces flammes ont l'air d'avoir",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        rouge2 = this.add.text(240,350, "un grand potentiel de destruction",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // message fin du jeu
        fin1 = this.add.text(210,305, "Félicitations ! Vous avez vaincu le boss",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        fin2 = this.add.text(190,350, "Vous pouvez continuer d'explorer les environs",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // séparation des calques selon l'effet souhaité sur le personnage

        // le joueur prend des dégâts s'il touche l'eau
        collisioneau = this.physics.add.collider(player, calque_eau_cr, this.degat, null, this);

        // le joueur est téléporté au début du niveau s'il tombe dans un trou
        collisiontrou = this.physics.add.collider(player, calque_trou_cr, this.chute, null, this);

        // le personnage perd de la vie s'il touche un ennemi
        this.physics.add.collider(player, ennemi1, this.degat, null, this);
        this.physics.add.collider(player, boss, this.degat, null, this);

        // le score change s'il attrape une pièce

        // la vie remonte s'il ramasse un fragment de lumière

        // le personnage obtient une nouvelle capacité s'il ramasse un objet
        this.physics.add.overlap(player,feu1,this.obtention,null,this);
        this.physics.add.overlap(player,feu2,this.obtention2,null,this);

        // création des différents niveaux de vie dans l'interface
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
        boss.anims.play('boss',true);
        ennemi1.anims.play('beta',true);

        // vérifier la position du joueur pour le faire combattre les ennemis
        var distance1 = Phaser.Math.Distance.Between(player.x, player.y, ennemi1.x, ennemi1.y);
        var distanceboss = Phaser.Math.Distance.Between(player.x, player.y, boss.x, boss.y);

        if (distance1 <100 && atk.isDown && intangible == false){
            ennemi1.disableBody(true,true);
            mort1 = true;
            brume1.disableBody(true,true);
        }

        if (distanceboss <100 && atk.isDown && intangible == false){
            boss.disableBody(true,true);
            mortboss = true;

        }

        if(mortboss == true && fin == true){
            // prévenir de la fin du jeu

            textBox.setVisible(true);
            fin1.setVisible(true);
            fin2.setVisible(true);

            setTimeout(() => {
                fin1.setVisible(false);
                fin2.setVisible(false);
                textBox.setVisible(false);
                fin = false
            },5000); 
        }


        // prévenir de la fin du jeu
        if (mortboss == true){
            textBox.setVisible(true);
            fin1.setVisible(true);
            fin2.setVisible(true);

            setTimeout(() => {
                fin1.setVisible(false);
                fin2.setVisible(false);
                textBox.setVisible(false);
            },5000); 
        }

        // vérifier la position du joueur pour lancer le changement de scène
        if (player.y >= 3328){
            this.sceneCimetiere();
        }

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

    chute(){
        player.x = 2075
        player.y = 3250
        playerLife = playerLife - 1;
        if (nombre >> 0){
            nombre = nombre -1;
        }
        scorePiece.setText ( + nombre);
    }

    obtention(){

        // l'icone de l'objet ramassé apparait dans l'interface
        blocRouge.setVisible(true);
        // l'objet disparait de la carte
        feu1.disableBody(true,true);
        // activer la variable pour rendre disponible la nouvelle capacité
        feuAcquis = true;
        // faire monter le compteur de cet objet utilisable
        nombreRouge = nombreRouge + 1;
        scoreRouge.setText (+ nombreRouge);
    
        // affichage d'un message expliquant la situation
        textBox.setVisible(true);
        rouge1.setVisible(true);
        rouge2.setVisible(true);

        setTimeout(() => {
            rouge1.setVisible(false);
            rouge2.setVisible(false);
            textBox.setVisible(false);
        },5000);
    }

    obtention2 (){
        feu2.disableBody(true,true);
        nombreRouge = nombreRouge + 1;
        scoreRouge.setText (+ nombreRouge);
    }

    destruction1(){
        if (nombreRouge > 0 && interagir.isDown){
            pierre1.disableBody(true,true);
            nombreRouge = nombreRouge - 1;
            scoreRouge.setText (+ nombreRouge);
        }
    }

    destruction2(){
        if (nombreRouge > 0 && interagir.isDown){
            pierre2.disableBody(true,true);
            nombreRouge = nombreRouge - 1;
            scoreRouge.setText (+ nombreRouge);
        }
    }

    destruction3(){
        if (nombreRouge > 0 && interagir.isDown){
            pierre3.disableBody(true,true);
            nombreRouge = nombreRouge - 1;
            scoreRouge.setText (+ nombreRouge);
        }
    }

    destruction4(){
        if (nombreRouge > 0 && interagir.isDown){
            pierre4.disableBody(true,true);
            nombreRouge = nombreRouge - 1;
            scoreRouge.setText (+ nombreRouge);
        }
    }

    destruction5(){
        if (nombreRouge > 0 && interagir.isDown){
            pierre5.disableBody(true,true);
            nombreRouge = nombreRouge - 1;
            scoreRouge.setText (+ nombreRouge);
        }
    }

    destruction6(){
        if (nombreRouge > 0 && interagir.isDown){
            pierre6.disableBody(true,true);
            nombreRouge = nombreRouge - 1;
            scoreRouge.setText (+ nombreRouge);
        }
    }

    destruction7(){
        if (nombreRouge > 0 && interagir.isDown){
            pierre7.disableBody(true,true);
            nombreRouge = nombreRouge - 1;
            scoreRouge.setText (+ nombreRouge);
        }
    }

    sceneCimetiere(){
        this.scene.start("cimetiere",{
            entrance : "crypte",
            transfertVie : playerLife, 
            transfertGold : nombre,
            transferBleu : nombreBleu,
            transfertRouge : nombreRouge,
        })
    }

};
