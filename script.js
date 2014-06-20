var player = document.createElement('div');
var van = document.createElement('div');
var pizza = document.createElement('div');
var sky = document.getElementById('sky');
var ground = document.getElementById('ground');
player.id = 'player';
pizza.id = 'pizza';
van.id = 'van';

sky.appendChild(van);
sky.appendChild(player);
sky.appendChild(pizza);

positions = {
  player: 50,
  van: Math.floor(Math.random() * 90),
  pizza: Math.floor(Math.random() * 90)
};

speeds = {
  van: Math.random() * 200 + 100,
  cop: Math.random() * 50
}

player.style.left = positions.player + "vw";
van.style.left = positions.van + "vw";
pizza.style.left = positions.pizza + "vw";

window.onkeydown = function(e) {
  console.log(e.keyCode)
  movement[e.keyCode](player, 5);
}

var moveRight = function(thing, distance){
  positions[thing.id] += distance;
  if (positions[thing.id] > 100) positions[thing.id] = 0;
  thing.style.left = positions[thing.id] + "vw";

  if(thing.id === 'van'){
    collisionDetection('van', 'player');
  } else {
    collisionDetection('van','player');
    collisionDetection('player','pizza')
  }
}

var moveUp = function(thing, distance){
  var posUp = thing.style.top.replace("vh","");
  thing.style.top = +posUp - distance + "vh";
}

var moveDown = function(thing, distance){
  var posUp = thing.style.top.replace("vh","");
  thing.style.top = +posUp + distance + "vh";
}

var moveLeft = function(thing, distance){
  positions[thing.id] -= distance;
  if (positions[thing.id] < 0) positions[thing.id] = 100;
  console.log(thing, positions[thing.id]);
  thing.style.left = positions[thing.id] + "vw";

  if(thing.id === 'van'){
    collisionDetection('van', 'player');
  } else {
    collisionDetection('van','player');
    collisionDetection('player','pizza')
  }
}

var movement = {
  37: moveLeft,
  38: moveUp,
  40: moveDown,
  39: moveRight
}

setInterval(function(){moveRight(van, 3)}, speeds.van)

var invincible = false;

var collisionDetection = function(thing1, thing2){
  if (Math.abs(positions[thing1] - positions[thing2]) < 5 ) {
    console.log(thing1, positions[thing1], thing2, positions[thing2]);
    if ((thing1 === "van" || thing2 === "van") && !invincible) {
      document.getElementById('lose').style.display = "block";
    }
    if(thing1 === 'player' && thing2 === 'pizza'){
      invincible = true;
      player.style.opacity = .5;
      player.style.width = "30vw";
      player.style.height = "30vw";
      player.style.top = "40vh";
      setTimeout(function(){
        player.style.opacity = 1;
        player.style.width = "20vh";
        player.style.height = "20vh";
        player.style.top = "60vh";
        invincible = false;
      }, 5000)
    }
    if ((thing1 === "van" || thing2 === "van") && invincible){
      sky.removeChild('van');
      setTimeout(function(){
        positions.van = Math.floor(Math.random() * 90);
        van.style.left = positions.van;
        sky.appendChild(van);
      }, 3000)
    }
  }
  return false;
}
