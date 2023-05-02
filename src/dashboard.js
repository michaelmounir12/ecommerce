const router = require("express").Router();
const path = require("path");
router.get("/dashboard",getDashBoard)

function getDashBoard(req,res,next)
{

   res.sendFile(path.join(__dirname,"public","HTML","index.html"));

}



module.exports = router;