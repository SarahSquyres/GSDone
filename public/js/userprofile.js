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
// }

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
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            document.location.replace(`/list/${task_list_id}`);
        } else {
            alert('Failed to create task');
        }
    }
};



document.querySelector('.profile').addEventListener('submit', profileHandler);