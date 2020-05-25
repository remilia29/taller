function init(){
    if(!sessionStorage.getItem("token")){
        document.querySelector('.btn-secondary').addEventListener('click',()=>{
            window.location.href = "signin.html";
        });
        document.querySelector('.btn-primary').addEventListener('click',login);
    }else{
        window.location.href("pokedex.html");
    }
    }
    
function login(){
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-password').value;

    axios({
        method:'post',
        url:'http://localhost:3000/user/login',
        data:{
            user_mail: mail,
            user_password:password
        }