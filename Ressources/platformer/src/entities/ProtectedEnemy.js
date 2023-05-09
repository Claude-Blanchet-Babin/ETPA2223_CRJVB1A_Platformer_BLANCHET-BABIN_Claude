
import Enemy from "./Enemy.js";

//Classe ProtectedEnemy : comportement Ennemi 
class ProtectedEnemy extends Enemy{

    constructor(scene, x, y, maxX, minX){
        super(scene, x,y, "enemy_ent"); 
        this.minX = minX;
        this.maxX = maxX; 
    }

    init(){
        super.init(); 
        //Variables entité
        this.speed = 30; 
        this.protected = true; 
        this.protectionDuration = 100; 
        this.hp = 2; 
        this.dir = "right"; 


        //Physique avec le monde
        this.setSize(18,34);
        this.setOffset(11,7); 
        this.setVelocityX(this.speed); 

       
 
        
        
        //Animations
        this.scene.anims.create({
            key: "enemy_ent_walk",
            frames: this.scene.anims.generateFrameNumbers("enemy_ent", {start: 0, end: 3}),
            frameRate: 3,
            repeat: -1
        });

        this.scene.anims.create({
            key: "enemy_ent_leafs",
            frames: [{ key: 'leafs_ent', frame: 0 }],
            frameRate: 12,
        })
        this.scene.anims.create({
            key: "enemy_ent_leafs_reflect",
            frames: this.scene.anims.generateFrameNumbers("leafs_ent", {start: 1, end: 5}),
            frameRate: 16,
            repeat: 1
        });
        this.scene.anims.create({
            key: "enemy_ent_leafs_lose",
            frames: this.scene.anims.generateFrameNumbers("leafs_ent", {start: 6, end: 8}),
            frameRate: 10,
            repeat : -1, 
        });


        this.protection = this.scene.physics.add.sprite(this.x, this.y, "leafs_ent"); 


        this.protectionParticles = this.scene.add.particles('leaf');
        this.protectionEmitter = this.protectionParticles.createEmitter({
            
            x: this.x,
            y: this.y,
            speed: { min: -200, max: 200 },
            angle: { min: 0, max: 360 }, 
            rotate : {min: 0, max: 90},
            lifespan: 300,
            scale: { start: 1, end: 0.5 },
            quantity : 10, 
            frequency: 10, 
            on:  false, 
              
        });

        var tween = this.scene.tweens.add({
            targets: this.protection,
            y: this.y - 12,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: -1,            // -1: infinity
            yoyo: true
        });
    }

    update(time,delta){
        super.update(time,delta);
        this.patrol(time,delta); 
        if(!this.active){return ;}
        this.anims.play("enemy_ent_walk", true); 
        
       
        

       this.protectionEmitter.setPosition(this.x, this.y); 

       if(this.protection.active){
        this.protection.x = this.x;

        if(this.protection.anims.isPlaying && (this.protection.anims.getName() == "enemy_ent_leafs_reflect"
        || this.protection.anims.getName() == "enemy_ent_leafs_lose" )){
            return; 
        }
        this.protection.anims.play("enemy_ent_leafs", true); 
        

       }
   
        
    }

    patrol(time,delta){
        // Pour éviter les erreurs : ne lance pas le raycasting si pas de body ou si ennemi dans les airs
        if(!this.body || !this.body.onFloor()){
            return; 
        }

        if(this.x <= this.minX){
            this.setVelocityX(this.speed);
            this.dir = "right";
        }else if(this.x >= this.maxX){
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
        if(this.protected){
            this.protection.anims.play("enemy_ent_leafs_reflect", true); 
        }
        else{
            super.getHit(projectile); 
        }
    }

    loseProtection(){
        this.protection.anims.play("enemy_ent_leafs_lose", true); 
        this.protectionDuration -= 1; 
        if(this.protectionDuration <= 0){
            this.protected = false; 
            this.protection.destroy(); 
            this.protectionEmitter.explode(); 
        }   
    }

   
}

export default ProtectedEnemy;