var btn = document.getElementById("btnEnviar")
var btn = document.getElementById("btnProfessorPage")

btn.addEventListener("click",()=>{
    var email = document.getElementById("email").value
    var senha = document.getElementById("senha").value
    var alert = document.getElementById("alerta")
    console.log(email,senha);
    if(email!=""||senha!=""){
        alert.innerHTML=""
        data={
            email:email,
            senha:senha
        }
        // await fetch('login/', {
        //     method: 'POST',
        //     headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json'
        //     },
        // body: JSON.stringify(data)
        // })
    }else{
        alert.innerHTML="Dados invalidos"
    }
})

btn.addEventListener("click",()=>{
    var prof = document.getElementById('profs').value,
    url = document.location.href +'moedas.html?professor=' + encodeURIComponent(prof);
    document.location.href = url;
})

window.onload = async function() {
    await buscaProfessores();    
};

async function buscaProfessores(){
    let url = 'http://localhost:3000/api/professores/'
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            professores = res;
            console.log(professores);
            var selectProf = document.querySelector("#profs")
            for(let i=0;i<res.length;i++){
                var opt = document.createElement('option');
                opt.value=res[i].id
                opt.innerHTML = res[i].nome
                selectProf.appendChild(opt)
            }
        })
       
}