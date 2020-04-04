const express = require('express');
const pokeroute = express.Router();

const pokedb = require('../config/database');

pokeroute.post('/',async (req,res,next)=>{
    const getAllPokimones = await pokedb.query("SELECT * FROM pokemon;");
    res.status(200).json(getAllPokimones);
});
pokeroute.get('/',async (req,res,next)=>{

    const getAllPokimones = await pokedb.query("SELECT * FROM pokemon;");
    
    res.status(200).json(getAllPokimones);
});

pokeroute.get('/:id([0-9]{1,3})',async (req,res,next)=>{
    var idpoke = req.params.id;
    const obtenerPokeId = await pokedb.query("SELECT * FROM pokemon WHERE pok_id = ?;",[idpoke]);
    (obtenerPokeId.length > 0) ? res.status(200).json(obtenerPokeId) : res.status(404).send("Pokemon no existe");
});
pokeroute.get('/:name([A-Za-z]+)',async (req,res,next)=>{
    var pokename = req.params.name;
    const obtenerPokeName = await pokedb.query("SELECT * FROM pokemon WHERE lower(pok_name) = ?;",[pokename.toLowerCase()]);
    (obtenerPokeName.length > 0) ? res.status(200).json(obtenerPokeName) : res.status(404).send("Pokemon no encontrado") ;

    
});
module.exports = pokeroute;