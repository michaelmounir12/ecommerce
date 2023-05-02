const router = require("express").Router()


router.get("/signout",signOut)

function signOut(req,res,next)
{
    res.clearCookie('jwt');
    req.app.locals.user = null;
    res.redirect("/login");
}

module.exports = router;