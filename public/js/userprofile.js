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

// //delete list
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
    };
};

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