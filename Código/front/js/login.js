var btn = document.getElementById("btnEnviar")
// var btn = document.getElementById("btnProfessorPage")

btn.addEventListener("click",()=>{
    var cpf = document.getElementById("cpf").value
    var senha = document.getElementById("senha").value
    var alert = document.getElementById("alerta")
    if(cpf!=""||senha!=""){
        alert.innerHTML=""
        data={
            cnpj:cpf,
            senha:senha
        }
        fetch('/api/usuarios/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
        }).then((response)=>{
            console.log(response);
        })
    }else{
        alert.innerHTML="Dados invalidos"
    }
})

// btn.addEventListener("click",()=>{
//     var prof = document.getElementById('profs').value,
//     url = document.location.href +'moedas.html?professor=' + encodeURIComponent(prof);
//     document.location.href = url;
// })

window.onload = async function() {
    // await buscaProfessores();    
};

// async function buscaProfessores(){
//     let url = 'http://localhost:3000/api/professores/'
//     fetch(url)
//         .then(response=>response.json())
//         .then(res=>{
//             professores = res;
//             console.log(professores);
//             var selectProf = document.querySelector("#profs")
//             for(let i=0;i<res.length;i++){
//                 var opt = document.createElement('option');
//                 opt.value=res[i].id
//                 opt.innerHTML = res[i].nome
//                 selectProf.appendChild(opt)
//             }
//         })
       
// }