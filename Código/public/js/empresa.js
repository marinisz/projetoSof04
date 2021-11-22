var btnPostar = document.querySelector("#criar")
// import axios from 'axios';
var empresas = [];
var iconEditar = document.querySelector("#iconEditar");
var iconApagar = document.querySelector("#iconApagar");

btnPostar.addEventListener("click",()=>{
    let nome = document.getElementById('nome').value
    let cnpj = document.getElementById('cnpj').value
    let senha = document.getElementById('senha').value
    let empresa = {
        nome:nome,
        senha:senha,
        cnpj:cnpj
    }
    // axios.post('/api/alunos/cadastrar',empresa)
})

iconEditar.addEventListener("click",()=>{
    let id = document.getElementById('idEmpresa').value
    console.log(document.querySelector('#nomeEmpresa').textContent);
    // axios.get('/api/alunos/'+id);
    document.getElementById('nomeEdit').value = document.querySelector('#nomeEmpresa').textContent
    document.getElementById('cnpjEdit').value = document.querySelector('#cnpjEmpresa').textContent
    document.getElementById('instEdit').value = document.querySelector('#instEmpresa').textContent
})

iconApagar.addEventListener("click",()=>{
    var answer = window.confirm("Deletar Emrpesa?");
        if (answer) {
            alert('Empresa deletada')
            // axios.delete('')
        }
})

async function buscaEmpresas(){
    // let response = axios.get('/api/empresas')
    // empresas = response.json
}