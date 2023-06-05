export class menu extends Phaser.Scene{
    constructor(){
        super("menu");
    }

    preload(){

        // chargement du son
        this.load.audio("atterrir","asset/son/atterrir.mp3");
        this.load.audio("carburant","asset/son/carburant.mp3");
        this.load.audio("dammage","asset/son/dammage.mp3");
        this.load.audio("destruction","asset/son/destruction.mp3");
        this.load.audio("loot","asset/son/loot.mp3");
        this.load.audio("lootbox","asset/son/lootbox.mp3");
        this.load.audio("mouvement","asset/son/mouvement.mp3");
        this.load.audio("musique","asset/son/musique.mp3");
        this.load.audio("musique_tableau","asset/son/musique_tableau.mp3");
        this.load.audio("musique_titre","asset/son/musique_titre.mp3");
        this.load.audio("musique_victoire","asset/son/musique_victoire.mp3");
        this.load.audio("shoot","asset/son/shoot.mp3");
        this.load.audio("transformation","asset/son/transformation.mp3");
        this.load.audio("vol","asset/son/vol.mp3");

        //ici le code de la fonction preload
        this.load.image('menu', 'asset/ecran/menu.png');
        this.load.image('play', 'asset/ecran/play.png');
        this.load.image('option', 'asset/ecran/option.png'); 
        this.load.image('quit', 'asset/ecran/quitter.png'); 
    }

    create(){

        this.atterrir=this.sound.add("atterrir",{loop:false});
        this.carburant=this.sound.add("carburant",{loop:false});
        this.dammage=this.sound.add("dammage",{loop:false});
        this.destruction=this.sound.add("destruction",{loop:false});
        this.loot=this.sound.add("loot",{loop:false});
        this.lootbox=this.sound.add("lootbox",{loop:false});
        this.mouvement=this.sound.add("mouvement",{loop:false});
        this.music = this.sound.add("musique",{loop:true});
        this.music_tableau=this.sound.add("musique_tableau",{loop:true});
        this.music_titre=this.sound.add("musique_titre",{loop:true});
        this.music_victoire=this.sound.add("musique_victoire",{loop:false});
        this.shoot=this.sound.add("shoot",{loop:false});
        this.transform = this.sound.add("transformation",{loop:false});
        this.vol=this.sound.add("vol",{loop:false});

        this.music_titre.play();
        this.music_titre.setVolume(0.7);

        //ici le code de la fonction create
        this.add.image(960, 540, 'menu');
        var boutonPlay = this.add.image(960, 850, 'play').setInteractive();
        //this.add.image(300, 950, 'option');
        //this.add.image(1600, 950, 'quit');

        boutonPlay.once('pointerup',this.sceneOverworld,this);
    }

    update(){
        //ici le code de la fonction update      
    }

    sceneOverworld(){
        this.music_titre.stop();
        this.scene.start("overworld")
    }

};