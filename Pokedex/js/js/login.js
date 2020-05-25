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
        url:'http://localhost:3000/user/signin',
        data:{
            user_name: name,
            user_mail: mail,
            user_password:password
        }
    }).then((res)=>{
        if (res.code) {
            console.log(res);
            alert("Registro exitoso");
            window.location.href('login.html');
        }
    }).catch((error)=>{
        console.log(error);
    });
}