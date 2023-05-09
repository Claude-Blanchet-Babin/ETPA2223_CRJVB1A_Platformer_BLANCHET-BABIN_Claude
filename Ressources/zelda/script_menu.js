export class menu extends Phaser.Scene{
    constructor(){
        super("menu");
    }

    preload(){
        //ici le code de la fonction preload
        this.load.image('menu', 'assetsjeu/image/menu.png');
        this.load.image('play', 'assetsjeu/image/play.png');  
    }

    create(){
        //ici le code de la fonction create
        this.add.image(708, 400, 'menu');
        var bouton = this.add.image(708, 500, 'play').setInteractive();

        bouton.once('pointerup',this.sceneExterieur,this);
    }

    update(){
        //ici le code de la fonction update      
    }

    sceneExterieur(){
        this.scene.start("jardin",{entrance : "menu"})
    }

};
