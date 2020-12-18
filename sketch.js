var plr,enemy1,enemy2,bullet,bulletgrp,enemygrp,booster,coinimags
var score = 0

var life = 3
var coinscore = 0
var gameState = "fight"
var heart1,heart2,heart3

function preload(){
  guny = loadAnimation("images/gun1.png","images/gun4.png","images/gun3.png")
  gun = loadImage("images/gun1.png")
  bullt = loadImage("images/bullet.jpg")
  monst = loadImage("images/download1.png")
  poisonimg = loadImage("images/poison.jpg")
  bg = loadImage("images/download2.jpg")
  lost = loadImage("images/you lost.jpg")
  coinimag = loadAnimation("images/coin.gif")
  heartimg = loadImage("images/heart.png")
  heartimg2 = loadImage("images/twoheart.png")
  heartimg3 = loadImage("images/oneheart.png")
  bulletbelt = loadImage("images/bulletbelt2.png")
  pot = loadImage("images/pot of gold.png")
  roll = loadImage("images/on a roll.jpg")
  explosionsound = loadSound("images/explosion.mp3")
  coinsound = loadSound("images/coin.mp3")
  lose = loadSound("images/game-lose-2.mp3")
  coinimags = loadAnimation("images/coin2.png","images/coin3.png","images/coin4.png","images/coin5.png","images/coin6.png")
}

function setup() {
  createCanvas(1250,560);
  backg = createSprite(640,300)
backg.addImage(bg)
backg.scale = 6
  
  plr = createSprite(150, 300, 50, 50);
  plr.addAnimation("gunimg",guny)
  plr.addImage("gunimg",gun)
   plr.scale = 0.3
   plr.debug = true
   plr.setCollider("rectangle",0,0,300,300)
  
    heart1 = createSprite(1100,40,20,20)
    heart1.addImage("hello",heartimg3)
    heart1.scale = 0.4
    
    heart2 = createSprite(1150,40,20,20)
    heart2.visible = false
    heart2.addImage("hello",heartimg3)
    heart2.addImage("hello",heartimg2)
    //heart2.addImage("hello",heartimg)
    heart2.scale = 0.4
    heart3 = createSprite(1150,40,20,20)
    heart3.addImage("thoo",heartimg2)
    heart3.scale = 0.4
   


//heart.push(heart1,heart2,heart1)


 //  console.log(heart)
  
  bulletgrp = new Group()
  enemygrp = new Group()
  poisongrp = new Group()
  boostergrp = new Group()
  coingrp = new Group()
  goldgrp = new Group()
 //camera.y = plr.y
 //camera.position.y= plr.y
}

