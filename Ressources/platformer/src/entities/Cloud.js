class Cloud extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, flip){
        super(scene, x,y, "cloud"); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        this.init(); 
        this.initEvents(); 

        if(flip){
            this.setFlipX(true); 
        }
    }

    init(){

        this.setDepth(2); 

        this.lifeSpan = 200; 

        this.particles = this.scene.add.particles('drop');
        this.startParticleZone = this.x - this.width/2 + 3;
        this.endParticleZone = this.x + this.width/2 - 3;

        this.particleEmmiter = this.particles.createEmitter({
            
            x: {min: this.startParticleZone, max: this.endParticleZone},
            y: this.y + this.height/4,
            lifespan: 2000,
            speedY: { min: 60, max: 100 },
            scale: { start: 0.7, end: 0.6 },
            quantity: 1,
            frequency : 60, 
            
        });
        this.particles.setDepth(-1); 


    }

    initEvents(){
        //Ecoute la fonction update de la scène et appelle la fonction update de l'objet
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this); 
    }

    preUpdate(time, delta){
        super.preUpdate(time,delta);

       
    }

    update(time, delta){
        if(!this.body || !this.active){ return; }
        
        this.body.setVelocityX(this.scene.windVelocity); 

        this.startParticleZone = this.x - this.width/2 + 3;
        this.endParticleZone = this.x + this.width/2 - 3;
        this.particleEmmiter.setPosition({min: this.startParticleZone, max: this.endParticleZone}, this.y + this.height/4); 

        this.lifeSpan -= 1;

        if(this.lifeSpan <= 0){
           this.particleEmmiter.stop(); 
           this.destroy(); 
           return; 
        }

        for(const particle of this.particleEmmiter.alive){
            this.scene.checkPlantsWatered(particle); 
            this.scene.checkFirePlaceWatered(particle); 
        }
    }


}

export default Cloud; 