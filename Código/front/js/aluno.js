var btnPostar = document.querySelector("#criar")
var btnCriar = document.querySelector("#abrirModalCriar")
var table = document.querySelector('#corpoTabela')
var xhr = new XMLHttpRequest()
var iconEditar = document.querySelector("#iconEditar");
var iconApagar = document.querySelector("#iconApagar");
var alunos= []
var empresaBuscada = []
var instituicoes = []

window.onload = async function() {
    await buscaAlunos();
    await buscaInstituicao();
};

btnPostar.addEventListener("click",()=>{
    console.log("criar aluno");
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
    xhr.open('POST', 'http://localhost:3000/api/usuarios/cadastrar/', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            let object = JSON.parse(xhr.response)
        }
    }
    xhr.send(JSON.stringify(aluno));
    document.location.reload(true);
})

async function buscaAlunos(){
    let url = 'http://localhost:3000/api/alunos/'
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            alunos = res;
            console.log(alunos);
            var tabela = document.getElementById('corpoTabela')
            for(let i=0;i<alunos.length;i++){
                let novaLinha = tabela.insertRow(0);
                let celula1 = novaLinha.insertCell(0);
                celula1.innerHTML=alunos[i].id
                let celula2 = novaLinha.insertCell(1);
                celula2.innerHTML=alunos[i].nome
                let celula3 = novaLinha.insertCell(2);
                celula3.innerHTML=alunos[i].cpf
                let celula4 = novaLinha.insertCell(3);
                celula4.innerHTML=alunos[i].instituicao.nome
                let celula5 = novaLinha.insertCell(4);
                celula5.innerHTML=`<svg onclick="retornaBuscado(${alunos[i].id})" id="iconEditar" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" id="icones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
              </svg>
                <svg id="iconApagar" onclick="deletaAluno(${alunos[i].id})" style="cursor:pointer" id="icones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>`
            }

            iconEditar = document.querySelector("#iconEditar");
            iconApagar = document.querySelector("#iconApagar");
        })
       
}
async function buscaInstituicao(){
    let url = 'http://localhost:3000/api/instituicoes/'
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            instituicoes = res;
            console.log(instituicoes);
            var selectInsti = document.querySelector("#inst")
            var edit = document.querySelector("#instEdit2")
            for(let i=0;i<instituicoes.length;i++){
                var opt = document.createElement('option');
                opt.value=instituicoes[i].id
                opt.innerHTML = instituicoes[i].nome
                selectInsti.appendChild(opt)
            }
            for(let i=0;i<instituicoes.length;i++){
                var opt = document.createElement('option');
                opt.value=instituicoes[i].id
                opt.innerHTML = instituicoes[i].nome
                edit.appendChild(opt)
            }
        })
       
}
async function retornaBuscado(id){
    let url = 'http://localhost:3000/api/alunos/'+id
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            empresaBuscada = res;
            document.querySelector('#idAlunoEdit').value = id        
            document.querySelector('#nomeEdit').value = empresaBuscada.nome         
            document.querySelector('#cepEdit').value = empresaBuscada.endereco         
            document.querySelector('#cpfEdit').value = empresaBuscada.cpf         
            document.querySelector('#rgEdit').value = empresaBuscada.rg         
            document.querySelector('#senhaEdit').value = empresaBuscada.senha       
        })
}

async function deletaAluno(id){
    let url = 'http://localhost:3000/api/alunos/'
    var answer = window.confirm("Deletar Aluno?");
        if (answer) {
            fetch(url + id, {
                method: 'DELETE'
              }).then(() => {
                 console.log('removed');
              }).catch(err => {
                  
                console.error(err)
              });
        }
        document.location.reload(true);
}

async function editaAluno(){
    let id = document.querySelector('#idAlunoEdit').value;
    let url = 'http://localhost:3000/api/alunos/'+id
    let nome = document.getElementById('nomeEdit').value
    let cep = document.getElementById('cepEdit').value
    let senha = document.getElementById('senhaEdit').value
    let cpf = document.getElementById('cpfEdit').value
    let rg = document.getElementById('rgEdit').value
    let aluno = {
        nome:nome,
        endereco:cep,
        rg:rg,
        senha:senha,
        cpf:cpf
    }
    try {
        await fetch(url, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(aluno),
        });
    } catch (err) {
    }
    document.location.reload(true);
}