import "./styles/index.scss";

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("center");
  document.body.classList.add("page-bg");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  const topNav = document.createElement("div");
  topNav.classList.add("top-nav");

  const leftNav = document.createElement("div");
  leftNav.classList.add("left-nav");
  const gameContainer = document.createElement("div");
  gameContainer.classList.add("game-container");

  const bottomSection = document.createElement("div");
  bottomSection.classList.add("bottom-section");
  bottomSection.appendChild(leftNav);
  bottomSection.appendChild(gameContainer);

  contentContainer.appendChild(topNav);
  contentContainer.appendChild(bottomSection);

  document.body.appendChild(contentContainer);
});
