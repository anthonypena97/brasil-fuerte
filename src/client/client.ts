// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import Stats from 'three/examples/jsm/libs/stats.module'

// const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5));

// // const light = new THREE.SpotLight();
// // light.position.set(5,5,5);
// // scene.add(light);

// const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// )

// camera.position.z = 2;

// const renderer = new THREE.WebGLRenderer();
// renderer.physicallyCorrectLights = true;
// renderer.shadowMap.enabled = true
// renderer.outputEncoding = THREE.sRGBEncoding
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;

// const loader = new GLTFLoader()
// loader.load(
//     'models/monkey4.glb',
//     // 'models/BauhausWeimar1.glb',
//     function(gltf) {
//         gltf.scene.traverse(function(child){
//             if ((child as THREE.Mesh).isMesh) {
//                 const m = (child as THREE.Mesh)
//                 m.receiveShadow = true;
//                 m.castShadow = true;
//             }
//             if (((child as THREE.Light)).isLight) {
//                 const l = (child as THREE.Light)
//                 l.castShadow = true;
//                 l.shadow.bias = -.001;
//                 l.shadow.mapSize.width = 2048;
//                 l.shadow.mapSize.height = 2048;
//             }
//         })
//         console.log(gltf.scene);
//         scene.add(gltf.scene);
//     },
//     (xhr) => {
//         console.log((xhr.loaded / xhr.total) * 100 + 'loaded')
//     },
//     (error) => {
//         console.log(error);
//     }
// )

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize(){
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     render()
// }

// const stats = Stats();
// document.body.appendChild(stats.dom);

// function animate(){
//     requestAnimationFrame(animate);

//     controls.update();

//     render();

//     stats.update();
// }

// function render() {
//     renderer.render(scene, camera)
// }

// animate()

// =================================================================

import * as THREE from "three";
import { InteractionManager } from "three.interactive";

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let mesh: THREE.Mesh;

init();
animate();


function init() {

    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 400;

    scene = new THREE.Scene();


    const texture = new THREE.TextureLoader().load("https://i.scdn.co/image/ab67706c0000bebbbd8a62c26fa146211707c5de");

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({ map: texture });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const interactionManager = new InteractionManager(
        renderer,
        camera,
        renderer.domElement
    );

    //

    window.addEventListener("resize", onWindowResize);

    interactionManager.add(mesh);

    mesh.addEventListener("click", (event) => {
        console.log(event);
        console.log('hello');
        window.open("https://open.spotify.com/playlist/3I6ckbR7LxRVh6TDA7INpE?si=0067dadf6f6f4c2e", '_blank');
    });

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

