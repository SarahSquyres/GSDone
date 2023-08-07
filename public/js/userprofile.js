let activeList = {};

const listDescription = document.getElementById('list-container');
const createListBtn = document.getElementById('save-list');
const inputListName = document.getElementById('task-name');

// Prevent going to another page
const formEl = document.querySelector('.new-task-form');
formEl.addEventListener("submit", (event)=>{
    event.preventDefault();
    saveList();
})


const getList = (id) =>
    fetch(`/api/lists/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

const saveList = () => {
    const inputListNameText = inputListName.value;
    console.log("Checking what we will send to express route")
    console.log(inputListNameText)

    fetch('/api/lists', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        body: JSON.stringify({list_name: inputListNameText}),
    }).then(response=>response.json())
    .then(data=>{
        console.log(data);
        // W3school
        // var liEl = document.createElement("li")
        // liEl.classList.add("some-class1")
        // liEl.classList.add("some-class2")
        // liEl.textContent = inputListName.value
        // ulEl.appendChild(liEl)
    })
}

const deleteList = (id) =>
    fetch(`/api/lists/${id}`, {
        method: 'DELETE',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
    });

const editList = (list) =>
    fetch(`/api/lists/${id}`, {
        method: 'PUT',
        // headers: {
        //     'Content-Type': 'application/json',
        // },
        body: JSON.stringify(list),
    });

const renderActiveList = () => {
    if (activeList.id) {
        listDescription.setAttribute('readonly', true);
        listDescription.value = activeList.list_body;
    } else {
        listDescription.removeAttribute('readonly');
        listDescription.value = '';
    }
};

const handleListSave = () => {
    const newList = {
        list_body: listDescription.value,
    };
    saveList(newList).then(() => {
        getAndRenderList();
        renderActiveList();
    });
};

const handleListDelete = (e) => {
    // Prevents the click listener for the list from being called when the button inside of it is clicked
    e.stopPropagation();

    const list = e.target;
    // const listId = JSON.parse(list.parentElement.getAttribute('not sure what goes here')).id;

    if (activeList.id === listId) {
        activeList = {};
    }

    deleteList(listId).then(() => {
        getAndRenderList();
        renderActiveList();
    });
};

const handleListView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
  };





















//create new list --emily created this
// const newListHandler = async (event) => {
//     event.preventDefault();

//     const list_name = document.querySelector('#list_name').value.trim();
//     if (list_name) {
//         const response = await fetch(`/api/lists`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 list_name,
//             }),
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         if (response.ok) {
//             document.location.replace(`/list/${list_name}`);
//         } else {
//             alert('Failed to create list');
//         }
//     }
// };

// //delete list
// const delListHandler = async (e) => {
//     if (e.target.hasAttribute('tasks')) {
//         const id = e.target.getAttribute('tasks');

//         const response = await fetch(`/api/tasks/${id}`, {
//             method: 'DELETE',
//         });

//         if (response.ok) {
//             document.location.replace('/profile');
//         } else {
//             alert('Failed to delete task');
//         }
//     }
// };

// //add list row to table
// const addListHandler = async (e) => {

//     document.getElementById('list-btn').addEventListener('click', function () {
//         const listName = document.querySelector('list-name').value
//         const listTable = document.querySelector('listTable')

//         for (let i = 1; i <= listName, i++;) {
//             // const result = listName;
//             let newListName = listTable.insertRow(-1);

//             newListName.innerHTML = listName;
//         }
//     });
// };


// document
//     .querySelector('')
//     .addEventListener('submit', addListHandler);
// document
//     .querySelector('')
//     .addEventListener('submit', delListHandler);
