export const collision = (firstBall, secondBall) => {
  return (
    Math.round(firstBall.position.x / 2.5) ===
      Math.round(secondBall.position.x / 2.5) &&
    Math.round(firstBall.position.y / 2.5) ===
      Math.round(secondBall.position.y / 2.5) &&
    firstBall.position.z === secondBall.position.z
  );
};

export const boxCollision = (ball, box) => {
  // Right Side Collision
  const ballLeftOfBoxRightEdge = ball.position.x < box.position.x + 2;
  const ballRightOfBoxCenter = ball.position.x > box.position.x;

  // Left Side Collision
  const ballRightOfBoxLeftEdge = ball.position.x > box.position.x - 2;
  const ballLeftOfBoxCenter = ball.position.x < box.position.x;

  // Back Side Collision
  const ballBelowBoxTopEdge = ball.position.y < box.position.y + 2;
  const ballTopOfBoxCenter = ball.position.y > box.position.y;

  // Front Side Collision (face that players see)
  const ballTopOfBoxBottomEdge = ball.position.y > box.position.y - 2;
  const ballBelowBoxCenter = ball.position.y < box.position.y;

  if (
    ballLeftOfBoxRightEdge &&
    ballRightOfBoxCenter &&
    Math.round(box.position.y / 1.5) === Math.round(ball.position.y / 1.5) &&
    ball.position.z === box.position.z
  ) {
    return "LEFT COLLISION";
  } else if (
    ballRightOfBoxLeftEdge &&
    ballLeftOfBoxCenter &&
    Math.round(box.position.y / 1.5) === Math.round(ball.position.y / 1.5) &&
    ball.position.z === box.position.z
  ) {
    return "RIGHT COLLISION";
  } else if (
    ballTopOfBoxBottomEdge &&
    ballBelowBoxCenter &&
    Math.round(box.position.x / 1.5) === Math.round(ball.position.x / 1.5) &&
    ball.position.z === box.position.z
  ) {
    return "FRONT COLLISION";
  } else if (
    ballBelowBoxTopEdge &&
    ballTopOfBoxCenter &&
    Math.round(box.position.x / 1.5) === Math.round(ball.position.x / 1.5) &&
    ball.position.z === box.position.z
  ) {
    return "BACK COLLISION";
  }

  return null;
};

export const laserCollision = (laser, target) => {
  return (
    Math.round(laser.position.x / 2.5) ===
      Math.round(target.position.x / 2.5) &&
      // number under equation determines the accuracy of the shot (lower = more accurate)
    Math.round(laser.position.y / 2.5) ===
      Math.round(target.position.y / 2.5) &&
    Math.round(laser.position.z / 2.5) === Math.round(target.position.z / 2.5)
  );
};
