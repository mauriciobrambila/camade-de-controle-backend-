export default function autenticar(requisicao, resposta, next){
    if (requisicao.session.usuariologado){
        next();
    }
    else{
        resposta.redirect("/login.html");
    }
}