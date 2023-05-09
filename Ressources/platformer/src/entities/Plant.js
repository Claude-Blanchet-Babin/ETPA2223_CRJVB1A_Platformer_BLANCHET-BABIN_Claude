class Plant extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, size){
        super(scene, x,y, "growing_plant"); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        this.maxSize =  size;   
        this.init(); 
        this.initEvents(); 

    }

    init(){
        this.size = 1;
        this.isGrowing = false; 

        
      
        this.setOrigin(0);
        
        
        //Animations
        this.scene.anims.create({
            key: "growing",
            frames: this.scene.anims.generateFrameNumbers("growing_plant", {start: 1, end: 4}),
            frameRate: 10,
        });
        this.scene.anims.create({
            key: "growing_platform",
            frames: this.scene.anims.generateFrameNumbers("plant_platform", {start: 0, end: 6}),
            frameRate: 10,
        });
        this.scene.anims.create({
            key: "plant_idle",
            frames: this.scene.anims.generateFrameNumbers("growing_plant", {start: 5, end: 9}),
            frameRate: 10,
            repeatDelay: 1000, 
            repeat: -1
        });



        this.anims.play("plant_idle"); 

    }

    initEvents(){

    }


    grow(){
        if(!this.isGrowing){
            this.anims.play("growing"); 
            this.isGrowing = true;
            this.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject) {

                if(frame.index == 4){
                    if(this.size < this.maxSize){
                        this.addNewStem(this);
                    }else{
                        this.addPlantPlatform(this);
                    } 
                }
    
            });

           
        }   
    }

    addNewStem(previousPlant){
        this.size += 1; 
        const newStem = this.scene.physics.add.sprite(previousPlant.x, previousPlant.y - previousPlant.height, "growing_plant").setOrigin(0);
        newStem.anims.play("growing"); 

        newStem.on(Phaser.Animations.Events.ANIMATION_UPDATE, function (anim, frame, gameObject) {
            
            if(frame.index == 4){
                if(this.size < this.maxSize){
                    this.addNewStem(newStem);
                }else{
                    this.addPlantPlatform(newStem);
                } 
            }

        }, this);

        
        // newStem.on('animationcomplete', () => {
        //     if(this.size < this.maxSize){
        //         this.addNewStem(newStem);
        //     }else{
        //         this.addPlantPlatform(newStem);
        //     }
            
        // });
    }

    addPlantPlatform(previousPlant){
        const plantPlatform = this.scene.physics.add.sprite(previousPlant.x + 7 , previousPlant.y - 3, "plant_platform");
        // plantPlatform.setOrigin(0); 
        plantPlatform.setImmovable(true); 
        plantPlatform.anims.play("growing_platform"); 
        plantPlatform.setSize(51,9);
        plantPlatform.setOffset(5,8); 
        this.scene.physics.add.collider(this.scene.player, plantPlatform); 
    }


}

export default Plant; 