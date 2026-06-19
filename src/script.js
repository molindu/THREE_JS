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
scene.add(cubeMesh)

// console.log(window.devicePixelRatio)

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
  canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight)

// console.log(camera)
//initialize the controls
const controls = new OrbitControls(camera, canvas)

controls.enableDamping = true
controls.autoRotate = true

window.addEventListener('resize',()=>{
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