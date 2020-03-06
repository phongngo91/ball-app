const instructionsElement = document.getElementById("instructions");
const gameTitleElement = document.createElement("div");

export const startInstructionsOn = () => {
  instructionsElement.style.visibility = "visible";
  gameTitleElement.innerHTML = "START GAME";
  instructionsElement.appendChild(gameTitleElement);
};

export const clearInstructions = () => {
  instructionsElement.style.visibility = "hidden";
  while (instructionsElement.children.lenght > 0) {
    instructionsElement.children.forEach(child => {
      instructionsElement.remove(child);
    });
  }
};

export const gameOverInstructionsOn = () => {
  instructionsElement.style.visibility = "visible";
  gameTitleElement.innerHTML = "RESTART GAME";
  instructionsElement.appendChild(gameTitleElement);
};
