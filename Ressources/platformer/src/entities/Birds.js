class Bird extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, color, facing){
        super(scene, x,y, color); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet
  
        this.facingLeft = facing; 
        this.skin = color; 
        this.init(); 
        this.initEvents(); 

    }

    init(){


        this.setOrigin(0);
        this.detectionBox = this.scene.physics.add.sprite(this.x, this.y, 'none')
        .setOrigin(0,0)
        .setAlpha(0)
        .setSize(200, 50)
        
        this.setFlipX(this.facingLeft); 
        
        
        //Animations
        this.scene.anims.create({
            key: this.skin,
            frames: this.scene.anims.generateFrameNumbers(this.skin, {start: 0, end: 15}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: this.skin + "fly",
            frames: this.scene.anims.generateFrameNumbers(this.skin, {start: 16, end: 19}),
            frameRate: 10,
            repeat: -1
        });
    
     
            this.anims.play({ key: this.skin, startFrame: Math.floor(Math.random(0,1)*10) }, true);
       

    }

    initEvents(){

    }

    fly(){
        const speed = Math.floor(Math.random() * 100) + 50;
        this.setVelocity(speed, -100);
        this.anims.play({ key: this.skin + "fly", startFrame: Math.floor(Math.random(0,1)*3) }, true);
        this.setFlipX(false); 
    }

   


}

export default Bird; 