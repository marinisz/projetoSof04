var campoAluno= document.getElementById("campoAluno");
var aluno = [];
var vantagens = [];
var id = ""
window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    await getAluno(id)
    await getEmpresas();
};

async function getAluno(id){
    let url = 'http://localhost:3000/api/alunos/'+id
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            aluno=res
            console.log(res);
            campoAluno.innerHTML=`
            <p>Nome: ${res.nome}</p>
            <p>CNPJ: ${res.cpf}</p>
            <p>Saldo: ${res.saldo}</p>
            <h3>Vantagens resgatadas</h3>\n
            <div id="aVa"></div>
            `    
            let text = ""
            for(let i=0;i<aluno.vantagens.length;i++){
                text+=`<p>Nome: ${aluno.vantagens[i].vantagem.nome}<br>Valor: ${aluno.vantagens[i].valor}<p>`
            }
            document.getElementById("aVa").innerHTML=text
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
        <div class="d-flex align-items-center bg-secondary rounded border border-dark my-2">
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
                    <button id="${vantagens[i].vantage.id}" onclick="resgata('${vantagens[i].vantage.id}')" class="btn btn-light" id="btnResgatar">Resgatar</button>  
                </div>  
            </div>
        </div>
        
        `
    }
    document.getElementById("vantagem").innerHTML=frase
}

function resgata(idVantagem){
    let url = `/api/alunos/solicitarVantagem/${id}/${idVantagem}`
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            console.log(res.status);
            document.location.reload(true);
        }).catch(error =>{
            alert("Vantagem já resgatada")
        })
}

function confereVantagem(){
    let alunoVantagens = aluno.vantagens
    console.log(alunoVantagens);
    let contador = 0;
    let aux = [];
    aux.push(vantagens[0])
    for(let i = 0; i< vantagens.length;i++){
        if(i>1){
            aux.push(vantagens[i])
        }
        for(let j=0;j<alunoVantagens.length;j++){
            if(aux[i]==alunoVantagens[j]){
                aux.pop();
            }else{
                contador++;
            }
        }
    }
    console.log(aux);
}