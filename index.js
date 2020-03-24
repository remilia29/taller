const express = require('express');
const app = express();
const{pokemon} = require ('./pokedex.json');

app.get('/', (req,res,next) => {
    res.status(200);
    res.send("bienvenido al poquedex");
});

app.get('/pokemon', (req,res,next)=>{
   res.status(200)
    res.send(pokemon);
});

app.get('/poquemon/:id',(req,res,next)=> {
    res.status(200);
    res.send (pokemon [req.params.id - 1]);
});

app.listen(process.env.PORT || 3000, () =>{
    console.log("server is rinning...");
});