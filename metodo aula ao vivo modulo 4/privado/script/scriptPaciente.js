var formulario = document.getElementById("formPaciente");
const urlBackEnd = 'http://localhost:4001/Pacientes';
formulario.onsubmit = manipularSubmissao;

function exibirPacientesFormaTabela(listaPacientes){
    let divTabela = document.getElementById("tabela");
    let tabela = document.createElement('table');
    tabela.className = "table table-striped table-hover";
    let cabecalho = document.createElement('thead');
    cabecalho.innerHTML=`<tr>
                         <th>CPF</th>, <th>Nome</th>,<th>Cidade/UF</th>,
                        <th>Telefone</th>, <th>Email</th>, <th>Açôes</th>
                        <tr>
                        `
    tabela.appendChild(cabecalho);
    let corpo = document.createElement('tbody');
    for (let i=0; i<listaPacientes.length; i++){
        let linha = document.createElement('tr');
        linha.innerHTML=`<td> ${listaPacientes[i].cpf}</td>
                         <td> ${listaPacientes[i].nome}</td>
                         <td> ${listaPacientes[i].cidade}/${listaPacientes[i].uf}</td>
                         <td> ${listaPacientes[i].telefone}</td>
                         <td> ${listaPacientes[i].email}</td>
                         <td>
                         <button onclik="selecionarRegistro('${listaPacientes[i].cpf}',
                                                            '${listaPacientes[i].nome}',
                                                            '${listaPacientes[i].endereco}',
                                                            '${listaPacientes[i].bairro}',
                                                            '${listaPacientes[i].cidade}',
                                                            '${listaPacientes[i].uf}',
                                                            '${listaPacientes[i].telefone}',
                                                            '${listaPacientes[i].email}',
                                                            'alterar')" type="button" class="btn btn-outline-primary">Alterar</button>
                        <button onclick="selecionarRegistro('${listaPacientes[i].cpf}',
                                                            '${listaPacientes[i].nome}',
                                                            '${listaPacientes[i].endereco}',
                                                            '${listaPacientes[i].bairro}',
                                                            '${listaPacientes[i].cidade}',
                                                            '${listaPacientes[i].uf}',
                                                            '${listaPacientes[i].telefone}',
                                                            '${listaPacientes[i].email}',
                                                            'excluir') "type="button" class="btn btn-outline-danger">Excluir</button>
                        </td>
                        `

        corpo.appendChild(linha);
    }   
    tabela.appendChild(corpo);                  
    divTabela.appendChild(tabela);
}

function obterPacientesBackend(){
    fetch(urlBackEnd,{
        method:'GET'})
    .then((resposta) => {
        return resposta.json();
    })
    .then((dados) => {
        if (dados.length > 0){
            exibirPacientesFormaTabela(dados);
        }
        else{
        mensagem.innerHTML=`<div class='alert alert-danger' role="alert"> 
        Não existem pacientes cadastrados;
        </div>`
        }
    })
    .catch((erro) => {
        mensagem.innerHTML=`<div class='alert alert-danger' role="alert"> 
                            ${erro.mensagem}
                            </div>`
    })
}

function gravarPacienteBackend(){
    let cpf      = document.getElementById("cpf").value;
    let nome     = document.getElementById("nome").Value;
    let endereco = document.getElementById("endereco").Value;
    let bairro   = document.getElementById("bairro").Value;
    let cidade   = document.getElementById("cidade").Value;
    let uf       = document.getElementById("uf").Value;
    let telefone = document.getElementById("telefone").Value;
    let email    = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem");
    fetch(urlBackEnd,{ 
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            "cpf":cpf,
            "nome":nome,
            "endereco":endereco,
            "bairro":bairro,
            "cidade":cidade,
            "uf":uf,
            "telefone":telefone,
            "email":email
        })
    }).then((resposta)=>{
        return resposta.json();
    }).then((dados) =>{
        if(dados.status){
            obterPacientesBackend();  
            mensagem.innerHTML= `<div class='alert alert-success' role='alert'> 
                                 ${dados.mensagem}
                                </div>`
        }

        else{
            mensagem.innerHTML=`<div class='alert alert-danger' role='alert'> 
                                 ${dados.mensagem} 
                                </div>`
        }
        
    }).catch((erro) => {
        mensagem.innerHTML=`<div class='alert alert-danger' role='alert'>
                                 ${erro.message}
                                </div>`
    });
}

