var templateBarra = `<img src="**FOTO**" width="35px"> 
                       Bem vindo **NOME**
                       (<a href="departamento.html?id=**IDDEP**">**DEPARTAMENTO**</a>)`;

var templateTabela = `<table class= "top10">
                       <thead>
                           <tr>
                               <th>Parceiro</th>
                               <th>Volume</th>
                           </tr>
                       </thead>
                       <tbody>
                            <tr>
                               <td>Par1</td><td class="vol">VolTrans1</td>
                            </tr>
                            <tr>
                                <td>Par2</td><td class="vol">VolTrans2</td>
                            </tr>
                            <tr>
                                <td>Par3</td><td class="vol">VolTrans3</td>
                            </tr>
                            <tr>
                                 <td>Par4</td><td class="vol">VolTrans4</td>
                            </tr>
                            <tr>
                                <td>Par5</td><td class="vol">VolTrans5</td>
                            </tr>
                            <tr>
                                <td>Par6</td><td class="vol">VolTrans6</td>
                            </tr>
                            <tr>
                                <td>Par7</td><td class="vol">VolTrans7</td>
                            </tr>
                            <tr>
                                <td>Par8</td><td class="vol">VolTrans8</td>
                            </tr>
                            <tr>
                                <td>Par9</td><td class="vol">VolTrans9</td>
                            </tr>
                            <tr>
                                <td>Par10</td><td class="vol">VolTrans10</td>
                            </tr>
                       </tbody>
                   </table> `;

function logout() {
    localStorage.removeItem("userDash");
    window.location = "index.html";
}

function verificaUsuario() {
    // existe alguma info de "userDash" no armazenamento local?
    var userLogado = localStorage.getItem("userDash");
    if (!userLogado) {
        // se não tiver, redireciona pra o INDEX  (ou seja, não tá logado)
        window.location = "index.html";
    }
    else {
        // se tiver, mostra na barrinha
        var user = JSON.parse(userLogado);
        document.getElementById("barraUser").innerHTML = templateBarra
            .replace("**FOTO**", user.linkFoto)
            .replace("**NOME**", user.nome)
            .replace("**IDDEP**", user.depto.id)
            .replace("**DEPARTAMENTO**", user.depto.nome);
    }
}

function carregaAgentes() {
    fetch("http://localhost:8080/agentesfinanceiros")
        .then(res => res.json())
        .then(res => {
            preencheTbl(res);
            preencheDropdown(res);
        });
}

function preencheTbl(parceiros) {
    parceiros = parceiros.sort((a, b) =>  b.volume - a.volume);
    var novalinha = templateTabela;
    var box = "<option value=vazio></option>";
    for (i = 0; i < parceiros.length && i < 10; i++) {
        var agente = parceiros[i];
        i = i + 1;
        var box = box + "<option value=L" + i + ">" + agente.nome + "</option>";
        var novalinha = novalinha.replace("Par" + i, agente.nome).replace("VolTrans" + i, +agente.volume);
        i = i - 1;
    }

    document.getElementById("tbl").innerHTML = novalinha;
}