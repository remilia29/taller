const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const pokeroute = require('./routes/pokemon');
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(morgan('dev'));

dotenv.config();

app.get('/',(req,res,next)=>{
    res.send("Beinvenido a la pokedex...");
});

app.use("/pokemon",pokeroute);

app.listen(process.env.PORT || 3000,()=>{
    console.log("App en el puerto 3000");
});