
import Enemy from "./Enemy.js";
import collidable from "../mixins/collidable.js";

//Classe Static Thunder Cloud : comportement Ennemi 03
class STCloud extends Enemy{

    constructor(scene, x, y){
        super(scene, x,y, "enemy_cloud"); 
        this.init(); 
    }

    init(){
        super.init(); 
        //Variables entité
        this.gravity = 0; 
        this.speed = 0; 
        this.maxAttackDelay = 100;
        this.attackDelay = this.maxAttackDelay; 
        this.attackDamages = 30; 

        this.attackBox = this.scene.physics.add.sprite(this.x, this.y + this.height + 8, 'enemy_cloud_thunder')
            // .setOrigin(0,0)
            .setAlpha(0)
            // .setSize(this.width/1.5, 2)
            .setOffset(0, 0); 

        this.attackBox.damages = this.attackDamages; 

        Object.assign(this.attackBox, collidable); 


        //State
        this.states = [
            "PASSIF",
            "ATTACKING",
            "CASTING"
        ];
        this.currentState = "PASSIF"; 

        //Physique avec le monde
        this.body.setGravityY(this.gravity); 
        this.setSize(32,22);
        this.setOffset(4,5);  
        this.setDepth(2); 
 

        
        //Animations
        this.scene.anims.create({
            key: "enemy_cloud_idle",
            frames: this.scene.anims.generateFrameNumbers("enemy_cloud", {start: 0, end: 3}),
            frameRate: 7,
            repeat: -1
        });

        this.scene.anims.create({
            key: "thunder_struck",
            frames: this.scene.anims.generateFrameNumbers("enemy_cloud_thunder", {start: 0, end: 6}),
            frameRate: 20,
            repeat : 0
        });
        this.scene.anims.create({
            key: "enemy_cloud_cast",
            frames: this.scene.anims.generateFrameNumbers("enemy_cloud", {start: 4, end: 12}),
            frameRate: 10,
            repeat : 0
        });
    }

    update(time,delta){
        super.update(time,delta);
        if(!this.active){return ;}
        if(this.currentState != "CASTING"){
            this.play("enemy_cloud_idle", true); 
        }

        this.attackBox.x = this.x; 
        this.attackDelay -= 1; 
        

        // if(this.attackDelay <= 40){
        //     this.currentState = "CASTING";
        //     this.play("enemy_cloud_cast", true); 
        // }


        if(this.attackDelay <= 0){
            this.currentState = "CASTING";
            this.play("enemy_cloud_cast", true); 
            this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject) {
                if(anim.key == "enemy_cloud_cast"){

                    if(frame.index == 7){
                        this.thunderAttack(this.target); 
                        this.attackDelay = this.maxAttackDelay; 
                        this.currentState = "ATTACKING"; 
                        // Enlève l'animation de l'éclair
                        // setTimeout(() => {
                        //     this.attackBox.setAlpha(0);
                        //     this.attackBox.setSize(this.width/2, 2); 
                        //     this.attackBox.setOffset(0, 0); 
                        // }, 300);
                        this.scene.time.delayedCall(300, () => {

                            if(this.active){
                                this.attackBox.setAlpha(0);
                                this.attackBox.setSize(this.width/2, 2); 
                                this.attackBox.setOffset(0, 0); 
                            }
                        });
                        // Met le nuage en état PASSIF
                        // setTimeout(() => {
                        //     this.currentState = "PASSIF"; 
                        // }, 800);
                        this.scene.time.delayedCall(800, () => {
                            this.currentState = "PASSIF";  
                        });
                    }
                }
            }, this);
            
            
                 
        }

    }


    thunderAttack(target){
        this.attackBox.setAlpha(1); 
        this.attackBox.setSize(this.width/2, 69); 
        this.attackBox.anims.play("thunder_struck");

    }

    getHit(){
        // this.hp -= 1; 
        // this.playDamageTween(); 
        // this.scene.time.delayedCall(500, () => {
        //     this.clearTint(); 
        // });

        // if(this.hp <= 0){
        //     this.rayGraphics.destroy(); 
        //     this.attackBox.destroy();
        //     this.destroy();

        //     //VISUAL EFFECT PARTICLES
        // }
    }

   
}

export default STCloud;