function draw() {

  if(gameState === "fight"){
    if(score == 10){
      play = createSprite(600,120,30,30)
      play.addImage("roll",roll)
      play.velocityY = 3
      play.scale = 0.5
      play.lifetime = 10
    }
 
  background("#57615a");  
  createEdgeSprites()
  


  if(keyDown("UP_ARROW")){
     plr.y = plr.y-30
  }
  if(keyDown("DOWN_ARROW")){
    plr.y = plr.y+30
 }
 if(poisongrp.isTouching(plr)){
  heart2.addImage("hello",heartimg2)
  heart1.visible = false
heart3.visible = false
heart2.visible = true
  life = life-1
   poisongrp.destroyEach()
   }
   if(life==1){
    heart2.addImage("hello",heartimg3)
   }
 
 /*if(poisongrp.isTouching(plr)&&heart3.visible == false&&heart2.visible === false){
   
  heart1.visible = false
}*/

if(life ===0){
  gameState ="lost"
  enemygrp.destroyEach()
  lose.play()

plr.destroy()
}
 if(keyWentDown("SPACE")){
  bullet = createSprite(170,plr.y-30,20,20)
  bullet.velocityX = 20
  bullet.addImage(bullt)
  bullet.scale = 0.04
  bulletgrp.add(bullet)
  plr.depth = bullet.depth
  plr.depth = plr.depth+2
  plr.addAnimation("gunimg",guny)
  
}
if(keyWentUp("SPACE")){
  plr.addImage("gunimg",gun)
}


enemybad1()
coinandbooster()
if(enemygrp.isTouching(bulletgrp)){
  for(var i=0;i<enemygrp.length;i++){     
      
   if(enemygrp[i].isTouching(bulletgrp)){
        enemygrp[i].destroy()
        bulletgrp.destroyEach()
        explosionsound.play()
 
        score = score+2
        } 
  
  }
}
if( bulletgrp.isTouching(poisongrp)){
  poisongrp.destroyEach()
}
if(plr.isTouching(boostergrp)){
  enemygrp.destroyEach()
  boostergrp.destroyEach()
}
if(plr.isTouching(coingrp)){
coinscore = coinscore+1
coingrp.destroyEach()
coinsound.play()
}

if(frameCount%500==0){
  gold = createSprite(random(600,1100),random(300,600),20,20)
  gold.addImage("gold",pot)
  gold.scale = 0.1
gold.velocityX = -3
goldgrp.add(gold)
}

if(plr.isTouching(goldgrp)){
  goldgrp.destroyEach()
  coinscore = coinscore+20
  coinsound.play()
}
if(plr.isTouching(enemygrp)){
  gameState = "lost"
  lose.play()

}

drawSprites();
textSize(20)
fill("black")
text(`score = ${score}`,50,40)
text(`Lives = ${life}`,200,40)
text(`Coins Collected = ${coinscore}`,350,40)

}
else if(gameState == "lost"){
  text("you lost ",200,200)
background(lost)

}
  
  strokeWeight(8)

line1 = line(0,2,1280,2)
line2 = line(2,0,2,630)
//camera.y = plr.y
line1 = line(0,627,1280,627)
line2 = line(1277,0,1277,630)

}

function enemybad1(){
  if(frameCount%50===0&&enemygrp.length<3){
    enemy1 = createSprite(random(500,1100),random(100,500),40,40)
    enemy1.addImage(monst)
    enemy1.scale = 0.3
    enemy1.velocityX = -2
    enemy1.debug= true
    enemy1.setCollider("rectangle",0,0,300,300)
   // enemy1.velocityX = -7
   // enemy1.lifetime = 100
   enemygrp.add(enemy1)
   if(frameCount%100 ===0){
     poison  = createSprite(random(500,600),random(100,500),20,20)
     poison.velocityX = -7
     poison.addImage(poisonimg)
     poison.scale = 0.1
     poisongrp.add(poison)
   }
  }


}
function coinandbooster(){
  if(frameCount%150==0){
  booster = createSprite(random(600,1100),random(100,1100),20,20)
  booster.addImage("two",bulletbelt)
  booster.scale = 0.2
  booster.velocityX = -6
  booster.shapeColor = "white"
  boostergrp.add(booster)
  }
   
  if(score%1==0){
if(frameCount%120===0){
  coin = createSprite(random(600,1100),random(100,1100),20,20)
  coin.addAnimation("coin",coinimags)
  coin.scale = 0.1
  coin.velocityX = -6
  coin.shapeColor = "blue"
  coingrp.add(coin)
}
  }
}

