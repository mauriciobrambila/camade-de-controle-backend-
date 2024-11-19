import Azilo from "./Modelo/Azilo.js";
import Voluntario from "./Modelo/Voluntario.js";

const meuAzilo = new Azilo( '53.419.016/0002-80',
                            'Lar Sao Rafael',
                            'R. Joaquim Nabuco, 1670',
                            'Vila Paraiso',
                            'Presidente Prudente',
                            'SP',
                            '19013-040',
                            'azilo@azilo.com.br');

const meuVoluntario = new Voluntario( '123.456.789-00',
                            'Prestador de serviços voluntario',
                            'R. Antonio Isaac Caceres 34',
                            'Jardim Cambuy',
                            'Presidente Prudente',
                            'SP',
                            '19061-546',
                            'mauricio@unoeste.br');
                          

console.log(meuAzilo.toJSON());
console.log(meuVoluntario.toJSON());


