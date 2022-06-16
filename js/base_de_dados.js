
const getLocalStorage = () => JSON.parse(localStorage.getItem("dbUsers")) ?? [{nome: "Wekisley", nome_de_usuario: "inari", nascimento: "1999-08-01", celular: "32 999128391", senha: "12345"}];
const setLocalStorage = (dbUsers) => localStorage.setItem("dbUsers", JSON.stringify(dbUsers));
const lerUsuario = () => getLocalStorage();


function imprimeDB(){
    window.alert(localStorage.getItem("dbUsers"))
}

function emitirAlerta(texto){
    window.alert(texto)
}

function redirecionar(link){
    window.location.href = link
}

// Inserindo usuário:
function existeUsuario(usuario) { // Verifica se usuario existe no localHost
    var existe = false;
    getLocalStorage().forEach((usuarioAtual) => {
        if(usuarioAtual.nome_de_usuario == usuario){
            existe = true;
        }
    });
    return existe;
}

const criarUsuarioNoBD = (user) => { // Cria um usuario no localHost
    const dbUsers = getLocalStorage();
    dbUsers.push(user);
    setLocalStorage(dbUsers);
}


//Editando Usuário:
const atualizaUsuario = (index, client) => { // Troca o usuario do index recebido pelo usuario passado no parâmetro.
    const dbUsers = lerUsuario();
    dbUsers[index] = client;
    setLocalStorage(dbUsers);
}

//Excluindo usuario:
const excluirUsuario = (index) => { // Exclui usuario do localHost.
    const dbUsers = lerUsuario();
    dbUsers.splice(index, 1);
    setLocalStorage(dbUsers)
}

// Funções chamadas nas páginas:
function novoUsuario(){ // Função que é chamada na página de cadastro. Cria um usuário de acordo com o que foi informado no formulário. 
    var confirmarSenha = document.querySelector("#password_confirm").value;

    var User = {
        nome: document.querySelector("#name").value,
        nome_de_usuario: document.querySelector("#user_name").value,
        nascimento: document.querySelector("#birthday").value,
        celular: document.querySelector("#phone").value,
        senha: document.querySelector("#new_password").value
    };

    if(!existeUsuario(User.nome_de_usuario)){
        if(User.senha == confirmarSenha){
            criarUsuarioNoBD(User);
            redirecionar("../index.html");
            emitirAlerta("Conta criada com sucesso. Por favor, faça o login!");
        }else{
            emitirAlerta("A senha de confirmação não é igual a original. Tente novamente!");
        }
    }else{
        emitirAlerta("Este nome de usuário já existe, tente outro nome!");
    }
}

function excluir(){ // Exclui usuário com o index que foi passado no formulário.
    var index = document.querySelector("#index").value;
    if(index > 0 && index < getLocalStorage().length){
        excluirUsuario(index);
        emitirAlerta("Usuário excluído com sucesso!");
        redirecionar("pagina_adm.html");
    }else if(index == 0){
        emitirAlerta("Não é possível excluir o administrador!")
    }else{
        emitirAlerta("Usuário não encontrado!")
    }
}

function editarUsuario(){ // Edita usuário no index informado.
    var index = document.querySelector("#index").value;
    var User = {
        nome: document.querySelector("#name").value,
        nome_de_usuario: document.querySelector("#user_name").value,
        nascimento: document.querySelector("#birthday").value,
        celular: document.querySelector("#phone").value,
        senha: document.querySelector("#new_password").value
    };

    if(index > 0 && index < getLocalStorage().length){
        atualizaUsuario(index, User);
        emitirAlerta("Usuário alterado com sucesso!");
        redirecionar("pagina_adm.html");
    }else if(index == 0){
        emitirAlerta("Não é possível editar o administrador!")
    }else{
        emitirAlerta("Usuário não encontrado!")
    }
}

function fazerLogin(){  // Verifica se o usuario existe nos cadastros.
    var usuario = document.getElementById("user").value;
    var senha = document.getElementById("password").value; 
    var existe = false;
    getLocalStorage().forEach((usuario_atual) => {
        if(usuario == usuario_atual.nome_de_usuario && senha == usuario_atual.senha){
            if(usuario == "inari"){
                redirecionar("html/pagina_adm.html")
            }else{
                redirecionar("html/pagina_usuario.html")
            }
            existe = true;
        }
    });

    if(!existe){
        emitirAlerta("Você digitou o usuário ou senha errado!")
    }
}