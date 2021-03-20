const SIZE = 20;
const CUBESZ = 2;
const MAZESZ = 20;
var p, camera, field;
var xDesp = 0;
var yDesp = 0;
var pacMove = "down"

var VSHADER_SOURCE =
  'attribute highp vec3 a_VertexPosition;\n' +
  'attribute highp vec2 a_TextureCoord;\n' +


  'uniform highp mat4 u_MvpMatrix;\n' +
  'uniform highp mat4 u_ModelMatrix;\n' +

	'varying highp vec2 v_TextureCoord;\n' +
	'varying highp vec4 v_vertexPosition;\n' +

  'void main() {\n' +
  '  gl_Position = u_MvpMatrix * vec4(a_VertexPosition, 1.0);\n' +

	'  v_TextureCoord = a_TextureCoord;\n' +
  '  v_vertexPosition = u_ModelMatrix * vec4(a_VertexPosition, 1.0);\n' +

	'}\n';
var FSHADER_SOURCE =
  'varying highp vec2 v_TextureCoord;\n' +
	'varying highp vec4 v_vertexPosition;\n' +

  'uniform sampler2D u_Sampler;\n' +
  'uniform sampler2D u_Sampler2;\n' +

  'void main() {\n' +

  '  highp vec4 color0 = texture2D(u_Sampler, vec2(v_TextureCoord.s, v_TextureCoord.t));\n' +
  '  highp vec4 color1 = texture2D(u_Sampler2, vec2(v_TextureCoord.s, v_TextureCoord.t));\n' +
  '  highp vec4 texelColor = sqrt(color0 * color1);\n' +

  '  gl_FragColor = vec4(texelColor.rgb, texelColor.a);\n' +
  '}\n';

var field_matrix = [
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,0,1,1,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,0,0,1],
              [1,2,2,1,1,1,0,0,1,1,1,1,0,0,1,0,0,1,1,1,1,0,0,1,1,1,2,2,1],
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
              [1,1,1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,1,1],
              [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
              [1,2,2,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,2,2,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];

function dataBuffer(gl,vert,text,ind){
  this.vertBuf = gl.createBuffer(); //Buffer de vÃ©rtices
  this.textBuf = gl.createBuffer(); //Buffer de vÃ©rtices de la textura
  this.indBuf = gl.createBuffer();  //Buffer de Ã­ndices
  this.texture = gl.createTexture();//Textura
  this.texture2 = null;
  this.vert = vert;                   //Coordenadas de los vÃ©rtices
  this.text = text;                   //Coordenadas de la textura
  this.ind = ind;
  this.initBuf = function(){
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuf);
    gl.bufferData(gl.ARRAY_BUFFER, this.vert, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.textBuf);
    gl.bufferData(gl.ARRAY_BUFFER, this.text, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.ind, gl.STATIC_DRAW);
  }
  this.draw = function(cam, u_MvpMatrix, u_ModelMatrix){
    this.initBuf();
    gl.uniformMatrix4fv(u_ModelMatrix, false, cam.m.elements);
    gl.uniformMatrix4fv(u_MvpMatrix, false, cam.mvp.elements);

    var vertexPositionAttribute = gl.getAttribLocation(gl.program, "a_VertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);

    var textureCoordAttribute = gl.getAttribLocation(gl.program, "a_TextureCoord");
    gl.enableVertexAttribArray(textureCoordAttribute);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertBuf);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.textBuf);
    gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    if(this.texture2 == null){
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.uniform1i(gl.getUniformLocation(gl.program, "u_Sampler"), 0);
      gl.uniform1i(gl.getUniformLocation(gl.program, "u_Sampler2"), 1);
    }else{
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, this.texture2);
      gl.uniform1i(gl.getUniformLocation(gl.program, "u_Sampler"), 0);
      gl.uniform1i(gl.getUniformLocation(gl.program, "u_Sampler2"), 1);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indBuf);

    gl.drawElements(gl.TRIANGLES, this.ind.length, gl.UNSIGNED_SHORT, 0);
  }
}

