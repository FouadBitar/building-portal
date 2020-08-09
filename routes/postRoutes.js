const _ = require('lodash');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const isAuthenticated = require('../middlewares/isAuthenticated');

const Post = mongoose.model('posts');
const Comment = mongoose.model('comments');

module.exports = app => {

    app.get('/api/posts', isAuthenticated, async (req, res) => {
        const posts = await Post.find({});

        res.send(posts);
    });

    app.post('/api/posts', isAuthenticated, async (req, res) => {
        const { title, cost, body } = req.body;

        const post = new Post({
            title,
            body,
            date: Date.now(),
            cost,
            comments: [],
            _user: req.user.id
        });

        const p = await post.save();
        res.send(p);
    });

    app.post('/api/comments', isAuthenticated, async(req, res) => {
        const comment = new Comment({
            date: Date.now(),
            body: req.body.commentText
        });

        const post = await Post.updateOne({
            _id: req.body.postId
        }, {
            $push: { comments: comment }
        });

        res.send('all is great boss');
    });
    app.post('/api/comments/test', async(req, res) => {
        const comment = new Comment({
            date: Date.now(),
            body: req.body.commentText
        });

        const post = await Post.updateOne({
            _id: req.body.postId
        }, {
            $push: { comments: comment }
        });

        res.send('all is great boss');
    });

    app.put('/api/comments', isAuthenticated, async(req, res) => {
        const post = await Post.findOne({
            _id: req.body.postId
        });

        _.remove(post.comments, (n) => {
            return n._id == req.body.comment._id
        });

        await post.save();
        res.send('all good boss');
    });

    app.post('/api/comments/delete', isAuthenticated, async(req, res) => {
        const post = await Post.updateOne(
            { _id: req.body.postId },
            { $pull: 
                { comments: 
                    {
                        _id: ObjectID(req.body.commentId),
                    } 
                } 
            }
        );
        
        res.send('all good boss');
    });

    app.post('/api/posts/delete', isAuthenticated, async(req, res) => {
        const post = await Post.deleteOne({ _id: req.body.postId });
        
        res.send('all good boss');
    });
    
};