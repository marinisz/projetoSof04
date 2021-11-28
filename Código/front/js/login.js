var btn = document.getElementById("btnEnviar")

btn.addEventListener("click",()=>{
    var email = document.getElementById("email").value
    var senha = document.getElementById("senha").value
    var alert = document.getElementById("alerta")
    if(email!=""||senha!=""){
        data={
            email:email,
            senha:senha
        }
        await fetch('login/', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(data)
        })
    }else{
        alert.innerHTML="Dados invalidos"
    }
})