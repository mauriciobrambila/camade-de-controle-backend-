import { Router } from "express";

const rotalogin = new Router();

rotalogin.get('/', (requisicao, resposta) => {
    resposta.redirect("/login.html");
})
.post('/', (requisicao, resposta) => {
    const usuario = requisicao.body.usuario; 
    const senha = requisicao.body.senha;
    if (usuario && senha && usuario === 'mauricio' && senha==='123')
    {
        requisicao.session.usuariologado=true;
        resposta.redirect('/cadastroPaciente.html');
    }
    else{
        resposta.send("<p>Usuario ou senha incorretos</p><br/><button onclick='history.back()'>inicio</button>")
    }
});

export default rotalogin;