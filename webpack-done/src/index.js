import "./style.css";

console.log("Hello World from your main file!");

const root = document.querySelector("#root");

let tick = 0;

setInterval(() => {
  tick++;
  root.textContent = `Tick: ${tick}`;
}, 1000);
