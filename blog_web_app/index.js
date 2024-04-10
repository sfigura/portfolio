import express from "express";
const app = express();
const port = 3000;

// Middleware
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
import multer from "multer";
const upload = multer({ dest: 'assets/img' });
*/


app.listen(port, () => {
    console.log("Server listening on port: " + port);
});

let blogPosts = [];
let postNr = 0;

app.get("/", (req, res) => {
    res.render("index.ejs", { blogPosts: blogPosts });
});

app.get("/view", (req, res) => {
    //console.log(blogPosts[req.query.id]);
    res.render("view.ejs", { title: blogPosts[req.query.id].title, teaser: blogPosts[req.query.id].teaser, text: blogPosts[req.query.id].text, id: req.query.id });
});

app.get("/create", (req, res) => {

    if (req.query.id) {
        const updateMode = true;
        res.render("create.ejs", { title: blogPosts[req.query.id].title, teaser: blogPosts[req.query.id].teaser, text: blogPosts[req.query.id].text, id: req.query.id, updateMode: updateMode });
    } else {
        const updateMode = false;
        res.render("create.ejs", { title: "", teaser: "", text: "", id: "", updateMode: updateMode }); 
    }
    
});


// Handle form
app.post("/handle-form", (req, res) => {
    
    const date = new Date().toISOString().slice(0, 10);

    if (req.body.action === 'save') {
        savePost(req.body.title, req.body.teaser, req.body.text, date);

    } else if (req.body.action === 'update') {
        updatePost(req.body.id, req.body.title, req.body.teaser, req.body.text, date);

    } else if (req.body.action === 'delete') {
        deletePost(req.body.id);

    } else if (req.body.action === 'cancel') {

    }
    
    res.redirect("/");

    //console.log('Uploaded file info:', req.file);

});

//Delete blog post
function deletePost(id) {
    blogPosts.splice(id, 1);
}

//Save blog post
function savePost(title, teaser, text, date) {
    blogPosts.push({
        title: title,
        teaser: teaser,
        text: text,
        date: date,
    });
}

//Update blog post
function updatePost(id, title, teaser, text, date) {
    blogPosts[id] = {
        title: title,
        teaser: teaser,
        text: text,
        date: date,
    };
}