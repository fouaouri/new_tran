import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import Ball from './src/ball.js';
import Paddle from './src/paddles.js';
import Walls from './src/walls.js';
import Wallsrl from './src/wallsrl.js'; 
import Midle from './src/middle.js';
import Ring from './src/ring.js';
import earth from './image/apllw.png';
import sky from './image/sky.png';
// import angel from './image/angel.png'
// import table from './table_tennis_model/scene.gltf';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement);

let player1Score = 0;
let player2Score = 0;
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 128;
const context = canvas.getContext('2d');
context.font = 'Bold 48px Arial';
context.fillStyle = 'white';
context.textAlign = 'center';
context.textBaseline = 'middle';
// context.rotateY(30);

// Function to update the score on the canvas
function updateScore(player1Score, player2Score) {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    context.fillText(`Player 1: ${player1Score}`, canvas.width / 4, canvas.height / 2);
    context.fillText(`Player 2: ${player2Score}`, (3 * canvas.width) / 4, canvas.height / 2);
    texture12.needsUpdate = true; // Mark texture for update
}

// Create texture from canvas
const texture12 = new THREE.CanvasTexture(canvas);
const material = new THREE.SpriteMaterial({ map: texture12 });
const sprite = new THREE.Sprite(material);
sprite.scale.set(10, 4, 10); // Adjust size
sprite.rotateZ(Math.PI * 0.5)
scene.add(sprite);

// Initialize scores




// document.addEventListener("keyup", event =>{
//   const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('images/sky.png', function (texture) {
//   const geometry = new THREE.SphereGeometry(-500, 60, 40);
//   const material = new THREE.MeshBasicMaterial({ map: texture });
//   const mesh = new THREE.Mesh(geometry, material);
//   scene.add(mesh);
// });
// });

const controls = new OrbitControls( camera, renderer.domElement );


// iamge
// let mesh2;
const textureLoadersky = new THREE.TextureLoader();
// const texture = textureLoader.load('images/sky.png', function (texture) {
  const geometry = new THREE.SphereGeometry(-500, 60, 40);
  const materials = new THREE.MeshBasicMaterial({ map: textureLoadersky.load(sky) });
  const mesh = new THREE.Mesh(geometry, materials);
  scene.add(mesh);
// });
const textureLoader2 = new THREE.TextureLoader();
// const texture2 = textureLoader2.load('images/apllw.png', function (texture) {
  const geometry2 = new THREE.SphereGeometry(500, 60, 40);
  const material2 = new THREE.MeshBasicMaterial({ map: textureLoader2.load(earth)});
  const mesh2 = new THREE.Mesh(geometry2, material2);
  scene.add(mesh2);


// const textureLoaderangel = new THREE.TextureLoader();
// // const texture1 = textureLoader1.load('images/angel.png', function (texture1) {
//   const geometryangel = new THREE.CircleGeometry(400, 60, 400, 50);
//   const materialangel = new THREE.MeshBasicMaterial({ map: textureLoaderangel.load(angel) });
//   const mesh1 = new THREE.Mesh(geometryangel, materialangel);
//   materialangel.rotateY(-Math.PI * 0.5);
//   mesh1.position.y = 50;
//   mesh1.position.x = 200;
//   scene.add(mesh1);
// });



//events
// let letfkey = false;
// let rightkey = false;



// const textureLoader1 = new THREE.TextureLoader();
// const texture1 = textureLoader.load('images/Statuette-de-Light-Fury-dans-Dragon-par-Sideshow.png', function (texture) {
//   // Create a material with the loaded texture
//   const material1 = new THREE.MeshBasicMaterial({ map: texture1 });

//   // Create a plane geometry and apply the material
//   const geometry1 = new THREE.PlaneGeometry(30, 20); // Adjust the size as needed
//   const mesh1 = new THREE.Mesh(geometry1, material1);
//   geometry1.rotateX(-Math.PI * 0.5)


