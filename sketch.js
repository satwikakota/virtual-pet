var dog,happyDog,foodS,foodStock;
var database;
var dogIMG,dogPNG,dogIMG1PNG,happyDogpng;
var petButton, foodButton, fedTime, lastFed, foodObj; 
var feedDog;
function preload()
{
  dogIMG=loadImage("images/dogImg.png");
  dogPNG=loadImage("images/Dog.png");
  dogIMG1PNG=loadImage("images/dogImg1.png");
  happyDogpng=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(1500,500);
  dog=createSprite(800,250, 10,10);
  dog.addImage("dog1",dogIMG);
  dog.addImage("happy",happyDogpng);
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

}


function draw() {  
  background(46, 139, 87);
  food1.display();
  drawSprites();
  text(mouseX+","+mouseY,mouseX,mouseY);
  textSize(20);
  fill("white");
  text("foodStock remaining: "+foodS,200,50);
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
  food1.updateFoodStock(food1.getFoodStock()-1);
  database.ref("/").update({
    foodStock:food1.getFoodStock(),
    foodTime:hour()
  })
}
function addFood(){
  foodS++
  database.ref("/").update({
    foodStock:foodS
  })
}