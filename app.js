const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.static(__dirname + "/Public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://admin-karan:Test123@thoughtlogs.nyopc.mongodb.net/blogsDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect("mongodb://localhost:27017/blogsDB", { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
    email: String,
    authorName: String,
    postTitle: String,
    postBodyHtml: String,
    postBodyText: String,
    space: String,
    readTime: Number,
    timeStamp: String
});

const Blog = mongoose.model("blogs", blogSchema);

app.get("/", function(req, res) {

    Blog.find({}, [], function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {posts: docs});
        }
    });
    
});

app.get("/compose", function(req, res) {
    res.render("compose");
})
app.post("/", function(req, res) {
    console.log(req.body);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const today  = new Date();    
    const newPost = new Blog({
        email: req.body.email,
        authorName: req.body.authorName,
        postTitle: req.body.postTitle,
        postBodyHtml: req.body.postBodyHtml,
        postBodyText: req.body.postBodyText,
        space: req.body.space,
        readTime: req.body.readTime,
        timeStamp: today.toLocaleDateString("en-US", options)
        //timeStamp: today
    });

    newPost.save();

    res.redirect("/");
})

app.get("/posts/:space/:postId", function(req, res) {
    const postId = req.params.postId;
    const space = req.params.space;
    console.log(postId);
    Blog.find({_id: postId}, [], function(err, docs) {
        if(err) {
            console.log(err);
        } else {
            console.log(docs);
            res.render("post", {post: docs[0]});
        }
    })
    
});

app.get("/discover", function(req, res) {

    Blog.find({}, [], {limit: 5}, function(err, docs) {
        res.render("discover", {posts: docs, space: "Latest"});
    });
})

app.get("/posts/:space", function(req, res) {
    if(req.params.space === "Latest") {
        res.redirect("/discover");
    } else {
        Blog.find({space: req.params.space}, [], function(err, docs) {
            if(err ) {
                console.log(err);
            } else {
                res.render("discover", {posts: docs, space: req.params.space});
            }
        })
    }
});

let port = (process.env.PORT || 3000);
app.listen(port, function() {
    console.log("Server is up and running on port 3000.");
});