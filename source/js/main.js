import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

let w = window.innerWidth;
let h = window.innerHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(w, h);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
// 为了不让同机型渲染的光效不一样，这里统一设置物理光效
renderer.physicallyCorrectLights = true;
document.body.append(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdeebed);

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100000);
camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);

// const ambientLight = new THREE.AmbientLight(0xeeeeee, 0.4);
// scene.add(ambientLight);
// const directLight = new THREE.DirectionalLight(0xffffff);
// directLight.position.set(50, 50, 50);
// scene.add(directLight);



const loader = new GLTFLoader();
loader.load("../model/star_compass/scene.gltf", (model) => {
  model.scene.traverse((child)=>{
    if(child.isMesh){
      child.material.envMap = enviromentMap;
      child.material.envMapInstensity = 1;
    }
  })
  model.scene.position.x = 100;
 
  scene.add(model.scene);
});




const control = new OrbitControls(camera, renderer.domElement);
const animate = () => {
  renderer.render(scene, camera);
  control.update();
  requestAnimationFrame(animate);
};
animate();

window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
