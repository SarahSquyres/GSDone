let activeList = {};

const listDescription = document.getElementById("list-container");
const createListBtn = document.getElementById("save-list");
const inputListName = document.getElementById("task-name");
const submitTaskButton = document.getElementById("btn-post");

// Prevent going to another page
const formEl = document.querySelector(".new-task-form");
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  saveList();
});

const getList = (id) =>
  fetch(`/api/lists/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#tbody");
      const newRow = document.createElement("tr");
      const listCell = document.createElement("td");

      listCell.textContent = data;

      newRow.appendChild(listCell);
      tableBody.appendChild(newRow);
    });

const displayList = (id) =>
  fetch(`/api/lists`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#task-table tbody");
      tableBody.innerHTML = "";

      data.tasks.forEach((task) => {
        if (task.list_body) {
          let checkboxId = `check-box${task.id}`;
          const row = document.createElement("tr");
          row.innerHTML = ` <th scope="row"><input class="todo__checkbox" type="checkbox" id="${checkboxId}"></th>
                    <td class="text-break">${task.list_body}</td>
                    `;

          tableBody.appendChild(row);
        }
      });
    });

const saveList = () => {
  const inputListNameText = inputListName.value;

  fetch("/api/lists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ list_body: inputListNameText }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayList();
    });
};
displayList();
