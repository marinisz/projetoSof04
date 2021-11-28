var alunos= []
var aluno={
    saldo:"",
}
var btnEnvia = document.getElementById("btnEnvia")

window.onload = async function() {
    await buscaAlunos();
};


async function buscaAlunos(){
    let url = 'http://localhost:3000/api/alunos/'
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            alunos = res;
            var selectAlunos = document.querySelector("#alunosSelect")
            for(let i=0;i<alunos.length;i++){
                var opt = document.createElement('option');
                opt.value=alunos[i].id
                opt.innerHTML = alunos[i].nome
                selectAlunos.appendChild(opt)
            }
        })
       
}

async function enviaMoedas(id,x){
    for(let i=0;i<alunos.length;i++){
        if(alunos[i].id==id){
            aluno=alunos[i]
        }
    }
    let soma = parseFloat(aluno.saldo)+x
    let envio={
        saldo:soma
    }
    await fetch('/api/alunos/'+id, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
            body: JSON.stringify(envio)
        });
}

btnEnvia.addEventListener("click", async ()=>{
    let optSelect = document.getElementById("alunosSelect").value
    let quantia = parseFloat(document.getElementById("quantia").value)
    await enviaMoedas(optSelect,quantia)
    
})
