const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoPList = document.querySelector(".js-toDoPendingList"),
  toDoFList = document.querySelector(".js-toDoFinishedList");
const TODOS_PLS = "toDosP";
const TODOS_FLS = "toDosF";
let toDosP = [];
let toDosF = [];

function deletToDoF(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoFList.removeChild(li);
  const cleanToDos = toDosF.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDosF = cleanToDos;
  saveToDosF();
}

function movePending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  paintToDo(li.querySelector("span").innerText);
  deletToDoF(event);
}

function paintToDoFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");

  const returnBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDosF.length + 1;
  delBtn.innerText = "X";
  delBtn.classList.add("ps_btn");
  returnBtn.innerText = "<<<";
  returnBtn.classList.add("ps_btn");

  delBtn.addEventListener("click", deletToDoF);
  returnBtn.addEventListener("click", movePending);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(returnBtn);
  li.id = newId;
  toDoFList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDosF.push(toDoObj);
  saveToDosF();
}

function moveFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  paintToDoFinished(li.querySelector("span").innerText);
  deletToDo(event);
}

function deletToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoPList.removeChild(li);

  const cleanToDos = toDosP.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDosP = cleanToDos;
  saveToDos();
}

function saveToDosF() {
  localStorage.setItem(TODOS_FLS, JSON.stringify(toDosF));
}

function saveToDos() {
  localStorage.setItem(TODOS_PLS, JSON.stringify(toDosP));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishedBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDosP.length + 1;
  delBtn.innerText = "X";
  delBtn.classList.add("ps_btn");

  finishedBtn.innerText = "V";
  finishedBtn.classList.add("ps_btn");

  delBtn.addEventListener("click", deletToDo);
  finishedBtn.addEventListener("click", moveFinished);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finishedBtn);
  li.id = newId;
  toDoPList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDosP.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDosP = localStorage.getItem(TODOS_PLS);
  const loadedToDosF = localStorage.getItem(TODOS_FLS);

  if (loadedToDosP !== null) {
    const parsedToDos = JSON.parse(loadedToDosP);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
    if (loadedToDosF !== null) {
      const parsedToDos = JSON.parse(loadedToDosF);
      parsedToDos.forEach(function(toDo) {
        paintToDoFinished(toDo.text);
      });
    }
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
