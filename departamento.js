var templateUser = `<div class="row">
                        <div class="col-md-12">
                           <h3>**NOME**</h3>
                           Email: **EMAIL**
                           RACF:  **RACF**
                           <hr>
                        </div>
                    </div>`;
function carregaDadosDepto(){
    var parametro = window.location.search;
    console.log("URL = "+parametro);

    var numDepto = parametro.substr(4);

    console.log("Numero do departamento = "+numDepto);

    // a partir daqui posso fazer um fetch no endpoint de departamento e
    // preencher um conjunto de linhas com todos os usuários daquele depto
    fetch("http://localhost:8080/departamentos/"+numDepto)
      .then(res => res.json())
      .then(res => preenche(res))
}

function preenche(res){
    console.log(res);    
    var linha = "";
    for (i=0; i<res.listaUsuarios.length; i++){
        var user = res.listaUsuarios[i];
        linha = linha + templateUser.replace("**NOME**",user.nome)
                                    .replace("**EMAIL**",user.email)
                                    .replace("**RACF**", user.racf);
    }
    document.getElementById("conteudo").innerHTML = linha;
}