function camView (posX,posY,posZ,theta){
  this.posX = posX;
  this.posY = posY;
  this.posZ = posZ;
  this.lookX = Math.cos(theta);
  this.lookY = Math.sin(theta);
  this.lHeight = 0.8;
  this.theta = theta;
  this.m = new Matrix4();
  this.v = new Matrix4().setLookAt(this.posX, this.posY, this.posZ, this.posX+this.lookX, this.posY+this.lookY, this.lHeight, 0, 0, 1);
  this.p = new Matrix4().setPerspective(90, 800/600, 0.0001, 200);
  this.mvp = new Matrix4();
  this.update = function(){
    if (!this.end){
      this.lookY = Math.sin(this.theta);
      this.lookX = Math.cos(this.theta);
      this.v.setLookAt(this.posX, this.posY, this.posZ, this.posX+this.lookX, this.posY+this.lookY, this.lHeight, 0, 0, 1);
    }
  }
  this.end = false;
}

function correctMove(x, y, field, move){
  var x1,y1,x2,y2;
  var pacSz = CUBESZ/3;
  var cubSz = CUBESZ/4;
  if(move=="down"){
    if(y - Math.floor(y) != 0){
      return false;
    }
    x1 = Math.floor(x + pacSz + cubSz);
    y1 = Math.floor(y - pacSz);
    x2 = Math.floor(x + pacSz +cubSz);
    y2 = Math.floor(y + pacSz);
  }else if(move=="up"){
    if(y - Math.floor(y) != 0){
      return false;
    }
    x1 = Math.floor(x - pacSz - cubSz);
    y1 = Math.floor(y - pacSz);
    x2 = Math.floor(x - pacSz - cubSz);
    y2 = Math.floor(y + pacSz);
  }else if(move=="right"){
    if(x - Math.floor(x) != 0){
      return false;
    }
    x1 = Math.floor(x - pacSz);
    y1 = Math.floor(y + cubSz + pacSz);
    x2 = Math.floor(x + pacSz);
    y2 = Math.floor(y + cubSz + pacSz);
  }else{
    if(x - Math.floor(x) != 0){
      return false;
    }
    x1 = Math.floor(x - pacSz);
    y1 = Math.floor(y - cubSz - pacSz);
    x2 = Math.floor(x + pacSz);
    y2 = Math.floor(y - cubSz - pacSz);
  }
  return (field[x1][y1] != 1 && field[x2][y2] != 1);
}

function initTextures(gl,cube,floor,coco,pacman,ghost) {
  var combImage = new Image();
  cube.texture2 = gl.createTexture();
  combImage.onload = function() {handleTextureLoaded(gl, combImage, cube.texture2);}
  combImage.src = "resources/wall.jpeg";
  var cubeImage = new Image();
  cubeImage.onload = function() { handleTextureLoaded(gl, cubeImage, cube.texture); }
  cubeImage.src = "resources/blue_sq.png";
  var floorImage = new Image();
  floorImage.onload = function() {handleTextureLoaded(gl, floorImage, floor.texture);}
  floorImage.src = "resources/wall.jpeg";
  var cocoImage = new Image();
  cocoImage.onload = function() {handleTextureLoaded(gl, cocoImage, coco.texture);}
  cocoImage.src = "resources/orange.jpeg";
  var pacImage = new Image();
  pacImage.onload = function() {handleTextureLoaded(gl, pacImage, pacman.texture);}
  pacImage.src = "resources/yellow.jpeg";
  var ghostImage = new Image();
  ghostImage.onload = function() {handleTextureLoaded(gl, ghostImage, ghost.texture);}
  ghostImage.src = "resources/ghost.png";
}

function handleTextureLoaded(gl, image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
        gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); //cuando te alejas
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST); // cuando te acercas
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
}

orientations = ["down", "right","up","left"];

function enemy(){
  this.x=18;
  this.y=14;
  this.desp = CUBESZ/4;
  this.theta = Math.PI/2;
  this.nMove = 0;
  this.or = orientations[this.nMove];
  this.move = function(){
    while(!correctMove(this.x,this.y,field,this.or)){
      this.rand = Math.random();
      if(this.rand>0.2 & this.nMove < 3){
        this.nMove++;
      }else if(this.rand > 0.2 & this.nMove == 3){
        this.nMove -= 3;
      }else if(this.rand <= 0.2 & this.nMove > 0){
        this.nMove--;
      }else{
        this.nMove += 3;
      }
      this.or = orientations[this.nMove];
    }
    if(this.or=="down"){this.x += this.desp;}
    if(this.or=="up"){this.x -= this.desp;}
    if(this.or=="left"){this.y -= this.desp;}
    if(this.or=="right"){this.y += this.desp;}
  }
}

