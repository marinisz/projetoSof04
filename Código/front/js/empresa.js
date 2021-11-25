var btnPostar = document.querySelector("#criar")
var table = document.querySelector('#corpoTabela')
var empresas = [];
var iconEditar = document.querySelector("#iconEditar");
var iconApagar = document.querySelector("#iconApagar");
var xhr = new XMLHttpRequest()

window.onload = async function() {
    await buscaEmpresas()
};

btnPostar.addEventListener("click",()=>{
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
    xhr.open("GET", "/api/empresas/")

    xhr.onload = function(){
        let resposta = xhr.response;
        let resultado = JSON.parse(resposta)
        empresas = resultado;
        let corpo = '';
        for(let i=0;i<empresas.length;i++){
            corpo+=`
            <tr>
                <td id="idEmpresa">${i+1}</td>
                <td id="nomeEmpresa">${empresas[i].nome}</td>
                <td id="cnpjEmpresa">${empresas[i].cnpj}</td>
                <td>
                <svg id="iconEditar" style="cursor:pointer" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" id="icones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                </svg>
                    <svg id="iconApagar" style="cursor:pointer" id="icones" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </td>
            </tr>
            `
        }
        table.innerHTML=corpo
    }
    xhr.send();
}