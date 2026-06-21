import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1,)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" })

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)


const cubeMesh2 = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
const cubeMesh3 = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)

const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);

group.position.y = 2;
group.scale.setScalar(2)
scene.add(group)
// scene.add(cubeMesh);

// cubeMesh.scale.y = 2;
// cubeMesh.scale.set(2, 2, 1)

cubeMesh.position.x = 2
cubeMesh2.position.x = 0 
cubeMesh2.position.y = -1
cubeMesh2.scale.setScalar(0.5);
cubeMesh3.position.x = -2

// const tempVector = new THREE.Vector3(1, 1, 1)
// cubeMesh.position.copy(tempVector)

const axesHelper = new THREE.AxesHelper(2)
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
controls.autoRotate = true

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