// const multiavatar = require("@multiavatar/multiavatar");

// function getAvatar(user_name){
//     let htmlContainer = document.querySelector('.userAvatar').src;
//     if(user_name.length) {
//         var svgEl = multiavatar(user_name);
//         htmlContainer.innerHTML = svgEl;
//     }
//     else {
//         htmlContainer.innerHTML = '';
//     }
// };
// getAvatar();

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
    }
};

//create list 
const createListHandler = async (e) => {
    if (e.target.hasAttribute('form')) {
        const id = e.target.getAttribute('form');

        const response = await fetch(`/api/tasks/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({task_description}) //stringify object that takes in elements of form
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create task');
        }
    }
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
            body: JSON.stringify({task_description}) //stringify object that takes in elements of form
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create task');
        }
    }
};

const updateProfHandler = async (e) => {
    if (e.target.hasAttribute('tasks')) {
        const id = e.target.getAttribute('');

        const response = await fetch(`/api/tasks`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) //stringify object that takes in elements of form
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update profile');
        }
    }
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



    // async function profileHandler(e) {
//     e.preventDefault();
//     const id = document.querySelector('#id').value;
//     const password = document.querySelector('#password').value;
//     const user_name = document.querySelector('#user_name').value;

//     const response = await fetch(`/api/users`, {
//         method: 'POST',
//         body: JSON.stringify({
//             id,
//             user_name,
//             password,
//             first_name,
//             last_name,
//             bio,
//             profile_picture,
//         }),
//         headers: {
//             'content-type': 'application/json',
//         },
//     });
//     if (response.ok) {
//         document.location.replace('/');
//     } else {
//         alert('Failed to add profile');
//     }
// };

// document
//     .querySelector('.profile')
//     .addEventListener('submit', profileHandler);