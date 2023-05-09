import "../data/dialogs_data.js"
import { getDialogs } from "../data/dialogs_data.js";

class DialogueSystem extends Phaser.Scene{

    constructor(config){
        super("DialogueSystem");
        this.config = config; 
    }
    
    init(data){ 
        this.nbDialog = data.nbDialog; //Numéro du dialogue à lancer, récupéré de la scène de jeu
        this.sceneNameData = data.currentScene;
        this.currentChoice = data.currentHero; //Garde en mémoire le personnage selectionné, quand la scène en cours est resume
    }

    create(){
        this.scene.bringToTop(); 

        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.SCREEN_WIDTH = this.config.width;
        this.SCREEN_HEIGHT = this.config.height;

        this.dialogBox = this.physics.add.sprite(this.SCREEN_WIDTH/2 , this.SCREEN_HEIGHT/2 + 200, "dialogUI").setScrollFactor(0); 
        this.dialogueText = this.add.text(this.SCREEN_WIDTH/2 - 180, this.SCREEN_HEIGHT/2 + 120, 'Dialogue ici', { fontSize: '20px', color:"black"});
        this.dialogueName = this.add.text(this.SCREEN_WIDTH/2 - 370, this.SCREEN_HEIGHT/2 + 120 , 'Dialogue ici', { fontSize: '40px', color:"black",  fontStyle:"bold"});
        this.dialogueAvatar = this.physics.add.sprite(this.SCREEN_WIDTH/2 - 420 , this.SCREEN_HEIGHT/2 + 120, "dialog_sun").setOrigin(0).setScale(3);

        

        this.currentDialog = getDialogs()[this.nbDialog]; 
        this.dialogStep = 0; 
        this.soloStep = 0; 

        this.dialogueName.setText(this.currentDialog[this.dialogStep].name); 
        this.typewriteText(this.currentDialog[this.dialogStep].words[this.soloStep]);
        this.dialogueAvatar.setTexture(this.currentDialog[this.dialogStep].avatar);

    }


    update(){
        const {left, right, up, down, space} = this.cursors;
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space); 

        if(isSpaceJustDown){
            this.nextLine();
        }
      
    }

    nextLine(){
        //Check si la taille du texte en cours d'écriture est inférieure au texte final, et set le texte final 
        if(this.dialogueText.text.length < this.currentDialog[this.dialogStep].words[this.soloStep].length ){
            this.timerText.remove(); //arrete le timer d'écriture automatique
            this.dialogueText.text = "";  //reset l'affichage de la boite de dialogue
            this.dialogueText.setText(this.currentDialog[this.dialogStep].words[this.soloStep]);
        }else{ // Sinon on passe au dialogue suivant
            this.soloStep += 1;

            if(this.currentDialog[this.dialogStep].words.length > this.soloStep){ //Check si un personnage a encore des lignes de dialogue

                this.typewriteText(this.currentDialog[this.dialogStep].words[this.soloStep]);

            }else{ //Sinon on passe au prochain personnage 
                this.soloStep = 0; 
                this.dialogStep += 1; 
                if(this.currentDialog.length > this.dialogStep){
                    this.dialogueName.setText(this.currentDialog[this.dialogStep].name); 
                    this.typewriteText(this.currentDialog[this.dialogStep].words[this.soloStep]);
                    this.dialogueAvatar.setTexture(this.currentDialog[this.dialogStep].avatar);
                }else{ // On ferme la scène dialogue si la totalité a été lue 
                    this.scene.resume(this.sceneNameData, {chosenHero : this.currentChoice});
                    this.scene.stop();
                }
            }  
        }
        
        
    }

    //Affiche le texte progressivement
    typewriteText(text){
        this.dialogueText.text = ""; 
        const length = text.length
        let i = 0
        this.timerText = this.time.addEvent({
            callback: () => {
                this.dialogueText.text += text[i]
                ++i
            },
            repeat: length - 1,
            delay: 50,


    })
    }

}

export default DialogueSystem;