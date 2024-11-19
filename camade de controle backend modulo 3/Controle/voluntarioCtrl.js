import Voluntario from '../Modelo/Voluntario.js';
export default class VoluntarioCTRL{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;
            if(cpf && nome && endereco && bairro && cidade && uf && telefone && email)
            {
                const voluntario = new Voluntario(cpf, nome, endereco, bairro, cidade, uf, telefone, email);
                voluntario.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Voluntario gravado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else
            {
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe corretamente todos os dados do voluntario"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Metodo nao permitido ou voluntario no formato json nao fornecido, consulte a documentacao API"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;
            if(cpf && nome && endereco && bairro && cidade && uf && telefone && email)
            {
                const voluntario = new Voluntario(cpf, nome, endereco, bairro, cidade, uf, telefone, email);
                voluntario.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Voluntario atualizado com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else
            {
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe corretamente todos os dadso do voluntario"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Metodo nao permitido ou voluntario no formato JSON nao fornecido, consulte a documentacao API"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cpf = dados.cpf;
            if(cpf)
            {
                const voluntario = new Voluntario(cpf);
                voluntario.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Voluntario excluido com sucesso"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status:false,
                        mensagem: erro.message
                    })
                });
            }
            else
            {
                resposta.status(400).json({
                    status:false,
                    mensagem:"Informe o nome do voluntario conforme documentacao API"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Metodo nao permitido ou voluntario no formato json nao fornecido, consulte a documentacao API"
            });
        }
    }
    
    consultar(requisicao, resposta){
        resposta.type("application/json");
        const cpf = requisicao.params['cpf'];
        if(requisicao.method === "GET"){
            const voluntario = new Voluntario();
            voluntario.consultar('').then((voluntarios)=>{
                    resposta.status(200).json(voluntarios);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Metodo nao permitido, consulte a documentacao API"
            });
        }
    }
     consultarPeloCPF(requisicao, resposta){
        resposta.type("application/json");
        const cpf = requisicao.params['cpf'];
        if(requisicao.method === "GET"){
            const voluntario = new Voluntario();
            voluntario.consultarCPF(cpf).then((voluntarios)=>{
                    resposta.status(200).json(voluntarios);
            }).catch((erro) => {
                resposta.status(500).json({
                    status:false,
                    mensagem: erro.message
                })
            });
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Metodo nao permitido, consulte a documentacao API"
            });
        }

    }
               
}