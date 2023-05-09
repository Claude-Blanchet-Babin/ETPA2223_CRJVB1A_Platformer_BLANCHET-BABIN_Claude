

export default {

    addCollider(object, callback){
        this.scene.physics.add.collider(this, object, callback, null, this);
    },

    addOverlap(object, callback){
        this.scene.physics.add.overlap(this, object, callback, null, this);
    },

    addOverlapOnce(object, callback){
        const overlap = this.scene.physics.add.overlap(this, object,
            () => {callback();
            overlap.active = false;
        }
            , null, this);
    }, 

    bodyPositionDiff: 0,
    prevRay: null,
    prevIsHitting: null, 

    raycast(body, layer,  raylength, precision, angle){
        const {x, y, width, height} = body;


        this.bodyPositionDiff += body.x - body.prev.x; 

        //Amélioration de la performance : ne recalcule un ray et isHitting que si l'objet a parcouru une distance > au paramètre precision. Renvoie au lieu de cela les précédents ray et isHitting
        if((Math.abs(this.bodyPositionDiff) <= precision) && this.prevIsHitting != null){
            return {
                ray: this.prevRay,
                isHitting : this.prevIsHitting
            }
        }

        const line = new Phaser.Geom.Line();
        let isHitting = false; 

        // Change direction du raycast en fonction de la direction de l'objet
        switch(body.facing){
            case Phaser.Physics.Arcade.FACING_RIGHT:{
                line.x1 = x + width;
                line.y1 = y + height/2;
                line.x2 = line.x1 + raylength * angle ;
                line.y2 = line.y1 + raylength ;
                break;
            }
            case Phaser.Physics.Arcade.FACING_LEFT:{
                line.x1 = x; 
                line.y1 = y + height/2;
                line.x2 = line.x1 - raylength * angle ;
                line.y2 = line.y1 + raylength;
                break; 
            }
        }


     
       const hits = layer.getTilesWithinShape(line);

    
        if(hits.length > 0){
            isHitting = this.prevIsHitting = hits.some(hit => hit.index != -1); //Itère parmis les différentes tiles touchés par le raycast et return true si l'une d'elles a un index
        }
   

        this.prevRay = line; 
        this.bodyPositionDiff = 0; 

        return { ray : line, isHitting};  
    }


}