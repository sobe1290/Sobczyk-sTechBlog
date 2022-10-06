const router = require('express').Router();
const { User, Post, Comment } = require('../../models');



router.post('/', async (req, res) => {
    try {
      const postData = await Post.create({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody,
        authorUserId: req.session.user_id
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(postData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

module.exports = router;
