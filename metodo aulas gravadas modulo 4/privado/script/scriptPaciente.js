const endpoint = 'http://localhost:4001/pacientes';
let mensagem = document.getElementById('mensagem');
let formulario = document.getElementById('formPaciente');

window.onload - exibirTabelaPacientes;
formulario.onsubmit = gravarPaciente;
document.getElementById("excluir").onclick = excluirPaciente;
document.getElementById("atualizar").onclick = atualizarPaciente;

function obterPacienteDoFormulario() {
    const cpf      = document.getElementById('cpf').value;
    const nome     = document.getElementById('nome').Value;
    const endereco = document.getElementById('endereco').Value;
    const bairro   = document.getElementById('bairro').Value;
    const cidade   = document.getElementById('cidade').Value;
    const uf       = document.getElementById('uf').Value;
    const telefone = document.getElementById('telefone').Value;
    const email    = document.getElementById('email').value;
    if (cpf && nome && endereco && bairro && cidade && uf && telefone && email){
        return {
            cpf:cpf,
            nome:nome,
            endereco:endereco,
            bairro:bairro,
            cidade:cidade,
            uf:uf,
            telefone:telefone,
            email:email
        }
    }
    else {
        return undefined;
    }
}

function limpaFormulario(){
    document.getElementById('cpf').value = "";
    document.getElementById('nome').Value = "";
    document.getElementById('endereco').Value = "";
    document.getElementById('bairro').Value = "";
    document.getElementById('cidade').Value = "";
    document.getElementById('uf').Value = "";
    document.getElementById('telefone').Value = "";
    document.getElementById('email').value = "";
}

function gravarPaciente(evento) {
    const paciente = obterPacienteDoFormulario();
    if (paciente) {
    fetch(endpoint, {
        method: "POST",
        headers:{'Content-Type':"application/json"},
        body: JSON.stringify(paciente)
    }).then((resposta) => {
        if (resposta.ok) {
            return resposta.json();
        }
    }).then((dados) => {
        mensagem.innerHTML= "<div class='alert alert-success' role='alert'>" + 
                            dados.mensagem +
                                "</div>";
        limpaFormulario();
        exibirTabelaPacientes();
    }).catch((erro) => {
        mensagem.innerHTML= "<div class='alert alert-danger' role='alert'>" + 
                            erro.message +
                                "</div>";
        });
    }
    else {
        mensagem.innerHTML= "<div class='alert alert-danger' role='alert'>" + 
             "Informe corretamente os dados do paciente" +
        "</div>";
    }
    
    evento.preventDefault();
    evento.stopPropagation();
}

function criaTabelaPacientes(listaPacientes){
    let espacoTabela = document.getElementById('espacoTabela');
    if (listaPacientes && listaPacientes.length > 0){
    let tabela = document.createElement('table');
    tabela.className = 'table table-striped table-hover';
    let cabecalhoTabela = document.createElement('thead');
    cabecalhoTabela.innerHTML="<tr> \
                                <th>CPF</th>\
                                <th>Nome</th>\
                                <th>Endereco</th>\
                                <th>Bairro</th>\
                                <th>Cidade</th>\
                                <th>UF</th>\
                                <th>Telefone</th>\
                                <th>Email</th>\
                                <th>Ações</th>\
                                </tr>\
                                ";
    tabela.appendChild(cabecalhoTabela) ;
    let corpoTabela = document.createElement('tbody');
    for (paciente of listaPacientes){
        let linha = document.createElement('tr');
        linha.innerHTML= "<td>" + Pacientes.cpf + "</td>" +
                         "<td>" + Pacientes.nome + "</td>" +
                         "<td>" + Pacientes.endereco + "</td>" +
                         "<td>" + Pacientes.bairro + "</td>" +
                         "<td>" + Pacientes.cidade + "</td>" +
                         "<td>" + Pacientes.uf + "</td>" +
                         "<td>" + Pacientes.telefone + "</td>" +
                         "<td>" + Pacientes.email + "</td>" +
                         `<td>\
                         <button type="button" class="btn btn-warning" onClick="prepararTela('${paciente.cpf}', \
                         '${paciente.nome}','${paciente.endereco}','${paciente.bairro}','${paciente.cidade}', \
                         '${paciente.uf}','${paciente.telefone}','${paciente.email}', 'atualizacao')">Editar</button>\
                         <button type="button" class="btn btn-danger" onClick="prepararTela('${paciente.cpf}', \
                         '${paciente.nome}','${paciente.endereco}','${paciente.bairro}','${paciente.cidade}', \
                         '${paciente.uf}','${paciente.telefone}','${paciente.email}', 'exclusao')">Excluir</button>\
                        </td>`;
        corpoTabela.appendChild(linha);
    }
    tabela.appendChild(corpoTabela);
    espacoTabela.innerHTML="";
    espacoTabela.appendChild(tabela);
    }
    else{
        espacoTabela.innerHTML =  "<div class='alert alert-secondary' role='alert'>" + 
                        "Não há pacientes cadastrados" +
                    "</div>";
    }
    
}   

