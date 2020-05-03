const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
//const Font = require('ascii-art-font');
const pokeroute = require('./routes/pokemon');
const userroute = require('./routes/user');
const app = express();

//app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

dotenv.config();
/**Codigo anterior
app.get('/',(req,res,next)=>{
    res.send("Bienvenido");
});
app.get('/:nombre',(req,res,next)=>{
    //var nombre = req.query.nombre;
    //res.status(200).json({message:"Exito, "+nombre});
    res.send("Hola, "+req.params.nombre);
});
**/
app.get('/',(req,res,next)=>{
    res.send("Beinvenido a la pokedex...");
});

app.use("/pokemon",pokeroute);
app.use("/user",userroute);

app.use((req,res,next)=>{
    res.status(404).json({code:404,message:"No encontre nada :c"});
});

app.listen(process.env.PORT || 3000,()=>{
    console.log("App en el puerto 3000");
});
