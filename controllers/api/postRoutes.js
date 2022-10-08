const router = require('express').Router();
const { User, Post, Comment } = require('../../models');



router.post('/', async (req, res) => {
    try {
      const postData = await Post.create({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody,
        userId: req.session.user_id
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

  router.delete("/:id", (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((thisPost) => {
        if (!thisPost) {
          res.status(404).json({ message: "No Post found with this id" });
          return;
        }
        res.json(thisPost);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;