function player(x,y){
  this.x = x;
  this.y = y;
  this.xDesp = x;
  this.yDesp = y;
  this.move = function (){
    if (!correctMove(this.x,this.y,field,pacMove)){
      this.x = this.x;
      this.y = this.y;
    }else{
      if(pacMove == "left" & this.x == 15 & this.y == 0.5){
        this.y = 29;
      }else if(pacMove == "right" & this.x == 15 & this.y == 29.5){
        this.y = 0;
      }else{
        this.x += xDesp;
        this.y -= yDesp;
      }
    }
  }
}

function drawScene(gl,camera,cube,floor,coco,pacman,p,g,ghost,field){
  if(!camera.end){
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
    if (!u_MvpMatrix) {
      console.log('Failed to get the storage location of u_MvpMatrix');
      return;
    }
    var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    if (!u_ModelMatrix) {
      console.log('Failed to get the storage location of u_ModelMatrix');
      return;
    }

    camera.m.setTranslate(1.5*MAZESZ+2,1.5*MAZESZ-2,-2).scale(1.7*MAZESZ+2,1.5*MAZESZ+2,1)
    camera.mvp.set(camera.p).multiply(camera.v).multiply(camera.m);
    floor.draw(camera,u_MvpMatrix,u_ModelMatrix);

    camera.m.setTranslate(CUBESZ*(p.x-0.5),CUBESZ*(p.y-0.5),1).scale(CUBESZ/1.5,CUBESZ/1.5,CUBESZ/1.5);
    camera.mvp.set(camera.p).multiply(camera.v).multiply(camera.m);
    pacman.draw(camera, u_MvpMatrix, u_ModelMatrix);

    camera.m.setTranslate(CUBESZ*(g.x-0.5),CUBESZ*(g.y-0.5),1).scale(CUBESZ/1.5,CUBESZ/1.5,CUBESZ/1.5);
    camera.mvp.set(camera.p).multiply(camera.v).multiply(camera.m);
    ghost.draw(camera, u_MvpMatrix, u_ModelMatrix);

    count = 0;
    for(i=0;i<field.length;i++){
      for(j=0;j<field[i].length;j++){
        if(field[i][j] == 1){
          camera.m.setTranslate(CUBESZ*i, CUBESZ*j, 0).scale(CUBESZ/2,CUBESZ/2,CUBESZ/2);
          camera.mvp.set(camera.p).multiply(camera.v).multiply(camera.m);
          cube.draw(camera, u_MvpMatrix, u_ModelMatrix);
        }if(field[i][j] == 0) {
          if((field[i+1][j] == 0 || field[i+1][j] == -1) &
            (field[i][j+1] == 0 || field[i][j+1] == -1) &
            (field[i+1][j+1] == 0 || field[i+1][j+1] == -1)){
            count += 1;
            camera.m.setTranslate(CUBESZ*(i+0.5), CUBESZ*(j+0.5), 1).scale(CUBESZ/16,CUBESZ/16,CUBESZ/16);
            camera.mvp.set(camera.p).multiply(camera.v).multiply(camera.m);
            coco.draw(camera, u_MvpMatrix, u_ModelMatrix);
          }
        }if(field[i][j] == 2){
          if(field[i][j+1] == 2){
            count += 1;
            camera.m.setTranslate(CUBESZ*(i), CUBESZ*(j+0.5), 1).scale(CUBESZ/4,CUBESZ/4,CUBESZ/4);
            camera.mvp.set(camera.p).multiply(camera.v).multiply(camera.m);
            coco.draw(camera, u_MvpMatrix, u_ModelMatrix);
          }
        }
      }
    }
    if(count == 0){
      alert("WIN");
    }
     requestAnimationFrame(function() { drawScene(gl,camera,cube,floor,coco,pacman,p,g,ghost,field) })
  }
}
function keyDown(event, cam, field) {
  var incTheta = Math.PI/20;
  switch(event.key) {
    case "d":
      cam.theta -= incTheta;
      break;
    case "a":
      cam.theta += incTheta;
      break;
    case "q":
      if(cam.posY > 4){
        cam.posX -= cam.lookY;
        cam.posY += cam.lookX;
      }
      break;
    case "e":
      if(cam.posY < 52){
        cam.posX += cam.lookY;
        cam.posY -= cam.lookX;
      }
      break;
    case "s":
      //if(correctMove((cam.posX-cam.lookX)/CUBESZ,(cam.posY-cam.lookY)/CUBESZ, field)){
        //if(correctMove((cam.posX)/CUBESZ,(cam.posY-cam.lookY)/CUBESZ,field) & correctMove((cam.posX-cam.lookX)/CUBESZ,(cam.posY)/CUBESZ,field)){
        if(cam.posX - cam.lookX < 63){
          cam.posX -= cam.lookX;
          cam.posY -= cam.lookY;
        }
        //}
      //}
      break;
    case "w":
      //  if(correctMove((cam.posX+cam.lookX)/CUBESZ,(cam.posY+cam.lookY)/CUBESZ, field)){
      //  if(correctMove((cam.posX)/CUBESZ,(cam.posY+cam.lookY)/CUBESZ,field) & correctMove((cam.posX+cam.lookX)/CUBESZ,(cam.posY)/CUBESZ,field)){
        if(cam.posX + cam.lookX > 4){
          cam.posX += cam.lookX;
          cam.posY += cam.lookY;
        }
      //  }
      //  }
      break;
    case "-":
      cam.posZ += cam.posZ<35?2.5:0;
      break;
    case "+":
      cam.posZ -= cam.posZ>2.5?2.5:0;
      if(cam.posZ == 2.5){
        cam.lHeight = 1;
      }else{
        cam.lHeight = 0.8
      }
      break;
    case "c":
      if (cam.height == 0.8){
        cam.height = 30;
        cam.lHeight = 0;
      }else{
        cam.height = 0.8;
        cam.lHeight = 0.8;
      }
      break;
    case "r":
      cam.posX = (p.x+0.5)*CUBESZ;
      cam.posY = (p.y+0.5)*CUBESZ;
      cam.theta = Math.PI;
      break;
    default:
      console.log("Key not handled");
  }
  cam.update();
  //cam.end = win(field)
}

