const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const {v4: uuidv4} = require('uuid'); // to create a random id for posts automatically
const methodOverride = require("method-override");

app.use(express.urlencoded({extend: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Saurabh",
        content: "What are the most important skills to become a full-stack web developer in 2025?",
    },
    {
        id: uuidv4(),
        username: "Henry",
        content: "Traveling solo changed my life. My first solo trip to Himachal helped me grow mentally and emotionally. Highly recommend it to anyone feeling stuck in life.",
    },
    {
        id: uuidv4(),
        username: "Victor",
        content: "If you're preparing for DSA interviews, focus on mastering recursion, dynamic programming, and graph traversal. Practice regularly on LeetCode and GFG.",
    },
];

// Implement : GET
app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
})

// Implement : POST /posts
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/posts", (req, res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

// Implement : GET /posts/:id
app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

// Edit content of post
app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

// delete post
app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("listening to port : 8080");
})