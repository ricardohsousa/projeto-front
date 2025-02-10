document.addEventListener("DOMContentLoaded", carregarCadastros);

function carregarCadastros() {
    var listaCadastro = document.getElementById("lista-cadastro");
    if (!listaCadastro) return;

    listaCadastro.innerHTML = ""; 

    var cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    cadastros.forEach((cadastro, index) => {
        adicionarCadastroNaLista(cadastro, index);
    });
}

function cadastrar() {
    var nome = document.getElementById("nome").value.trim();
    var email = document.getElementById("email").value.trim();
    var dataCadastro = new Date().toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    if (nome && email) {
        var novoCadastro = { nome, email, data: dataCadastro };
        var cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

        cadastros.push(novoCadastro);
        localStorage.setItem("cadastros", JSON.stringify(cadastros));

        adicionarCadastroNaLista(novoCadastro, cadastros.length - 1);

        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    } else {
        alert("Preencha todos os campos!");
    }
}

function adicionarCadastroNaLista(cadastro, index) {
    var listaCadastro = document.getElementById("lista-cadastro");
    if (!listaCadastro) return;

    var li = document.createElement("li");

    li.innerHTML = `
    <span>Nome: ${cadastro.nome}</span><br>
    <span>Email: ${cadastro.email}</span><br>
    <span>Data de Cadastro: ${cadastro.data}</span>
    <button class="btn-remove" onclick="excluirCadastro(${index})">🗑</button>
    `;


    listaCadastro.appendChild(li);
}

function excluirCadastro(index) {
    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    if (index > -1) {
        cadastros.splice(index, 1);
        localStorage.setItem("cadastros", JSON.stringify(cadastros));
        carregarCadastros();
    }
}

function excluirTodosCadastros() {
    if (confirm("Tem certeza que deseja excluir todos os cadastros?")) {
        localStorage.removeItem("cadastros");
        document.getElementById("lista-cadastro").innerHTML = "";
    }
}

function limparFormulario() {
    document.querySelector("form").reset();
}

function buscarUsuarios() {
    var termoBusca = document.getElementById("buscar").value.toLowerCase();
    var listaCadastro = document.getElementById("lista-cadastro");
    var cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    var cadastrosFiltrados = cadastros.filter((cadastro) => {
        return (
            cadastro.nome.toLowerCase().includes(termoBusca) ||
            cadastro.email.toLowerCase().includes(termoBusca)
        );
    });

    listaCadastro.innerHTML = "";

    cadastrosFiltrados.forEach((cadastro, index) => {
        adicionarCadastroNaLista(cadastro, index);
    });
}
