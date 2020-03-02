import "./styles/index.scss";

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("center");
  document.body.classList.add("page-bg");

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  const leftNav = document.createElement("div");
  leftNav.classList.add("left-nav");

  const topNav = document.createElement("div");
  topNav.classList.add("top-nav");

  const gameContainer = document.createElement("div");
  gameContainer.classList.add("game-container");

  contentContainer.appendChild(gameContainer);
  contentContainer.appendChild(leftNav);
  contentContainer.appendChild(topNav);

  document.body.appendChild(contentContainer);
});
