let activeList = {};

const listDescription = document.getElementById('list-container');
const createListBtn = document.getElementById('save-list');
const inputListName = document.getElementById('task-name');

// Prevent going to another page
const formEl = document.querySelector('.new-task-form');
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    saveList();
})


const getList = (id) =>
    fetch(`/api/lists/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(inputListNameText);

            const tableBody = document.querySelector('#tbody');
            const newRow = document.createElement('tr');
            const listCell = document.createElement('td');

            listCell.textContent = data;

            newRow.appendChild(listCell);
            tableBody.appendChild(newRow);
        })


const saveList = () => {
    const inputListNameText = inputListName.value;

    fetch('/api/lists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ list_name: inputListNameText }),
    }).then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(inputListNameText);

            const tableBody = document.querySelector('#tbody');
            const newRow = document.createElement('tr');
            const listCell = document.createElement('td');

            listCell.textContent = inputListNameText;
            newRow.appendChild(listCell);
            tableBody.appendChild(newRow);
        })
}

const deleteListBtn = async (e) => {
    if (e.target.hasAttribute('data-id')) {
      const id = e.target.getAttribute('data-id');
  
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      console.log(id)
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };

const editList = (list) =>
    fetch(`/api/lists/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
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

