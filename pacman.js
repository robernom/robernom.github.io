const xMove = 20;
const yMove = 20;
const size = 20;
var wait = 30000;
var move = "";
var canvas, ctx, cv2, ctx2;
var xDesp = 0, yDesp = 0;
var s_Intro, s_Inter, s_Move, s_Die, s_Ghost;

var field = [
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,2,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
              [1,0,0,1,1,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,1],
              [1,0,0,1,1,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,0,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,0,0,1],
              [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
              [1,1,1,1,1,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,1,1,1],
              [3,3,3,3,3,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,3,3,3,3,3],
              [3,3,3,3,3,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,3,3,3,3,3],
              [1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1],
              [0,0,0,0,0,0,0,0,0,0,0,1,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0,0,0,1,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0],
              [1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1],
              [3,3,3,3,3,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,3,3,3,3,3],
              [3,3,3,3,3,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,3,3,3,3,3],
              [1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,0,1,1,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,1],
              [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
              [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1],
              [1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
              [1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,0,1],
              [1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];

function drawField(ctx){
  for(i in field){
    for(j in field[i]){
      if(field[i][j] == 1){
        ctx.fillStyle = "rgba(20,20,150,1)";
        ctx.fillRect(size*j, size*i, size, size);
      }else if(field[i][j] == 2){
        ctx.save();
        ctx.translate(size*j+size/2, size*i+size/2);
        drawCircle(ctx, 5, "orange");
        ctx.restore();
      }else if(field[i][j] == 0){
        ctx.save();
        ctx.translate(size*j+size/2, size*i+size/2);
        drawCircle(ctx, 2, "orange");
        ctx.restore();
      }
    }
  }
}

function drawCircle(ctx, radius, fillColor, strokeColor, lineWidth){
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
  ctx.fillStyle = fillColor;
  ctx.lineWidth= lineWidth;
  ctx.strokeStyle = strokeColor;
  ctx.stroke();
  ctx.fill();
}

function distance(circle1, circle2) {
  var xDist = circle2.x - circle1.x;
  var yDist = circle2.y - circle1.y;
  var dist = Math.sqrt(xDist*xDist + yDist*yDist);
  return dist;
}

function collision(circle1, circle2) {
  var totalRadius = circle1.radius + circle2.radius;
  if(distance(circle1, circle2) <= totalRadius) {
    return true;
  }else{
    return false;
  }
}

orientations = ["right", "down", "left", "up"];

function ghost(color){
  this.realCol = color;
  this.color = color;
  this.radius = 10;
  this.theta = Math.PI/2;
  this.nMove = 0;
  this.mov = orientations[this.nMove];
  this.x = 14*size;
  this.y = 15*size+10;
  this.v = 10;
  this.alternate = "white"
  this.vulnerable = false;
  this.setPos = function() {
    var color = this.vulnerable? this.alternate:this.color;
    this.alternate = (this.alternate == "white")? "blue":"white";
    ctx = canvas.getContext("2d");
    ctx.save();
    ctx.translate(this.x, this.y);
      drawCircle(ctx, this.radius, color);
      ctx.fillRect(-this.radius,0,2*this.radius, this.radius);
    ctx.restore();
    ctx.save();
    ctx.translate(this.x-3.5, this.y-3);
    drawCircle(ctx, 3, "rgba(255,255,255,1)");
    drawCircle(ctx, 1, "black")
    ctx.restore();
    ctx.save();
    ctx.translate(this.x+3.5, this.y-3);
    drawCircle(ctx, 3, "rgba(255,255,255,1)");
    drawCircle(ctx, 1, "black");
    ctx.restore();
  }
  this.move = function() {
    while(!correctMove(this,this.v * Math.sin(this.theta),this.v * Math.cos(this.theta),this.mov)){
      this.rand = Math.random()
      this.theta += (this.rand > 0.2)? Math.PI/2:-Math.PI/2;
      if(this.rand>0.2 & this.nMove < 3){
        this.nMove++;
      }else if(this.rand > 0.2 & this.nMove == 3){
        this.nMove -= 3;
      }else if(this.rand <= 0.2 & this.nMove > 0){
        this.nMove--;
      }else{
        this.nMove += 3;
      }
      this.mov = orientations[this.nMove];
    }
      this.x += (this.v * Math.sin(this.theta))
      this.y -= (this.v * Math.cos(this.theta));
  }
  this.changeVulnerable = function(){
    this.color = (player.special)? this.alternate:this.realCol;
    this.alternate = (this.alternate=="white")? "blue":"white";
    this.vulnerable = player.special;
  }

}

function correctMove(player,xDesp,yDesp,move){
  var x1,y1,x2,y2;
  if (move == "down"){
    x1 = Math.floor((player.x-7.5+xDesp)/20);
    y1 = Math.round((player.y-7.5-yDesp)/20);
    x2 = Math.floor((player.x+7.5+xDesp)/20);
    y2 = Math.round((player.y-7.5-yDesp)/20);
  }else if(move == "up"){
    x1 = Math.floor((player.x-7.5+xDesp)/20);
    y1 = Math.floor((player.y-7.5-yDesp)/20);
    x2 = Math.floor((player.x+7.5+xDesp)/20);;
    y2 = Math.floor((player.y-7.5-yDesp)/20);
  }else if (move == "right"){
    x1 = Math.floor((player.x+7.5+xDesp)/20);
    y1 = Math.floor((player.y-7.5-yDesp)/20);
    x2 = Math.floor((player.x+7.5+xDesp)/20);
    y2 = Math.floor((player.y+7.5-yDesp)/20);
  }else{
    x1 = Math.floor((player.x-7.5+xDesp)/20);
    y1 = Math.floor((player.y-7.5-yDesp)/20);
    x2 = Math.floor((player.x-7.5+xDesp)/20);
    y2 = Math.floor((player.y+7.5-yDesp)/20);
  }
  return (field[y1][x1] != 1 & field[y2][x2] != 1);
}

function eatFruit(){
  var x = (player.x-10)/20;
  var y = (player.y-10)/20;
  var cv = document.getElementById("canvas2");
  var ctx2 = cv.getContext('2d');
  if(x == Math.floor(x) & y == Math.floor(y)){
    if(field[y][x] == 0 || field[y][x] == 2){
      if(field[y][x] == 2){
        specialTime();
      }
      player.score += (field[y][x] == 0)? 1:3;
      player.count++;
      field[y][x] = -1;
      ctx2.clearRect(size*x,size*y,size, size)
    }
  }
}

function changeState(state){
  player.special = Boolean(state);
  for(var i in player.obs){
    player.obs[i].changeVulnerable();
    player.obs[i].v = (player.obs[i].vulnerable)? 7:10;
  }
}

var special;

function specialTime(){
  if(Boolean(special)){clearTimeout(special)}
  changeState("true");
  s_Inter.currentTime = 0;
  s_Inter.play()
  special = setTimeout(changeState,10000);
}

function pacman(x,y){
  this.x = x;
  this.y = y;
  this.time = 60000*4;
  this.radius = 8;
  this.xDesp = x;
  this.yDesp = y;
  this.color = "yellow";
  this.score = 0;
  this.lifes = 5;
  this.count = 0;
  this.special = false;
  this.mouth = false;
  this.stopped = true;
  this.paused = true;
  this.win = false;
  this.move = function (){
    if (!correctMove(this,xDesp,yDesp,move)){
      this.x = this.x;
      this.y = this.y;
      s_Move.pause();
      this.stopped = true;
    }else{
      if (that.paused || that.special || !Boolean(move) & that.lifes != 0){
        s_Move.pause();
      }else{
        s_Move.play();
      }
      if(move == "left" & this.x == 0 & this.y >= 290 & this.y <= 310){
        this.x = 590;
      }else if(move == "right" & this.x == 590 & this.y >= 290 & this.y <= 310){
        this.x = 0;
      }else{
        this.x += xDesp;
        this.y -= yDesp;
      }
    }
  }
  that = this;
  this.nObs = 0;
  this.totalObs = 0;
  this.liberated = 0;
  this.obs = [];
  this.newObs = function(){
    if (that.nObs < 2){
      that.obs[that.nObs] = new ghost(colors[that.totalObs%4]);
      that.nObs++;
      that.totalObs++;
      setTimeout(that.liberateGhost, 8000);
    }
  }

  this.updateObs = function(){
    for (i in this.obs){
      this.obs[i].move();
      this.obs[i].setPos();
    }
  }
  this.liberateGhost = function(){
    that.obs[that.liberated].x = 14*size+10;
    that.obs[that.liberated].y = 13*size;
    that.liberated++;
  }
  this.update = function (){
    if(move=="right"){
      this.theta = Math.PI/2;
    }else if(move=="up"){
      this.theta = Math.PI;
    }else if(move=="left"){
      this.theta = 3*Math.PI/2;
    }else{
      this.theta = 0;
    }
    ctx.strokeStyle = "black";
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.theta);
    drawCircle(ctx, this.radius, this.color);
    if(this.mouth & !this.stopped){
      ctx.beginPath();
      ctx.scale(3,4);
      ctx.moveTo(0,0);
      ctx.lineTo(1,1.5);
      ctx.lineTo(-1,1.5);
      ctx.closePath();
      ctx.stroke();
    }
    this.mouth = !this.mouth;
    ctx.restore();
    this.updateObs();
  }
}

function checkCollision() {
  for (i in player.obs){
    if (collision(player, player.obs[i])){
      if(player.obs[i].vulnerable){
        player.score += 100;
        player.obs.splice(i, 1);
        player.liberated--;
        player.nObs--;
        s_Ghost.play();
      }else{
        player.lifes--;
        loseLife();
        s_Die.play();
      }
      break;
    }
    if(player.lifes == 0 || player.time <= 0){
      clearInterval(interval);
      clearInterval(ghosts);
      player.paused = true;
      s_Move.pause();
      s_Die.play();
      document.getElementById('canvas').getContext('2d').clearRect(0,0,canvas.width, canvas.height);
      var vid = document.getElementById('event');
      vid.src = 'fail.mp4';
      vid.hidden = false;
      vid.play();
      textCanvas(233, 20, "YOU LOSE", 25, "yellow")
    }
  }
}

function win(){
  if(player.count == 564){
    gamePause();
    textCanvas(233, 20, "YOU WIN", 25, "yellow")
    var vid = document.getElementById('event')
    vid.src = "victory.mp4";
    vid.hidden = false;
    vid.play();
    player.win = true;
  }
}

function gamePause(){
  player.paused = true;
  clearInterval(interval);
  clearInterval(ghosts);
  s_Move.pause();
  s_Inter.pause();
}

function gameResume(){
  if(player.paused & player.time > 0 & !player.win){
    player.paused = false;
    interval = setInterval(render, 150);
    ghosts = setInterval(player.newObs, 3000);
  }
}

function loseLife(){
  player.x = 290;
  player.y = 370
}

function keyDown(event) {
  switch(event.key) {
    case "a":
    case "ArrowLeft":
      xDesp = -xMove/2;
      yDesp = 0;
      move = "left";
      player.stopped = false;
      break;
    case "d":
    case "ArrowRight":
      xDesp = xMove/2;
      yDesp = 0;
      move = "right";
      player.stopped = false;
      break;
    case "w":
    case "ArrowUp":
      yDesp = yMove/2;
      xDesp = 0;
      move = "up";
      player.stopped = false;
      break;
    case "s":
    case "ArrowDown":
      yDesp = -yMove/2;
      xDesp = 0;
      move = "down";
      player.stopped = false;
      break;
    case "Escape":
    //Si se para el juego se reinicia la cuenta atrás para los anuncios
      gamePause();
      break;
    case "Enter":
      clearInterval(msg);
      //ad = setTimeout(playAd, wait);
      gameResume();
      break;
    default:
      console.log("Key not handled");
  }
}
var source = 1;
var time = 0;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, color) {
    ev.dataTransfer.setData("text", color);
}

function drop(ev) {
    ev.preventDefault();
    var color = ev.dataTransfer.getData("text");
    player.color = color;
    if(player.paused){
      ctx.clearRect(140, 640, 300, 50)
      textCanvas(195, 670, "PACMAN COLOR",25,player.color)
    }
}


function restart(){
  interval = setInterval(render, 150);
  canvas.hidden = false;
  cv2.hidden = false;
  myVideo.hidden = true;
  myVideo.pause();
  //setTimeout(playAd, wait);
}

function addAd(){
  if (time >= 60){
    source = (source<4)? source+1:1;
    time = 0;
  }
  myVideo.src = "videos/realizador-fuente"+source+".mp4";
  myVideo.currentTime = time;
  myVideo.play();
}

function playAd(){
  clearInterval(interval);
  canvas.hidden = true;
  cv2.hidden = true;
  video.hidden = true;
  myVideo.hidden = false;
  addAd();
  setTimeout(restart, 10000);
  time += 10;
}

var colors = ["magenta", "cyan", "red", "orange"];

function textCanvas(x,y,text,size,color){
  var ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(x, y);
  ctx.font = size+"px Pacman";
  ctx.fillStyle = color;
  ctx.fillText(text,0,0);
  ctx.restore();
}

function render(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  eatFruit(ctx2);
  checkCollision();
  player.move();
  player.update();
  textCanvas(20, 670, "SCORE: " + player.score, 20,"yellow");
  textCanvas(200, 670, "TIME: " + printTime(player.time),20,"yellow");
  player.time -= 150;
  textCanvas(360, 670, "LIFES: ", 20,"yellow");
  for(i=0;i<player.lifes;i++){
    ctx.strokeStyle = "black";
    ctx.save();
    ctx.translate(440+17*i, 662);
    ctx.rotate(-Math.PI/2);
    drawCircle(ctx, 8, player.color);
    ctx.beginPath();
    ctx.scale(3,4);
    ctx.moveTo(0,0);
    ctx.lineTo(1,1.5);
    ctx.lineTo(-1,1.5);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
  win();
}

function printTime(){
  var seg = Math.floor(player.time/1000);
  var min = 0;
  var hour = 0;
  while (seg >= 60){
    seg -= 60;
    min += 1;
  }
  while (min >= 60){
    min -= 60;
    hour += 1;
  }
  return(min+":"+seg);
}

function introMusic(){
  cv2 = document.getElementById('canvas2');
  ctx2 = cv2.getContext('2d');
  drawField(ctx2);
  s_Intro = document.getElementById('intro');
  s_Intro.play();
  setTimeout(startGame, 3500);
}

function enterMsg(){
  textCanvas(128, 310, "PRESS ENTER TO START", 25, "yellow")
  textCanvas(145, 670, "CHOOSE YOUR COLOR",25,player.color)
}

function startGame(){
  video = document.getElementById("event");
  s_Inter = document.getElementById('inter');
  s_Move = document.getElementById('move');
  s_Die = document.getElementById('die');
  s_Ghost = document.getElementById('ghost')
  myVideo = document.getElementById("video");
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }
  document.addEventListener('keydown', keyDown, false);
  player = new pacman(290, 370);
  msg = setInterval(enterMsg, 500)
}
