const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username'],
      },

      ],
    }).catch((err) => {
      res.json(err);
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const myPosts = await Post.findAll({
      where: { userId: req.session.user_id },
      include: [{
        model: User,
        attributes: ['username'],
      },

      ],
    }).catch((err) => {
      res.json(err);
    });
    const posts = myPosts.map((mypost) => mypost.get({ plain: true }));
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/loggedout', (req, res) => {
  try {
    res.render('loggedout');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newpost', withAuth, (req, res) => {
  try {
    res.render('newpost', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const onePost = await Post.findOne({
      where: { id: req.params.id },
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    const renderOnePost = onePost.get({ plain: true });

    res.render('onePost', {
      renderOnePost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post('/addcomment', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      commentBody: req.body.commentBody,
      userId: req.session.user_id,
      commentPostId: req.body.postNumber,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(commentData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/mypost/:id', withAuth, async (req, res) => {
  try {
    const onePost = await Post.findOne({
      where: { id: req.params.id },
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    const renderOnePost = onePost.get({ plain: true });

    res.render('myOnePost', {
      renderOnePost,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    const oneComment = await Comment.findOne({
      where: { id: req.params.id },
    });
    const renderOneComment = oneComment.get({ plain: true });

    res.render('editComment', {
      renderOneComment,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.put('/updatecomment', withAuth, (req, res) => {
  Comment.update({
    commentBody: req.body.commentBody,
  }, {
    where: {
      id: req.body.id,
    },
  }).then((updateCommentData) => {
    if (!updateCommentData) {
      res.status(404).json({ message: 'No comment found with this id' });
      return;
    }
    res.json(updateCommentData);
  })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/comment/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((thisPost) => {
      if (!thisPost) {
        res.status(404).json({ message: 'No Post found with this id' });
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
