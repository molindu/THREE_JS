import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { max, min, step } from 'three/tsl';
import { Pane } from 'tweakpane';

// initialize the scene
const scene = new THREE.Scene()

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

//initialize the light 
const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 70);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,// aspect ratio
  0.1,// near
  1000) // property

const aspectRatio = window.innerWidth / window.innerHeight;
camera.position.z = 2
camera.position.y = 2

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

//render the scene
const renderloop = () => {

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderloop)
}
renderloop() 