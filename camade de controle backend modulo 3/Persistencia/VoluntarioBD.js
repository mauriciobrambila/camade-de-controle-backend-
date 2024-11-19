import Voluntario from '../Modelo/Voluntario.js';
import conectar from './Conexao.js';

export default class VoluntarioBD{

    async incluir(voluntario){
        if (voluntario instanceof Voluntario){
            const conexao = await conectar();
            const sql= "INSERT INTO voluntario(cpf,nome,endereco,bairro,cidade,uf,telefone,email)\
                       VALUES(?,?,?,?,?,?,?,?)"
            const valores = [voluntario.cpf, voluntario.nome, voluntario.endereco, voluntario.bairro,
                voluntario.cidade, voluntario.uf, voluntario.telefone, voluntario.email];    
            await conexao.query(sql, valores);
        }

    }
    async alterar(voluntario){
        if (voluntario instanceof Voluntario){
            const conexao = await conectar();
            const sql= "UPDATE paciente SET nome=?, endereco=?, bairro=?, cidade=?, telefone=?, email=?\
                       WHERE cpf=?";
            const valores = [voluntario.nome, voluntario.endereco, voluntario.bairro,
                voluntario.cidade, voluntario.telefone, voluntario.email, voluntario.cpf];    
            await conexao.query(sql, valores);
        }
    }

    async excluir(voluntario){
         if (voluntario instanceof Voluntario){
            const conexao = await conectar();
            const SQLsql="DELETE FROM voluntario WHERE cpf=?";
            const valores = [voluntario.cpf];    
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM voluntario WHERE nome LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaVoluntarios = [];
        for(const row of rows){
            const voluntario = new AVoluntario(row['cpf'], row['nome'], row['endereco'], row['bairro'],
                                    row['cidade'], row['uf'], row['telefone'], row['email']);
            listaVoluntarios.push(voluntario);
        }
        return listaVoluntarios;
    }
    async consultarCPF(cpf){
        const conexao = await conectar();
        const sql = "SELECT * FROM voluntario WHERE cpf = ?";
        const valores = [cpf]
        const [rows] = await conexao.query(sql, valores);
        const listaVoluntarios = [];
        for(const row of rows){
            const voluntario = new Voluntario(row['cpf'], row['nomes'], row['endereco'], row['bairro'],
                                    row['cidade'],row['uf'],row['telefone'], row['email']);
            listaVoluntarios.push(voluntario);
        }
        return listaVoluntarios;
    }
}