import * as THREE from 'three';

let camera,scene,renderer;
//相机
camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(-1, 2, 2);
camera.lookAt(0, 0, 0);

// 渲染器
renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
// 吧渲染出来的canvas添加到body里
document.body.append(renderer.domElement);

// 场景
scene = new THREE.Scene();

// 环境光
const light1 = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(light1);

// 正方形
const box = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial();
const geometry = new THREE.Mesh(box,material);

scene.add(geometry)