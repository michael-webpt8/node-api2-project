const express = require('express');
const db = require('../data/db');

const router = express.Router({
    mergeParams: true
})

router.get('/', (req, res) => {
    db.find()
        .then(data => {
            if (data) {
                res.json(data);
            } else {
                res.json(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({

            })
        })
})

module.exports = router;