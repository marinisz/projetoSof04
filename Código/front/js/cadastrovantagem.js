var btnCadastra = document.getElementById("btnCadastrar")
var campoEmpresa= document.getElementById("campoDados");
var empresa = [];
window.onload = async function() {
    await getEmpresa("ckwbckvqo0114toub2ejxl6tn")
};

async function getEmpresa(id){
    let url = 'http://localhost:3000/api/empresas/'+id
    fetch(url)
        .then(response=>response.json())
        .then(res=>{
            empresa=res
            console.log(res); 
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

        fetch(`http://localhost:3000/${empresa.id}/vantagens/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
                body: corpo
            });
        
    }
    
})