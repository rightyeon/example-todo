const todoBtn   = document.querySelector('#addBtn');
const todoText  = document.querySelector('#todoValue');
const todoBox   = document.querySelector('#toDoBody');
const _TODOLIST  = 'toDoList';

let todoArr = [];

function enterHandler(e) {
    if (event.keyCode == 13) {
        toDoHandler(e);   
    }
}

function toDoHandler(e) {
    e.preventDefault();
    // 빈 텍스트라면 Input Focus || placeholder 대로 추가해주기
    // 할일 목록 추가하기
    const todoValue = todoText.value; 
    if (todoValue.length < 1) {
        todoText.focus();
    } 
    else {
        drawToDo(todoValue);
        saveToDo(todoValue);
        todoText.value='';
        todoText.focus();
    }
}

function doneToDo(e) {
    console.log('done');
}

function saveToDo() {  
    localStorage.setItem(_TODOLIST, JSON.stringify(todoArr));
}

function addArr(text, id) { 
    const obj = {
        todo : text,
        id   : id,
        done : false,
    }
    todoArr.push(obj);
}

function drawToDo(text) {
    let id = todoArr.length+1;

    addArr(text, id);

    let li = document.createElement("li");
    li.className = 'list'; 
    li.setAttribute('id',id);

    let btn = document.createElement('i');
    // 폰트어썸은 class 로 추가하지 말고 setAttribute 로 그려줘야함
    btn.setAttribute('class', 'far fa-trash-alt text-red-500');
    btn.addEventListener('click', deleteToDo);

    let label = document.createElement("label");
    label.className = 'cursor-pointer label';
    label.addEventListener('click', doneToDo);

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    checkbox.className = 'checkbox checkbox-primary checkbox-md mr-3';
    label.appendChild(checkbox);

    // append는 여러개 인자를 받을 수 있고, appendChild는 노드객체 1개만 받을 수 있음

    let span = document.createElement('span');
    span.innerText = text;
    label.appendChild(span);
    li.append(label, btn);
    todoBox.appendChild(li);  

}

function deleteToDo(e) {
    const removeTarget = e.target.parentElement;
    removeTarget.remove();

    todoArr = todoArr.filter((todo) => todo.id !== parseInt(removeTarget.id));
    saveToDo();
    // console.log(id);
}

todoBtn.addEventListener('click',  toDoHandler);
todoText.addEventListener('keydown', enterHandler);
 

const isToDos = localStorage.getItem(_TODOLIST);

if (isToDos !== null) {
    const getToDos = JSON.parse(isToDos);
    toDoArr = getToDos;
    getToDos.forEach((item) => drawToDo(item.todo));
}

