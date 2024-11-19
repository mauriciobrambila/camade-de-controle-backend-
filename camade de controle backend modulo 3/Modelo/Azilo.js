import AziloBD from '../Persistencia/AziloBD.js';
export default class Azilo{

    #cnpj;
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #telefone;
    #email;
    constructor(cnpj, nome, endereco, bairro, cidade, uf, telefone, email){
        this.#cnpj = cnpj;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#telefone = telefone;
        this.#email = email;
    }
  
    get cnpj(){
        return this.#cnpj;
    }
    set cnpj(novoCnpj){
        this.#cnpj = novoCnpj;
    }

    get nome(){
        return this.#nome;
    }
    set nome(novoNome){
        if(novoNome != "")
            this.#nome = novoNome;
    }

    get endereco(){
        return this.#endereco;
    }
    set endereco(novoEnd){
        this.#endereco = novoEnd;
    }

    get bairro(){
        return this.#bairro;
    }
    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    get cidade(){
        return this.#cidade;
    }
    set cidade(novaCidade){
        this.#cidade = novaCidade;
    }

    get uf(){        
        return this.#uf;
    }
    set uf(novaUf){
        this.#uf = novaUf;
    }

    get telefone(){
        return this.#telefone;
    }
    set telefone(novoTel){
        this.#telefone = novoTel;
    }

    get email(){
        return this.#email;
    }
    set email(novoEmail){
        this.#email = novoEmail;
    }
    
    toJSON(){
        return{
            "cnpj"     : this.#cnpj,
            "nome"     : this.#nome,
            "endereco" : this.#endereco,
            "bairro"   : this.#bairro,
            "cidade"   : this.#cidade,
            "uf "      : this.#uf,
            "telefone" : this.#telefone,
            "email"    : this.#email
        }
    }
    async gravar(){
        const aziloBD = new AziloBD();
        await aziloBD.incluir(this);
    }
    async atualizar(){
        const aziloBD = new AziloBD();
        await aziloBD.alterar(this);
    }
    async removerDoBancoDados(){
        const aziloBD = new AziloBD();
        await aziloBD.excluir(this);
    }
    async consultar(termo){
        const aziloBD = new AziloBD();
        const azilos = await aziloBD.consultar(termo);
        return azilos;
    }
    async consultarCNPJ(cnpj){
        const aziloBD = new AziloBD();
        const azilos = await aziloBD.consultarCNPJ(termo);
        return azilos;
    }
}

