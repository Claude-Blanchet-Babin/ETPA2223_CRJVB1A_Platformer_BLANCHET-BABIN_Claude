import SpriteEffect from "../entities/SpriteEffect.js";

class Projectile extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y){
        super(scene, x, y, "beam_sun");

        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        this.init();
        
    }

    init(){
        this.speed = 250; 
        this.maxDistance = 150;
        this.traveledDistance = 0; 
        this.dir = null; 
         
        
        //Animations
        this.scene.anims.create({
            key: "projectile",
            frames: this.scene.anims.generateFrameNumbers("beam_sun", {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.beamParticles = this.scene.add.particles('beam_particles');
    

        this.particleEmmiter = this.beamParticles.createEmitter({
            x: this.x,
            y: this.y,
            lifespan: 200,
            speedY: {min : -5, max: 5}, 
            scale: { start: 1, end: 0 },
            alpha: { start: 0.7, end: 0 },
            quantity: 1, 
            blendMode: "ADD",
            
        });
        this.residuEmmiter = this.beamParticles.createEmitter({
            x: this.x,
            y: this.y,
            lifespan: 1000,
            speedY: {min : -50, max: 50}, 
            scale: { start: 0.2, end: 0 },
            quantity: 1, 
            
        });
    }

    preUpdate(time, delta){
        super.preUpdate(time,delta); 
        this.traveledDistance += this.body.deltaAbsX();
        if(this.traveledDistance >= this.maxDistance){
            this.particleEmmiter.stop(); 
            this.residuEmmiter.stop(); 
            this.destroy(); 
        }

        this.particleEmmiter.setPosition(this.x, this.y); 
        this.residuEmmiter.setPosition(this.x, this.y); 
       
    }

    fire(caster){
    
        if(caster.dir == "right"){
            this.dir = "right"; 
            this.x = caster.x + 15; 
            this.setVelocityX(this.speed); 
        }else if(caster.dir == "left"){
            this.dir= "left";
            this.x = caster.x - 15;
            this.setFlipX(true); 
            this.setVelocityX(-this.speed); 
        }
        
        this.anims.play("projectile"); 
    }

    hit(target){
        new SpriteEffect(this.scene, 0,0, "projectile_impact").playOn(target, this.y);
        if(target.protected){
            this.getDeflected(); 
        }else{
            this.particleEmmiter.stop(); 
            this.residuEmmiter.stop(); 
            this.destroy();
        }
    }

    getDeflected(){
        if(this.dir == "right"){
            this.setVelocityX(-this.speed); 
            this.setFlipX(true); 
            this.dir= "left";
        }else{
            this.setVelocityX(this.speed); 
            this.setFlipX(false); 
            this.dir= "right";
        }
        this.maxDistance = 500; 
    }

}

export default Projectile; 