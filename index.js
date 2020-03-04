const express = require('express');
const app = express();

app.get('/', (req,res,next) => {
    res.send("bienvenido");
});

app.get('/:nombre', (req,res,next)=>{
   // var nombre = req.query.nombre;
    //res.status
    res.send("hola,"+(req.params.nombre) );
});

app.listen(process.env.PORT||3000, ()=> {
    console.log ("server is runnin...")
});