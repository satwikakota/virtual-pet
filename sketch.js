var dog,happyDog,foodS,foodStock;
var database;
var dogIMG,dogPNG,dogIMG1PNG,happyDogpng;
var petButton, foodButton, fedTime, lastFed, foodObj; 
var feedDog;
var changingGameState, readingGameState;
var bedroomIMG,gardenIMG,washroomIMG;
var gameState;
var feed;
function preload()
{
  dogIMG=loadImage("images/dogImg.png");
  dogPNG=loadImage("images/Dog.png");
  dogIMG1PNG=loadImage("images/dogImg1.png");
  happyDogpng=loadImage("images/happydog.png");
  bedroomIMG=loadImage("images/virtual pet images/Bed Room.png");
  gardenIMG=loadImage("images/virtual pet images/Garden.png");
  washroomIMG=loadImage("images/virtual pet images/Wash Room.png");
  dogChange=loadImage("images/virtual pet images/deadDog.png");
}

function setup() {
  createCanvas(1500,700);
  dog=createSprite(800,250, 10,10);
  dog.addImage("dog1",dogIMG);
  dog.addImage("happy",happyDogpng);
  dog.addImage("images/virtual pet images/deadDog.png",dogChange);
  dog.scale=0.2;
  database=firebase.database();
  var foodStock=database.ref('foodStock');
  foodStock.on("value",readStock);
  food1=new Food();
  feed=createButton("Feed the Dog");
  feed.position(1000,50); 
  feed.mousePressed(feedDog);
  addButton=createButton("Add Food");
  addButton.position(1100,50); 
  addButton.mousePressed(addFood);
  database.ref('gameState').on("value",function(data){
    gameState=data.val(); 
  })
}


function draw() {  
  background(46, 139, 87);
  food1.display();
  console.log(gameState);
  var currenttime=hour();
  if(currenttime==(lastFed+1)){
    food1.garden();
    update("Playing");
  
  }else if(currenttime==(lastFed+2)){
    food1.bedroom();
    update("Bedroom");
  }else if(currenttime>(lastFed+2) && currenttime<=(lastFed+4) ){
    food1.washroom();
    update("Bathing");
  }else{
    update("Hungry");
    food1.display();
  }
  drawSprites();
  text(mouseX+","+mouseY,mouseX,mouseY);
  textSize(20);
  fill("white");
  text("foodStock remaining: "+foodS,200,50);
  database.ref("foodTime").on("value",function(data){
    lastFed=data.val();
  })
  if(lastFed>12){
    text("Last Fed: "+lastFed%12+"PM",700,50);
  }
  else if(lastFed==0){
    text("Last Fed: 12 AM",700,50);
  }
  else{
  text("Last Fed: "+lastFed +"AM",700,50);
}
if(gameState!="Hungry"){
  feed.hide();
  addButton.hide();
  dog.remove();
}else{
  feed.show();
  addButton.show();
  dog.changeImage("images/virtual pet images/deadDog.png",dogChange);
}
}

function readStock(data){
  foodS=data.val();
  food1.updateFoodStock(foodS);
}
function writeStock(x){
  if(x <=0){
    x=0
  }else{
    x=x-1;
  }
  database.ref('/').update({
    foodStock:x
  })
}
function feedDog(){
  dog.changeImage("happy",happyDogpng);
  if(foodS>0){
    food1.updateFoodStock(food1.getFoodStock()-1);
    database.ref("/").update({
      foodStock:food1.getFoodStock(),
      foodTime:hour()
    })
  }
  else{
    alert("THERE IS NO FOOD,DOG WILL DIE");
  }
}
function addFood(){
  foodS++
  database.ref("/").update({
    foodStock:foodS
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}