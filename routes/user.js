const express = require('express');
const userroute = express.Router();
const jwt = require('jsonwebtoken');
const pokedb = require('../config/database');

userroute.post('/signin',async (req,res,next)=>{
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
userroute.post('/login',async (req,res,next)=>{
    const {user_mail,user_password}= req.body;
    if(user_mail && user_password){
        let query = "SELECT * FROM user WHERE user_mail = ? AND user_password = ?;";
        const rows = await pokedb.query(query,[user_mail,user_password]);
        if(rows.length == 1){
            const token = jwt.sign({
                user_id:rows[0].user_id,
                user_name:rows[0].user_name
            },"debugkey");
            res.status(200).json({code:200,message:""});
        }else{
            res.status(404).json({code:404,message:"No existe el usuario"});
        }
    }else{
        res.status(404).json({code:404,message:"Uno o mas campos vacios"});
    }
    
});

module.exports = userroute;