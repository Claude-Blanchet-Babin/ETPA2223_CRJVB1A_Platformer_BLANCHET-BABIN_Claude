import Player from "../entities/Player.js";
import Enemy from "../entities/Enemy.js";
import Tornado from "../entities/Tornado.js";
import TCloud from "../entities/ThunderCloud.js";
import STCloud from "../entities/StaticThunderCloud.js";
import Caster from "../entities/CasterEnemy.js";
import ProtectedEnemy from "../entities/ProtectedEnemy.js";
import MovingPlatform from "../entities/MovingPlatform.js";
import Plant from "../entities/Plant.js";
import FirePlace from "../entities/FirePlace.js";
import WindParticle from "../entities/WindParticles.js";



class Play extends Phaser.Scene{

    constructor(config){
        super("PlayScene");
        this.config = config;  
    }
    
    init(data){
        this.player_heroes_available = data.heroes_available;
        this.player_current_hero = data.current_hero;
        this.player_hp = data.hero_hp; 
    }

    create(){
        //Dimensions de la scène actuelle (déterminée dans Tiled)
        this.SCREEN_WIDTH = this.config.width;
        this.SCREEN_HEIGHT = this.config.height;
        this.MAP_WIDTH = 960;
        this.MAP_HEIGHT = 640; 
        this.zoom = this.config.zoomFactor; 
        this.sceneName = this.add.systems.config; //Récupère le nom de la scène, pour garder en mémoire pour savoir quelle scène resume quand dialogue ou chara swap


        this.physics.add.sprite(0,0, "bg").setOrigin(0).setScrollFactor(0).setDepth(-10); 
   
        


        //Creation de la scene : map + layers
        const map = this.createMap();  
        const bg = this.createBG(map); 
        const layers = this.createLayers(map); 
        const playerPoints = this.getPlayerPoints(layers.playerPoints); 
        const endZone = this.createEnd(playerPoints.end); 
        const dialogsPoints = this.createDialogsPoints(layers.dialog_points); 
 

        //Creation joueur
        this.player = this.createPlayer(playerPoints); 

       
        //ajout colliders au joueur
        this.player.addCollider(layers.layer_ground); 
        this.player.addOverlap(endZone,this.endLevel); 
        this.physics.add.overlap(this.player, dialogsPoints, this.startDialog, null, this); 


      

         //Creation enemies
         const enemies = this.createEnemies(layers.enemiesSpawns, layers.layer_ground); //On passe aussi les plateformes en paramètres pour gérer le raycasting
         //ajout colliders aux ennemies
         this.physics.add.collider(enemies, layers.layer_ground);
         this.physics.add.collider(enemies, this.player, this.onPlayerCollision);
         this.physics.add.collider(enemies, this.player.projectiles, this.onProjectileCollision);
         this.physics.add.overlap(enemies, this.player.windBox, this.onWindOverlap, null, this);
         this.physics.add.collider(this.player, this.player.projectiles, this.onProjectileCollision);

        


         
         const myCheckpoints = this.createCheckpoint(layers.checkPointsLayer); 
         this.physics.add.overlap(this.player, myCheckpoints, this.onCheckpointCollision);

         const movingPlatforms = this.createMovingPlatforms(layers.layer_platforms); 
         this.physics.add.collider(this.player, movingPlatforms);
         this.physics.add.overlap(this.player.auraBox, movingPlatforms, this.onAuraOverlap);

         this.plants = this.createPlants(layers.layer_plants); 

         this.firePlaces = this.createFirePlaces(layers.layer_fires); 
         
     
        //WIND FORCE
        this.windActive = false; 
        this.windDirection = "right"; 
        this.maxWindVelocity = 60; 
        this.windVelocity = 0; 

        this.windedLeafParticles = this.add.particles('leaf');
        this.windEmitter = this.windedLeafParticles.createEmitter({
            
            x: 0,
            y: 0,
            emitZone:{
                source : new Phaser.Geom.Rectangle(-10, -this.SCREEN_HEIGHT, 10, this.SCREEN_HEIGHT*3),
                type: "random",
            },
            lifespan: 20000,
            speedX: { min: this.maxWindVelocity - 20 , max: this.maxWindVelocity + 20 },
            scale: { start: 0.8, end: 1 },
            particleClass: WindParticle, 
            quantity : 1, 
            rotate: {min: -20, max : 20}, 
            frequency: 50, 
            follow : this.player,
            followOffset: {x: -this.SCREEN_WIDTH/2/this.zoom , y: -this.SCREEN_HEIGHT/2/this.zoom },
            on:  false, 
           
            
        });
        this.windEmitter.scene = this; 

        
      
        //  this.light = this.lights.addLight(this.player.x, this.player.y, 70).setIntensity(3); 
        //  this.lights.enable().setAmbientColor(0x555555);
         

        //ENVIRONNEMENT DE TEST
        //let { width, height } = this.sys.game.canvas;
    
        // for(var i = 0; i < this.MAP_WIDTH; i = i + 16){
        //     this.add.line(0, 0, i, 0, i, this.MAP_HEIGHT, 0x00ff00, 0.1).setOrigin(0); 
        // }
        // for(var y = 0; y < this.MAP_HEIGHT; y = y + 16){
        //     this.add.line(0, 0, 0, y, this.MAP_WIDTH, y, 0x00ff00, 0.1).setOrigin(0); 
        // }

        this.playerHV = this.add.text(470, 270,  ";" ).setScrollFactor(0); 
        this.currentPlayer = this.add.text(520, 270,  ";" ).setScrollFactor(0); 



        //FIN ENVIRONNEMENT DE TEST

        //Limites monde et caméra
        this.cameras.main.setBounds(0,0, this.MAP_WIDTH, this.MAP_HEIGHT); 
        this.cameras.main.setZoom(this.zoom); 
        this.cameras.main.startFollow(this.player); 
        this.cameras.main.followOffset.y =  10; 
        this.physics.world.setBounds(0, 0, this.MAP_WIDTH, this.MAP_HEIGHT);

        
        
    }


