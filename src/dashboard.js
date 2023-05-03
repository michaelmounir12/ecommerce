const router = require("express").Router();
const path = require("path");
require("dotenv").config()
router.get("/dashboard",getDashBoard)

function getDashBoard(req,res,next)
{

   res.sendFile(path.join(__dirname,process.env.STATE ==="dev"?"public":"dist","HTML","index.html"));

}



module.exports = router;