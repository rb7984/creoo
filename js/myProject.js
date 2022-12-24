import * as th from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

const scene = new th.Scene();

const camera = new th.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new th.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement)
controls.update();

const geometry = new th.BoxGeometry( 1, 1, 1 );
const material = new th.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new th.Mesh( geometry, material );

scene.add( cube );

camera.position.set(5,5,5);
camera.lookAt(0,0,0);

// const light = new th.AmbientLight( 0x404040, 20);
// scene.add(light);

window.addEventListener('mousedown',function() {
    camera.position.z = 14;
})

function animate() {
	requestAnimationFrame( animate );
    controls.update();
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	renderer.render( scene, camera );
};

animate();