//   // Position the image in the scene
//   mesh1.position.set(0, 0.1, 10); // Adjust the position as needed
//   scene.add(mesh1);
// });



const ball = new Ball(scene, 0xff0000)
const playerPaddle = new Paddle(scene, new THREE.Vector3(0, 0, 18));
const AIPaddle = new Paddle(scene, new THREE.Vector3(0, 0, -18));
const wallAi = new Walls(scene, new THREE.Vector3(0, 0, -20));
const wallP = new Walls(scene, new THREE.Vector3(0, 0, 20));
const wallR = new Wallsrl(scene, new THREE.Vector3(15, 0, 0));
const wallL = new Wallsrl(scene, new THREE.Vector3(-15, 0, 0));
const middle= new Midle(scene, new THREE.Vector3(0, 0, 0));
const ring= new Ring(scene, new THREE.Vector3(0, 0.2, 0));
// const wallL = new Wallsrl(scene, new THREE.Vector3(0, 0, 20));
// const ange = new angel(scene, new THREE.Vector3(15, 0, 0));


// event
let right = false;
let left = false;
let pright = false;
let pleft = false;
// let start = false;
document.addEventListener('keydown', (event) =>{
  if(event.code === 'ArrowLeft'){
          left = true;}
  if(event.code === 'ArrowRight'){
          right = true;}
  if(event.key === 'a'){
    pright = true;}
  if (event.key === 'd'){
    pleft = true;
  }
  if (playerPaddle.mesh.position.x == 0.1)
          right = false;});
document.addEventListener('keyup', (event) =>{
  if(event.code === 'ArrowLeft'){
          left = false;}
  if(event.code === 'ArrowRight'){
          right = false;}
  if(event.key === 'a'){
          pright = false;}
  if (event.key === 'd'){
          pleft = false;}
  if(event.code === 'ArrowUp')
      {
        // start = true;
        camera.position.set(1000, 30, 30);
        camera.position.set(180, 30, 30);

      }
      if(event.code === 'ArrowDown')
        {
          camera.position.set(1000, 30, 30);
  
        }
});
// PlaneGeometry
camera.position.set(1000, 30, 30);
camera.position.set(0, 30, 30);
camera.lookAt(0, 0, 0);

const bounds = new THREE.Vector2(15, 20);

const planG = new THREE.PlaneGeometry(bounds.x *2 , bounds.y * 2, bounds.x *8 , bounds.y * 8 );
planG.rotateX(-Math.PI * 0.5)
const planM = new THREE.MeshNormalMaterial({wireframe: true});
const plan = new THREE.Mesh(planG, planM);
scene.add(plan);
let check = true;
let checkpaddle = false;
let touchright = false;
let touchleft = false;
let checkdown = false;
let checkL = false;
let checkUr = false;
let checkUd = false;
let checkld = false;
let RightWallx = wallR.mesh.position.x;
let RightWallz = wallR.mesh.position.z;
let leftWallx = wallL.mesh.position.x;
let leftWallz = wallL.mesh.position.x;
let AIwallx = wallAi.mesh.position.x;
let AIwallz = wallAi.mesh.position.z;
let playerwallz = wallP.mesh.position.z;
let playerwallx = wallP.mesh.position.x;
let ballx = ball.mesh.position.x;
let ballz = ball.mesh.position.z;
let mid = middle.mesh.position.x;
let score = 0;
let score1 = 0;
const listener = new THREE.AudioListener();
camera.add(listener);

// Background music
const backgroundMusic = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();

audioLoader.load(
    'sounds/Coldplay-Hymn-for-the-Weekend-(RawPraise.ng).mp3',
    function (buffer) {
        backgroundMusic.setBuffer(buffer);
        backgroundMusic.setLoop(true);
        backgroundMusic.setVolume(0.5);
        backgroundMusic.play();
        // console.log();
    },
    undefined, // onProgress function (optional)
    function (error) {
        console.error('An error occurred while loading the audio:', error);
    }
);

