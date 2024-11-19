export default class Servico{

    #codigo;
    #descricao;
    #diasDisponiveis;
    
    constructor(codigo, descricao, diasDisponiveis){
        this.#codigo = codigo;
        this.#descricao = descricao;
        this.#diasDisponiveis = diasDisponiveis
    
    }
    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCod){
        this.#codigo = novoCod;
    }
    
    get descricao(){
        return this.#descricao;
    }
    set descricao(novaDescricao){
        this.#descricao = novaDescricao;
    }
    
    get diasDisponiveis(){
        return this.#diasDisponiveis;
    }
    set diasDisponiveis(novoDiasDisponiveis){
        this.#diasDisponiveis = novoDiasDisponiveis;
    }
    
    toJSON(){
        return {
            "codigo":this.#codigo,
            "descricao":this.#descricao,
            "diasDisponiveis":this.#diasDisponiveis
            }
        }
    }
    