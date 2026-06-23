import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

const cubeMaterial = new THREE.MeshBasicMaterial();

const planeGeometry = new THREE.PlaneGeometry(1, 1);
// cubeMaterial.transparent = true;
// cubeMaterial.opacity = 0.5;
cubeMaterial.side = THREE.DoubleSide;
cubeMaterial.color = new THREE.Color('red');

const fog = new THREE.Fog(0xffffff, 1, 9);
scene.fog = fog;
scene.background = new THREE.Color('white');
cubeMaterial.fog = true;

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
const cubeMesh2 = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
const planeMesh = new THREE.Mesh(
  planeGeometry,
  cubeMaterial
);
// cubeMesh.rotation.reorder("YXZ")

cubeMesh2.position.x = 2;
planeMesh.position.x = -2;
scene.add(cubeMesh);
scene.add(cubeMesh2);
scene.add(planeMesh);
// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,// aspect ratio
  0.1,// near
  30) // property

const aspectRatio = window.innerWidth / window.innerHeight;
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//initialize the controls
const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true
// controls.autoRotate = true

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight)
})
//initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

//render the scene
const renderloop = () => {

  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderloop)
}
renderloop()