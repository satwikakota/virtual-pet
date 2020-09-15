class Food{
    constructor(){ 
        this.foodStock=0
        this.lastFed;
        this.image=loadImage("images/Milk.png");
    }
    getFoodStock(){
        return this.foodStock;
    }
    updateFoodStock(stock){
        this.foodStock=stock;
    }
    bedroom(){
        background(bedroomIMG,550,500);
    }
    garden(){
        background(gardenIMG,550,500);
    }
    washroom(){
        background(washroomIMG,550,500);
    }

    
    display(){
        imageMode(CENTER);
        image(this.image,720,200,70,70);
        var x=80;
        var y=100;
        if(this.foodStock != 0){
            for(var i=0; i<this.foodStock; i=i+1){
                if(i%10 == 0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+20;
            }
        }
    }
}