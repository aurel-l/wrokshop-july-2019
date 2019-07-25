console.log("worker start");

self.addEventListener("message", message => {
  console.log("message received from main thread", message);
  if (message.data === "ping") {
    self.postMessage("pong");
  } else {
    const end = Date.now() + message.data.time * 1000;
    let now = Date.now();
    while (now < end) {
      now = Date.now();
    }
    self.postMessage("done!");
  }
});
