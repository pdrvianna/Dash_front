var templateUSR = `<div class="row rowuser">
                        <div class="col-md-2 comborda">
                           <img src="**LINKFOTO**" width="100%">
                        </div>
                        <div class="col-md-6 comborda">
                            <h3> **NOME** </h3>
                            Racf: **RACF** <br>
                            Email: **EMAIL** <br>
                        </div>

                        <div class="col-md-4 comborda">
                            <h4>**NOMEDEPTO**</h4>
                            Unidade: **UNIDADE** <br>
                            Andar: **ANDAR**
                        </div>
                   </div>`;

function carregaUsers() {
    fetch("http://localhost:8080/usuarios")
        .then(res => res.json())
        .then(res => preenche(res));
}

function preenche(resJson) {
    console.log(resJson);
    var contSTR = "";
    for (i = 0; i < resJson.length; i++) {
        var user = resJson[i];
            var novaLinha = templateUSR.replace("**NOME**", user.nome)
                .replace("**LINKFOTO**", user.linkFoto)
                .replace("**RACF**", user.racf)
                .replace("**EMAIL**", user.email)
                .replace("**NOMEDEPTO**", user.depto.nome)
                .replace("**UNIDADE**", user.depto.unidade)
                .replace("**ANDAR**", user.depto.andar);
            contSTR = contSTR + novaLinha;

    }
    document.getElementById("conteudo").innerHTML = contSTR;

}