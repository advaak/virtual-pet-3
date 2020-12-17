//Create variables here
var doghappy, dogsad, dog;
var db;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;
var gamestate, readState;
var bedroom, garden, washroom, currentTime;
function preload()
{
  //load images here
  dogsad = loadImage("images/dogImg.png");
  doghappy = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
}

function setup() {
	createCanvas(500, 500);
  db = firebase.database();
  foodObj = new Food();

  readState = db.ref('gamestate');
  readState.on("value", function(data){
    gamestate=data.val();
  });

  dog = createSprite(250,300, 100,100);
  dog.addImage(dogsad);
  dog.scale =0.1;

  foodStock = db.ref('Food');
  foodStock.on("value", readStock);

  feed = createButton("Feed The Dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

  fedTime= db.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
currentTime = hour();
if(currentTime==(lastFed+1)){
  update("playing");
  foodObj.garden();
}
else if(currentTime == lastFed+2){
  update("sleeping");
  foodObj.bedroom();
}
else if(currentTime > lastFed+2 && currentTime<=lastFed+4){
  update("bathing")
  foodObj.washroom();
}
else {
  update("hungry");
  foodObj.display();
}




  drawSprites();
  //add styles here

  if (gamestate != "hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else{
    feed.show();
    addFood.show();
    dog.addImage(dogsad)
  }

}


function readStock(data){
foodS = data.val();
foodObj.updateFoodStock(foodS);
}

function addFoods(){
  foodS++;
  db.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(doghappy);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  db.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function update(state){
  db.ref('/').update({
    gamestate:state
  })
}
