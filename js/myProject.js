import * as THREE from './three.module.js';
import {OrbitControls} from './OrbitControls.js';
import {FBXLoader} from './FBXLoader.js';

const container = document.querySelector('#scene-container');
export const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setClearColor("#ededed");

renderer.setSize( container.clientWidth, container.clientHeight );
renderer.setPixelRatio(window.devicePixelRatio);
container.append(renderer.domElement);
//renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

var axes = new THREE.AxesHelper(5);
const grid = new THREE.GridHelper(20,10,'#ffffff','#ffffff');
scene.add(axes);
scene.add(grid);

var g2 = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
var m2 = new THREE.MeshStandardMaterial({ color: '#a18787', side: THREE.DoubleSide });
var plane = new THREE.Mesh(g2, m2);
plane.rotateX( - Math.PI / 2);
plane.receiveShadow = true;

scene.add(plane);

camera.position.set(5,5,5);
camera.lookAt(0,0,0);

const light = new THREE.AmbientLight( 0x404040, 4.5);
light.castShadow = true;
scene.add(light);
const lightDir = new THREE.DirectionalLight(0x404040, 2);
lightDir.position.set(20,20,20);
lightDir.lookAt(0,0,0);
lightDir.castShadow = true;
const dlsh = new THREE.CameraHelper(lightDir.shadow.camera);
scene.add(dlsh);
scene.add(lightDir);

const controls = new OrbitControls(camera, renderer.domElement);

const fbxLoader = new FBXLoader();
fbxLoader.load('../assets/stand.fbx', (object) => {
    object.traverse( function( node ) { 
        if ( node instanceof THREE.Mesh ) { 
            node.castShadow = true; 
            node.receiveShadow = true;
            node.material.side = THREE.DoubleSide;
        } } );
    object.translateY(0.01);
    scene.add(object)
}
);

// Add - Buttons
var buttonsArray = [3];
var countarray = [[0,0]];

for (let i = 0; i < buttonsArray.length; i++) {
    for (let j = 0; j < buttonsArray[i]; j++) {
        let id = 'btn-' + i.toString() + '-' + j.toString();
        document.getElementById(id).onclick = function () {
            addRB(i,j);
        };        
    }
}

function addRB(i,j)
{
    var path = '../assets/' + + i.toString() + '-' + j.toString() + '.fbx';
    
    fbxLoader.load(path, (object) => {
        object.traverse( function( node ) { 
            if ( node instanceof THREE.Mesh ) { 
                node.castShadow = true; 
                node.receiveShadow = true;
                node.material.side = THREE.DoubleSide;
            } } );

        object.translateX(5);
        scene.add(object)
    }
    );
    countarray[i][j] ++;


}

function animate() {
	requestAnimationFrame( animate );
    
    controls.update();
	renderer.render( scene, camera );
};

animate();