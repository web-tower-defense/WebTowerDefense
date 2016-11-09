
var look;

function initCamera(){
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.x = 50;
	camera.position.z = -20;
	camera.position.y = 100;
	look = new THREE.Vector3(0, -50, -10);
	console.log("campos="+camera.position.x+","+camera.position.z);
}