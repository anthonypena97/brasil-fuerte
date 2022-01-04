import * as THREE from "three";
import { InteractionManager } from "three.interactive";

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;
let mesh: THREE.Mesh;
let planes = [];

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
    planes.push(mesh);;

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

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

function onDocumentMouseMove(event) {

    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(planes);

    if (intersects.length > 0) {
        $('html,body').css('cursor', 'pointer');
    } else {
        $('html,body').css('cursor', 'default');
    }

}