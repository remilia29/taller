const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
//const Font = require('ascii-art-font');
const pokeroute = require('./routes/pokemon');
const userroute = require('./routes/user');
const app = express();
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/corsconfig');


//app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended:true}));
app.use(cors);
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
app.get('/',index);

app.use("/user",userroute);
app.use(auth);
app.use("/pokemon",pokeroute);

app.use(notFound);

app.listen(process.env.PORT || 3000,()=>{
    console.log("App en el puerto 3000");
});