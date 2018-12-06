const express = require("express");
const bodyParser = require("body-parser");

// const mongoose = require('mongoose');
const mysql = require('mysql');


// const Post = require('./models/post');

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dart4321$",
  database: "posts"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("connected");
  var sql = "INSERT INTO post (title, content) VALUES ? app";
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});

// mongoose.connect("mongodb+srv://ravi:RsOX1SvsnRHl8VYu@cluster0-agtqo.mongodb.net/side?retryWrites=true")
// .then(()=> {
//   console.log("connetcted to db");
// })
// .catch(() => {
//   console.log("connetcion failed");
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

post.save();                  //database

  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "fadf12421l",
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side post",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

module.exports = app;
