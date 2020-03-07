export const distance = (obj1, obj2) => {
  return Math.sqrt(
    Math.pow(obj1.mesh.position.x - obj2.mesh.position.x, 2) +
      Math.pow(obj1.mesh.position.y - obj2.mesh.position.y, 2) +
      Math.pow(obj1.mesh.position.z - obj2.mesh.position.z, 2)
  );
};
