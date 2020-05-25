window.onload = init;

var headers = {};
var url = "http://localhost:3000/";

function init(){
    if(sessionStorage.getItem("token")){
        headers = {headers:{
            'Authorization': "bearer" + sessionStorage.getItem("token")
        }};
        loadPokemon();
    }else{
        window.location.href("index.html");
    }
}
function loadPokemon(){
    axios.get(url+"pokemon",headers).then((res)=>{
        console.log(res);
        displayPokemon(res.data.message);
    }).catch((error)=>{
        console.log(error);
    });
}
function displayPokemon(pokemon){
var body = document.querySelector("body");
for(var i = 0; i <= loadPokemon.length;i++){
    body.innerHTML += `<h3>${pokemon[i].pok_name}</h3>`;
}
}; 