    finishDrawing(pointer, layer){
        
        this.raycastLine.x2 = pointer.worldX;
        this.raycastLine.y2 = pointer.worldY;
        this.graphics.clear(); 
        this.graphics.lineStyle(1,0x00ff00, 1);
        this.graphics.strokeLineShape(this.raycastLine); 

        this.tileHits = layer.getTilesWithinShape(this.raycastLine); 

        if(this.tileHits.length > 0){
            this.tileHits.forEach(tile => {
                if(tile.index != -1){
                   tile.setCollision(false);   
                }
            });
        }

        this.drawDebug(layer); 
        this.isDrawing = false; 
    }

    onPlayerCollision(enemy, player){
        player.getHit(enemy.damages); 
    }

    onProjectileCollision(enemy, projectile){
        enemy.getHit(projectile); 
        projectile.hit(enemy); 
    }

    onAuraOverlap(aura, platform){
        if(aura.active){
            platform.setActive(); 
        }else{
            platform.setInactive();
        }
    }

    onWindOverlap(enemy, wind){
        
        if(this.windActive && enemy.protected){
            enemy.loseProtection(); 
        }
    }

    


    //Creation de la map
    createMap(){
        const map = this.make.tilemap({key: "map_playground"});
        map.addTilesetImage("tileset", "tileset"); //Le premier est le nom du tileset sous Tiled et dans jSon, le deuxième est la clé du png utilisé

        return map; 
    }

    createBG(map){
        const bgObject = map.getObjectLayer("bg").objects[0];
        this.add.tileSprite(bgObject.x, bgObject.y, this.config.width, bgObject.height, "bg_test")
        .setDepth(-8)
        .setOrigin(0,1)
        .setScrollFactor(0.3, 0.6); 

        const bgObject2 = map.getObjectLayer("bg").objects[1];
        this.add.tileSprite(bgObject2.x, bgObject2.y, this.config.width, bgObject2.height, "bg_test2")
        .setDepth(-7)
        .setOrigin(0,1)
        .setScrollFactor(0.5, 0.8); 

        const bgObject3 = map.getObjectLayer("bg").objects[2];
        this.add.tileSprite(bgObject3.x, bgObject3.y, this.config.width, bgObject2.height, "bg_test3")
        .setDepth(-9)
        .setOrigin(0,1)
        .setScrollFactor(0.1, 0.4); 
    }

