import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)

// create custom geometry
const vertices = new Float32Array([
  0, 0, 0,  // bottom-left
  0, 2, 0,  // top-left
  2, 0, 0,  // bottom-right
]);

const bufferAttribute = new THREE.BufferAttribute(vertices, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', bufferAttribute);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true })

const cubeMesh = new THREE.Mesh(
  // cubeGeometry,
  geometry,
  cubeMaterial
)


cubeMesh.rotation.reorder("YXZ")
// cubeMesh.rotation.x = -Math.PI * 0.65;
// cubeMesh.rotation.x = THREE.MathUtils.degToRad(75);
// cubeMesh.rotation.y = THREE.MathUtils.degToRad(45);
// const cubeMesh2 = new THREE.Mesh(
//   cubeGeometry,
//   cubeMaterial
// )
// const cubeMesh3 = new THREE.Mesh(
//   cubeGeometry,
//   cubeMaterial
// )
cubeMesh.position.y = 1;
cubeMesh.position.x = 1;
cubeMesh.scale.x = 1.5;

const group = new THREE.Group();
// group.add(cubeMesh);
// group.add(cubeMesh2);
// group.add(cubeMesh3);

// group.position.y = 2;
// group.scale.setScalar(2)
// scene.add(group)
scene.add(cubeMesh);

// cubeMesh.scale.y = 2;
// cubeMesh.scale.set(2, 2, 1)

// cubeMesh.position.x = 2
// cubeMesh2.position.x = 0 
// cubeMesh2.position.y = -1
// cubeMesh2.scale.setScalar(0.5);
// cubeMesh3.position.x = -2

// const tempVector = new THREE.Vector3(1, 1, 1)
// cubeMesh.position.copy(tempVector)

const axesHelper = new THREE.AxesHelper(2)
// cubeMesh.add(axesHelper)
scene.add(axesHelper)


// initialize the camera
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,// aspect ratio
  0.1,// near
  30) // property

const aspectRatio = window.innerWidth / window.innerHeight;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 200
// )
camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// console.log(camera)
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

  // console.log(clock.getElapsedTime())
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  // console.log(delta);
  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20;
  // cubeMesh.position.x += 1 * delta;
  // cubeMesh.scale.x = Math.sin(currentTime) * 0.5 + 1;
  // cubeMesh.position.x = Math.sin(currentTime) + 1;
  // console.log(Math.sin(currentTime));

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderloop)
}
renderloop()