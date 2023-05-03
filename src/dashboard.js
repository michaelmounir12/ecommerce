const router = require("express").Router();
const path = require("path");
require("dotenv").config()
router.get("/dashboard",getDashBoard)

function getDashBoard(req,res,next)
{

   res.sendFile(path.join(__dirname,process.env.STATE ==="dev"?"public/dash-tool.html":"../dist/dash-tool.html",));

}



module.exports = router;