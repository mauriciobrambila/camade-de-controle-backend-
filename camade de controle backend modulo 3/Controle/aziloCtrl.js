import Azilo from '../Modelo/Azilo.js';
export default class AziloCTRL{

    gravar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cnpj = dados.cnpj;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;
            if(cnpj && nome && endereco && bairro && cidade && uf && telefone && email)
            {
                const azilo = new Azilo(cnpj, nome, endereco, bairro, cidade, uf, telefone, email);
                azilo.gravar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Azilo gravado com sucesso"
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
                    mensagem:"Informe corretamente todos os dados do azilo"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Metodo nao permitido ou azilo no formato json nao fornecido, consulte a documentacao API"
            });
        }
    }

    atualizar(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "PUT" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cnpj = dados.cnpj;
            const nome = dados.nome;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const cidade = dados.cidade;
            const uf = dados.uf;
            const telefone = dados.telefone;
            const email = dados.email;
            if(cnpj && nome && endereco && bairro && cidade && uf && telefone && email)
            {
                const azilo = new Azilo(cnpj, nome, endereco, bairro, cidade, uf, telefone, email);
                azilo.atualizar().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Azilo atualizado com sucesso"
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
                    mensagem:"Informe corretamente todos os dadso do azilo"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Metodo nao permitido ou azilo no formato JSON nao fornecido, consulte a documentacao API"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type("application/json");
        if(requisicao.method === "DELETE" && requisicao.is('application/json')){
            const dados = requisicao.body;
            const cnpj = dados.cnpj;
            if(cnpj)
            {
                const azilo = new Azilo(cnpj);
                azilo.removerDoBancoDados().then(()=>{
                    resposta.status(200).json({
                        status:true,
                        mensagem:"Azilo excluido com sucesso"
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
                    mensagem:"Informe o nome do azilo conforme documentacao API"
                });
            }
        }
        else{
            resposta.status(400).json({
                status:false,
                mensagem:"Metodo nao permitido ou azilo no formato json nao fornecido, consulte a documentacao API"
            });
        }
    }
    
    consultar(requisicao, resposta){
        resposta.type("application/json");
        const cnpj = requisicao.params['cnpj'];
        if(requisicao.method === "GET"){
            const azilo = new Azilo();
            azilo.consultar('').then((azilos)=>{
                    resposta.status(200).json(azilos);
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
     consultarPeloCNPJ(requisicao, resposta){
        resposta.type("application/json");
        const cnpj = requisicao.params['cnpj'];
        if(requisicao.method === "GET"){
            const azilo = new Azilo();
            azilo.consultarCNPJ(cnpj).then((azilos)=>{
                    resposta.status(200).json(azilos);
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