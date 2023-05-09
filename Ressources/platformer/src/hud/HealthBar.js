class HealthBar{

    constructor(scene,x,y,health){
        this.bar = new Phaser.GameObjects.Graphics(scene); 
        this.bar.setScrollFactor(0,0); 
        this.x = x;
        this.y = y;
        this.value = health; 

        this.size = {
            width: 40,
            height: 10
        }

        this.pixelPerHP = this.size.width / this.value; 

        scene.add.existing(this.bar); 
        this.draw(this.x, this.y); 
    }

    decrease(amount){
        this.value = amount; 
        this.draw(this.x, this.y); 
    }

    draw(x, y){
        this.bar.clear(); 
        const {width, height} = this.size;
        const color = "0x61cf7c";
        const lowColor = "0xd93646";
        const margin = 2; 

        //BORDER
        this.bar.fillStyle(0x27046b);
        this.bar.fillRect(x, y, width, height); 

        //BACKGROUND
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(x + margin, y + margin, width - margin*2, height - margin*2); 

        const healthWidth =  Math.floor(this.value * this.pixelPerHP); 

        //ACTUAL HEALTH
        if(healthWidth <= this.size.width/3){
            this.bar.fillStyle(lowColor);
        }else{
            this.bar.fillStyle(color);
        }
      
        if(healthWidth > 0){
            this.bar.fillRect(x + margin, y + margin, healthWidth - margin*2, height - margin*2); 
        }

    }

}

export default HealthBar;