const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

let todos = []; //배열 선언

const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const delItem = (event) => {
  const target = event.target.parentElement;
  todos = todos.filter((todo) => todo.id !== parseInt(target.id));
  save();
  target.remove();
};

const addItem = (todo) => {
  if (!todo.text) {
    alert("추가될 할 일이 없습니다.");
  } else {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");

    span.innerText = todo.text;
    button.innerText = "삭제";
    button.addEventListener("click", delItem);

    li.appendChild(span);
    li.appendChild(button);
    showList.appendChild(li);
    li.id = todo.id;
  }
};

const handler = (event) => {
  event.preventDefault();

  const todo = {
    id: Date.now(),
    text: input.value,
  };

  todos.push(todo);
  addItem(todo);
  save();
  input.value = "";
};

const init = () => {
  const userTodos = JSON.parse(localStorage.getItem("todos"));
  if (userTodos) {
    userTodos.forEach((todo) => {
      addItem(todo);
    });

    todos = userTodos;
  }
};

init();
form.addEventListener("submit", handler);