    //Creation des layers
    createLayers(map){
        const tileset = map.getTileset("tileset"); //Accède au tileset de la tilemap
        const layer_decor_bg_loin = map.createLayer("decor_bg_loin", tileset);
        layer_decor_bg_loin.setDepth(-4); 
        const layer_decor_bg = map.createLayer("decor_bg", tileset);
        layer_decor_bg.setDepth(-2); 
        const layer_ground = map.createLayer("ground", tileset); //Un layer peut etre fait avec plusieurs tileset
        const layer_decor = map.createLayer("decor", tileset);
        const layer_decor_fg = map.createLayer("decor_fg", tileset);
        layer_decor_fg.setDepth(4); 
        const playerPoints = map.getObjectLayer('player_points');
        
        const enemiesSpawns = map.getObjectLayer("ennemies_points");

        const checkPointsLayer = map.getObjectLayer('checkpoints');

        const layer_platforms = map.getObjectLayer("moving_platforms"); 

        const layer_plants = map.getObjectLayer("plants_points"); 

        const layer_fires = map.getObjectLayer("fire_points"); 

        const dialog_points = map.getObjectLayer("dialogs_points"); 

        layer_ground.setCollisionByExclusion(-1, true); 

        return {layer_decor_bg_loin , layer_decor_fg, layer_decor_bg, layer_decor, layer_ground, playerPoints, enemiesSpawns, checkPointsLayer, layer_platforms, layer_plants, layer_fires, dialog_points}; 
    }

    createPlayer(playerPoints){
        //Recréé le joueur dans la scène en lui passant des propriétés qu'il garde de scène en scène (liste heros, hero actuel, hp)
        return new Player(this, playerPoints.start.x, playerPoints.start.y, this.player_heroes_available, this.player_current_hero, this.player_hp);
    }

    getPlayerPoints(layer){
        const playerPoints = layer.objects;
        return {
            start: playerPoints[0],
            end: playerPoints[1]
        }
    }

    createEnd(end){
        const endLevel = this.physics.add.sprite(end.x, end.y, 'none')
            .setOrigin(0,0)
            .setAlpha(0)
            .setSize(5, this.MAP_HEIGHT*2); 
        if(end.properties[0]){
            endLevel.nextZone = end.properties[0].value; 
        }
        return endLevel; 
    }

    createDialogsPoints(layer){
        
        const groupDialogPoints = new Phaser.GameObjects.Group; 

        layer.objects.forEach(dialogPoint => {
            const dialog = this.physics.add.sprite(dialogPoint.x, dialogPoint.y, 'none')
            dialog.setAlpha(0)
            dialog.setSize(5, 100); 

            dialog.nb = dialogPoint.properties[0].value;  //Attribution d'un numéro de dialogue à un triggerbox, par Tiled     
            
            if(dialogPoint.properties[1]){
                dialog.activation = dialogPoint.properties[1].value;   //Attribution d'une propriété "personnage débloqué" aux dialogues concernés
            }

            groupDialogPoints.add(dialog); 
        }); 

        return groupDialogPoints; 
    }

    createEnemies(layer, platformsLayer){
        const enemies = new Phaser.GameObjects.Group; 

        
        layer.objects.forEach(spawn => {
            let enemy = null; 
            if(spawn.type == "Tornado"){
                enemy = new Tornado(this,spawn.x, spawn.y, spawn.properties[0].value, spawn.properties[1].value );  
            }else if(spawn.type == "Cloud"){
                enemy = new TCloud(this,spawn.x, spawn.y);
                enemy.detectionBox.addOverlap(this.player, () => {enemy.setTarget(this.player), this});     
                enemy.attackBox.addOverlap(this.player, this.onPlayerCollision);     
            }else if(spawn.type == "StaticCloud"){
                enemy = new STCloud(this,spawn.x, spawn.y);    
                enemy.attackBox.addOverlap(this.player, this.onPlayerCollision);     
            }else if(spawn.type == "Caster"){
                enemy = new Caster(this,spawn.x, spawn.y, spawn.properties[0].value, spawn.properties[1].value, spawn.properties[2].value);     
            }else if(spawn.type == "Protected"){
                enemy = new ProtectedEnemy(this,spawn.x, spawn.y ,  spawn.properties[0].value, spawn.properties[1].value );    
            }  

            enemy.setPlatformColliders(platformsLayer); 
            enemies.add(enemy); 
            
        }); 

        return enemies ; 
    }

