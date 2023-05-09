import collidable from "../mixins/collidable.js";
import HealthBar from "../hud/HealthBar.js";
import Projectile from "./PlayerProjectile.js";
import Cloud from "./Cloud.js";
import { getTimestamp } from "../utils/functions.js";


//Classe Player : comportement personnage
class Player extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, heroes_available, current_hero, hp){
        super(scene, x,y, "hero_run"); 
        scene.add.existing(this); //Ajoute l'objet à la scène 
        scene.physics.add.existing(this); //Donne un physic body à l'objet

        //Mixins collisions
        Object.assign(this, collidable); 

        //Propriétés à passer de scène en scène
        this.listeHeros = heroes_available; 
        this.currentHeroIndex = current_hero; 
        this.hp = hp; 

        this.init();
        this.initEvents(); 
    }

    init(){
        //Variables personnage
        this.gravity = 400; 
        this.speed = 100; 
        this.jumpSpeed = 200; 
        this.jumpCount = 0; 
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.isFalling = false; 
        this.isHovering = false; 
        this.hoveringAvailable = true; 
        this.isDashing = false; 
        this.dir = "right"; 
        this.isHit = false; 
        this.cantMove = false; 
        this.bounceVelocity = 100; 

        this.projectiles = new Phaser.GameObjects.Group;
        this.clouds = new Phaser.GameObjects.Group; 
        this.fireCooldown = 400; 
        this.timeFromLastShot = 0; 

        this.lastSaveX = 0;
        this.lastSaveY = 0; 



        this.jumpSound = this.scene.sound.add("jump", {volume : 0.08});
        this.beamSound = this.scene.sound.add("beam", {volume : 0.08});
        this.cloudSound = this.scene.sound.add("cloud", {volume : 0.05});
        this.dashSound = this.scene.sound.add("dash", {volume : 0.08});
        this.windCastSound = this.scene.sound.add("wind_cast", {volume : 0.08});
        this.auraSOund = this.scene.sound.add("aura", {volume : 0.2});


        this.auraBox = this.scene.physics.add.sprite(this.x, this.y, 'none')
            .setOrigin(0,0)
            .setAlpha(0)
            .setSize(this.width * 2, this.height * 2)
            .setOffset(-this.width, -this.height*1.2); 

        this.auraBox.active = false; 

        this.windBox = this.scene.physics.add.sprite(this.x, this.y, 'none')
            .setOrigin(0,0)
            .setAlpha(0)
            .setSize(this.width * 12, this.height * 3)
            .setOffset(-this.width * 6, -this.height*2); 

       

        //Personnage actif

        this.currentHero = this.listeHeros[this.currentHeroIndex]; 

        this.heroChoice = false; 


        this.animsPlayer = [{idle : "idle_sun", run : "run_sun", jump : "jump_sun", fall : "fall_sun" , aura_cast : "aura_cast_sun", aura: "aura_sun" ,cast : "cast_sun" },
        {idle : "idle_rain", run : "run_rain", jump : "jump_rain" , fall : "fall_rain" , cast : "cast_rain"},
        {idle : "idle_wind", run : "run_wind", jump : "jump_wind" , fall : "fall_wind", dash : "dash_wind", cast : "cast_wind", hover:"hover_wind"}]; 


     
        //Récupère héro choisi de l'écran de sélection 
        this.scene.events.on('resume', (scene, data) => {
            
            this.currentHeroIndex = data.chosenHero; 
            this.isFalling = false; // Réinitialise la chute pour changer l'animation 
            this.swapCharacter(); 
            console.log(this); 
        }, this);

        //Groupe pour effet dash
        this.dashTrail = this.scene.physics.add.group({ allowGravity: false, collideWorldBounds: true });

        //Physique avec le monde
        this.body.setGravityY(this.gravity);
        this.setDepth(1);  
        this.setCollideWorldBounds(true); 
        this.setSize(11,20);
        this.setOffset(26,28);  
        
        
        //Animations
        this.scene.anims.create({
            key: "run",
            frames: this.scene.anims.generateFrameNumbers("hero_run", {start: 0, end: 7}),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: "jump",
            frames: this.scene.anims.generateFrameNumbers("hero_jump", {start: 0, end: 1}),
            frameRate: 15,
        });

        this.scene.anims.create({
            key: "fall",
            frames: this.scene.anims.generateFrameNumbers("hero_jump", {start: 2, end: 4}),
            frameRate: 12,
            repeat: 0
        });

        this.scene.anims.create({
            key: "hover",
            frames: this.scene.anims.generateFrameNumbers("hero_jump", {start: 5, end: 5}),
            frameRate: 12,
            repeat: 0
        });

        this.scene.anims.create({
            key: "idle",
            frames: [{ key: 'hero_run', frame: 8 }],
            frameRate: 12,
            repeat: -1
        });

        // NOUVELLES ANIMATIONS HEROS
        // ANIMS SUN
        this.scene.anims.create({
            key: "idle_sun",
            frames: this.scene.anims.generateFrameNumbers("sun_spritesheet", {start: 0, end: 1}),
            frameRate: 2,
            repeat: -1
        });
        this.scene.anims.create({
            key: "run_sun",
            frames: this.scene.anims.generateFrameNumbers("sun_spritesheet", {start: 2, end: 9}),
            frameRate: 12,
            repeat: -1
        });
        this.scene.anims.create({
            key: "jump_sun",
            frames: this.scene.anims.generateFrameNumbers("sun_spritesheet", {start: 10, end: 11}),
            frameRate: 20,
        });
        this.scene.anims.create({
            key: "fall_sun",
            frames: this.scene.anims.generateFrameNumbers("sun_spritesheet", {start: 12, end: 14}),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: "aura_cast_sun",
            frames: this.scene.anims.generateFrameNumbers("sun_spritesheet", {start: 15, end: 18}),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: "aura_sun",
            frames: this.scene.anims.generateFrameNumbers("sun_spritesheet", {start: 19, end: 24}),
            frameRate: 12,
            repeat: -1
        });
        this.scene.anims.create({
            key: "cast_sun",
            frames: this.scene.anims.generateFrameNumbers("sun_spritesheet", {start: 25, end: 26}),
            frameRate: 6,
        });


         // ANIMS RAIN
         this.scene.anims.create({
            key: "idle_rain",
            frames: this.scene.anims.generateFrameNumbers("rain_spritesheet", {start: 0, end: 1}),
            frameRate: 2,
            repeat: -1
        });
        this.scene.anims.create({
            key: "run_rain",
            frames: this.scene.anims.generateFrameNumbers("rain_spritesheet", {start: 2, end: 9}),
            frameRate: 12,
            repeat: -1
        });
        this.scene.anims.create({
            key: "jump_rain",
            frames: this.scene.anims.generateFrameNumbers("rain_spritesheet", {start: 10, end: 12}),
            frameRate: 20,
        });
        this.scene.anims.create({
            key: "fall_rain",
            frames: this.scene.anims.generateFrameNumbers("rain_spritesheet", {start: 13, end: 15}),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: "cast_rain",
            frames: this.scene.anims.generateFrameNumbers("rain_spritesheet", {start: 16, end: 22}),
            frameRate: 12,
        });


         // ANIMS WIND
         this.scene.anims.create({
            key: "idle_wind",
            frames: this.scene.anims.generateFrameNumbers("wind_spritesheet", {start: 0, end: 1}),
            frameRate: 2,
            repeat: -1
        });
        this.scene.anims.create({
            key: "run_wind",
            frames: this.scene.anims.generateFrameNumbers("wind_spritesheet", {start: 2, end: 9}),
            frameRate: 12,
            repeat: -1
        });
        this.scene.anims.create({
            key: "jump_wind",
            frames: this.scene.anims.generateFrameNumbers("wind_spritesheet", {start: 10, end: 11}),
            frameRate: 20,
        });
        this.scene.anims.create({
            key: "fall_wind",
            frames: this.scene.anims.generateFrameNumbers("wind_spritesheet", {start: 12, end: 14}),
            frameRate: 12,
            repeat: 0
        });
        this.scene.anims.create({
            key: "hover_wind",
            frames: this.scene.anims.generateFrameNumbers("wind_spritesheet", {start: 15, end: 16}),
            frameRate: 2,
            repeat: -1
        });
        this.scene.anims.create({
            key: "dash_wind",
            frames: [{ key: 'wind_spritesheet', frame: 17 }],
            frameRate: 12,

        });
        this.scene.anims.create({
            key: "cast_wind",
            frames: this.scene.anims.generateFrameNumbers("wind_spritesheet", {start: 18, end: 25}),
            frameRate: 12,
        });


        this.lightParticles = this.scene.add.particles('light_particles');

    

        this.lightParticleEmmiter = this.lightParticles.createEmitter({
            x: this.x,
            y: this.y,
            lifespan: 200,
            speed: 200, 
            scale: { start: 0.7, end: 0 },
            alpha: { start: 1, end: 0.5 },
            on : false, 
            
        });


        this.explodeParticles = this.scene.add.particles('player_particles');
        this.explodeEmitter = this.explodeParticles.createEmitter({
            
            x: this.x,
            y: this.y,
            speed: { min: -60, max: 60 },
            angle: { min: 0, max: 360 }, 
            rotate : {min: 0, max: 90},
            lifespan: 300,
            scale: { start: 1, end: 0 },
            scale: { start: 1, end: 0 },
            quantity : 50, 
            frequency: 10, 
            on:  false, 
              
        });

        

    }

    initEvents(){
        //Ecoute la fonction update de la scène et appelle la fonction update de l'objet
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this); 
    }

    update(time, delta){

        if(!this.active){return; }
        
          //Dash effect
          if(this.isDashing){
            const silhouette = this.dashTrail.create(this.x, this.y,'wind_dash').setPushable(false).setDepth(-1).setAlpha(0.8).setTintFill( 0x62bf76).setFlipX(this.flipX);
            this.scene.tweens.addCounter({
                from: 255,
                to: 0,
                duration: 300,
                onUpdate: function (tween)
                {
                    const valueRB = Math.floor(tween.getValue());
                    const valueG = 115 + Math.floor(Math.floor(tween.getValue())/1.82);
    
                    silhouette.setTintFill(Phaser.Display.Color.GetColor(valueRB, valueG, valueRB));   
                }
            });
            // .setTintFill(0x62bf76)
        }
   
    
            this.dashTrail.children.each(function(silouhette) {
            
                silouhette.alpha -= 0.05 ;
                if(silouhette.alpha <= 0){
                    silouhette.destroy(); 
                }
       
            }, this);
    
        

        this.lightParticleEmmiter.setPosition(this.x, this.y);
        this.explodeEmitter.setPosition(this.x, this.y);


        if(this.cantMove){
            return; 
        }

        //Keys
        const {left, right, up, down, space} = this.cursors;
        const aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        const eKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        const rKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space); 
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up); 
        const isAJustDown = Phaser.Input.Keyboard.JustDown(aKey); 
        const isEJustDown = Phaser.Input.Keyboard.JustDown(eKey); 
        const isRJustDown = Phaser.Input.Keyboard.JustDown(rKey); 

        


        const isOnFloor = this.body.onFloor(); 


        this.auraBox.x = this.x;
        this.auraBox.y = this.y; 
        this.windBox.x = this.x;
        this.windBox.y = this.y; 
       
        

        //Déplacements
        if(!this.isDashing){
            if (left.isDown){
                //Velocité en fonction du hovering
                if(this.isHovering){
                    this.setVelocityX(-this.speed + this.scene.windVelocity);
                }else{
                    this.setVelocityX(-this.speed);
                }
                
                this.setFlipX(true); 
                this.dir = "left";
            }else if (right.isDown){
                //Velocité en fonction du hovering
                if(this.isHovering){
                    this.setVelocityX(this.speed + this.scene.windVelocity);
                }else{
                    this.setVelocityX(this.speed);
                }

                this.setFlipX(false); 
                this.dir = "right";
            }else {
                //Velocité en fonction du hovering
                if(this.isHovering){
                    this.setVelocityX(this.scene.windVelocity/2);
                }else{
                    this.setVelocityX(0);
                }
               
            }
        }

       

        
       

        //Reset onFloor
        if(isOnFloor){
            this.jumpCount = 0;
            this.isFalling = false; 
            this.isHovering = false; 
            this.hoveringAvailable = true; 
        }

        
        //Saut et chute 
        if(isUpJustDown && (isOnFloor) && !this.auraBox.active){
            this.jumpSound.play(); 
            if(this.currentHero == "Rain"){
                this.setVelocityY(-this.jumpSpeed * 1.2);    
            }else{
                this.setVelocityY(-this.jumpSpeed * 0.9);
            }
            
            this.isFalling = false; 

            this.play(this.animsPlayer[this.currentHeroIndex].jump);  
        }

        if(this.body.velocity.y > 0){
            if(this.currentHero == "Wind" && this.scene.windActive && this.hoveringAvailable){
                this.isFalling = false;
                this.isHovering = true; 
                this.play(this.animsPlayer[this.currentHeroIndex].hover, true);
                
            }else if(!this.scene.windActive && !this.isFalling){
                this.isHovering = false; 
                this.isFalling = true; 
                this.play(this.animsPlayer[this.currentHeroIndex].fall, true);
                
            }else if(!this.hoveringAvailable && !this.isFalling){
                this.isHovering = false; 
                this.isFalling = true; 
                this.play(this.animsPlayer[this.currentHeroIndex].fall, true);
            }
        }else{
            this.isFalling = false;
            this.isHovering = false; 
        }




         //Dash
         if(isSpaceJustDown && this.currentHero == "Wind"){
             this.dashSound.play(); 
            this.hoveringAvailable = false; 
            this.isDashing = true;
            this.anims.play(this.animsPlayer[this.currentHeroIndex].dash); 
            if(this.dir == "left"){
                this.setVelocityX(-this.speed * 3); 
            }else{
                this.setVelocityX(this.speed * 3); 
            }
           
            setTimeout(() => {
                this.isDashing = false;  
            }, 200);
        }

        //Projectile
        if(isSpaceJustDown && this.currentHero == "Sun"){
            if(getTimestamp() - this.timeFromLastShot < this.fireCooldown){ return; }
            this.beamSound.play(); 
            this.anims.play(this.animsPlayer[this.currentHeroIndex].cast); 
            const beam = new Projectile(this.scene, this.x, this.y + 5); 
            this.projectiles.add(beam); 
            beam.fire(this); 
            this.timeFromLastShot = getTimestamp(); 
        }


        //Aura
        if(this.currentHero == "Sun"){
            if(rKey.isDown){
                if(!this.auraBox.active){
                    this.anims.play(this.animsPlayer[this.currentHeroIndex].aura_cast); // commence  à jouer le cast que si auraBox est inactive
                    this.on('animationcomplete', () => {  // joue la boucle une fois que l'animation de cast est finie
                        if(this.auraBox.active){ // seulement si l'aura est active 
                            this.anims.play(this.animsPlayer[this.currentHeroIndex].aura);   
                        }
                    });
                }
                this.auraBox.active = true;
                this.setVelocityX(0);
                this.lightParticleEmmiter.start(); 

                
            }else{
                this.auraBox.active = false;
                this.lightParticleEmmiter.stop(); 

            }
        }else{
            this.auraBox.active = false;
        }


        //Spawn nuage
        if(this.currentHero == "Rain"){
            if(isRJustDown){
                this.cloudSound.play(); 
                if(isOnFloor){
                    this.anims.play(this.animsPlayer[this.currentHeroIndex].cast); 
                    this.scene.time.delayedCall(550, () => {
                        const cloud = new Cloud(this.scene, this.x, this.y - 18, this.flipX); 
                        this.clouds.add(cloud);
                    });
                }else{
                    const cloud = new Cloud(this.scene, this.x, this.y - 30, this.flipX); 
                    this.clouds.add(cloud);
                }
                
                 
            }
        }

        //Toggle Wind
        if(this.currentHero == "Wind"){
            if(isRJustDown){
                this.windCastSound.play(); 
                this.toggleWind(this.dir);  
                this.anims.play(this.animsPlayer[this.currentHeroIndex].cast);  
            }
        }

        if(this.scene.windActive && this.isHovering){
            this.body.setMaxVelocityY(20); 
        }else{
            this.body.setMaxVelocityY(250); 
        }

        //  if(isSpaceJustDown ){
        //    this.respawn(); 
        // }



        //Swap Chara Screen

        if(aKey.isDown){
            this.scene.scene.launch('ChooseCharScene',
             {currentHero: this.currentHeroIndex,
              currentScene : this.scene.sceneName,
              listHeroes : this.listeHeros}); 
            this.scene.scene.pause();
        }

        //Animations en fonction du déplacement

        if(this.anims.isPlaying && (this.anims.getName() == "cast_sun"
        || this.anims.getName() == "jump_sun" 
        || this.anims.getName() == "jump_rain"
        || this.anims.getName() == "jump_wind"
        || this.anims.getName() == "cast_rain"
        || this.anims.getName() == "cast_wind"
        || this.anims.getName() == "dash_wind")){
            return; 
        }
     
        if(this.body.velocity.y == 0 || isOnFloor){
            if(this.body.velocity.x != 0){
                if(!this.auraBox.active){
                    this.play(this.animsPlayer[this.currentHeroIndex].run, true); 
                }
            }else{
                if(!this.auraBox.active){ // Joue idle que si Sun est pas entrain de cast
                    this.play(this.animsPlayer[this.currentHeroIndex].idle, true);
                }   
            }
        }

    }

    

    swapCharacter(){
        this.currentHero = this.listeHeros[this.currentHeroIndex];
        if(this.currentHero != "Wind"){
            this.stopWind(); 
        }
    }

    addCharacter(characterName){
        this.listeHeros.push(characterName); 
    }

  

    toggleWind(direction){
        if(this.scene.windActive){
            this.stopWind();
        }else{
           this.activateWind(direction); 
        }
   
    }

    activateWind(direction){
        this.scene.windActive = true;
        if(direction == "left"){
            this.scene.windDirection = "left"; 
            this.scene.windVelocity = -this.scene.maxWindVelocity;
        }else{
            this.scene.windDirection = "right"; 
            this.scene.windVelocity = this.scene.maxWindVelocity; 
        }
        this.scene.windEmitter.start(); 
       
    }

    stopWind(){
        this.scene.windActive = false; 
        this.scene.windVelocity = 0; 
        this.scene.windEmitter.stop(); 
    }

    savePosition(point){
        this.lastSaveX = point.x;
        this.lastSaveY = point.y;      
    }


    respawn(){
        this.explodeEmitter.explode(); 
        this.disableBody();
        this.setAlpha(0);
        this.scene.time.delayedCall(70, () => {
            this.setAlpha(0);
        }, this);
        this.scene.time.delayedCall(500, () => {
            this.setAlpha(1);
            this.enableBody();
            this.setAlpha(1); 
            this.body.reset(this.lastSaveX, this.lastSaveY); 
            this.scene.movingPlatforms.children.each(function(platform) {

            platform.reset(); 
   
               }, this); 
        }, this);

        
    }

    bounceHit(){
        if(this.body.touching.right){
            this.setVelocityX(-this.bounceVelocity);
        }else{
            this.setVelocityX(this.bounceVelocity);
        }
        
        this.setVelocityY(-this.bounceVelocity);

    }

    getHit(damages){
        if(!this.isHit){
            this.isHit = true;
            this.cantMove = true; 
            this.bounceHit();
            const tweenBounceAnim = this.playDamageTween(); 

            this.hp -= damages;
            
            this.scene.time.delayedCall(500, () => {
                this.cantMove = false;  
            });

            this.scene.time.delayedCall(1500, () => {
                this.isHit = false;
                tweenBounceAnim.stop(); 
                this.clearTint(); 
            });

            //  Event à passer dans la scène UI
            this.scene.events.emit('loseHp', this.hp);

        }
    }

    getDragged(caster, player){
       player.cantMove = true;
       player.setAlpha(0.4);
       player.scene.physics.moveToObject(player, caster, 100); 
    //    player.scene.tweens.add({
    //         targets: player,
    //         x: caster.x,
    //         // y: caster.y,
    //         duration: 800,
    //         ease: 'Power2',
             
    //     });
       setTimeout(() => {
        player.cantMove = false;
        player.setAlpha(1);
       }, 50);
    }


    playDamageTween(){
        return this.scene.tweens.add({
            targets: this,
            duration: 100,
            repeat: 10,
            tint: 0xffffff
        })
    }


}

export default Player;