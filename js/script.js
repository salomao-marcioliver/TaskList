let input = document.querySelector('input[name=tarefa]');
let btn = document.querySelector('#botao');
let lista = document.querySelector('#lista');
//Card
let card = document.querySelector('.card');
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas(){
    lista.innerHTML='';
    for(tarefa of tarefas){
        let itemLista = document.createElement('li');
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        //Add click event on the list item
        itemLista.onclick = function(){
            deletarTarefa(this);
        }
        let itemTexto = document.createTextNode(tarefa);
        itemLista.appendChild(itemTexto);
        lista.appendChild(itemLista);
    }
}
renderizarTarefas();

btn.onclick = function(){
    let novaTarefa = input.value;
    if(novaTarefa !== ""){
        tarefas.push(novaTarefa);
        renderizarTarefas();
        input.value = '';
        removerSpans();

        //Saves the new data to the database
        salvarDadosNoStorage();
    }else{
        removerSpans();
        
        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');
        let msg = document.createTextNode('Você precisa informar a tarefa!');
        span.appendChild(msg);
        card.appendChild(span);
    }
}

function removerSpans(){
    let spans = document.querySelectorAll('span');
    
    for(let i = 0; i<spans.length; i++){
        card.removeChild(spans[i]);
    }
}

function deletarTarefa(tar){
    //Removes the task from the array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    //Renders the screen again
    renderizarTarefas();    

    //Saves the new data to the database
    salvarDadosNoStorage();
}

function salvarDadosNoStorage(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

  
}
console.log(tarefas);
console.log(JSON.stringify(tarefas));