function exibirTabelaPacientes(){
    fetch(endpoint,
        {method:"GET",
    }).then((resposta) => {
       if (resposta.ok){
        return resposta.json();
       }
    }).then((listaPacientes) => {
        criaTabelaPacientes(listaPacientes);
    }).catch((erro) => {
        mensagem.innerHTML= "<div class='alert alert-danger' role='alert'>" + 
        "Não foi possivel recuperar os pacientes do backend" + erro.messge +
        "</div>";
    });
}

function prepararTela(cpf="", nome="", endereco="", bairro="", cidade="", uf="", telefone="", email="", acao=""){
    let botaoCadastrar = document.getElementById('cadastrar');
    let botaoAtualizar = document.getElementById('atualizar');
    let botaoExcluir = document.getElementById('excluir');

    document.getElementById('cpf').value = cpf;
    document.getElementById('nome').Value = nome;
    document.getElementById('endereco').Value = endereco;
    document.getElementById('bairro').Value = bairro;
    document.getElementById('cidade').Value = cidade;
    document.getElementById('uf').Value = uf;
    document.getElementById('telefone').Value = telefone;
    document.getElementById('email').value = email;

    if (acao === 'exclusao'){
        document.getElementById('cpf').disabledd = true; 
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = false;
    }

    else if (acao ==="atualizacao"){
        document.getElementById('cpf').disabled = true;
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = false;
        botaoExcluir.disabled = true;
    }

    else{ 
        document.getElementById('cpf').disabled = false; 
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = true;
        
    }
}

function excluirPaciente(){
    if(confirm("Confirma a exclusao deste paciente?")){
        fetch(endpoint, {
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({
                cpf: document.getElementById('cpf').value
            })
        
        }).then((resposta) => {
            if (resposta.ok) return resposta.json();
        }).then((dados) => {
            mensagem.innerHTML= "<div class='alert alert-success' role='alert'>" + 
            dados.mensagem +
                "</div>";
            prepararTela();
            exibirTabelaPacientes();
        }).catch((erro) => {
            mensagem.innerHTML= "<div class='alert alert-danger' role='alert'>" + 
            erro.message +
                "</div>";
        });
    }
    else{
        prepararTela();
    }
}

function atualizarPaciente(){
    if (confirm("Confirma a atualização do paciente:")){
    const paciente = obterPacienteDoFormulario();
    if (paciente) {
    fetch(endpoint, {
        method: "PUT",
        headers:{'Content-Type':"application/json"},
        body: JSON.stringify(paciente)
    }).then((resposta) => {
        if (resposta.ok) {
            return resposta.json();
        }
    }).then((dados) => {
        mensagem.innerHTML= "<div class='alert alert-success' role='alert'>" + 
                            dados.mensagem +
                                "</div>";
        prepararTela();
        exibirTabelaPacientes();
    }).catch((erro) => {
        mensagem.innerHTML= "<div class='alert alert-danger' role='alert'>" + 
                            erro.message +
                                "</div>";
        });
    }
    else {
        mensagem.innerHTML= "<div class='alert alert-danger' role='alert'>" + 
             "Informe corretamente os dados do paciente" +
             "</div>";
        }
    } 
    else{
        prepararTela();
    } 
    
}  


    