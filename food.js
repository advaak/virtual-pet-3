class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.Image = loadImage("images/Milk.png");

    }
    updateFoodStock(f){
        this.foodStock=f;

    }
    getFedTime(last){
        this.lastFed = last;
    }
    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;

        }
    }
    getFoodStock(){
        return this.foodStock;
    }
    display(){
        background(46,139,87);
        textSize(15);
fill(255,255,254);
if(lastFed>=12){
  text("Last Feed : " + lastFed%12 +"PM", 50, 30);
}
else if(lastFed ==0){
  text("Last Feed : 12AM", 50,30)

}
else{
  text("Last Feed:"+ lastFed+"AM", 50,30);
}
        var x = 80
        var y = 200
        imageMode(CENTER);
        image(this.Image, 720,220, 70, 70)

        if(this.foodStock!=0){
            for(var i = 0; i < this.foodStock; i++){
                if(i%10 == 0){
                    x = 80;
                    y = y+50;
                }
                image(this.Image, x, y, 50, 50)
                x = x+30;
            }

        }
    }
    bedroom(){
        background(bedroom, 550, 500);
    }
    washroom(){
        background(washroom, 550, 500);
    }
    garden(){
        background(garden, 550, 500);
    }
}
