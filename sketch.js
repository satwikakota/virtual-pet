var dog,happyDog,foodS,foodStock;
var database;
var dogIMG,dogPNG,dogIMG1PNG,happyDogpng;
function preload()
{
  dogIMG=loadImage("images/dogImg.png");
  dogPNG=loadImage("images/Dog.png");
  dogIMG1PNG=loadImage("images/dogImg1.png");
  happyDogpng=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(250,250, 10,10);
  dog.addImage("dog1",dogIMG);
  dog.addImage("happy",happyDogpng);
  dog.scale=0.2;
  database=firebase.database();
  var foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}


function draw() {  
  background(46, 139, 87);
  if(foodS != undefined){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeImage("happy",happyDogpng);
}
  drawSprites();
  textSize(20);
  fill("white");
  text("foodStock remaining: "+foodS,200,50);
}
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x <=0){
    x=0
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

