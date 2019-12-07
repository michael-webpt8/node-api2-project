const express = require('express');
const db = require('../data/db');

const router = express.Router({
  mergeParams: true
});
/**
 * End point: `/api/posts/:id/comments`
 * method: GET
 * description: gets comments if available for id.
 * statuses: 200, 404, 500
 */
router.get('/:id/comments', (req, res) => {
  db.findPostComments(req.params.id)
    .then(data => {
      if (data.length) {
        res.status(200).json(data);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: 'server error, according to Mikey' });
    });
});

/**
 * end point: `/api/posts/:id/comments`
 * method: POST
 * description: post new message to comments on id specified.
 * statuses: 500
 */
router.post('/:id/comments', (req, res) => {
  console.log('ID', req.params.id)
  console.log('Params', req.params);
  db.findCommentById(req.params.id)


    .then(comment => {
      if (comment.length > 0) {
        console.log(comment.comment.text);
      }
      // if (!req.params.text || !req.params.post) {
      //   return res
      //     .status(400)
      //     .json({ errorMessage: 'Please Provide text ', comment });
      console.log('COMMENT', comment);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'P' });
    });
});

module.exports = router;
