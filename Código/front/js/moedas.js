var alunos= []
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

btnEnvia.addEventListener("click", async ()=>{
    let optSelect = document.getElementById("alunosSelect").value
    let quantia = document.getElementById("quantia").value
    await fetch('/api/moedas/'+optSelect, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
        body: JSON.stringify(quantia)
    });
})
