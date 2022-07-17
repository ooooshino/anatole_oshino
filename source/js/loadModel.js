import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import * as dat from "https://unpkg.com/dat.gui@0.7.7/build/dat.gui.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js";

const gui = new dat.GUI();

let w = 500;
let h = 300;
let wnidowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let renderer, scene, camera, threeModel;

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h);
renderer.outputEncoding = THREE.sRGBEncoding;
// 为了不让同机型渲染的光效不一样，这里统一设置物理光效
renderer.physicallyCorrectLights = true;
const el = document.getElementById("banner");
el.append(renderer.domElement);
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.set(10, 20, 30);
camera.lookAt(0, 0, 0);

const cubeTexture = new THREE.CubeTextureLoader();
const enviromentMap = cubeTexture.load([
  "../texture/1.png",
  "../texture/2.png",
  "../texture/3.png",
  "../texture/4.png",
  "../texture/5.png",
  "../texture/6.png",
]);
enviromentMap.encoding = THREE.sRGBEncoding;
scene.background = new THREE.Color(0xffffff);
// scene.background = enviromentMap;

const loader = new GLTFLoader();
loader.load("../model/star_compass/scene.gltf", (model) =>
{
  threeModel = model.scene;
  threeModel.traverse((child) =>
  {
    if (child.isMesh)
    {
      child.material.envMap = enviromentMap;
    }
  });
  threeModel.scale.set(12, 12, 12);
  scene.add(threeModel);
  animate();
});
const mouse = new THREE.Vector2();
const target = new THREE.Vector3();




const animate = () =>
{
  renderer.render(scene, camera);
  threeModel.rotation.y += 0.002;
  requestAnimationFrame(animate);
};

// window.addEventListener("resize", () => {
//   w = window.innerWidth;
//   h = window.innerHeight;
//   camera.aspect = w / h;
//   camera.updateProjectionMatrix();
//   renderer.setSize(w, h);
// });

/**
 * 鼠标移动
 */
window.addEventListener("mousemove", (e) =>
{
  mouse.x = e.clientX - wnidowHalfX;
  mouse.y = -e.clientY - windowHalfY;
});

