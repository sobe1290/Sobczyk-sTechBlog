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

  router.put('/:id', (req, res) => {
    Post.update({
            postTitle: req.body.postTitle,
            postBody: req.body.postBody
        }, {
            where: {
                id: req.params.id
            }
        }).then(updatePostData => {
            if (!updatePostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(updatePostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', async (req, res) => {
  try {
    const onePost = await Post.findOne({
      where: {id: req.params.id},
    });
    const renderOnePost = onePost.get({ plain: true })

    res.render('editPost', {
      renderOnePost,
      logged_in: req.session.logged_in,
    })

  } catch (err) {
    console.log(err);
    res.send(err);
  }
})

module.exports = router;