//win music
// const winMusic = new THREE.Audio(listener);
// const audioLoader1 = new THREE.AudioLoader();

// audioLoader1.load(
//     'sounds/decidemp3-14575',
//     function (buffer) {
//       winMusic.setBuffer(buffer);
//       winMusic.setLoop(true);
//       winMusic.setVolume(0.5);
//         // console.log("sgwrrwgwrgwrgrwggrw");
//       winMusic.play();

//     },
//     undefined, // onProgress function (optional)
//     function (error) {
//         console.error('An error occurred while loading the audio:', error);
//     }
// );
function animate(){
  // if (start == true)
  // {
  //   console.log("alooooooo")
  //up + paddle
  if ((ball.mesh.position.z <= wallP.mesh.position.z) && checkdown == false){
    ball.mesh.position.z += 0.4;
    if((ball.mesh.position.z >= 17.3) && ((ball.mesh.position.x >= playerPaddle.mesh.position.x - 3) && (ball.mesh.position.x <= playerPaddle.mesh.position.x + 3)))
      checkdown = true;
      if (ball.mesh.position.z >= 19)
        {
          ball.mesh.position.z = 0
          player2Score+= 1;
      // winMusic.play();

    }}
  //down
  if ((ball.mesh.position.z >= wallAi.mesh.position.z) && checkdown == true){
        ball.mesh.position.z -= 0.4;
      if((ball.mesh.position.z <= -17.3) && ((ball.mesh.position.x >= AIPaddle.mesh.position.x - 3) && (ball.mesh.position.x <= AIPaddle.mesh.position.x + 3)))
          checkdown = false;
      if (ball.mesh.position.z <= -19)
        {ball.mesh.position.z = 0
          player1Score += 1;
      // winMusic.play();
    }}
  //right
  if(ball.mesh.position.x <= wallR.mesh.position.x - 1 && touchright == false)
    {ball.mesh.position.x +=0.1;
      if(ball.mesh.position.x >= 14)
        touchright = true;
      // winMusic.stop();
    }
    //left
  if (ball.mesh.position.x >= wallL.mesh.position.x + 1 && touchright == true){
    ball.mesh.position.x -=0.1;
    if(ball.mesh.position.x <= -14) 
      touchright = false;
    // winMusic.stop();
  }
    //paddle
  if(right && playerPaddle.mesh.position.x < wallR.mesh.position.x - 3.5){
     playerPaddle.mesh.position.x += 0.2;
    }
  if (left && playerPaddle.mesh.position.x > -wallR.mesh.position.x + 3.5){
      playerPaddle.mesh.position.x -= 0.2;
    }
  //   if(pright && AIPaddle.mesh.position.x < wallR.mesh.position.x - 3.5){
  //     AIPaddle.mesh.position.x += 0.2;
  
  //   }
  // if (pleft && AIPaddle.mesh.position.x > -wallR.mesh.position.x + 3.5){
  //     AIPaddle.mesh.position.x -= 0.2;
  //   }
  if((AIPaddle.mesh.position.x < wallR.mesh.position.x - 3.2) ){
    if (ball.mesh.position.x > -11)
      AIPaddle.mesh.position.x = ball.mesh.position.x;
  
    }
  if ((AIPaddle.mesh.position.x > -wallR.mesh.position.x + 3.2) ){
    if (ball.mesh.position.x < 11)
      AIPaddle.mesh.position.x = ball.mesh.position.x;
    // console.log(ball.mesh.position.x);
    }
//     console.log(player1Score);
// console.log(player2Score);
updateScore(player1Score, player2Score); // Display initial scores
   
      mesh2.rotation.y += -0.01;
	controls.update();
	renderer.render( scene, camera );
  // }


}
// renderer.setAnimationLoop(animate);


