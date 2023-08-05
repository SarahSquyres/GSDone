const getList = (id) =>
  fetch(`/api/lists/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

const saveList = (list) =>
  fetch('/api/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list),
  });

  const deleteList = (id) =>
  fetch(`/api/lists/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const editList = (list) =>
  fetch(`/api/lists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list),
  });

//create new list --emily created this
const newListHandler = async (event) => {
    event.preventDefault();

    const list_name = document.querySelector('#list_name').value.trim();
    if (list_name) {
        const response = await fetch(`/api/lists`, {
            method: 'POST',
            body: JSON.stringify({
                list_name,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/list/${list_name}`);
        } else {
            alert('Failed to create list');
        }
    }
};

//delete list
const delListHandler = async (e) => {
    if (e.target.hasAttribute('tasks')) {
        const id = e.target.getAttribute('tasks');

        const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete task');
        }
    }
};

//add list row to table
const addListHandler = async (e) => {
    
    document.getElementById('list-btn').addEventListener('click', function () {
        const listName = document.querySelector('list-name').value
        const listTable = document.querySelector('listTable')

        for ( let i = 1; i <= listName, i++;) {
            // const result = listName;
            let newListName = listTable.insertRow(-1);

            newListName.innerHTML = listName;
        }
    });
};


document
    .querySelector('')
    .addEventListener('submit', addListHandler);
document
    .querySelector('')
    .addEventListener('submit', delListHandler);
