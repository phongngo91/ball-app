const texture = new THREE.TextureLoader().load("src/textures/white-flower.png");

const geometryBall = new THREE.SphereGeometry(1, 16, 16);
const material = new THREE.MeshBasicMaterial({ map: texture });
const blueBall = new THREE.Mesh(geometryBall, material);

export default blueBall;