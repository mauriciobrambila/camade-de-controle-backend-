import { Router } from "express";
import AziloCTRL from "../Controle/AziloCtrl.js";

const rotaAzilo = new Router();
const aziloCTRL = new AziloCTRL();
rotaAzilo.post('/',aziloCTRL.gravar)
.put('/', aziloCTRL.atualizar)
.delete('/', aziloCTRL.excluir)
.get('/', aziloCTRL.consultar)
.get('/:cnpj', aziloCTRL.consultarPeloCNPJ);

export default rotaAzilo;