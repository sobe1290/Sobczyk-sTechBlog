const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try{ 
    const postData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username'],
      }

      ]
    }).catch((err) => { 
      res.json(err);
    });
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('homepage', { 
        posts,
      logged_in: req.session.logged_in });
  } catch (err) {
      res.status(500).json(err);
  };   
 
});

router.get('/signup', async (req, res) => {
  try{ 
      res.render('signup');
  } catch (err) {
      res.status(500).json(err);
  };  
}

)

router.get('/login', (req, res) => {
  try{ 
    res.render('login');
} catch (err) {
    res.status(500).json(err);
}; 
});

router.get('/dashboard', (req, res) => {
  try{ 
    res.render('dashboard',{
      logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
}; 
});

router.get('/loggedout', (req, res) => {
  try{ 
    res.render('loggedout');
} catch (err) {
    res.status(500).json(err);
}; 
});

router.get('/newpost', withAuth, (req, res) => {
  try{ 
    res.render('newpost',{
      logged_in: req.session.logged_in,
    });
} catch (err) {
    res.status(500).json(err);
}; 
});

router.get('/post/:id', async (req, res) => {
  try {
    const onePost = await Post.findOne({
      where: {id: req.params.id},
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
    const renderOnePost = onePost.get({ plain: true })

    res.render('onePost', {
      renderOnePost,
      logged_in: req.session.logged_in,
    })

  } catch (err) {
    console.log(err);
    res.send(err);
  }
})

module.exports = router;