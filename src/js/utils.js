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
  if (
    Math.round(box.position.x + 2) === Math.round(ball.position.x) &&
    Math.round(box.position.y / 4) === Math.round(ball.position.y / 4) &&
    ball.position.z === box.position.z
  ) {
    return "LEFT COLLISION";
  } else if (
    Math.round(box.position.x - 2) === Math.round(ball.position.x) &&
    Math.round(box.position.y / 4) === Math.round(ball.position.y / 4) &&
    ball.position.z === box.position.z
  ) {
    return "RIGHT COLLISION";
  } else if (
    Math.round(box.position.y + 2) === Math.round(ball.position.y) &&
    Math.round(box.position.x / 4) === Math.round(ball.position.x / 4) &&
    ball.position.z === box.position.z
  ) {
    return "FRONT COLLISION";
  } else if (
    Math.round(box.position.y - 2) === Math.round(ball.position.y) &&
    Math.round(box.position.x / 4) === Math.round(ball.position.x / 4) &&
    ball.position.z === box.position.z
  ) {
    return "BACK COLLISION";
  }

  return null;
};
