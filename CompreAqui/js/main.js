//arquivo principal

//array de objetos da lista para ser usado como teste
var list=[
    //objetos ficam dentro das chaves
    {"desc": "arroz","amount":"1","value":"5.40"},
    {"desc": "feijao","amount":"2","value":"3.80"},
    {"desc": "farinha","amount":"1","value":"5.50"},
    
];

//cria uma função para retonrar o valor total da conta
function getTotal(list){
    var total = 0;
    //para fazer os calculos
    for (var key in list){
        total += list[key].value * list[key].amount;
    }
    document.getElementById("totalValue").innerHTML = formatValue(total);
    
}


//função para setar no html a lista

function setList(list){
    var table = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ação</td></tr></thead><tbody>';
    for(var key in list){
        table += '<tr><td>'+ formatDesc(list[key].desc) +
        '</td><td>'+formatAmoutn(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +
        '</td><td><button class="btn btn-primary" onclick="setUpdate('+key+');" >Edit</button>  <button class="btn btn-danger" onclick="deleteData('+key+');" >Delete </button></td></tr>';
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    getTotal(list);
    saveListStorage(list);
}
    //função para formato da descrição
    function formatDesc(desc){
        //vai ficar tudo minusculo
        var str= desc.toLowerCase();
        str = str.charAt(0).toUpperCase() + str.slice(1); //traz a primeira letra da palavra
        return str;        
    }
    //função para os valores
    function formatValue(value){
        //tranforma para float, colocou os dois numeros e trasnforomou para string
        var str = parseFloat(value).toFixed(2) + "";
        str= str.replace(".",",");
        str= "R$ " + str;
        return str;
    }  
    //função para os Quantidade
    function formatAmoutn(amount){
        return parseInt(amount);
    }      

    //funcção para adicionar produtos
    function addData(){
        //faz a validação dos dados
        if(!validation()){
            return;
        }
        var desc = document.getElementById("desc").value;
        var amount = document.getElementById("amount").value;
        var value = document.getElementById("value").value;

        //adiciona o primeiro da lista, através de um objeto
        list.unshift({
            "desc": desc,
            "amount": amount,
            "value": value
        });
        setList(list);
        }

    //função de edicao
    function setUpdate(id){
        var obj = list[id];
        document.getElementById("desc").value = obj.desc;
        document.getElementById("amount").value = obj.amount;
        document.getElementById("value").value = obj.value;
        document.getElementById("btnUpdate").style.display = "inline-block";
        document.getElementById("btnAdd").style.display = "none";
    
        document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
    }
    
    //função para resetar o form
    function resetForm(){
        document.getElementById("desc").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("value").value = "";
        document.getElementById("btnUpdate").style.display = "none";
        document.getElementById("btnAdd").style.display = "inline-block";

       
       document.getElementById("inputIDUpdate").innerHTML = "";
       document.getElementById("errors").style.display = "none";
            
    }

    //funcao para atualizar os dados
    function updateData(){
        //faz a validação dos dados
        if(!validation()){
            return;
        }
        var id = document.getElementById("idUpdate").value;
        var desc = document.getElementById("desc").value;
        var amount = document.getElementById("amount").value;
        var value = document.getElementById("value").value;
    
        list[id] = {"desc":desc, "amount": amount, "value":value };
        resetForm();
        setList(list);
    
    }
    //função para deletar
    function deleteData(id){
        //segurança para confirmar a exclusão
        if(confirm("Deseja apagar o item?")){
            if(id === list.length -1){
                //limpa o ultimo registro da lista
                list.pop();
            } else if(id === 0){
                //limpa o primeiro registro do array
                list.shift();
            }else{
                var arraAuxIni = list.slice(0,id);
                var arraAuxEnd = list.slice(id + 1);
                list = arraAuxIni.concat(arraAuxEnd);
                
            }
            setList(list);
        }
    }

    function validation(){
        //valida a descricao, quantidade, valor
        var desc = document.getElementById("desc").value;
        var amount = document.getElementById("amount").value;
        var value = document.getElementById("value").value;
        var errors = "";

        //valida se está vazio e se os valores são validos
        if(desc === ""){
            errors += '<p>Informe o nome do produto! </p>';
        }
        if(amount === ""){
            errors += '<p>Informe a quantidade de produto! </p>';
        }else if(amount != parseInt(amount)){
            errors += '<p>Informe um valor válido! </p>';
        }
        if(value === ""){
            errors += '<p>Informe o valor do produto! </p>';
        }else if(value != parseFloat(value)){
            errors += '<p>Informe um valor válido! </p>';
        }

        //verifica se existe erro
        if(errors != ""){
            document.getElementById("errors").style.display = "block";
            document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
            document.getElementById("errors").style.color = "white";
            document.getElementById("errors").style.padding = "10px";
            document.getElementById("errors").style.margin = "20px";
            document.getElementById("errors").style.borderRadius = "13px";
            document.getElementById("errors").innerHTML = " <h3>Erro: </h3>" + errors;
            return 0;
        }else{
            return 1;
        }
    }
    // funcao para limpar lista
    function deleteList(){
        if(confirm("Deseja apagar a lista")){
            list = [];
            setList(list);
        }
    }
        
    //função para salvar no localStorage os dadso
    function saveListStorage(list){
        //tranforma o array em string
        var jsonStr = JSON.stringify(list);
        localStorage.setItem("list",jsonStr);

    }
    //funcao de inicialização
    function initListStorage(){
        //se existir ele vai atualizar
        var testeList = localStorage.getItem("list");
        if(testeList){
            //transforma de string para array
            list = JSON.parse(testeList);
        }
        setList(list);
    }
    initListStorage();
