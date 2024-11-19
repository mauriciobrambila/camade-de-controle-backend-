import { Router } from "express";
import VoluntarioCTRL from "../Controle/VoluntarioCtrl.js";

const rotaVoluntario = new Router();
const voluntarioCTRL = new VoluntarioCTRL();
rotaVoluntario.post('/',voluntarioCTRL.gravar)
.put('/', voluntarioCTRL.atualizar)
.delete('/', voluntarioCTRL.excluir)
.get('/', voluntarioCTRL.consultar)
.get('/:cpf', voluntarioCTRL.consultarPeloCPF);

export default rotaVoluntario;