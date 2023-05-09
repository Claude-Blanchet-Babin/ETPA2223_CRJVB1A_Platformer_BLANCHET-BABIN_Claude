
class Test extends Phaser.Scene{

    constructor(config){
        super("TestScene");
        this.config = config; 
    }
    
    init(data){ this.playerData = data.player;}

    create(){
         //ENVIRONNEMENT DE TEST
        //let { width, height } = this.sys.game.canvas;
        let y = 0; 
        for(var i = 0; i < 10000; i = i + 16){
            y++; 
            this.add.line(0, 0, i, 0, i, 10000, 0x00ff00, 0.1).setOrigin(0);
            if(y%2 != 0){
                this.add.text(i, 5, i, { fontSize: '8px' }).setScrollFactor(1,0);
            }else{
                this.add.text(i, 15, i, { fontSize: '8px' }).setScrollFactor(1,0);
            }  
        }

        for(var i = 0; i < 10000; i = i + 16){
            this.add.line(0, 0, 0, i, 10000, i, 0x00ff00, 0.1).setOrigin(0);
            this.add.text(1, i , i, { fontSize: '8px' }).setScrollFactor(0,1);
        }
        //FIN ENVIRONNEMENT DE TEST


        this.cameras.main.setBounds(0,0, 10000, 10000); 
        this.cameras.main.startFollow(this.playerData); 
        this.physics.world.setBounds(0, 0, 10000, 10000);
    }


    update(){
      
    }

}

export default Test;