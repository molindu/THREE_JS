import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene()

// initialize the loader
const textureLoader = new THREE.TextureLoader();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16)
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32)

//initialize the texture
const textureText = textureLoader.load('textures/speckled-granite-tiles-unity/speckled-granite-tiles_normal-ogl.png');

// initialize the material
const material = new THREE.MeshBasicMaterial();
// const material = new THREE.MeshPhongMaterial();
material.map = textureText;
// material.color = new THREE.Color('red');

// initialize the group
const group = new THREE.Group();

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
const sphere = new THREE.Mesh();
sphere.geometry = sphereGeometry;
sphere.material = material;
sphere.position.y = 1.5;


const cylinder = new THREE.Mesh();
cylinder.geometry = cylinderGeometry;
cylinder.material = material;
cylinder.position.y = -1.5;

cubeMesh.rotation.reorder("YXZ")

cubeMesh2.position.x = 2;
planeMesh.position.x = -2;

group.add(cubeMesh, cubeMesh2, planeMesh, sphere, cylinder);
scene.add(group);

const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

//initialize the light 
// const light = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(light);

// const pointLight = new THREE.PointLight(0xffffff, 70);
// pointLight.position.set(2, 2, 2);
// scene.add(pointLight);

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

//render the scene
const renderloop = () => {

  group.children.forEach((child) => {
    if (child instanceof THREE.Mesh) {
      child.rotation.x += 0.01;
      child.rotation.y += 0.01;
    }
  });

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderloop)
}
renderloop()