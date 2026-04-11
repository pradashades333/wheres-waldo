const express = require("express");
const router = express.Router();
const controller = require("../controllers/scoresController");

router.get('/:imageId', controller.getLeaderboard)
router.post('/', controller.saveScore)

module.exports = router;