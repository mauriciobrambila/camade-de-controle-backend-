import express from 'express';
import session from 'express-session';
import rotaLogin from './rotas/rotalogin.js';
import autenticar from './seguranca/autenticar.js';
import cors from 'cors';

const host = 'localhost';
const porta = 4001;

const app = express();
app.use(cors({origin:"*"}));

app.use(session({
    secret:"C0d1g0",
    resave: true, 
    saveUninitialized:false,
    cookie:{
        maxAge: 1000 * 60 * 30
    }
}));
app.use(express.urlencoded({extended:false}));

app.use("/login", rotaLogin);
app.use(express.static('./publico'));
app.use(autenticar, express.static('./privado'));

app.listen(porta, host, ()=>{
    console.log("servidor em execuçao em http://" + host + ":" + porta)
});




