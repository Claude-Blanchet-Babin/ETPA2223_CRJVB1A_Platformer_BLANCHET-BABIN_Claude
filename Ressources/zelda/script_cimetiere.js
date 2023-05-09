
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

// collision
var collisiongrille
var collisiontrou
var collisioneau

//competence
var obtention
var flaconAcquis = true
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
var gameOver
var lockTouche = false

// texte

var over1
var over2

var aile1
var aile2

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

var nombre
var nombreBleu
var nombreRouge

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

var poursuite1 = false
var poursuite2 = false

var ennemi1InitialX = 1535
var ennemi1TargetX = 1900
var ennemi1Speed = 50
var ennemi1Direction = 1

var mort1 = false
var mort2 = false

var loot1
var loot2


// variables de la carte du cimetière
var carteDuCimetiere
var calque_sous_sol_ci
var calque_sol_ci
var calque_sur_sol_ci
var calque_obstacle_ci
var calque_trou_ci
var calque_eau_ci
var calque_grille_ci
var calque_chapelle_ci
var calque_decor_ci
var calque_decor_bis_ci
var calque_decor_tres_ci



export class cimetiere extends Phaser.Scene{
    constructor(){
        super("cimetiere");
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
        this.load.tilemapTiledJSON("cartecimetiere","assetsjeu/carte_cimetiere.json")

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
        carteDuCimetiere = this.add.tilemap("cartecimetiere");

        // chargement du jeu de tuile
        tileset = carteDuCimetiere.addTilesetImage(
            "tileset",
            "Phaser_tuilesdejeu"
        );

        // affichage des calques
 
        calque_sous_sol_ci = carteDuCimetiere.createLayer(
            "soussol",
            tileset
        );

        calque_sol_ci = carteDuCimetiere.createLayer(
            "sol",
            tileset
        );

        calque_sur_sol_ci = carteDuCimetiere.createLayer(
            "surssol",
            tileset
        );

        calque_obstacle_ci = carteDuCimetiere.createLayer(
            "obstacle",
            tileset
        );

        calque_trou_ci = carteDuCimetiere.createLayer(
            "trou",
            tileset
        );

        calque_eau_ci = carteDuCimetiere.createLayer(
            "eau",
            tileset
        );

        calque_grille_ci = carteDuCimetiere.createLayer(
            "grille",
            tileset
        );

        calque_chapelle_ci = carteDuCimetiere.createLayer(
            "chapelle",
            tileset
        );

        // affichage du personnage

        if (this.entrance == "jardin"){
            player = this.physics.add.sprite(2080, 3200, 'perso'); //3200
            player.setSize(20,15).setOffset(38,75);
        }

        if (this.entrance == "crypte"){
            player = this.physics.add.sprite(2080, 416, 'perso');
            player.setSize(20,15).setOffset(38,75);
        }
        
        console.log(this.entrance)

        // reprendre l'affichage du des calques en mettant le decor
        calque_decor_ci = carteDuCimetiere.createLayer(
            "decor",
            tileset
        );

        calque_decor_bis_ci = carteDuCimetiere.createLayer(
            "decorbis",
            tileset
        );

        calque_decor_tres_ci = carteDuCimetiere.createLayer(
            "decortres",
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
            repeat: 0,
        }); 

        // affichage des ennemis
        // définition de leur comportement
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



        // affichage de l'objet débloquant la nouvelle capacité
        aile = this.physics.add.image(3475,1200,"aile");

        // affichage des pièces pouvant être ramassées pour faire monter le score

        // affichage des fragments de lumière permettant de faire remonter la vie du personnage

        // affichage de la brume
        brume1 = this.physics.add.image(900,1175,"nuage");
        brume1.body.setImmovable(true);
        brume2 = this.physics.add.image(1075,2500,"nuage");
        brume2.body.setImmovable(true);
    
        // création de la détéction du clavier
        cursors = this.input.keyboard.createCursorKeys();
        // intégration de la barre espace
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        atk = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        interagir = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // intégrer les commandes d'une manette
        this.input.gamepad.once('connected', function (pad) {
            this.controller = pad;
        },this);

