var campoAluno= document.getElementById("campoAluno");
var aluno = [];
var vantagens = [];
var id = ""
window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    await getEmpresas();
    await getAluno(id)
    
};

async function getAluno(id){
    let url = 'http://localhost:3000/api/alunos/'+id
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            aluno=res
            campoAluno.innerHTML=`
            <p>Nome: ${res.nome}</p>
            <p>CNPJ: ${res.cpf}</p>
            <p>Saldo: ${res.saldo}</p>
            `    
        })
}
    
async function getEmpresas(){
    let url = 'http://localhost:3000/api/empresas/'
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            for(let i = 0;i<res.length;i++){
                for(let j = 0;j<res[i].vantagens.length;j++){
                    let vantagem ={
                        nome:res[i].nome,
                        vantage:res[i].vantagens[j]
                    }
                    vantagens.push(vantagem)
                }
            }
            organizaVantagens();
        })
}

function organizaVantagens(){
    let frase = ""
    
    for(let i=0;i<vantagens.length;i++){
        frase+=`
        <div class="d-flex align-items-center border my-2">
            <div class="col p-4">
                <div class="row">
                    Empresa: ${vantagens[i].nome}   
                </div>  
                <div class="row">
                    Vantagem: ${vantagens[i].vantage.nome}   
                </div>         
                <div class="row">
                    Valor: ${vantagens[i].vantage.valor}   
                </div>  
                <div style="visibility: hidden">
                    ${vantagens[i].vantage.id}   
                </div>  
                <div class="row">
                    <button onclick="resgata(${vantagens[i].vantage.id})" class="btn btn-light" id="btnResgatar">Resgatar</button>  
                </div>  
            </div>
        </div>
        
        `
    }
    document.getElementById("vantagem").innerHTML=frase
}

function resgata(idVantagem){
    console.log(idVantagem);
    console.log("chamei");
    let url = `/api/alunos/solicitarVantagem/${id}/${idVantagem}`
    console.log(url);
    location.reload();
}