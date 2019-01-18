function setConfig(){
    
    //criando um objeto que vai setar o titulo da aplicação, assim n precisa colocar no html
    var texts = {
        "title": "CompreAqui!"
    };
    
    document.title = texts.title;
    document.getElementById("navTitle").
    innerHTML = texts.title;

}
 //executando a função
 setConfig();