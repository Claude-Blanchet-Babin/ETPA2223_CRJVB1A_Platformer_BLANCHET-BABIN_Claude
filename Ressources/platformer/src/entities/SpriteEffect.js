

class SpriteEffect extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, effectSprite){
        super(scene, x, y, effectSprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.effectSprite = effectSprite;

        this.init();
    }

    init(){
        this.target = null; 
        this.impactPosition = null; 
         
        //Animations
        //Projectile contre ennemi
        this.scene.anims.create({
            key: "projectile_impact",
            frames: this.scene.anims.generateFrameNumbers("projectile_impact", {start: 0, end: 3}),
            frameRate: 10,
        });




        this.on('animationcomplete', animation => {
            if(animation.key == this.effectSprite){
                this.destroy(); 
            }
        }, this);
    }

    preUpdate(time, delta){
        super.preUpdate(time,delta);

        this.placeEffect(this.impactPosition); 
    }

  
    placeEffect(impactPosition){
        if(!this.target || !this.body ){return;}
        const center = this.target.getCenter();
        this.impactPosition = impactPosition;
        this.body.reset(center.x, this.impactPosition); 
    }

    playOn(target, impactPosition){
        this.target = target; 
        this.play(this.effectSprite, true);
        this.placeEffect(impactPosition); 
    }

}

export default SpriteEffect; 