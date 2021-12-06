var btnCadastra = document.getElementById("btnCadastrar")
var campoEmpresa= document.getElementById("campoDados");
var empresa = [];
window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);
    await getEmpresa(id)
};

async function getEmpresa(id){
    let url = 'http://localhost:3000/api/empresas/'+id
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            empresa=res
            let mes = res.createdAt.substring(5,7)
            let dia = res.createdAt.substring(8,10)
            let ano = res.createdAt.substring(0,4)
            campoEmpresa.innerHTML=`
            <p>Nome: ${res.nome}</p>
            <p>CNPJ: ${res.cnpj}</p>
            <p>Data de Criação: ${dia}/${mes}/${ano}</p>
            `    
        })
}

btnCadastra.addEventListener("click",()=>{
    let span = document.getElementById("alerta")
    let nome = document.getElementById("nome").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value
    let contadorErros = 0;
    if(nome.length>0){
        contadorErros++
        document.getElementById("nomeVazio").innerHTML =""
    }else{
        contadorErros--
        document.getElementById("nomeVazio").innerHTML ="Título não pode ser vazio**"
    }
    if(valor.length>0){
        contadorErros++
        document.getElementById("valorVazio").innerHTML =""
    }else{
        contadorErros--
        document.getElementById("valorVazio").innerHTML ="Valor não pode ser vazio**"
    }
    if(descricao.length>0){
        contadorErros++
        document.getElementById("descricaoVazia").innerHTML =""
    }else{
        contadorErros--
        document.getElementById("descricaoVazia").innerHTML ="Descrição não pode ser vazia**"
    }
    if(contadorErros>=3){
        let corpo ={
            nome:nome,
            descricao:descricao,
            valor:parseInt(valor)
        }
        corpo = JSON.stringify(corpo)

        fetch(`http://localhost:3000/api/empresas/${empresa.id}/vantagens/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
                body: corpo
            }).then((response)=>{
                console.log('cadastrado');
                span.innerHTML+="Vantagem cadastrada"
                setTimeout(()=>{
                    document.getElementById("nome").value = " "
    document.getElementById("descricao").value = ""
     document.getElementById("valor").value = 0
                    span.innerHTML=""
                },1000)
            }).catch((error)=>{
                console.log(error)
            })
        
    }
    
})