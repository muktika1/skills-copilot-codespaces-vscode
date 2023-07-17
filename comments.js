// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto')

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Store comments in memory
const commentsByPostId = {};

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Create a comment for a post
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');

    // Get the comment array for the post id
    const comments = commentsByPostId[req.params.id] || [];

    // Add new comment to the array
    comments.push({ id: commentId, content: req.body.content });

    // Store the comment array
    commentsByPostId[req.params.id] = comments;

    // Send comment array back
    res.status(201).send(comments);
});

// Start web server
app.listen(4001, () => {
    console.log('Listening on 4001');
});