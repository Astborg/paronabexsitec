//Hämta data från firebase rendera i DOM

async function products() {
  try {
    const baseURL =
      "https://paronab-79d88-default-rtdb.europe-west1.firebasedatabase.app/";
    const url = baseURL + "product.json";
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    localStorage.setItem("getdata", JSON.stringify(data));

    const lagretidag = document.querySelector(".lagretidag");
    Object.entries(data).forEach(
      ([key, value]) =>
        (lagretidag.innerHTML += `
        <div class="produkt-container">
        <p>${year}-0${month + 1}-${day}</p>
        <p class="rubrik">Produkt: ${key}</p>
        <p>Frankfurt: ${value.Frankfurt}</p>
        <p>Cupertino: ${value.Cupertino}</p> 
        <p>Norrköping: ${value.Norrköping}</p>
        </div>
        <br>
        `)
    );
  } catch (error) {
    console.log(error);
  }
}
products();

//Hämta värden från ifyllda fält och spara i localStorage
const euro = document.querySelectorAll(".euro");
const eurobtn = document.querySelector(".eurobtn");
eurobtn.disabled = true;
function change1() {
  alert(
    "Tryck på fortsätt knappen och du fortsätter på nästa sida för att ändra i lagret"
  );
  if (alert) {
    eurobtn.disabled = false;
  }
  const input1 = document.querySelector(".input1").value;
  const input2 = document.querySelector(".input2").value;
  const select = document.getElementById("select").value;
  const select2 = document.getElementById("select2").value;

  console.log(input1, input2, select);

  const arr = new Array();
  arr.push({ input1, input2, select, select2 });

  localStorage.setItem("myArray", JSON.stringify(arr));
  localStorage.setItem("select2", select2);
  localStorage.setItem("select", select);
  localStorage.setItem("input2", input2);
  localStorage.setItem("input1", input1);

  document.querySelector(".eurobtn").onclick = function () {
    location.href = "/modules/cart.html";
  };
}

// todo code
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const todo2 = document.querySelector(".todo2");

const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

async function renderTodo() {
  try {
    const baseURL =
      "https://todoparon-default-rtdb.europe-west1.firebasedatabase.app/";
    const url = baseURL + "todo.json";
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);

    Object.entries(data).forEach(
      ([key, value]) =>
        (todo2.innerHTML += `
      <p>${value}</p>`)
    );
  } catch (error) {
    console.log(error);
  }
}
renderTodo();
async function addTodoToFirebase() {
  try {
    const input = document.getElementById("input").value;

    const baseURL =
      "https://todoparon-default-rtdb.europe-west1.firebasedatabase.app/";
    const url = baseURL + "todo.json";
    const response = await fetch(url);
    console.log(response);
    let data = await response.json();
    console.log(data);
    console.log(input);

    // Send the updated data back to Firebase
    const updateResponse = await fetch(url, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (updateResponse.ok) {
      console.log("Data updated successfully in Firebase!");
    } else {
      console.error("Failed to update data in Firebase.");
    }
  } catch (error) {
    console.error("Error while updating data:", error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodoToFirebase();
  addTodo();
});
function addTodo(todo) {
  let todoText = input.value;
  console.log(todoText);
  if (todo) {
  }
  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }
    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      todoEl.remove();
      updateLS();
    });

    todosUL.appendChild(todoEl);

    input.value = "";

    updateLS();
  }
}
function updateLS() {
  const todosEl = document.querySelectorAll("li");

  const todos = [];
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
