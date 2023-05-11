// création des variables
var player

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

        // chargement de la carte
        this.load.image("Phaser_tuilesdejeu","asset/carte/tileset.png");
        this.load.tilemapTiledJSON("carteOverworld","asset/overworld.json");

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
        player = this.physics.add.sprite(100, 1000, "persoBase");

        // reprendre l'affichage du des calques en mettant le decor

        // afficher les animations du personnage lorsqu'il se déplace

        // affichage des ennemis

        // créer les animations des ennemis

        // création de la détéction du clavier

        // intégration des nouvelles touches

        // intégrer les commandes d'une manette

        // définir les collisions
        calque_sol.setCollisionByProperty({ solide: true });
        calque_niveau_1.setCollisionByProperty({ solide: true });
        calque_niveau_2.setCollisionByProperty({ solide: true });

        // faire en sorte que le joueur collide avec le sol

        // détecter si le joueur collide avec un calque pour lancer le niveau

        // création de la caméra
        // taille de la caméra
        // faire en sorte que la caméra suive le personnage et qu'elle ne sorte pas de l'écran
    }

    // mise à jour des éléments au fil de l'avancement du joueur dans le niveau
    update(){

        // ajout des moyens de déplacement du personnage
        
    }

    sceneNiveau_1(){
        this.scene.start("niveau_1")
    }

    sceneNiveau_2(){
        this.scene.start("niveau_2")
    }

};