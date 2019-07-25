import drawStuff from "./draw-stuff.js";

console.log("start");
const worker = new Worker("./worker.js");

const pingOutput = document.querySelector("#ping ~ output");
const workOutput = document.querySelector("#work ~ output");

worker.addEventListener("message", message => {
  console.log("message received from worker thread", message);
  if (message.data === "pong") {
    pingOutput.textContent = "Pong!";
  } else if (message.data === "done!") {
    workOutput.textContent = "Done!";
  } else {
    console.warn("Unexpected message");
  }
});

// ping
document.querySelector("#ping").addEventListener("click", () => {
  pingOutput.textContent = "";
  worker.postMessage("ping");
});

// work
document.querySelector("#work").addEventListener("click", () => {
  workOutput.textContent = "";
  const time = Number(document.querySelector("#time").value);
  if (document.querySelector("#in-worker").checked) {
    worker.postMessage({ action: "work", time });
  } else {
    const end = Date.now() + time * 1000;
    let now = Date.now();
    while (now < end) {
      now = Date.now();
    }
  }
});

drawStuff();
