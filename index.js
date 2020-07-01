function enviar(){
    var txtEmail = document.getElementById("txtEmail").value;
    var txtSenha = document.getElementById("txtSenha").value;

    console.log("Valores digitados = "+txtEmail+" / "+ txtSenha);

    // json que vai no corpo da mensagem
    var msgBody = {
        email: txtEmail,
        racf: txtEmail,
        senha: txtSenha
    }

    var cabecalho = {
        method : 'POST',
        body   : JSON.stringify(msgBody),
        headers : {
            'Content-type':'application/json'
        }

    }
    fetch("http://localhost:8080/login", cabecalho)
        .then(resposta=>tratarResultado(resposta));
}

function tratarResultado(resp){
    if (resp.status == 200){ // ok, usuario e senha existem
       //alert("Usuario IDENTIFICADO");
       document.getElementById("resposta").innerHTML = "";
       resp.json().then(res => efetivarLogin(res));
    }
    else if (resp.status == 404){  // not found
        //alert("Usuario NAO FOI ENCONTRADO EM NOSSA BASE");
        document.getElementById("resposta").innerHTML = "<h3>Usuario não encontrado</h3>";
    }
    else if (resp.status == 403){  // forbidden
       // alert("Senha INVALIDA");
       document.getElementById("resposta").innerHTML = "<h3>Senha Inválida</h3>";
    }
}

function efetivarLogin(res){
    // qual a idéia? gravar no LocalStorage o objeto que eu recebi
    localStorage.setItem("userDash",JSON.stringify(res));
    // redirecionar para a página HOME.HTML
    window.location="home.html";
}