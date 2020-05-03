const express = require('express');
const userroute = express.Router();
const pokedb = require('../config/database');

userroute.post('/',async (req,res,next)=>{
    const {user_name,user_mail,user_password} = req.body;
    if(user_name && user_mail && user_password){
        let query = "INSERT INTO user VALUES (NULL,?,?,?)";
        const rows = await pokedb.query(query,[user_name.user_mail,user_password]);
        if (rows.affectedRows == 1){
            res.status(200).json({code:200,message:"Usuario insetado correctamente"});
        }else{
            res.status(500).json({code:500,message:"Ocurrio un error"});
        }
    }else{
        res.status(500).json({code:500,message:"Uno o mas campos vacios"});
    }
});
userroute.get('/',async (req,res,next)=>{
    let query="SELECT * FROM user;";
    const rows = await pokedb.query(query).catch(()=>{
        res.status(500).json({code:500,message:"Se produjo un error"});
    });
    res.status(200).json({code:200,message:rows});
});

module.exports = userroute;