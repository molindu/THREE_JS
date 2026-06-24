import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16)
const planeGeometry = new THREE.PlaneGeometry(1, 1);

// initialize the material
const material = new THREE.MeshPhysicalMaterial();
material.color = new THREE.Color('green');


pane.addBinding(material, 'metalness', { min: 0, max: 1, step: 0.01 });
pane.addBinding(material, 'roughness', { min: 0, max: 1, step: 0.01 });
pane.addBinding(material, 'reflectivity', { min: 0, max: 1, step: 0.01 });
pane.addBinding(material, 'clearcoat', {
  min: 0,
  max: 1,
  step: 0.01,
});
const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  material
)
const cubeMesh2 = new THREE.Mesh(
  torusKnotGeometry,
  material
)
const planeMesh = new THREE.Mesh(
  planeGeometry,
  material
);
cubeMesh.rotation.reorder("YXZ")

cubeMesh2.position.x = 2;
planeMesh.position.x = -2;
scene.add(cubeMesh);
scene.add(cubeMesh2);
scene.add(planeMesh);

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// initialize the light 
const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 70);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

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