import Azilo from '../Modelo/Azilo.js';
import conectar from './Conexao.js';

export default class AziloBD{

    async incluir(azilo){
        if (azilo instanceof Azilo){
            const conexao = await conectar();
            const sql= "INSERT INTO azilo(cnpj,nome,endereco,bairro,cidade,uf,telefone,email)\
                       VALUES(?,?,?,?,?,?,?,?)"
            const valores = [azilo.cnpj, azilo.nome, azilo.endereco, azilo.bairro,
                             azilo.cidade, azilo.uf, azilo.telefone, azilo.email];    
            await conexao.query(sql, valores);
        }

    }
    async alterar(azilo){
        if (azilo instanceof Azilo){
            const conexao = await conectar();
            const sql= "UPDATE paciente SET nome=?, endereco=?, bairro=?, cidade=?, telefone=?, email=?\
                       WHERE cnpj=?";
            const valores = [azilo.nome, azilo.endereco, azilo.bairro,
                             azilo.cidade, azilo.telefone, azilo.email, azilo.cnpj];    
            await conexao.query(sql, valores);
        }
    }

    async excluir(azilo){
         if (azilo instanceof Azilo){
            const conexao = await conectar();
            const SQLsql="DELETE FROM azilo WHERE cnpj=?";
            const valores = [azilo.cnpj];    
            await conexao.query(sql, valores);
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        const sql = "SELECT * FROM azilo WHERE nome LIKE ?";
        const valores = ['%' + termo + '%']
        const [rows] = await conexao.query(sql, valores);
        const listaAzilos = [];
        for(const row of rows){
            const azilo = new Azilo(row['cnpj'], row['nome'], row['endereco'], row['bairro'],
                                    row['cidade'], row['uf'], row['telefone'], row['email']);
            listaAzilos.push(azilo);
        }
        return listaAzilos;
    }
    async consultarCNPJ(cnpj){
        const conexao = await conectar();
        const sql = "SELECT * FROM azilo WHERE cnpj = ?";
        const valores = [cnpj]
        const [rows] = await conexao.query(sql, valores);
        const listaAzilos = [];
        for(const row of rows){
            const azilo = new Azilo(row['cnpj'], row['nomes'], row['endereco'], row['bairro'],
                                    row['cidade'],row['uf'],row['telefone'], row['email']);
            listaAzilos.push(azilo);
        }
        return listaAzilos;
    }
}