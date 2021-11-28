const urlParams = new URLSearchParams(window.location.search);
const idAluno = urlParams.get('id');
let aluno = {}

window.onload = async function() {
    console.log(idAluno);
    await retornaBuscado(idAluno);
};

async function retornaBuscado(id){
    var corpo = document.getElementById("corpo")
    var link = document.getElementById("link")
    let url = `http://localhost:3000/api/alunos/${id}`
    console.log(url);
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            aluno=res
            console.log(res);   
            corpo.innerHTML=`<div class="col"></div>
            <div class="col-12">Saldo: ${aluno.saldo} Moedas</div>
            <div class="col"></div>`
            link.innerHTML=`<a href="#"">Transaçoes</a>`
        })
}
