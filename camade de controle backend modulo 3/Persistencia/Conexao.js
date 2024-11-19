import mysql from 'mysql2/promise';

export default async function conectar(){

    if(global.conexao && (global.conexao.state !== "disconnected")){
        return global.conexao;

    }
    const conexao = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"backend",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    global.conexao = conexao;
    return conexao;
}