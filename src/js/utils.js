export const collision = (firstBall, secondBall) => {
  return (
    Math.round(firstBall.position.x / 2.5) ===
      Math.round(secondBall.position.x / 2.5) &&
    Math.round(firstBall.position.y / 2.5) ===
      Math.round(secondBall.position.y / 2.5) &&
    firstBall.position.z === secondBall.position.z
  );
};

export const boxCollision = (ball, box) =>{
  if (Math.round(box.position.x + 2) === Math.round(ball.position.x) &&
  (Math.round(box.position.y + 100) === Math.round(ball.position.y + 100))){
    return "LEFT COLLISION";
  } else if (
    Math.round(box.position.x - 2) === Math.round(ball.position.x) &&
    (Math.round(box.position.y + 100) === Math.round(ball.position.y + 100))
  ){
    return "RIGHT COLLISION";
  }

  return null;
};