const express = require("express");
const {postController ,getController} = require("./loginController");
const router = express.Router();

router.get("/",getController);


router.post("/",postController);

module.exports = router;

