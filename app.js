const express = require("express");
const ejs = require("ejs");

const app = express();

app.use(express.static(__dirname + "/Public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index");
});


app.listen(3000, function() {
    console.log("Server is up and running on port 3000.");
});