    createMovingPlatforms(layer){
        const platforms = new Phaser.GameObjects.Group; 
        
        layer.objects.forEach(pltf => {
            let platform = new MovingPlatform(this, pltf.x, pltf.y, pltf.properties[0].value, pltf.properties[1].value, pltf.properties[2].value);  
            platforms.add(platform); 
            
        }); 

        return platforms; 
    }

    createPlants(layer){
        const plants = new Phaser.GameObjects.Group; 
        
        layer.objects.forEach(plt => {
            let plant = new Plant(this, plt.x, plt.y, plt.properties[0].value); 
            plants.add(plant);      
        }); 

        return plants; 
    }

    createFirePlaces(layer){
        const fires = new Phaser.GameObjects.Group; 
        
        layer.objects.forEach(fr => {
            let fire = new FirePlace(this, fr.x, fr.y); 
            fires.add(fire);      
        }); 

        return fires; 
    }

    checkPlantsWatered(particle){
        this.plants.children.each(function(plant) {
            if((particle.x > plant.x && particle.x < plant.x + plant.width) && (particle.y > plant.y && particle.y < plant.y + plant.height) ){
                particle.lifeCurrent = 0; 
                plant.grow();  
            }
        }, this);
    }

    checkFirePlaceWatered(particle){
        this.firePlaces.children.each(function(fire) {
            if((particle.x > fire.x && particle.x < fire.x + fire.width) && (particle.y > fire.y && particle.y < fire.y + fire.height) ){
                particle.lifeCurrent = 0; 
                fire.extinguish();  
            }
        }, this);
    }

    checkPlayerBurned(particle){
        if((particle.x > this.player.x- this.player.width/2 && particle.x < this.player.x + this.player.width/2) && (particle.y > this.player.y && particle.y < this.player.y + this.player.height/2) ){
            this.player.getHit(10); 
        }
    }


    createCheckpoint(layer){
        const groupCheckpoint = new Phaser.GameObjects.Group; 

        layer.objects.forEach(checkpoint => {
            const cp = this.physics.add.sprite(checkpoint.x, checkpoint.y, 'none')
            cp.setOrigin(0,0)
            cp.setAlpha(0)
            cp.setSize(5, 2000); 
           

            groupCheckpoint.add(cp); 
        })

        return groupCheckpoint; 
    }

    onCheckpointCollision(player, checkpoint){
        player.savePosition(checkpoint);
    }

   
    endLevel(player, endPoint){
        player.scene.scene.start(endPoint.nextZone, {
            heroes_available: player.listeHeros,
            current_hero : player.currentHeroIndex ,
            hero_hp : player.hp 
        });  
    }

    startDialog(player, dialogPoint){
        this.scene.launch('DialogueSystem',{
            nbDialog : dialogPoint.nb,  //Passage de l'information du numéro du dialogue à jouer, à la scène dialogue
            currentScene : this.sceneName,
            currentHero: this.player.currentHeroIndex
        }); 
        this.scene.pause();

        if(dialogPoint.activation){ //Certains dialogues débloquent les personnages, si ils ont la propriété, ajoute le personnage en question à la classe joueur
            this.player.addCharacter(dialogPoint.activation); 
        }

        dialogPoint.destroy(); 
    }

   
    update(){
        //ENVIRONNEMENT DE TEST
        //Position joueur en tiles
       let playerH = Math.round(this.player.x/16);
       let playerV = Math.round(this.player.y/16);
       this.playerHV.setText(playerH + ";" + playerV);
       this.currentPlayer.setText(this.player.currentHero);

       //Update wind particles emitter position
       if(this.windDirection == "right"){ 
            this.windEmitter.startFollow(this.player, -this.SCREEN_WIDTH/2/this.zoom, -this.SCREEN_HEIGHT/2/this.zoom);
            this.windEmitter.setSpeedX({ min: this.maxWindVelocity*2 - 40 , max: this.maxWindVelocity*2 + 40 });
       }else{
            this.windEmitter.startFollow(this.player, this.SCREEN_WIDTH/2/this.zoom, -this.SCREEN_HEIGHT/2/this.zoom);
            this.windEmitter.setSpeedX({ min: -this.maxWindVelocity*2 + 40 , max: -this.maxWindVelocity*2 - 40 });
       }

      
    //    this.light.x = this.player.x;
    //    this.light.y = this.player.y;

        //FIN ENVIRONNEMENT DE TEST
    }

}

export default Play;