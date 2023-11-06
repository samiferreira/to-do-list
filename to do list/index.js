const inputNovaTarefa = document.querySelector('#inputNovaTarefa');
const btnAddTarefa = document.querySelector('#btnAddTarefa');
const listaTarefas = document.querySelector('#listaTarefas');
const btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
const idTarefaEdicao = document.querySelector('#idTarefaEdicao');
const inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');
const janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');



inputNovaTarefa.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        adicionarTarefa(inputNovaTarefa.value);
    }
});

btnAddTarefa.addEventListener('click', () => {
    adicionarTarefa(inputNovaTarefa.value);
});

janelaEdicaoBtnFechar.addEventListener('click', () => {
    alternarJanelaEdicao();
});

btnAtualizarTarefa.addEventListener('click', (e) => {
    e.preventDefault();

    const idTarefa = idTarefaEdicao.innerHTML.replace('#', '');
    const tarefaNome = inputTarefaNomeEdicao.value;
    const tarefaAtual = document.getElementById(idTarefa);

    if (tarefaAtual) {
        tarefaAtual.querySelector('.textoTarefa').innerHTML = tarefaNome;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }
});

function adicionarTarefa(nome) {
    if (!nome) {
        alert("Por favor, informe algum valor.");
        return;
    }

    const tarefa = {
        nome,
        id: gerarId(),
    };

    const li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    inputNovaTarefa.value = '';
}

function gerarId() {
    return Math.floor(Math.random() * 3000);
}
function criarTagLI(tarefa) {
    const li = document.createElement('li');
    li.id = tarefa.id;

    const span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    const div = document.createElement('div');

    const btnEditar = document.createElement('button');
    btnEditar.classList.add('btnAcao');
    btnEditar.innerHTML = '<i class="fa fa-pencil"></i>';
    btnEditar.addEventListener('click', () => editar(tarefa.id));

    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btnAcao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.addEventListener('click', () => excluir(tarefa.id));

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function editar(idTarefa) {
    const li = document.getElementById(idTarefa);
    if (li) {
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.querySelector('.textoTarefa').innerHTML;
        alternarJanelaEdicao();
    } else {
        alert('Elemento HTML não encontrado!');
    }
}

function excluir(idTarefa) {
    const confirmacao = window.confirm('Tem certeza que deseja excluir?');
    if (confirmacao) {
        const li = document.getElementById(idTarefa);
        if (li) {
            listaTarefas.removeChild(li);
        } else {
            alert('Elemento HTML não encontrado!');
        }
    }
}

function alternarJanelaEdicao() {
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}