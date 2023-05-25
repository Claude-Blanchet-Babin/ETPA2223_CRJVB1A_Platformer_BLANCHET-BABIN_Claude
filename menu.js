export class menu extends Phaser.Scene{
    constructor(){
        super("menu");
    }

    preload(){
        //ici le code de la fonction preload
        this.load.image('menu', 'asset/ecran/menu.png');
        this.load.image('play', 'asset/ecran/play.png');
        this.load.image('option', 'asset/ecran/option.png'); 
        this.load.image('quit', 'asset/ecran/quitter.png'); 
    }

    create(){
        //ici le code de la fonction create
        this.add.image(960, 540, 'menu');
        var boutonPlay = this.add.image(960, 950, 'play').setInteractive();
        //this.add.image(300, 950, 'option');
        //this.add.image(1600, 950, 'quit');

        boutonPlay.once('pointerup',this.sceneOverworld,this);
    }

    update(){
        //ici le code de la fonction update      
    }

    sceneOverworld(){
        this.scene.start("overworld")
    }

};