function eatCocos(){
  var x, y;
  if (pacMove=="down"){x=p.x-1; y=p.y-1}
  if (pacMove=="up"){x=p.x-1; y=p.y-1}
  if (pacMove=="right"){x=p.x-1; y=p.y-1}
  if (pacMove=="left"){x=p.x-1; y=p.y-1}
  if(x - Math.floor(x) == 0 & y - Math.floor(y) == 0){
    field[x][y] = -1;
  }
}
//Multiple key press
var free = false;
function updateGameArea() {
  var cam = camera;
  var incTheta = Math.PI/20;
    if(camera.keys && camera.keys[87]) {  // w
      if(camera.posX + camera.lookX > 4){
        camera.posX += camera.lookX;
        camera.posY += camera.lookY;
      }
    }
    if(camera.keys && camera.keys[83]){   // s
      if(camera.posX - camera.lookX < 63){
        camera.posX -= camera.lookX;
        camera.posY -= camera.lookY;
      }
    }
    if(camera.keys && camera.keys[65]){   // a
      camera.theta += incTheta;
    }
    if(camera.keys && camera.keys[68]) {  // d
      camera.theta -= incTheta;
    }
    if(camera.keys && camera.keys[171]){  // +
      camera.posZ -= camera.posZ>1.25?1.25:0;
      if(camera.posZ == 2.5){
        camera.lHeight = 1.5;
      }else{
        camera.lHeight = 0.8
      }
    }
    if(camera.keys && camera.keys[173]){  // -
      cam.posZ += cam.posZ<35?1.25:0;
      camera.lHeight = 0.8
    }
    if(camera.keys && camera.keys[81]){   // q
      if(cam.posY > 4){
        cam.posX -= cam.lookY;
        cam.posY += cam.lookX;
      }


    }
    if(camera.keys && camera.keys[69]){   // e
      if(cam.posY < 52){
        cam.posX += cam.lookY;
        cam.posY -= cam.lookX;
      }
    }
    if(camera.keys && camera.keys[37]){   // ArrowLeft
      pacMove = "left";
      yDesp = CUBESZ/4;
      xDesp = 0;
    }
    if(camera.keys && camera.keys[38]){   // ArrowUp
      pacMove = "up";
      yDesp = 0
      xDesp = -CUBESZ/4;
    }
    if(camera.keys && camera.keys[39]){   // ArrowRight
      pacMove = "right";
      yDesp = -CUBESZ/4;
      xDesp = 0;
    }
    if(camera.keys && camera.keys[40]){   // ArrowDown
      pacMove = "down";
      yDesp = 0
      xDesp = CUBESZ/4;
    }
    if(camera.keys && camera.keys[32]){   // SpaceBar
      free = !free;
    }
    if(camera.keys && camera.keys[27]){   // Escape
      xDesp = 0;
      yDesp = 0;
    }
    if(!free){
      cam.posX = (p.x-0.5)*CUBESZ;
      cam.posY = (p.y-0.5)*CUBESZ;
    }
    camera.update();
    eatCocos();
    p.move();
    g.move();
}
/*
function win(field){
  if (field.pos.x == 0 & field.pos.y == 0){
    cv.height = 200;
    cv.width = 300;
    ctx.clearRect(0, 0, 200, 300);
    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "blue";
    ctx.fillText("COMPLETADO",30,30);
    ctx.font = "10px Arial";
    ctx.fillText("Recarga para volver a empezar",30,50)
  }
  return (field.pos.x == 0 & field.pos.y == 0);
}
*/

