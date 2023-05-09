

class WindParticle extends Phaser.GameObjects.Particles.Particle {
    constructor (emitter) {
        super(emitter);

        this.depth = 0.6 + Math.random() * 2;
        this.scaleX = this.depth * 0.8 ; 
        this.speed = this.depth * this.emitter.scene.maxWindVelocity * 3; 

    }

    update (delta, step, processors) {
        super.update(delta, step, processors);
        
            this.scaleX = this.depth * 0.7  ; 
            this.scaleY = this.depth * 0.7 ; 
            this.speed = this.depth * this.emitter.scene.maxWindVelocity * 3; 
            

        if(this.emitter.scene.windActive){
            
            this.velocityY = 20 * Math.sin(((1/40) * this.x)); 
            if(this.emitter.scene.windDirection == "left"){
                this.velocityX = -this.speed; 
            }else{
                this.velocityX = this.speed; 
            }
           
        }
        else{
            if(this.y < this.emitter.scene.player.y - 150){
                this.lifeCurrent = 0; 
            }else{
                this.velocityY += 2; 
            }  
        }
            
    }
}

export default WindParticle; 