let activeList = {};

const listDescription = document.getElementById('list-container');
const createListBtn = document.getElementById('save-list');
const inputListName = document.getElementById('task-name');
const submitTaskButton = document.getElementById('btn-post');



// Prevent going to another page
const formEl = document.querySelector('.new-task-form');
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    saveList();
});

const getList = (id) =>
    fetch(`/api/lists/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(data => {
            console.log('Task form data', data);
            console.log('Name of the task', inputListNameText);

            const tableBody = document.querySelector('#tbody');
            const newRow = document.createElement('tr');
            const listCell = document.createElement('td');

            listCell.textContent = data;

            newRow.appendChild(listCell);
            tableBody.appendChild(newRow);
        })

const displayList = (id) =>
    fetch(`/api/lists`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(data => {


            const tableBody = document.querySelector('#task-table tbody');
            tableBody.innerHTML = "";

            data.tasks.forEach(task => {
                if (task.list_body) {


                    let checkboxId = `check-box${task.id}`;
                    const row = document.createElement("tr");
                    row.innerHTML = ` <th scope="row"><input class="todo__checkbox" type="checkbox" id="${checkboxId}"></th>
                    <td class="text-break">${task.list_body}</td>
                    `;

                    tableBody.appendChild(row);
                    console.log(checkboxId);
                    console.log(task.id);
                }

            })
        })

const saveList = () => {
    const inputListNameText = inputListName.value;

    console.log('inputListNameText = ', inputListNameText);

    fetch('/api/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ list_body: inputListNameText }),
    }).then(response => {

        return response.json();
    })
        .then(data => {

            displayList();
        })
}

// const deleteButton = document.querySelector('#btn-complete');

// deleteButton.addEventListener('click', () => {
//     const checkedCheckboxes = document.querySelectorAll('.todo__checkbox:checked');

//     const tasksToDelete = Array.from(checkedCheckboxes).map(checkbox => {
//         return {
//             id: checkbox.getAttribute('data-task-id')
//         };
//     }); 
  
//     fetch(`/api/lists/${id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(tasksToDelete)
//     }).then(response => {
//         if (response.ok) {
//             displayList();
//         }
//     }).catch(error => {
//         console.error('Error deleting tasks:', error);
//     });
// });



// const checkedItemBtn = document.querySelector('#btn-complete');
// const checkedItem = document.querySelector('.todo__checkbox');
// const deleteList = (id) =>
//     fetch(`/api/lists`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }).then(response => response.json())
//         .then(data => {
//             data.tasks.forEach(task => {
//                 if (task.list_body) {
//                     let checkboxId = `check-box${task.id}`;
//                 }
//             }).then(function (res) {
//                 if (checkedItem === checkboxId) {
//                     return console.log("did this work?")
//                 }
//             })
//         })


displayList();



















