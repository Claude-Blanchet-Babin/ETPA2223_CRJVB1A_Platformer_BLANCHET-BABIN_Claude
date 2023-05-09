
class ChooseChar extends Phaser.Scene{

    constructor(config){
        super("ChooseCharScene");
        this.config = config; 
    }
    
    init(data){ 
        this.currentChoice = data.currentHero; 
        this.sceneNameData = data.currentScene;
        this.listHeroesAvailabe = data.listHeroes; 
    }

    create(){
        this.scene.bringToTop(); 
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.SCREEN_WIDTH = this.config.width;
        this.SCREEN_HEIGHT = this.config.height;

        this.physics.add.sprite(0,0 ,"choose_screen").setOrigin(0).setScale(1.1).setBlendMode(Phaser.BlendModes.MULTIPLY); 

        this.choices = this.physics.add.group({ allowGravity: false});

        this.activeChoice = null; 
        this.previousChoice = null; 
        this.nextChoice = null; 
        this.choiceRotation =  []; 

        this.choiceSun = this.choices.create(180 , this.SCREEN_HEIGHT/2 - 50, "sun_spritesheet"); 
        this.choiceSun.anims.play("idle_sun"); 

        if(this.listHeroesAvailabe.length == 2){
            this.choiceRain = this.choices.create(350 , this.SCREEN_HEIGHT/2 - 50, "rain_spritesheet");
            this.choiceRain.anims.play("idle_rain");
        }else if(this.listHeroesAvailabe.length == 3){
            this.choiceRain = this.choices.create(350 , this.SCREEN_HEIGHT/2 - 50, "rain_spritesheet");
            this.choiceWind = this.choices.create(500 , this.SCREEN_HEIGHT/2 - 50, "wind_spritesheet"); 
            this.choiceRain.anims.play("idle_rain");
            this.choiceWind.anims.play("idle_wind");
        }
         
        // x = x0 + r*cos(t)
        // y = y0 + r*sin(t)

      

        

      

        for(let i = 0; i < this.choices.children.entries.length; i++){
           if(i == this.currentChoice){
                this.choices.children.entries[i].active = true; 
                this.activeChoice = this.choices.children.entries[i]; 
                if(this.choices.children.entries[i+1]){
                    this.nextChoice = this.choices.children.entries[i+1];
                }else{
                    this.nextChoice = this.choices.children.entries[0];
                }
                if(this.choices.children.entries[i-1]){
                    this.previousChoice = this.choices.children.entries[i-1];
                }else{
                    this.previousChoice = this.choices.children.entries[this.choices.children.entries.length - 1]; 
                }
           }else{
                this.choices.children.entries[i].active = false; 
           }
        }

        this.choiceRotation.push(this.activeChoice, this.nextChoice, this.previousChoice);  

        for(let i = 0; i < this.choices.children.entries.length; i++){
            const angle = (360/this.choices.children.entries.length) * i;
            const radian = (angle * Math.PI) / 180; 
    
            this.choiceRotation[i].setPosition(this.SCREEN_WIDTH/2 + 100* Math.cos(radian - Math.PI/2) , this.SCREEN_HEIGHT/2 + 100*Math.sin(radian- Math.PI/2));
         }



   

    }


    update(){
        const {left, right, up, down, space} = this.cursors;
        const aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space); 
        const isLeftJustDown = Phaser.Input.Keyboard.JustDown(left);
        const isRightJustDown = Phaser.Input.Keyboard.JustDown(right);

        this.choices.children.each(function(choice) {

           if(choice.active){
                choice.setAlpha(1);
                choice.setScale(4); 
           }else{
                choice.setAlpha(0.5);
                choice.setScale(2);                
           }
             
         }, this);

        if(isSpaceJustDown){
           
        }

        if(isLeftJustDown){
           this.select(-1); 
        }
        if(isRightJustDown){
           this.select(1); 
        }

        
        aKey.on('up', function(event) {  
            this.scene.resume(this.sceneNameData, {chosenHero : this.currentChoice});
            this.scene.stop();
        }, this);
      
      
    }

    select(value){
        this.choices.children.entries[this.currentChoice].active = false;
        this.previousChoice = this.choices.children.entries[this.currentChoice];

        this.currentChoice += value;
        if(this.currentChoice < 0){
            this.currentChoice = this.choices.children.entries.length - 1; 
         }
        if(this.currentChoice > this.choices.children.entries.length - 1){
             this.currentChoice = 0; 
         }   
        this.choices.children.entries[this.currentChoice].active = true;

        this.displayWheel(); 

     }

     displayWheel(){
         this.choiceRotation = []; 
        for(let i = 0; i < this.choices.children.entries.length; i++){
            if(this.choices.children.entries[i].active){
                 this.activeChoice = this.choices.children.entries[i]; 
                 if(this.choices.children.entries[i+1]){
                     this.nextChoice = this.choices.children.entries[i+1];
                 }else{
                     this.nextChoice = this.choices.children.entries[0];
                 }
                 if(this.choices.children.entries[i-1]){
                     this.previousChoice = this.choices.children.entries[i-1];
                 }else{
                     this.previousChoice = this.choices.children.entries[this.choices.children.entries.length - 1]; 
                 }
            }else{
                 this.choices.children.entries[i].active = false; 
            }
         }
 
         this.choiceRotation.push(this.activeChoice, this.nextChoice, this.previousChoice);  
 
         for(let i = 0; i < this.choices.children.entries.length; i++){
             const angle = (360/this.choices.children.entries.length) * i;
             const radian = (angle * Math.PI) / 180; 

             this.tween = this.tweens.add({
                targets: this.choiceRotation[i],
                x: this.SCREEN_WIDTH/2 + 100* Math.cos(radian - Math.PI/2),
                y : this.SCREEN_HEIGHT/2 + 100*Math.sin(radian- Math.PI/2), 
                // radius: 200, 
                ease: 'Quintic.easeInOut',
                duration: 400,

            });
          }
     }


}

export default ChooseChar;