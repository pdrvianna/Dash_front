var templateBarra = `<img src="**FOTO**" width="35px"> 
                       Bem vindo **NOME**
                       (<a href="departamento.html?id=**IDDEP**">**DEPARTAMENTO**</a>)`;


function logout(){
    localStorage.removeItem("userDash");
    window.location="index.html";
}
function verificaUsuario(){
    // existe alguma info de "userDash" no armazenamento local?
    var userLogado = localStorage.getItem("userDash");
    if (!userLogado){
        // se não tiver, redireciona pra o INDEX  (ou seja, não tá logado)
        window.location="index.html";
    }
    else{
        // se tiver, mostra na barrinha
        var user = JSON.parse(userLogado);
        document.getElementById("barraUser").innerHTML = templateBarra
                                                    .replace("**FOTO**",user.linkFoto)
                                                    .replace("**NOME**", user.nome)
                                                    .replace("**IDDEP**",user.depto.id)
                                                    .replace("**DEPARTAMENTO**",user.depto.nome);
    }
}