        // définir les collisions
        calque_obstacle_ci.setCollisionByProperty({ solide: true });
        calque_eau_ci.setCollisionByProperty({ solide: true });
        calque_trou_ci.setCollisionByProperty({ solide: true });
        calque_grille_ci.setCollisionByProperty({ solide: true });

        // faire en sorte que le joueur collide avec les obstacles
        this.physics.add.collider(player, calque_obstacle_ci,);

        // integration de la collision avec une variable pour pouvoir la désactiver ensuite
        collisiongrille = this.physics.add.collider(player, calque_grille_ci);

        // faire en sorte que le joueur collide avec la brume
        this.physics.add.collider(player, brume1,);
        this.physics.add.collider(player, brume2,);

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
        blocAile = this.add.sprite(2,180,"bloc_aile").setVisible(false).setOrigin(0,0).setScrollFactor(0);
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
        
        // message loot aile
        aile1 = this.add.text(250,305, "Il semble qu'un ancien gardien",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);
        aile2 = this.add.text(310,350, "a perdu ses ailes",{fontSize:'15px',fill:'#FFFFFF'}).setVisible(false).setScrollFactor(0);

        // séparation des calques selon l'effet souhaité sur le personnage

        // le joueur prend des dégâts s'il touche l'eau
        collisioneau = this.physics.add.collider(player, calque_eau_ci,this.degat,null,this);

        // le joueur est téléporté au début du niveau s'il tombe dans un trou
        collisiontrou = this.physics.add.collider(player, calque_trou_ci,this.chute,null,this);

        // le personnage perd de la vie s'il touche un ennemi

        // le score change s'il attrape une pièce

        // la vie remonte s'il ramasse un fragment de lumière

        // le personnage obtient une nouvelle capacité s'il ramasse un objet
        this.physics.add.overlap(player,aile,this.obtention,null,this);

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

        if (this.entrance == 'jardin'){
            nombre = this.majGold;
            playerLife = this.majVie;
            nombreBleu = this.majBleu;
            nombreRouge = this.majRouge;

            scorePiece.setText (+nombre);
            scoreBleu.setText (+nombreBleu);
            scoreRouge.setText (+nombreRouge);
        }

        if (this.entrance == 'crypte'){
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
        // destruction des ennemis

        // vérifier la position du joueur pour lancer le changement de scène
        if (player.y <= 200){ 
            this.sceneCrypte();
        };

        if (player.y >= 3350){
            this.sceneJardin();
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


    sceneCrypte(){
        this.scene.start("crypte",{
            entrance : "cimetiere", 
            transfertVie : playerLife, 
            transfertGold : nombre,
            transferBleu : nombreBleu,
            transfertRouge : nombreRouge,
        })
    }

    sceneJardin(){
        this.scene.start("jardin",{
            entrance : "cimetiere", 
            transfertVie : playerLife, 
            transfertGold : nombre,
            transferBleu : nombreBleu,
            transfertRouge : nombreRouge,
        })
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

        if (this.entrance == "jardin"){
            player.x = 2080
            player.y = 3200
            playerLife = playerLife - 1;
            if (nombre >> 0){
                nombre = nombre -1;
            }
            scorePiece.setText ( + nombre);
        }

        if (this.entrance == "crypte"){
            player.x = 2080
            player.y = 416
            playerLife = playerLife - 1;
            if (nombre >> 0){
                nombre = nombre -1;
            }
            scorePiece.setText ( + nombre);
        }
    }

    obtention(){

        // l'icone de l'objet ramassé apparait dans l'interface
        blocAile.setVisible(true);
        // l'objet disparait de la carte
        aile.disableBody(true,true);
        // activer la variable pour rendre disponible la nouvelle capacité
        aileAcquis = true;
    
        // affichage d'un message expliquant la situation
        textBox.setVisible(true);
        aile1.setVisible(true);
        aile2.setVisible(true);

        setTimeout(() => {
            aile1.setVisible(false);
            aile2.setVisible(false);
            textBox.setVisible(false);
        },5000);
    }

};
