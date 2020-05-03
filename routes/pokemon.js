const express = require('express');
const pokeroute = express.Router();

//var {pokemon} = require('../PokedexData/pokedex.json');

const pokedb = require('../config/database');

pokeroute.post('/',async (req,res,next)=>{
    const {pok_name,pok_height,pok_weight,pok_base_experience} = req.body;
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        const getAllPokimones = 
        await pokedb.query("INSERT INTO pokemon (pok_name,pok_height,pok_weight,pok_base_experience) VALUES (?,?,?,?);",
        [pok_name,pok_height,pok_weight,pok_base_experience]).then(()=>{res.status(201).json({code: 201, message:"Pokemon insertado correctamente"});}
        ).catch(()=>{
            res.status(500).json({code:500,message:"Se produjo un error"});
        }); 
    }else{
        res.status(500).json({code:500,message:"Uno o mas campos vacios"});
    }
    
});
pokeroute.get('/',async (req,res,next)=>{
    /** No pude escribir pokedex en ASCII uwu
     * 
     * Font.create('Bievenido a la Pokedex', 'Doom', function(error,result){
        res.set('Content-Type', 'text/html');
        res.end(result);
    });
     * 
     */
    const getAllPokimones = await pokedb.query("SELECT * FROM pokemon;");
    //console.log(getAllPokimones);
    res.status(200).json({code: 1, message:getAllPokimones});
});
pokeroute.delete('/:id([0-9]{1,3})',async (req,res,next)=>{
    const query = "DELETE FROM pokemon WHERE pok_id = ? ;";
    const rows = await pokedb.query(query,[req.params.id]);
    if(rows.affectedRows == 1){
        res.status(200).json({code:200,message:"Pokemon borrado correctamente"});
    }else{
        res.status(404).json({code:404,message:"No se ha encontrado pokemon"});
    }
});
pokeroute.put('/:id([0-9]{1,3})',async (req,res,next)=>{
    const {pok_name,pok_height,pok_weight,pok_base_experience} = req.body;
    const query = "UPDATE pokemon SET pok_name = ?, pok_height = ?, pok_weight = ?, pok_base_experience = ?  WHERE pok_id = ?;";
    const rows = await pokedb.query(query,[pok_name,pok_height,pok_weight,pok_base_experience,req.params.id]);
    if(rows.affectedRows == 1){
        res.status(200).json({code:200,message:"Pokemon borrado correctamente"});
    }else{
        res.status(404).json({code:404,message:"No se ha encontrado pokemon"});
    }
});
pokeroute.patch('/:id([0-9]{1,3})',async (req,res,next)=>{
    const query = "UPDATE pokemon SET pok_name = ? WHERE pok_id = ?;";
    const rows = await pokedb.query(query,[req.body.pok_name,req.params.id]);
    if(rows.affectedRows == 1){
        res.status(200).json({code:200,message:"Pokemon borrado correctamente"});
    }else{
        res.status(404).json({code:404,message:"No se ha encontrado pokemon"});
    }
});
/*

pokeroute.post('/',async (req,res,next)=>{
    var idpoke = req.body.id;
    const obtenerPokeId = await pokedb.query("SELECT * FROM pokemon WHERE pok_id = ?;",[idpoke]);
    (obtenerPokeId.length > 0) ? res.status(200).json(obtenerPokeId) : res.status(404).send("Pokemon no existe");
});
pokeroute.post('/',async (req,res,next)=>{
    var pokename = req.body.name;
    const obtenerPokeName = await pokedb.query("SELECT * FROM pokemon WHERE lower(pok_name) = ?;",[pokename.toLowerCase()]);
    (obtenerPokeName.length > 0) ? res.status(200).json(obtenerPokeName) : res.status(404).send("Pokemon no encontrado") ;
});

*/
pokeroute.get('/:id([0-9]{1,3})',async (req,res,next)=>{
    var idpoke = req.params.id;
    const obtenerPokeId = await pokedb.query("SELECT * FROM pokemon WHERE pok_id = ?;",[idpoke]);
    (obtenerPokeId.length > 0) ? res.status(200).json({code: 1, message:obtenerPokeId}) : res.status(404).json({code: 404, message:"No se encontro el pokemon"});
});
pokeroute.get('/:name([A-Za-z]+)',async (req,res,next)=>{
    var pokename = req.params.name;
    const obtenerPokeName = await pokedb.query("SELECT * FROM pokemon WHERE lower(pok_name) = ?;",[pokename.toLowerCase()]);
    (obtenerPokeName.length > 0) ? res.status(200).json({code: 1, message:obtenerPokeName}) : res.status(404).json({code: 404, message:"No se encontro el pokemon"}) ;
    //var monster = pokemon.filter(p => p.name.toLowerCase() == pokename.toLowerCase());
    //(monster.length > 0) ? res.status(200).send(monster) : res.status(404).send("Pokemon no encontrado") ;
    /**
     * var pokename = req.params.name;
    var encontrado = false;
   for(let element of pokemon ){
        if (element.name == pokename){
            encontrado = true;
            res.status(200).send(element);
            break;
        }
    }
    if(!encontrado){
        res.status(404).send("Pokemon no encontrado");
    }
     */
    
});
module.exports = pokeroute;