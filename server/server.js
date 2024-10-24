const express = require("express");
const session = require("express-session"); // library that stores info about each connected user.
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const port = 3001;

const api = require("./api.js");
const auth = require("./auth.js");
const app = express();

const mongoConnectionURL =
  "mongodb+srv://lalluviachen:9AjJwdRXgQzHcW@blog0.4anur.mongodb.net/?retryWrites=true&w=majority&appName=Blog0";

const databaseName = "blog";

mongoose
  .connect(mongoConnectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: databaseName,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

app.use(express.json());
app.use(
  session({
    secret: "session-secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(auth.populateCurrentUser);
app.use(cors());
app.use("/api", api);

app.use("/time", (req, res, next) => {
  console.log("Time:", Date.now());
  next();
});
const reactPath = path.join(__dirname, "..", "public");
app.use(express.static(reactPath));
app.get("*", (req, res) => {
  res.sendFile(path.join(reactPath, "index.html"));
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) {
    console.log("Internal Server Error");
    console.log(err);
  }
  res.status(status);
  res.send({
    status: status,
    message: err.message,
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
