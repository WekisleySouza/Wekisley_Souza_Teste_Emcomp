
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
function existeUsuario(usuario) {
    var existe = false;
    getLocalStorage().forEach((usuarioAtual) => {
        if(usuarioAtual.nome_de_usuario == usuario){
            existe = true;
        }
    });
    return existe;
}

const criarUsuarioNoBD = (user) => {
    const dbUsers = getLocalStorage();
    dbUsers.push(user);
    setLocalStorage(dbUsers);
}

function novoUsuario(opcao = 0){
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
            if(opcao == 1){
                redirecionar("../index.html");
                emitirAlerta("Conta criada com sucesso. Por favor, faça o login!");
            }
        }else{
            emitirAlerta("A senha de confirmação não é igual a original. Tente novamente!");
        }
    }else{
        emitirAlerta("Este nome de usuário já existe, tente outro nome!");
    }
}

//Editando Usuário:
const atualizaUsuario = (index, client) => {
    const dbUsers = lerUsuario();
    dbUsers[index] = client;
    setLocalStorage(dbUsers);
}

//Excluindo usuario:
const excluirUsuario = (index) => {
    const dbUsers = lerUsuario();
    dbUsers.splice(index, 1);
    setLocalStorage(dbUsers)
}

// Funções chamadas nas páginas:
function excluir(){
    var index = document.querySelector("#index").value;
    if(index >= 0 && index < getLocalStorage().length){
        excluirUsuario(index);
        emitirAlerta("Usuário excluído com sucesso!");
        redirecionar("pagina_adm.html");
    }else{
        emitirAlerta("Usuário não encontrado!")
    }
}

function editarUsuario(){
    var index = document.querySelector("#index").value;
    var User = {
        nome: document.querySelector("#name").value,
        nome_de_usuario: document.querySelector("#user_name").value,
        nascimento: document.querySelector("#birthday").value,
        celular: document.querySelector("#phone").value,
        senha: document.querySelector("#new_password").value
    };

    if(index >= 0 && index < getLocalStorage().length){
        atualizaUsuario(index, User);
        emitirAlerta("Usuário alterado com sucesso!");
        redirecionar("pagina_adm.html");
    }else{
        emitirAlerta("Usuário não encontrado!")
    }
}

function novoUsuarioCadastro(){
    novoUsuario(1);
}

function fazerLogin(){  
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

function teste(){
    emitirAlerta("Usuário alterado com sucesso!" + getLocalStorage().length)
}