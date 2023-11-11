// Create web server
// Create database connection
// Create schema and model
// Create routes

// Import modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create web server
const app = express();

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Create schema and model
const CommentSchema = new mongoose.Schema({
  name: String,
  email: String,
  comment: String
});
const Comment = mongoose.model('Comment', CommentSchema);

// Use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/comments', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      res.send(err);
    }
    res.json(comments);
  });
});

app.post('/comments', function(req, res) {
  const comment = new Comment();
  comment.name = req.body.name;
  comment.email = req.body.email;
  comment.comment = req.body.comment;

  comment.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Comment successfully added!' });
  });
});

app.listen(8080, function() {
  console.log('Server running at http://localhost:8080');
});

// Run the server: node comments.js
// Open browser: http://localhost:8080
// Open another browser tab: http://localhost:8080/comments
// Use Postman to test POST request
// Use Robo 3T to view database
// Import modules