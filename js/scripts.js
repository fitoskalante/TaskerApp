const applicationState = {
  username: "anonymous",
  todos: [{ text: "Make app", date: new Date(), isDone: true }, ]
};

function updateState(key, value) {
  const appState = JSON.parse(localStorage.getItem("applicationState"));
  appState[key] = value;
  localStorage.setItem("applicationState", JSON.stringify(appState));
}

function getData(key) {
  const appState = JSON.parse(localStorage.getItem("applicationState"));
  return appState[key];
}

if (localStorage.length === 0) {
  localStorage.setItem("applicationState", JSON.stringify(applicationState));
}

window.onload = function() {
  document.getElementById("username").innerHTML = getData("username");
//   document.getElementById('data').innerHTML = getData('todos');
};

let todoList = [
  { text: "Make app", date: new Date(), isDone: true },
  { text: "Make app work", date: new Date(), isDone: true },
  { text: "Make app work well", date: new Date(), isDone: false },
  { text: "Make app work well beautifully", date: new Date(), isDone: false }
];

function addTodo() {
  let todo = document.getElementById("todo").value;
  if (todo === "") {
  } else {
    todoList.push({ text: todo, date: new Date(), isDone: false });
    renderTodos(todoList);
    // updateState("todos", todoList.todo)
    document.getElementById("todo").value = "";
  }
}

function removeTodo(index) {
  todoList.splice(index, 1);
  renderTodos(todoList);
}

function toggleTodos(index) {
  todoList[index].isDone = !todoList[index].isDone;
  renderTodos(todoList);
}

function renderTodos(todos) {
  const html = todos
    .map((todo, i) => {
      return `<li class="container-fluid d-flex align-items-center text-left ${
        todo.isDone ? "done" : "undone"
      }"> 
      <label class="checkbox">
            <input id="checkbox" onclick="toggleTodos(${i})" type="checkbox" ${
        todo.isDone ? "checked" : ""
      }/>
            <span class="default"></span>
     </label>
      ${todo.text} 
      <i onclick=removeTodo(${i}) class="ml-auto far fa-trash-alt"></i></li>`;
    })
    .join("");
  updateState("todos", todos);
  document.getElementById("list").innerHTML = html;
}

function filterDone() {
  const doneTodoList = todoList.filter(todos => todos.isDone === true);
  renderTodos(doneTodoList);
}

function filterUndone() {
  const undoneTodoList = todoList.filter(todos => todos.isDone === false);
  renderTodos(undoneTodoList);
}

function login() {
  let val = document.getElementById("login").value;
  updateState("username", val);
  document.getElementById("username").innerHTML = getData("username");
  return val;
}

renderTodos(todoList);

// logic for search bar toggle //

function searchToggle(obj, evt) {
  var container = $(obj).closest(".search-wrapper");

  if (!container.hasClass("active")) {
    container.addClass("active");
    evt.preventDefault();
  } else if (
    container.hasClass("active") &&
    $(obj).closest(".input-holder").length == 0
  ) {
    container.removeClass("active");
    // clear input
    container.find(".search-input").val("");
    // clear and hide result container when we press close
    container.find(".result-container").fadeOut(100, function() {
      $(this).empty();
    });
  }
}

function submitFn(obj, evt) {
  value = $(obj)
    .find(".search-input")
    .val()
    .trim();

  _html = "Yup yup! Your search text sounds like this: ";
  if (!value.length) {
    _html = "Yup yup! Add some text friend :D";
  } else {
    _html += "<b>" + value + "</b>";
  }

  $(obj)
    .find(".result-container")
    .html("<span>" + _html + "</span>");
  $(obj)
    .find(".result-container")
    .fadeIn(100);

  evt.preventDefault();
}
