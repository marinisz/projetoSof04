var btnPostar = document.querySelector("#criar")
var btnCriar = document.querySelector("#abrirModalCriar")
var alunos= []
var table = document.querySelector('#corpoTabela')
var xhr = new XMLHttpRequest()
var iconEditar = document.querySelector("#iconEditar");
var iconApagar = document.querySelector("#iconApagar");

window.onload = async function() {
    await buscaAlunos()
};

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
    xhr.open('POST', '/api/usuarios/cadastrar/', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            let object = JSON.parse(xhr.response)
        }
    }
    xhr.send(JSON.stringify(aluno));
    location.reload();
})

async function buscaAlunos(){
    const x = deleteAluno;
    xhr.open("GET", "/api/alunos/")
    xhr.onload = function(){
        let resposta = xhr.response;
        let resultado = JSON.parse(resposta)
        alunos = resultado;
        let corpo = '';
        for(let i=0;i<alunos.length;i++){
            corpo+=`
            <tr>
            <td id ="idAluno">${alunos[i].id}</td>
            <td id="nomeAluno">${alunos[i].nome}</td>
            <td id ="cpfAluno">${alunos[i].cpf}</td>
            <td id="instAluno">${alunos[i].instituicao.nome}</td>
            <td>
            <span>
            <svg onclick="carregaAluno()" id="iconEditar" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" id="icones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
            </svg>
            </span>
            <span onclick="deleteAluno()">
                <svg  id="iconApagar" style="cursor:pointer" id="icones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                </span>
            </td>
        </tr>
            `
        }
        table.innerHTML=corpo
    }
    xhr.send();
}


function deleteAluno(){
    if(confirm("Deseja excluir Aluno?")){
        let id = document.querySelector("#idAluno")
        xhr.open("DELETE", "/api/alunos/"+id,true)
        xhr.onload = () =>{
            let resposta = xhr.response;
        }
        xhr.send(null);
    }
}


