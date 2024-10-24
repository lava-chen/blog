const express = require("express");
const Blogs = require("./models/blogs.js");
const User = require("./models/user.js");
const auth = require("./auth.js");

const router = express.Router();
router.get("/blogs", (req, res) => {
  Blogs.find({}).then((blogs) => {
    res.send(blogs);
  });
});
router.post("/blogs", async (req, res) => {
  // 基本数据验证
  const { title, summary, date, likes, etitle, blogcontent } = req.body;

  if (!title || !blogcontent) {
    return res.status(400).send({ message: "Title and content are required." });
  }

  const newBlog = new Blogs({
    title,
    summary,
    date,
    likes,
    etitle,
    blogcontent,
  });

  try {
    const blog = await newBlog.save();
    res.status(201).send(blog); // 成功创建时返回201状态
  } catch (error) {
    console.error("Error saving blog:", error);
    res.status(500).send({ message: "Error saving the blog." }); // 返回500状态
  }
});

router.post("/login", auth.login);
router.post("/logout", auth.logout);

router.get("/whoami", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    // user is not logged in
    res.send({});
  }
});

router.get("/test", (req, res) => {
  res.send({ message: "Wow I made my first API! In its own file!" });
});

module.exports = router;
