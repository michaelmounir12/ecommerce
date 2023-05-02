const express = require("express");
const {postUser,getController} = require("./registerController");
const router = express.Router();

router.post("/",postUser);
router.get("/",getController);
module.exports = router;
