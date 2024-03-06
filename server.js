// imports express library
const express = require("express");
// include body parser library
const parser = require("body-parser");
const encodedParser = parser.urlencoded({ extended: true });
// include multer library
const multer = require("multer");
const uploadProcessor = multer({ dest: "public/project3/upload" });

// initialize express
const app = express();

// initialize public folder for assets
app.use(express.static("public"));
// initialize body parser with the app
app.use(encodedParser);

// initialize template engine to look at views folder for rendering
app.set("view engine", "ejs");

// TODO INCLASS: SET UP ROUTES!
app.get("/project3/", (req, res) => {
  const alldata = {
    allposts: data
  };

  res.render("index.ejs", alldata);
});

app.get("/project3/about", (req, res) => {
  res.render("about.ejs");
});

// array that stores all of the data on the server
let data = [];

// global variable to keep track of how many posts
let postId = 0;

// new route to handle uploaded data
app.post("/project3/upload", uploadProcessor.single("theimage"), (req, res) => {
  let now = new Date();

  // message object that holds the data from the form
  let message = {
    id: postId,
    text: req.body.text,
    date: now.toLocaleString()
    // comments: {
    //   data: [],
    //   id: 0,
    // },
  };

  // incrementing number after every post is created to generate a new id
  postId++;

  // checks to see if a file has been uplaoded
  if (req.file) {
    message.imgSrc = "upload/" + req.file.filename;
  }

  // adding the most recent message to the top of the array
  data.unshift(message);

  res.redirect("/project3");
});

for(let i=0; i<data.length; i++){

    let commentData = [];
    let commentId = 0;

  app.post("/project3/comments", uploadProcessor.single("theimage"), (req, res) => {
      let now = new Date();

      let message = {
        id: commentId,
        text: req.body.text,
        date: now.toLocaleString(),
      };

      commentId++;

      if (req.file) {
        message.imgSrc = "comments/" + req.file.filename;
      }

      commentData.unshift(message);

      res.redirect("/project3");
    }
  );
}

  
// app.get('/project3/delete', (req, res) => {
//     console.log(req.query)
//     for(let i=0; i < data.length; i++){
//         let post = data[i]
//         if(post.id == req.query.postId){
//             data.splice(i, 1)
//         }
//     }
//     // data.forEach( (post) => {})
//     res.redirect('/project3/')
// })

// setting up the server to start
// LAST PIECE OF CODE
// for projects going forward, it CANNOT be 80
app.listen(5555, () => {
  console.log("server starts");
});