/* enemy1 = createSprite(1000,70,40,40);
    enemy1.shapeColor= "black"
    //enemy1.velocityY = -3

    enemy2 = createSprite(1000,140,40,40);
    enemy2.shapeColor= "black"
   // enemy2.velocityY = -3

    enemy3 = createSprite(1000,210,40,40);
    enemy3.shapeColor= "black"
   // enemy3.velocityY = -3

    enemy4 = createSprite(1000,280,40,40);
    enemy4.shapeColor= "black"
    //enemy4.velocityY = -3

    enemy5 = createSprite(1000,350,40,40);
    enemy5.shapeColor= "black"
    //enemy5.velocityY = -3

    enemy6 = createSprite(1000,420,40,40);
    enemy6.shapeColor= "black"
   // enemy6.velocityY = -3

    enemy7 = createSprite(1000,490,40,40);
    enemy7.shapeColor= "black"
   // enemy7.velocityY = -3

    enemy8 = createSprite(1000,490+70,40,40);
    enemy8.shapeColor= "black"
    //enemy8.velocityY = -3



    enemy11 = createSprite(800,70,40,40);
    enemy11.shapeColor= "black"

    enemy22 = createSprite(800,140,40,40);
    enemy22.shapeColor= "black"

    enemy33 = createSprite(800,210,40,40);
    enemy33.shapeColor= "black"

    enemy44 = createSprite(800,280,40,40);
    enemy44.shapeColor= "black"

    enemy55 = createSprite(800,350,40,40);
    enemy55.shapeColor= "black"

    enemy66 = createSprite(800,420,40,40);
    enemy66.shapeColor= "black"

    enemy77 = createSprite(800,490,40,40);
    enemy77.shapeColor= "black"

    enemy88= createSprite(800,490+70,40,40);
    enemy88.shapeColor= "black"*/
    
  
  
  
   // enemy2 = createSprite(850,x,20,20);
    //enemy2.shapeColor= "black"
    //destroying the first row 
/*if(bulletgrp.isTouching(enemy1)){
  enemy1.destroy()
//bulletgrp.destroyEach()

}
if(bulletgrp.isTouching(enemy2)){
  enemy2.destroy()
 // bulletgrp.destroyEach()
}
if(bulletgrp.isTouching(enemy3)){
  enemy3.destroy()
  bulletgrp.destroyEach()
}
if(bulletgrp.isTouching(enemy4)){
  enemy4.destroy()
  bulletgrp.destroyEach()
}
if(bulletgrp.isTouching(enemy5)){
  enemy5.destroy()
  bulletgrp.destroyEach()
}
if(bulletgrp.isTouching(enemy6)){
  enemy6.destroy()
  bulletgrp.destroyEach()
}

if(bulletgrp.isTouching(enemy8)){
  enemy8.destroy()
  bulletgrp.destroyEach()
}
if(bulletgrp.isTouching(enemy7)){
  enemy7.destroy()
  bulletgrp.destroyEach()
}




if(bulletgrp.isTouching(enemy11)){
  enemy11.destroy()
bulletgrp.destroyEach()

}
if(bulletgrp.isTouching(enemy22)){
  enemy22.destroy()
  bulletgrp.destroyEach()
}
if(bulletgrp.isTouching(enemy33)){
  enemy33.destroy()
  bulletgrp.destroyEach()
}
if(bulletgrp.isTouching(enemy44)){
  enemy44.destroy()
  bulletgrp.destroyEach()
}
if(bulletgrp.isTouching(enemy55)){
  enemy55.destroy()
  bulletgrp.destroyEach()
}
if(bulletgrp.isTouching(enemy66)){
  enemy66.destroy()
  bulletgrp.destroyEach()
}

if(bulletgrp.isTouching(enemy88)){
  enemy88.destroy()
  bulletgrp.destroyEach()
}
if(bulletgrp.isTouching(enemy77)){
  enemy77.destroy()
  bulletgrp.destroyEach()
}*/
 /* enemy1.bounceOff(edges)
  enemy2.collide(edges)
  enemy3.collide(edges)
  enemy4.collide(edges)
  enemy5.collide(edges)
  enemy6.collide(edges)
  enemy7.collide(edges)
  enemy8.collide(edges)

  enemy11.collide(edges)
  enemy22.collide(edges)
  enemy33.collide(edges)
  enemy44.collide(edges)
  enemy55.collide(edges)
  enemy66.collide(edges)
  enemy77.collide(edges)
  enemy88.collide(edges)*/
 
 