// 투두리스트 구현을 위한 변수 정의
const todoBtn    = document.querySelector('#addBtn');
const todoText   = document.querySelector('#todoValue');
const todoBox    = document.querySelector('#toDoBody');
const _TODOLIST  = 'toDoList';
const isToDos    = localStorage.getItem(_TODOLIST);

let dummyHolder = [
                    { text: '애플 스토어에서 갤럭시폰 체험하기 🍎'},
                    { text: '다이소에서 후라이팬 사기 🍳' },
                    { text: '올리브영에서 디퓨저 사기 🌷'},
                    { text: '저녁 장 보기 👩‍🍳'},
                    { text: '카페에서 커피 원두 사기 ☕️'},
                    { text: '고양이 장난감 사기 🙀' },
                    { text: '오징어게임 정주행 하기 📺' },
                    { text: '개발일지 쓰기 👩‍💻' },
]
let todoArr      = [];

resetPlaceholder();


// localStorage에 todo 가 있는지 확인
if (isToDos !== null) {
    const getToDos = JSON.parse(isToDos);
    toDoArr = getToDos;
    getToDos.forEach((item) => drawToDo(item.todo, item.done, item.id));
}

// 엔터키 입력시
function enterHandler(e) {
    if (event.keyCode == 13) {
        toDoHandler(e);   
    }
}

function resetPlaceholder() {
    let randomNum    = Math.floor(Math.random()*dummyHolder.length);
    todoText.placeholder = dummyHolder[randomNum].text;
}

// 할일 추가 시
function toDoHandler(e) {
    e.preventDefault();
    // 빈 텍스트라면 placeholder 대로 추가해주자
    const todoValue = todoText.value; 
    if (todoValue.trim().length < 1) {
        drawToDo(todoText.placeholder);
        saveToDo(todoText.placeholder);
        todoText.value='';
        todoText.focus();
        resetPlaceholder();
    } 
    else {
        drawToDo(todoValue);
        saveToDo(todoValue);
        todoText.value='';
        todoText.focus();
    }
}



// 할일을 배열에 넣어주기
function addArr(text,done,id) {
    const obj = {
        todo : text,
        id   : id,
        done : (done)?done:false,
    }
    todoArr.push(obj);
}

// 할일 Create, Read
function drawToDo(text,done,id) {
    const UUID = (id)?id:Date.now();
    addArr(text,done,UUID);

    let li = document.createElement("li");
    li.className = 'list'; 
    li.setAttribute('id',UUID);

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

    if(done==true) checkbox.checked = true;

    label.appendChild(checkbox);

    let span = document.createElement('span');
    span.innerText = text;
    label.appendChild(span);
    li.append(label, btn);
    todoBox.appendChild(li);  

}

// 할일 완료처리
function doneToDo(e) {
    const isCheck = e.target.parentElement.children[0].checked;
    const id = +e.target.parentElement.parentElement.id;
    todoArr.forEach((ele) => {
        if (id == ele.id) {
            ele.done = (isCheck)?true:false;
        }
    });
    saveToDo();
}

// 할일 저장
function saveToDo() {  
    localStorage.setItem(_TODOLIST, JSON.stringify(todoArr));
}

// 할일 삭제
function deleteToDo(e) {
    const removeTarget = e.target.parentElement;
    removeTarget.remove();

    todoArr = todoArr.filter((todo) => todo.id !== parseInt(removeTarget.id));
    saveToDo(); 
}

todoBtn.addEventListener('click',  toDoHandler);
todoText.addEventListener('keydown', enterHandler);
  
