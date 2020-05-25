window.onload = init;

function init(){
    if(!sessionStorage.getItem("token")){
    document.querySelector('.btn-secondary').addEventListener('click',()=>{
        window.location.href = "login.html";
    });
    document.querySelector('.btn-primary').addEventListener('click',signin);
}else{
    window.location.href("pokedex.html");
}
}
function signin(){
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;
    var name = document.getElementById('input-name').value;
    axios({
        method:'post',