const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.static(__dirname + "/Public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://admin-karan:Test123@thoughtlogs.nyopc.mongodb.net/blogsDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const blogSchema = new mongoose.Schema({
    email: String,
    authorName: String,
    postTitle: String,
    postBodyHtml: String,
    postBodyText: String,
    readTime: Number,
    timeStamp: String
});

const Blog = mongoose.model("blogs", blogSchema);

// const posts = [{
//     _id: "1",
//     heading: "Post Title 1",
//     postBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus urna duis. Sed viverra ipsum nunc aliquet. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Sit amet justo donec enim diam vulputate ut pharetra sit. Est velit egestas dui id ornare arcu odio ut sem. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Aliquam faucibus purus in massa tempor nec feugiat nisl pretium. Ut porttitor leo a diam sollicitudin tempor id eu. Scelerisque viverra mauris in aliquam. Eu feugiat pretium nibh ipsum. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis.               <br><br> Non blandit massa enim nec dui nunc. Et molestie ac feugiat sed lectus. Enim eu turpis egestas pretium aenean pharetra magna ac. Lacinia quis vel eros donec ac. Lacus viverra vitae congue eu consequat ac felis donec. Ac turpis egestas sed tempus urna et pharetra pharetra massa. Tellus elementum sagittis vitae et leo duis ut diam quam. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Nunc eget lorem dolor sed viverra ipsum. Tempus urna et pharetra pharetra. Et ultrices neque ornare aenean euismod. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor.<br><br> Interdum velit laoreet id donec. Augue interdum velit euismod in pellentesque massa placerat. Sit amet massa vitae tortor condimentum lacinia quis. Eget nunc scelerisque viverra mauris in aliquam sem. Cursus sit amet dictum sit amet justo donec. Tempor orci eu lobortis elementum nibh tellus molestie nunc. Ac turpis egestas integer eget aliquet nibh. Ultrices vitae auctor eu augue. Sit amet mattis vulputate enim nulla. Eleifend mi in nulla posuere sollicitudin aliquam.<br><br> Eget velit aliquet sagittis id consectetur purus ut faucibus. Ultrices dui sapien eget mi proin sed libero enim. Proin fermentum leo vel orci porta. Erat nam at lectus urna duis convallis convallis tellus id. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. At in tellus integer feugiat scelerisque varius. Amet aliquam id diam maecenas. Quam id leo in vitae turpis massa sed elementum. Hendrerit dolor magna eget est lorem ipsum. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Sit amet est placerat in egestas erat. Non curabitur gravida arcu ac tortor dignissim convallis aenean. Nunc sed velit dignissim sodales ut eu sem integer vitae. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Venenatis cras sed felis eget velit aliquet. Egestas erat imperdiet sed euismod. Venenatis cras sed felis eget velit aliquet sagittis id.<br><br>  Vel facilisis volutpat est velit. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. At augue eget arcu dictum varius duis at consectetur. Nec feugiat in fermentum posuere urna. Suspendisse ultrices gravida dictum fusce ut placerat. Morbi tincidunt augue interdum velit euismod in. Lectus quam id leo in vitae turpis massa sed elementum. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Consectetur a erat nam at lectus urna duis convallis convallis. Penatibus et magnis dis parturient montes. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Nec feugiat in fermentum posuere urna nec. Consectetur adipiscing elit ut aliquam purus sit amet. Blandit massa enim nec dui nunc. Sagittis orci a scelerisque purus. Cum sociis natoque penatibus et magnis dis parturient.",
//     author: "Andy Georges",
//     date: new Date(),
//     readingTime: 5
// }, {
//     _id: "2",
//     heading: "Post Title 2",
//     postBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consectetur a erat nam at lectus urna duis. Sed viverra ipsum nunc aliquet. Quam elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Sit amet justo donec enim diam vulputate ut pharetra sit. Est velit egestas dui id ornare arcu odio ut sem. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Aliquam faucibus purus in massa tempor nec feugiat nisl pretium. Ut porttitor leo a diam sollicitudin tempor id eu. Scelerisque viverra mauris in aliquam. Eu feugiat pretium nibh ipsum. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis.               <br><br> Non blandit massa enim nec dui nunc. Et molestie ac feugiat sed lectus. Enim eu turpis egestas pretium aenean pharetra magna ac. Lacinia quis vel eros donec ac. Lacus viverra vitae congue eu consequat ac felis donec. Ac turpis egestas sed tempus urna et pharetra pharetra massa. Tellus elementum sagittis vitae et leo duis ut diam quam. Sed blandit libero volutpat sed cras ornare arcu dui vivamus. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam. Nunc eget lorem dolor sed viverra ipsum. Tempus urna et pharetra pharetra. Et ultrices neque ornare aenean euismod. Amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor.<br><br> Interdum velit laoreet id donec. Augue interdum velit euismod in pellentesque massa placerat. Sit amet massa vitae tortor condimentum lacinia quis. Eget nunc scelerisque viverra mauris in aliquam sem. Cursus sit amet dictum sit amet justo donec. Tempor orci eu lobortis elementum nibh tellus molestie nunc. Ac turpis egestas integer eget aliquet nibh. Ultrices vitae auctor eu augue. Sit amet mattis vulputate enim nulla. Eleifend mi in nulla posuere sollicitudin aliquam.<br><br> Eget velit aliquet sagittis id consectetur purus ut faucibus. Ultrices dui sapien eget mi proin sed libero enim. Proin fermentum leo vel orci porta. Erat nam at lectus urna duis convallis convallis tellus id. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. At in tellus integer feugiat scelerisque varius. Amet aliquam id diam maecenas. Quam id leo in vitae turpis massa sed elementum. Hendrerit dolor magna eget est lorem ipsum. Nec tincidunt praesent semper feugiat nibh sed pulvinar. Sit amet est placerat in egestas erat. Non curabitur gravida arcu ac tortor dignissim convallis aenean. Nunc sed velit dignissim sodales ut eu sem integer vitae. Varius morbi enim nunc faucibus a pellentesque sit amet porttitor. Venenatis cras sed felis eget velit aliquet. Egestas erat imperdiet sed euismod. Venenatis cras sed felis eget velit aliquet sagittis id.<br><br>  Vel facilisis volutpat est velit. Ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia. At augue eget arcu dictum varius duis at consectetur. Nec feugiat in fermentum posuere urna. Suspendisse ultrices gravida dictum fusce ut placerat. Morbi tincidunt augue interdum velit euismod in. Lectus quam id leo in vitae turpis massa sed elementum. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Consectetur a erat nam at lectus urna duis convallis convallis. Penatibus et magnis dis parturient montes. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla. Nec feugiat in fermentum posuere urna nec. Consectetur adipiscing elit ut aliquam purus sit amet. Blandit massa enim nec dui nunc. Sagittis orci a scelerisque purus. Cum sociis natoque penatibus et magnis dis parturient.",
//     author: "Andy Georges",
//     date: new Date(),
//     readingTime: 5
// }];

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
        readTime: req.body.readTime,
        timeStamp: today.toLocaleDateString("en-US", options)
    });

    newPost.save();

    res.redirect("/");
})

app.get("/posts/:postId", function(req, res) {
    const postId = req.params.postId;
    console.log(postId);
    // for (let i=0; i< posts.length; i++) {
    //     if(postId == posts[i]._id){
    //         res.render("post", {post: posts[i]});
    //         break;
    //     }
    // }
    Blog.find({_id: postId}, [], function(err, docs) {
        if(err) {
            console.log(err);
        } else {
            console.log(docs);
            res.render("post", {post: docs[0]});
        }
    })
    
});

app.listen(3000, function() {
    console.log("Server is up and running on port 3000.");
});