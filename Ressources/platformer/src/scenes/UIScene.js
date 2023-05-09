

class UIScene extends Phaser.Scene{

    constructor(config){
        super("UIScene");
        this.config = config; 
    }
    
    init(data){ 
        
    }

    create(){
        this.scene.bringToTop(); 

        this.SCREEN_WIDTH = this.config.width;
        this.SCREEN_HEIGHT = this.config.height;

        this.firsthp = this.physics.add.sprite(20 , 20 , "hpUI").setOrigin(0).setScrollFactor(0).setScale(2); 
        this.secondhp = this.physics.add.sprite(80 , 20 , "hpUI").setOrigin(0).setScrollFactor(0).setScale(2); 
        this.thirdhp = this.physics.add.sprite(140 , 20 , "hpUI").setOrigin(0).setScrollFactor(0).setScale(2); 
        this.hpText = this.add.text(20, 100, 'Vie', { fontSize: '20px', color:"white"});

        this.currentHp = 150; 
      

        //  Réfèrence à la scène en cours
        let ourGame = this.scene.get('PlayScene');

        //  Event Listeners : écoute l'event loseHp(emit dans la classe Player lors d'une prise de dégats) de la scène pour actualiser l'UI
        ourGame.events.on('loseHp', function (hp) {

            console.log(hp); 
            this.currentHp = hp; 

        }, this);



    }


    update(){
        this.hpText.setText(this.currentHp , { fontSize: '20px', color:"white"}); 
    }

}

export default UIScene;