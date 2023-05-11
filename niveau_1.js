export class niveau_1 extends Phaser.Scene{
    constructor(){
        super("niveau_1");
    }

    preload(){
        //ici le code de la fonction preload

    }

    create(){
        //ici le code de la fonction create

    }

    update(){
        //ici le code de la fonction update      
    }

    sceneOverworld(){
        this.scene.start("overworld")
    }

};