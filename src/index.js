import "./styles/index.scss";
import game from "./js/game";

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("content-container").appendChild(game);
});
