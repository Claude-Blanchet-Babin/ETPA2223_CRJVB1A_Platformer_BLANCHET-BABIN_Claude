

class EndScene extends Phaser.Scene{

    constructor(config){
        super("EndScene");
        this.config = config; 
    }
    
    init(data){ 
        
    }

    create(){


        this.SCREEN_WIDTH = this.config.width;
        this.SCREEN_HEIGHT = this.config.height;

        this.endscreen = this.physics.add.sprite(20 , 20 , "end_screen").setOrigin(0).setScrollFactor(0); 
 

      



    }


    update(){
     
    }

}

export default EndScene;