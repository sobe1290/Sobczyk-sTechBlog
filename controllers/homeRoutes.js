const router = require('express').Router();
const { raw } = require('express');
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['name', 'ASC']],
//     });

//     const users = userData.map((project) => project.get({ plain: true }));

//     res.render('homepage', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/', async (req, res) => {
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
      res.render('homepage', { posts });
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
    res.render('dashboard');
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

module.exports = router;