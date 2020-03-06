const instructionsElement = document.getElementById("instructions");
const gameTitleElement = document.createElement("div");

export const startInstructionsOn = () => {
  instructionsElement.style.visibility = "visible";
  gameTitleElement.innerHTML = "START GAME";
  instructionsElement.appendChild(gameTitleElement);
};

export const clearInstructions = () => {
  instructionsElement.style.visibility = "hidden";
};

export const gameOverInstructionsOn = () => {};