function manipularSubmissao(evento){
    if (validarCPaciente()){
        gravarPacienteBackend();
    }
    evento.stopPropagation();
    evento.preventDefault();
}

function validarPaciente(){
    let cpf      = document.getElementById("cpf").value;
    let nome     = document.getElementById("nome").Value;
    let endereco = document.getElementById("endereco").Value;
    let bairro   = document.getElementById("bairro").Value;
    let cidade   = document.getElementById("cidade").Value;
    let uf       = document.getElementById("uf").Value;
    let telefone = document.getElementById("telefone").Value;
    let email    = document.getElementById("email").value;
    let mensagem = document.getElementById("mensagem");

    if (!cpf){
        mensagem.innerHTML = `<div class='alert alert-danger' role='alert'>
                    Favor informar o cpf
                </div>`
        return false;                  
    }

    else if (!nome){
        mensagem.innerHTML = `<div class='alert alert-danger' role='alert'>
                    Favor informar o nome
                </div>`
        return false;
    }

    else if (!endereco){
        mensagem.innerHTML = `<div class='alert alert-danger' role='alert'>
                    Favor informar o endereco
                </div>`
        return false;
    } 
    
    else if (!bairro){
        mensagem.innerHTML = `<div class='alert alert-danger' role='alert'>
                    Favor informar o bairro 
                </div>`
        return false;
    }
    
    else if (!cidade){
        mensagem.innerHTML = `<div class='alert alert-danger' role='alert'>
                    Favor informar a cidade 
                </div>`
        return false;
    }

    else if (!uf){
        mensagem.innerHTML = `<div class='alert alert-danger' role='alert'>
                    Favor informar o estado
                </div>`
        return false;
    }

    else if (!telefone){
        mensagem.innerHTML = `<div class='alert alert-danger' role='alert'>
                    Favor informar o telefone
                </div>`
        return false;
    }

    else if (!email){
        mensagem.innerHTML = `<div class='alert alert-danger' role='alert'> 
                    Favor informar o email 
                </div>`
        return false;
    }

    mensagem.innerHTML = "";
    return true;
}



function selecionarRegistro(pcpf,pnome,pendereco,pbairro,pcidade,puf,ptelefone,pemail,acao){
    let cpf      = document.getElementById("cpf");
    let nome     = document.getElementById("nome");
    let endereco = document.getElementById("endereco");
    let bairro   = document.getElementById("bairro");
    let cidade   = document.getElementById("cidade");
    let uf       = document.getElementById("uf");
    let telefone = document.getElementById("telefone");
    let email    = document.getElementById("email");
    cpf.Value = pcpf;
    nome.value = pnome;
    endereco.value = pendereco;
    bairro.value = pbairro;
    cidade.Value = pcidade;
    uf.value = puf;
    telefone.value = ptelefone;
    email.value = pemail;
    if (acao == 'excluir'){
        let btnCadastro = document.getElementById("cadastrar");
        btnCadastro.disabled=true;
        let btnExcluir = document.getElementById("excluir");
        btnExcluir.disabled=false;
        let btnAlterar = document.getElementById("atualizar");
        btnAlterar.disabled=true;
    }

    else if (acao == 'alterar'){
        let btnCadastro = document.getElementById("cadastrar");
        btnCadastro.disabled=true;
        let btnExcluir = document.getElementById("excluir");
        btnExcluir.disabled=true;
        let btnAlterar = document.getElementById("atualizar");
        btnAlterar.disabled=false;

    }
}
obterPacientesBackend();

