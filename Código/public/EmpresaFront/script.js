var criar = document.querySelector("#criar")
import axios from 'axios';
var empresas = [];

criar.addEventListener("click",()=>{
    let nome = document.getElementById('nome').value
    let cnpj = document.getElementById('cnpj').value
    let senha = document.getElementById('senha').value
    let empresa = {
        nome:nome,
        senha:senha,
        cnpj:cnpj
    }
    axios.post('/api/empresas/cadastrar',empresa)
})

async function buscaEmpresas(){
    let response = axios.get('/api/empresas')
    empresas = response.json
}