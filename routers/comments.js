const express = require('express');
const db = require('../data/db');

const router = express.Router({
  mergeParams: true
});

router.get('/:id/comments', (req, res) => {
  db.findPostComments(req.params.id)
    .then(data => {
      if (data.length) {
        res.json(data);
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
