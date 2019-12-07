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

module.exports = router;
