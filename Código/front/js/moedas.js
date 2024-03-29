var alunos= []
let prof = []
let profSaldo = 0
var aluno={
    saldo:"",
}
var dadosProfessor={
    saldo:"",
    nome:""
}
var btnEnvia = document.getElementById("btnEnvia")
var professor

window.onload = async function() {
    await buscaAlunos();

    var url = document.location.href,
    params = url.split('?')[1].split('&'),
    data = {}, tmp;

    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    this.professor = data;
    let url2 = 'http://localhost:3000/api/professores/'+this.professor.id
    fetch(url2)
        .then(response=>response.json())
        .then(res=>{
            prof=res;
            document.getElementById("nomeProf").innerHTML="Carteira de "+prof.nome
        })

    await buscaSaldo();
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

async function buscaSaldo(){
    let url = 'http://localhost:3000/api/professores/consultarSaldo/'+this.professor.id
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            dadosProfessor=res;
            document.getElementById("saldo").innerHTML ="Saldo:"+dadosProfessor.saldo + ",00"
            profSaldo = res.saldo
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
    if(x<profSaldo){
    await fetch('http://localhost:3000/api/alunos/'+id, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
            body: JSON.stringify(envio)
        });

    let motivoDaDoacao = document.getElementById("motivo").value
    let segundoEnvio={
        alunoId:parseInt(id),
        motivo: motivoDaDoacao,
        quantidade:x
    }
    await fetch('http://localhost:3000/api/professores/enviarMoeda/'+this.professor.id, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(segundoEnvio)
    });
    }else{
        alert("Saldo insuficiente")
    }
}

btnEnvia.addEventListener("click", async ()=>{
    let optSelect = document.getElementById("alunosSelect").value
    let quantia = parseFloat(document.getElementById("quantia").value)
    await enviaMoedas(optSelect,quantia)

})
