import * as THREE from "three";
import { InteractionManager } from "three.interactive";

// ==================================================== GLOBAL SCOPE DECLARATIONS ========================================================

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, raycaster: THREE.Raycaster, renderer: THREE.WebGLRenderer;
let object: THREE.Mesh;
let planes = [];
let intersects;

let INTERSECTED: any;

const pointer = new THREE.Vector2(50, 50);
const isMobile = window.matchMedia("(max-width: 400px)");

function init() {

    // ==================================================== CAMERA ========================================================
    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );

    if (isMobile.matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        camera.position.z = 600;

    } else {

        camera.position.z = 400;

    }


    // ==================================================== SCENE ========================================================
    scene = new THREE.Scene();


    // ==================================================== MATERIAL ========================================================
    const texture = new THREE.TextureLoader().load("https://i.scdn.co/image/ab67706c0000bebbbd8a62c26fa146211707c5de");

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({ map: texture });


    // ==================================================== MESH ========================================================
    object = new THREE.Mesh(geometry, material);
    scene.add(object);
    planes.push(object);;


    // ==================================================== RAYCASTER ========================================================
    raycaster = new THREE.Raycaster();


    // ==================================================== RENDERER ========================================================
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    let canvas_dom = renderer.domElement;
    document.body.appendChild(canvas_dom);



    // ============================================= EVENT LISTENERS FOR RAYCASTER =============================================
    if (isMobile.matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        document.addEventListener('touchstart', onDocumentMouseMove, false);
        document.addEventListener('touchmove', onDocumentMouseMove, false);
        document.addEventListener('touchend', onDocumentTouchEnd, false);

    } else {

        document.addEventListener('mousemove', onDocumentMouseMove, false);

    }


    // ==================================================== INTERACTION ========================================================
    const interactionManager = new InteractionManager(
        renderer,
        camera,
        renderer.domElement
    );

    window.addEventListener("resize", onWindowResize);

    interactionManager.add(object);

    object.addEventListener("click", (event) => {
        window.open("https://open.spotify.com/playlist/3I6ckbR7LxRVh6TDA7INpE?si=0067dadf6f6f4c2e", '_blank');
    });

}


// ==================================================== FUNCTIONS ========================================================
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (isMobile.matches) {

        camera.position.z = 600;
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentMouseMove, false);
        document.addEventListener('touchmove', onDocumentMouseMove, false);

    } else {

        camera.position.z = 400;
        document.removeEventListener('touchmove', onDocumentMouseMove, false);
        document.removeEventListener('touchstart', onDocumentMouseMove, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);

    }
}

function onDocumentMouseMove(event) {

    let mouse = new THREE.Vector2();

    if (isMobile.matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        pointer.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 + -1;
        pointer.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;

    } else {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    }

    let raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(planes);

    if (intersects.length > 0) {
        $('html,body').css('cursor', 'pointer');
    } else {
        $('html,body').css('cursor', 'default');
    }
}

function animate() {
    requestAnimationFrame(animate);

    object.rotation.x += 0.005;
    object.rotation.y += 0.01;

    render();

}

function render() {

    // find intersections
    raycaster.setFromCamera(pointer, camera);

    intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {

        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED) INTERSECTED.material.color.set(0xFFFFFF);

            INTERSECTED = intersects[0].object;
            INTERSECTED.material.color.set(0x808080);

        }

    } else {

        if (INTERSECTED) INTERSECTED.material.color.set(0xFFFFFF);

        INTERSECTED = null;

    }

    renderer.render(scene, camera);

}

function onDocumentTouchEnd() {

    intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {

        intersects[0].object.material.color.set(0xFFFFFF);

    }

}


// ==================================================== LOAD SCRIPTS ========================================================
init();
animate();