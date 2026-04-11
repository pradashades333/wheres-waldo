const express = require("express");
const router = express.Router();
const controller = require("../controllers/imagesController");

router.get('/', controller.getAllImages)
router.get('/:id/characters', controller.getImage)

router.post('/:id/check', controller.checkClick)

module.exports = router;
