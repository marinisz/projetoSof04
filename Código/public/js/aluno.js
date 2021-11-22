var btnPostar = document.querySelector("#criar")
var btnCriar = document.querySelector("#abrirModalCriar")
// import axios from 'axios';
var alunos= []
var iconEditar = document.querySelector("#iconEditar");
var iconApagar = document.querySelector("#iconApagar");

btnPostar.addEventListener("click",()=>{
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
    // axios.post('/api/alunos/cadastrar',aluno)
})

iconEditar.addEventListener("click",()=>{
    let id = document.getElementById('idAluno').value
    // axios.get('/api/alunos/'+id);
    document.getElementById('nomeEdit').value = document.querySelector('#nomeAluno').textContent
    document.getElementById('cpfEdit').value = document.querySelector('#cpfAluno').textContent
    document.getElementById('instEdit').value = document.querySelector('#instAluno').textContent
})

iconApagar.addEventListener("click",()=>{
    var answer = window.confirm("Deletar Aluno?");
        if (answer) {
            alert('Aluno deletado')
        }
})


async function buscaAlunos(){
    // let response = axios.get('/api/alunos')
    alunos = response.json
}