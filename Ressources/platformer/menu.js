class menu extends Phaser.Scene {
    constructor() {

        super("menu");
    }
    preload() {
        this.load.image('ecran', 'assets/ecran_titre.png');
     
        
    }
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();

        const startSpace = Phaser.Input.Keyboard.JustDown(this.cursors.space);
        this.add.image(640, 360, 'ecran'); 

   
        
    }

    update() {
        //LANCE PREMIERE SCENE QUAND ESPACE APPUYE
        if(Phaser.Input.Keyboard.JustDown(this.cursors.space)){
            this.scene.start("village_scene", {
                x : 1200, 
                y : 1300, 
                currency: 0,
                hp: 3, 
                dir: "down", 
                baton: false,
                edelweiss: false,
                hache: false,
                bonbons: false,
                gelee: false,
                quest: false, 
                recette: false, 
                anims : ["run_left","run_up","run_right","run_down","idle_left","idle_up","idle_right","idle_down"],
            });
        }
    }

   
    
};