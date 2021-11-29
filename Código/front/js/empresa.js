var btnPostar = document.querySelector("#criar")
var btnCriar = document.querySelector("#abrirModalCriar")
var table = document.querySelector('#corpoTabela')
var empresas = [];
var iconEditar = document.querySelector("#iconEditar");
var iconApagar = document.querySelector("#iconApagar");


window.onload = async function() {
    await buscaEmpresas()
};

btnPostar.addEventListener("click",()=>{
    var xhr = new XMLHttpRequest()
    let nome = document.getElementById('nome').value
    let cnpj = document.getElementById('cnpj').value
    let senha = document.getElementById('senha').value
    let empresa = {
        nome:nome,
        senha:senha,
        cnpj:cnpj
    }
    xhr.open('POST', '/api/usuarios/cadastrar/', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() {//Call a function when the state changes.
        if(xhr.readyState == 4 && xhr.status == 200) {
            let object = JSON.parse(xhr.response)
        }
    }
    xhr.send(JSON.stringify(empresa));
    document.location.reload(true);
})


async function buscaEmpresas(){
    let url = 'http://localhost:3000/api/empresas/'
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            empresas = res;
            var tabela = document.getElementById('corpoTabela')
            for(let i=0;i<empresas.length;i++){
                let novaLinha = tabela.insertRow(0);
                let celula1 = novaLinha.insertCell(0);
                celula1.innerHTML=i+1
                let celula2 = novaLinha.insertCell(1);
                celula2.innerHTML=empresas[i].nome
                let celula3 = novaLinha.insertCell(2);
                celula3.innerHTML=empresas[i].cnpj
                let celula4 = novaLinha.insertCell(3);
                celula4.innerHTML=`<svg onclick="retornaBuscado("${empresas[i].id}")" id="iconEditar" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" id="icones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
              </svg>
                <svg id="iconApagar" onclick="deletaEmpresa(${i+1})" style="cursor:pointer" id="icones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>`
            }

            iconEditar = document.querySelector("#iconEditar");
            iconApagar = document.querySelector("#iconApagar");
        })
}

async function retornaBuscado(id){
    let url = 'http://localhost:3000/api/empresas/'+id
    console.log(url);
    // fetch(url)
    //     .then(response=>response.json())
    //     .then(res=>{
    //         console.log(res);
    //         empresaBuscada = res;
    //         document.querySelector('#idEmpresaEdit').value = id        
    //         document.querySelector('#nomeEdit').value = empresaBuscada.nome       
    //         document.querySelector('#rgEdit').value = empresaBuscada.cnpj             
    //     })
}

async function deletaEmpresa(id){
    let url = 'http://localhost:3000/api/empresas/'
    var answer = window.confirm("Deletar Empresa?");
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

async function editaEmpresa(){
    let id = document.querySelector('#idEmpresaEdit').value;
    let url = 'http://localhost:3000/api/empresas/'+id
    let nome = document.getElementById('nomeEdit').value
    let cnpj = document.getElementById('cnpjEdit').value
    let empresa = {
        nome:nome,
        cnpj:cnpj
    }
    console.log(empresa);
    try {
        await fetch(url, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify(empresa),
        });
    } catch (err) {
    }
}