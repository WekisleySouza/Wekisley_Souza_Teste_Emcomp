const getLocalStorage = () => JSON.parse(localStorage.getItem("dbUsers")) ?? [{nome: "Wekisley", nome_de_usuario: "inari", nascimento: "1999-08-01", celular: "32 999128391", senha: "12345"}];
const lerUsuario = () => getLocalStorage();

const criarLinha = (usuario) => {
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
    <td>${usuario.nome}</td>
    <td>${usuario.nome_de_usuario}</td>
    <td>${usuario.nascimento}</td>
    <td>${usuario.celular}</td>
    <td>${usuario.senha}</td>
    `;
    document.querySelector("#tb_usuarios>tbody").appendChild(novaLinha);
}

const limparTabela = () => {
    const linhas = document.querySelectorAll("#tb_usuarios>tbody tr");
    linhas.forEach(linha => linha.parentNode.removeChild(linha));
}

const atualizarTabela = () => {
    const dbUsers = lerUsuario();
    limparTabela()
    dbUsers.forEach(criarLinha);
}

setInterval(atualizarTabela, 100);