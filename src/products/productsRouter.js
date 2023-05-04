const express = require("express");
const { addProduct ,getAllProducts,homepage} = require("./productsController");

const {auth,roleAuth} = require("../authorization");


const router = express.Router();


router.get("/getproducts",getAllProducts)

router.get("/home",homepage)

router.post("/products",auth,roleAuth("admin"),addProduct);



module.exports = router