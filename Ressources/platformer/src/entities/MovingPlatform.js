
class MovingPlatform extends Phaser.Physics.Arcade.Sprite{


    constructor(scene, x, y, dir, maxX, minX){
        super(scene, x,y, "platform"); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        this.minX = minX;
        this.maxX = maxX;
        this.initX = x;
        this.initY = y; 
        this.dir = dir; 
        this.init(); 
        this.initEvents(); 

    }

    init(){
        this.gravity = 0; 
        this.setImmovable(true); 
        this.speed = 60;
        this.platActive = false; 
        this.body.allowGravity = false; 
        this.moving = false; 

        //Animations
        this.scene.anims.create({
            key: "not_moving_platform",
            frames: [{ key: 'platform', frame: 0 }],
            frameRate: 12,
        })
        this.scene.anims.create({
            key: "activating_platform",
            frames: this.scene.anims.generateFrameNumbers("platform", {start: 1, end: 3}),
            frameRate: 10,

        });
        this.scene.anims.create({
            key: "moving_platform",
            frames: this.scene.anims.generateFrameNumbers("platform", {start: 4, end: 7}),
            frameRate: 8,
            repeat : -1
        });


    }

    initEvents(){
        //Ecoute la fonction update de la scène et appelle la fonction update de l'objet
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this); 
    }

    update(time, delta){
        if(!this.active){return; }
        
        if(this.platActive){

            if(!this.moving){
                this.anims.play("activating_platform", true);
                this.on('animationcomplete', () => {  
                    this.anims.play("moving_platform", true);    
                });
            }
        
            this.moving = true; 
            
            if(this.dir == "left"){
                this.setVelocityX(-this.speed); 
            }else{
                this.setVelocityX(this.speed); 
            }

            if(this.x <= this.minX){
                this.dir = "right";
            }else if(this.x >= this.maxX){
                this.dir = "left";
            }
        }else{
            this.anims.play("not_moving_platform"); 
            this.setVelocityX(0);
            this.moving = false; 
        }

        if(this.body.touching.none){
            this.anims.play("not_moving_platform"); 
            this.setInactive(); 
        }
    }

    setActive(){
        this.platActive = true; 
    }

    setInactive(){
        this.platActive = false; 
    }

    reset(){
        this.x = this.initX;
        this.y = this.initY; 
    }


}

export default MovingPlatform; 