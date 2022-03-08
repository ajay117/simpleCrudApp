const express = require("express");
const app = express();
var methodOverride = require("method-override");
const path = require("path");
const { v4: uuid } = require("uuid");
const bodyParser = require("body-parser");
const PORT = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

let comments = [
  {
    id: uuid(),
    username: "Ajay",
    comment: "Hi, my name is Ajay",
  },
  {
    id: uuid(),
    username: "Bijay",
    comment: "What's up, my name is Bijay",
  },
  {
    id: uuid(),
    username: "Sanjay",
    comment: "Yo, I am Sanjay",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuid() });
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comment = comments.find((obj) => obj.id === id);
  res.render("comments/show", { comment });
});

app.get("/comments/:id/edit", (req, res) => {
  const id = req.params.id;
  const comment = comments.find((obj) => obj.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const id = req.params.id;
  const newCommentText = req.body.comment;
  const comment = comments.find((comment) => comment.id === id);
  comment.comment = newCommentText;
  res.redirect("/comments");
});

app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  const filteredComments = comments.filter((comment) => comment.id !== id);
  comments = filteredComments;
  res.redirect("/comments");
});

app.get("/", (req, res) => {
  res.send("Get / request");
});

app.post("/item", (req, res) => {
  let { name, price } = req.body;
  console.log(req.body);
  res.send(`The item is ${name} and the price is ${price}`);
});

app.listen(PORT, () => {
  console.log("Server has started");
});
