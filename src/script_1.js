import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

const pane = new Pane();


// Scene
const scene = new THREE.Scene();


// Loader
const textureLoader = new THREE.TextureLoader();


// PBR material creator
function createPBRMaterial(folder, name) {

  const material = new THREE.MeshStandardMaterial();


  material.map = textureLoader.load(
    `/textures/${folder}/${name}_albedo.png`
  );

  material.normalMap = textureLoader.load(
    `/textures/${folder}/${name}_normal-ogl.png`
  );

  material.roughnessMap = textureLoader.load(
    `/textures/${folder}/${name}_roughness.png`
  );

  material.metalnessMap = textureLoader.load(
    `/textures/${folder}/${name}_metallic.png`
  );

  material.aoMap = textureLoader.load(
    `/textures/${folder}/${name}_ao.png`
  );

  material.displacementMap = textureLoader.load(
    `/textures/${folder}/${name}_height.png`
  );


  material.displacementScale = 0.03;
  material.aoMapIntensity = 1;


  return material;
}



// Create materials

const rockMaterial = createPBRMaterial(
  "rough-igneous-rock1-bl",
  "rough-igneous-rock"
);


const spaceMaterial = createPBRMaterial(
  "space-cruiser-panels2-bl",
  "space-cruiser-panels2"
);


const grassMaterial = createPBRMaterial(
  "whispy-grass-meadow-bl",
  "whispy-grass-meadow"
);



// Geometry

const cubeGeometry = new THREE.BoxGeometry(
  1, 1, 1
);


cubeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(
    cubeGeometry.attributes.uv.array,
    2
  )
);



const sphereGeometry = new THREE.SphereGeometry(
  0.5,
  32,
  32
);


sphereGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(
    sphereGeometry.attributes.uv.array,
    2
  )
);



const cylinderGeometry = new THREE.CylinderGeometry(
  0.5,
  0.5,
  1,
  32
);


cylinderGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(
    cylinderGeometry.attributes.uv.array,
    2
  )
);




// Meshes

const cube = new THREE.Mesh(
  cubeGeometry,
  rockMaterial
);


cube.position.x = -2;



const sphere = new THREE.Mesh(
  sphereGeometry,
  spaceMaterial
);


sphere.position.y = 2;



const cylinder = new THREE.Mesh(
  cylinderGeometry,
  grassMaterial
);


cylinder.position.x = 2;
cylinder.position.y = -1.5;




scene.add(
  cube,
  sphere,
  cylinder
);



// Helpers

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);



// Lights

const ambientLight = new THREE.AmbientLight(
  0xffffff,
  0.5
);

scene.add(ambientLight);



const pointLight = new THREE.PointLight(
  0xffffff,
  50
);


pointLight.position.set(
  2,
  3,
  3
);

scene.add(pointLight);




// Tweakpane

pane.addBinding(
  rockMaterial,
  "roughness",
  {
    min: 0,
    max: 1,
    step: 0.01
  }
);


pane.addBinding(
  rockMaterial,
  "metalness",
  {
    min: 0,
    max: 1,
    step: 0.01
  }
);


pane.addBinding(
  rockMaterial,
  "displacementScale",
  {
    min: 0,
    max: 0.2,
    step: 0.01
  }
);



// Camera

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth /
  window.innerHeight,
  0.1,
  100
);


camera.position.set(
  2,
  2,
  5
);




// Renderer

const canvas = document.querySelector(
  "canvas.threejs"
);


const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true
});


renderer.setSize(
  window.innerWidth,
  window.innerHeight
);


renderer.setPixelRatio(
  Math.min(
    window.devicePixelRatio,
    2
  )
);




// Controls

const controls = new OrbitControls(
  camera,
  canvas
);


controls.enableDamping = true;




// Resize

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();


    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);




// Animation

function animate() {

  controls.update();


  renderer.render(
    scene,
    camera
  );


  requestAnimationFrame(
    animate
  );
}


animate();