function main() {
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);
  var clicked = false;

  var cubeVert = new Float32Array([
    -1.0, -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,  1.0,  1.0, -1.0,  1.0,  1.0,   // Front face
    -1.0, -1.0, -1.0, -1.0,  1.0, -1.0,  1.0,  1.0, -1.0,  1.0, -1.0, -1.0,   // Back face
    -1.0,  1.0, -1.0, -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0,   // Top face
    -1.0, -1.0, -1.0,  1.0, -1.0, -1.0,  1.0, -1.0,  1.0, -1.0, -1.0,  1.0,   // Bottom face
     1.0, -1.0, -1.0,  1.0,  1.0, -1.0,  1.0,  1.0,  1.0,  1.0, -1.0,  1.0,   // Right face
    -1.0, -1.0, -1.0, -1.0, -1.0,  1.0, -1.0,  1.0,  1.0, -1.0,  1.0, -1.0    // Left face
  ]);
  var cubeText = new Float32Array([
    1.0,  0.0,     0.0,  0.0,    0.0,  1.0,   1.0,  1.0,  // Front OK
    1.0,  1.0,     1.0,  0.0,    0.0,  0.0,   0.0,  1.0,  // Back OK
    1.0,  1.0,     1.0,  0.0,    0.0,  0.0,   0.0,  1.0,  // Top OK
    0.0,  1.0,     1.0,  1.0,    1.0,  0.0,   0.0,  0.0,  // Bottom OK
    0.0,  1.0,     1.0,  1.0,    1.0,  0.0,   0.0,  0.0, // Right  OK
    1.0,  1.0,     1.0,  0.0,    0.0,  0.0,   0.0,  1.0 // Left OK
  ]);
  var cubeInd = new Uint16Array([
    0,  1,  2,      0,  2,  3,  /*Front*/ 4,  5,  6,    4,  6,  7,  //Back
    8,  9,  10,     8,  10, 11, /*Top*/   12, 13, 14,   12, 14, 15, //Bottom
    16, 17, 18,     16, 18, 19, /*Right*/ 20, 21, 22,   20, 22, 23  //Left
  ]);

  var cube = new dataBuffer(gl,cubeVert,cubeText,cubeInd);
  var coco = new dataBuffer(gl,cubeVert,cubeText,cubeInd);
  var pacman = new dataBuffer(gl,cubeVert,cubeText,cubeInd);
  var ghost = new dataBuffer(gl,cubeVert,cubeText,cubeInd);
  p = new player(18, 14)
  g = new enemy()

  var floorVert = new Float32Array([
     -1.0,  -1.0, 0,
     -1.0,   1.0, 0,
      1.0,   1.0, 0,
      1.0,  -1.0, 0
  ]);
  var floorText = new Float32Array([0.0,  0.0,     0.0,  25.0,    25.0,  25,   25,  0.0]);
  var floorInd = new Uint16Array([0,  1,  2,      0,  2,  3]);
  var floor = new dataBuffer(gl,floorVert,floorText,floorInd);

  field = field_matrix;
  posX = 16;
  posY = 14;
  posZ = 35;

  camera = new camView((posX)*CUBESZ,(posY)*CUBESZ,posZ, Math.PI);

  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }else{
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log('Failed to intialize shaders.');
      return;
    }

    gl.clearColor(0.0, 0.0, 0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    initTextures(gl,cube,floor,coco,pacman,ghost);
    //document.addEventListener('keydown', function(e){keyDown(e, camera, field)}, false);
    document.addEventListener('keydown', function (e) {
      camera.keys = (camera.keys || []);
      camera.keys[e.keyCode] = true;
    })
    document.addEventListener('keyup', function (e) {
      camera.keys[e.keyCode] = false;
    })
    interval = setInterval(updateGameArea, 100)

    drawScene(gl,camera,cube,floor,coco,pacman,p,g,ghost,field);
  }
}
