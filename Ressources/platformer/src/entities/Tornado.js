
import Enemy from "./Enemy.js";

//Classe Tornado : comportement Ennemi 01 
class Tornado extends Enemy{

    constructor(scene, x, y, maxX, minX){
        super(scene, x,y, "enemy_sheep"); 
        
        this.minX = minX;
        this.maxX = maxX; 

        this.init(); 
    }

    init(){
        super.init(); 
        //Variables entité
        this.speed = 30; 
        this.setVelocityX(this.speed); 
        this.dir = "right"; 


        //Physique avec le monde
        
        //Animations
        this.scene.anims.create({
            key: "enemy_sheep_walk",
            frames: this.scene.anims.generateFrameNumbers("enemy_sheep", {start: 0, end: 3}),
            frameRate: 6,
            repeat: -1
        });

        this.explosionParticles = this.scene.add.particles('sheep_particles');
        this.explosionEmitter = this.explosionParticles.createEmitter({
            
            x: this.x,
            y: this.y,
            speed: { min: -50, max: 50 },
            angle: { min: 0, max: 360 }, 
            lifespan: 300,
            scale: { start: 2, end: 0.5 },
            quantity : 10, 
            frequency: 10, 
            on:  false, 
              
        });
    }

    update(time,delta){
        super.update(time,delta);
        this.patrol(time,delta); 
        if(!this.active){return ;}
        this.play("enemy_sheep_walk", true); 
        this.explosionEmitter.setPosition(this.x, this.y)
        
    }

    patrol(time,delta){
        // Pour éviter les erreurs : ne lance pas le raycasting si pas de body ou si ennemi dans les airs
        if(!this.body || !this.body.onFloor()){
            return; 
        }

        if(this.x <= this.minX){
            this.setFlipX(!this.flipX);
            this.setVelocityX(this.speed);
            this.dir = "right"; 
        }else if(this.x >= this.maxX){
            this.setFlipX(!this.flipX);
            this.setVelocityX(-this.speed);
            this.dir = "left"; 
        }

        if(this.dir == "right"){
            this.setFlipX(false);
        }else if(this.dir == "left"){
            this.setFlipX(true); 
        }
    }

    getHit(projectile){
        super.getHit(projectile);

        if(this.hp <= 0){
            //VISUAL EFFECT PARTICLES
            this.explosionEmitter.explode(); 
        }
    }

   
}

export default Tornado;