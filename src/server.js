const express = require("express");
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const mongoose = require("mongoose");
require("dotenv").config();




async function init()
{

    try {

        await mongoose.connect(`mongodb+srv://michael:${process.env.MONGO_KEY}@cluster0.odlxas7.mongodb.net/?retryWrites=true&w=majority`)
        



        server.listen(process.env.PORT,(err)=>
        {
            if(err)
            {throw new Error("cannot start server")};
        
                console.log("started server on port 5000....");
            
        })

    } catch (error) {
        console.log(error);
    }
   

}


init();




