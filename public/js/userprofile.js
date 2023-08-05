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
            alert('Failed to create list')
        };
    };
};

// delete task
const delTaskHandler = async (e) => {
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

    };
};

//create list 
const createListHandler = async (e) => {
    if (e.target.hasAttribute('tasks')) {
        const id = e.target.getAttribute('form');
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ task_description })
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create task');
        };
    };
};

//create task with hide and show
const createTaskHandler = async (e) => {
    if (e.target.hasAttribute('form')) {
        const id = e.target.getAttribute('form');
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ task_description })
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create task');

        };
    };
};

//create new task within a list
const newTaskHandler = async (event) => {
    event.preventDefault();
    const task_description = document.querySelector('#task_description').value.trim();
    const task_list_id = document.querySelector('#task_list_id').value.trim();
    if (task_description && task_list_id) {
        const response = await fetch(`/api/tasks`, {
            method: 'POST',
            body: JSON.stringify({
                task_description,
                task_list_id,
            }),
        });
        if (response.ok) {
            document.location.replace(`/list/${task_list_id}`);
        } else {
            alert('Failed to create task');
        };
    };
};

const updateProfHandler = async (e) => {
    if (e.target.hasAttribute('tasks')) {
        const id = e.target.getAttribute('');
        const response = await fetch(`/api/tasks`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update profile');
        };
    };
};

document
    .querySelector('.delete')
    .addEventListener('submit', delTaskHandler);

document
    .querySelector('.new-task-form')
    .addEventListener('submit', createListHandler);

document
    .querySelector('.new-task-form')
    .addEventListener('submit', createTaskHandler);

// const multiavatar = require("@multiavatar/multiavatar");

// // function getAvatar(user_name){
// //     let htmlContainer = document.querySelector('.userAvatar').src;
// //     if(user_name.length) {
// //         var svgEl = multiavatar(user_name);
// //         htmlContainer.innerHTML = svgEl;
// //     }
// //     else {
// //         htmlContainer.innerHTML = '';
// //     }
// // };
// // getAvatar();

