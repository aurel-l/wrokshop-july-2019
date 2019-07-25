const express = require("express");
const { sleep } = require("timing-functions");

const app = express();

const PORT = 3456;

// logger
app.use((req, res, next) => {
  console.log(`Request to "${req.originalUrl}" at ${new Date().toISOString()}`);
  next();
});
// 3rd-party middlewares at http://expressjs.com/en/resources/middleware.html

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/users/", (req, res) => {
  res.json(["user A", "user B"]);
});

app.get("/users/:userID", async (req, res) => {
  await sleep(1000); // simulate getting from database
  res.json({ user: req.params.userID });
});

app.listen(PORT, () => {
  console.log(`Go to http://localhost:${PORT}`);
});
