
import Enemy from "./Enemy.js";

//Classe Caster : comportement Ennemi 
class Caster extends Enemy{

    constructor(scene, x, y, facing, cooldown, lifeTime){
        super(scene, x,y, "enemy_harpy"); 

        this.facingLeft = facing; 
        this.tornadoLifespan  = lifeTime;
        this.castCooldown = cooldown;  

        this.init(); 
    }

    init(){
        super.init(); 
        //Variables entité
        this.speed = 0; 
        this.hp = 2; 
        this.setVelocityX(this.speed); 
        this.setFlipX(this.facingLeft); 

        this.lastCast = this.castCooldown; 

        if(this.facingLeft){
            this.tornadoVelocity = -100;
        }else{
            this.tornadoVelocity = 100;
        }


        //Physique avec le monde
        this.setSize(21,40);
        this.setOffset(8,0); 
 
        
        
        //Animations
        this.scene.anims.create({
            key: "enemy_harpy_fly",
            frames: this.scene.anims.generateFrameNumbers("enemy_harpy", {start: 0, end: 1}),
            frameRate: 2,
            repeat: -1
        });
        this.scene.anims.create({
            key: "enemy_harpy_cast",
            frames: this.scene.anims.generateFrameNumbers("enemy_harpy", {start: 2, end: 6}),
            frameRate: 10,
        });
        this.scene.anims.create({
            key: "tornado_harpy_turn",
            frames: this.scene.anims.generateFrameNumbers("tornado_harpy", {start: 0, end: 3}),
            frameRate: 10,
            repeat : -1, 
        });


        this.explosionParticles = this.scene.add.particles('harpy_particles');
        this.explosionEmitter = this.explosionParticles.createEmitter({
            
            x: this.x,
            y: this.y,
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 }, 
            rotate: {min : 0, max : 90}, 
            lifespan: 300,
            scale: { start: 1, end: 0.5 },
            quantity : 10, 
            frequency: 10, 
            on:  false, 
              
        });

    }

    update(time,delta){
        super.update(time,delta);
        if(!this.active){return ;}
    
        this.lastCast -= 1;

        if(this.lastCast <= 0){
            this.anims.play("enemy_harpy_cast", true);

            this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject) {
                if(anim.key == "enemy_harpy_cast"){
                    if(frame.index == 4){
                        this.castTornado();  
                    }    
                }
            });
            this.lastCast = this.castCooldown; 
        }

        if(this.anims.isPlaying && (this.anims.getName() == "enemy_harpy_cast")){
            return; 
        }
        this.play("enemy_harpy_fly", true); 
        this.explosionEmitter.setPosition(this.x, this.y); 
        
    }

    castTornado(){
        const tornado = this.scene.physics.add.sprite(this.x, this.y - 12, "tornado_harpy");
        tornado.setImmovable(true);
        tornado.setGravityY(false); 
        tornado.setScale(1.4); 
        tornado.setVelocityX(this.tornadoVelocity); 
        tornado.setSize(24,32);
        tornado.setOffset(11,9); 
        tornado.setDepth(0); 
        tornado.anims.play("tornado_harpy_turn");
        this.scene.physics.add.overlap(tornado, this.scene.player, this.scene.player.getDragged); 
       
        this.scene.time.delayedCall(this.tornadoLifespan, () => {
            tornado.destroy();
        });
      
    }

    getHit(projectile){
        super.getHit(projectile);

        if(this.hp <= 0){
            //VISUAL EFFECT PARTICLES
            this.explosionEmitter.explode(); 
        }
    }

   
}

export default Caster;