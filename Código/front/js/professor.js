var btnPostar = document.querySelector("#criar")
var btnCriar = document.querySelector("#abrirModalCriar")
var table = document.querySelector('#corpoTabela')
var xhr = new XMLHttpRequest()
var iconEditar = document.querySelector("#iconEditar");
var iconApagar = document.querySelector("#iconApagar");
var professores= []
var empresaBuscada = []
var departamentos = []

window.onload = async function() {
    await buscaProfessores();
    //await buscaDepartamento();
};

btnPostar.addEventListener("click",()=>{
    let nome = document.getElementById('nome').value
    let cep = document.getElementById('cep').value
    let depart = document.getElementById('depart').value
    let senha = document.getElementById('senha').value
    let cpf = document.getElementById('cpf').value
    let rg = document.getElementById('rg').value
    let professor = {
        nome:nome,
        endereco:cep,
        departamento:depart,
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
    xhr.send(JSON.stringify(professor));
    document.location.reload(true);
})

async function buscaProfessores(){
    let url = 'http://localhost:3000/api/professores/'
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            professores = res;
            console.log(professores);
            var tabela = document.getElementById('corpoTabela')
            for(let i=0;i<professores.length;i++){
                let novaLinha = tabela.insertRow(0);
                let celula1 = novaLinha.insertCell(0);
                celula1.innerHTML=professores[i].id
                let celula2 = novaLinha.insertCell(1);
                celula2.innerHTML=professores[i].nome
                let celula3 = novaLinha.insertCell(2);
                celula3.innerHTML=professores[i].cpf
                let celula4 = novaLinha.insertCell(3);
                celula4.innerHTML=professores[i].departamento
                let celula5 = novaLinha.insertCell(4);
                celula5.innerHTML=`<svg onclick="retornaBuscado(${professores[i].id})" id="iconEditar" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" id="icones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
              </svg>
                <svg id="iconApagar" onclick="deletaProfessor(${professores[i].id})" style="cursor:pointer" id="icones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>`
            }

            iconEditar = document.querySelector("#iconEditar");
            iconApagar = document.querySelector("#iconApagar");
        })
       
}
async function buscaDepartamento(){
    let url = 'http://localhost:3000/api/departamentos/'
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            departamentos = res;
            console.log(departamentos);
            var selectInsti = document.querySelector("#depart")
            var edit = document.querySelector("#departEdit2")
            for(let i=0;i<departamentos.length;i++){
                var opt = document.createElement('option');
                opt.value=departamentos[i].id
                opt.innerHTML = departamentos[i].nome
                selectInsti.appendChild(opt)
            }
            for(let i=0;i<departamentos.length;i++){
                var opt = document.createElement('option');
                opt.value=departamentos[i].id
                opt.innerHTML = departamentos[i].nome
                edit.appendChild(opt)
            }
        })
       
}
async function retornaBuscado(id){
    let url = 'http://localhost:3000/api/professores/'+id
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            empresaBuscada = res;
            document.querySelector('#idProfessorEdit').value = id        
            document.querySelector('#nomeEdit').value = empresaBuscada.nome         
            document.querySelector('#cepEdit').value = empresaBuscada.endereco         
            document.querySelector('#cpfEdit').value = empresaBuscada.cpf         
            document.querySelector('#rgEdit').value = empresaBuscada.rg         
            document.querySelector('#senhaEdit').value = empresaBuscada.senha
            document.querySelector('#departEdit').value = empresaBuscada.departamento       
        })
}

async function deletaProfessor(id){
    let url = 'http://localhost:3000/api/professores/'
    var answer = window.confirm("Deletar Professor?");
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

async function editaProfessor(){
    let id = document.querySelector('#idProfessorEdit').value;
    let url = 'http://localhost:3000/api/professores/'+id
    let nome = document.getElementById('nomeEdit').value
    let cep = document.getElementById('cepEdit').value
    let senha = document.getElementById('senhaEdit').value
    let cpf = document.getElementById('cpfEdit').value
    let rg = document.getElementById('rgEdit').value
    let depart = document.getElementById('departEdit').value
    let professor = {
        nome:nome,
        endereco:cep,
        rg:rg,
        senha:senha,
        cpf:cpf,
        departamento:depart
    }
    try {
        await fetch(url, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(professor),
        });
    } catch (err) {
    }
    document.location.reload(true);
}