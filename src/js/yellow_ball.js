const texture = new THREE.TextureLoader().load("src/textures/red-flower.png");

const geometryBall = new THREE.SphereGeometry(1, 16, 16);
var material = new THREE.MeshBasicMaterial({ map: texture });
const randBall = new THREE.Mesh(geometryBall, material);

export default randBall;