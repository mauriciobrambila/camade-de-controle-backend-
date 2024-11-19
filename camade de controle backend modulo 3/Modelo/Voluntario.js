import VoluntarioBD from '../Persistencia/VoluntarioBD.js';
export default class Voluntario{

    #cpf;
    #nome;
    #endereco;
    #bairro;
    #cidade;
    #uf;
    #telefone;
    #email;
    constructor(cpf, nome, endereco, bairro, cidade, uf, telefone, email){
        this.#cpf = cpf;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#cidade = cidade;
        this.#uf = uf;
        this.#telefone = telefone;
        this.#email = email;
    }
  
    get cpf(){
        return this.#cpf;
    }
    set cpf(novoCpf){
        this.#cpf = novoCpf;
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
            "cpf"      : this.#cpf,
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
        const voluntarioBD = new VoluntarioBD();
        await voluntarioBD.incluir(this);
    }
    async atualizar(){
        const voluntarioBD = new VoluntarioBD();
        await voluntarioBD.alterar(this);
    }
    async removerDoBancoDados(){
        const voluntarioBD = new VoluntarioBD();
        await voluntarioBD.excluir(this);
    }
    async consultar(termo){
        const voluntarioBD = new VoluntarioBD();
        const voluntarios = await voluntarioBD.consultar(termo);
        return voluntarios;
    }
    async consultarCPF(cpf){
        const voluntarioBD = new VoluntarioBD();
        const voluntarios = await voluntarioBD.consultarCPF(termo);
        return voluntarios;
    }
}

