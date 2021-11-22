var criar = document.querySelector("#criar")
import axios from 'axios';
var alunos= []

criar.addEventListener("click",()=>{
    let nome = document.getElementById('nome').value
    let cep = document.getElementById('cep').value
    let inst = document.getElementById('inst').value
    let senha = document.getElementById('senha').value
    let cpf = document.getElementById('cpf').value
    let rg = document.getElementById('rg').value
    let aluno = {
        nome:nome,
        endereco:cep,
        instituicao:inst,
        rg:rg,
        senha:senha,
        cpf:cpf
    }
    axios.post('/api/alunos/cadastrar',aluno)
})

async function buscaAlunos(){
    let response = axios.get('/api/alunos')
    alunos = response.json
}