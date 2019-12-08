const express = require('express');
const db = require('../data/db');
const commentsRouter = require('./comments');

const router = express.Router({
  mergeParams: true
});

router.use('/', commentsRouter);

/**
 * End point: `/api/posts`
 * Method: GET
 * description: get all the posts
 * Statuses: 200, 500
 */
router.get('/', (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        error: 'The posts information could not be retrieved.'
      });
    });
});

/**
 * Description: Posts end point, method POST. Used to post the results back to the database
 * Endpoint: `/api/posts`
 * Method: POST
 * Statuses: 400, 201, 500
 */
router.post('/', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.'
    });
  }

  const content = {
    title: req.body.title,
    contents: req.body.contents
  };

  db.insert(content)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

/**
 * End point: `/api/posts/:id`
 * Method: GET
 * description: retrieves specific post with said id.
 * statuses: 200, 404, 500
 */
router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

/**
 * End point : `api/posts/:id`
 * method: PUT
 * description: update post at specified ID.
 */
router.put('/:id', (req, res) => {
  console.log(req.params);
  db.findById(req.params.id)
    .then(post => {
      if (!req.body.title || !req.body.contents) {
        return res.status(400).json({ errorMessage: "please enter title and contents." })
      } else if (!post) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      } else {

        const newPost = {
          title: req.body.title,
          contents: req.body.contents
        }

        db.update(req.params.id, newPost)
          .then(post => {
            console.log('POST?', newPost)
            if (post) {
              res.status(200).json(newPost);
            } else {
              res.status(400).json({ errorMessage: "data was unable to post." })
            }
          })
          .catch(err => {
            console.log(err);
            res
              .status(500)
              .json({ error: 'The post information could not be retrieved.' });
          })
      }
    })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log('id', id);
  db.findById(id)
    .then(post => {
      console.log(post)
      if (post.length > 0) {
        db.remove(post);
        res.status(400).json({ message: "message was deleted" });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: "The post could not be removed" })
    })
});

module.exports = router;
