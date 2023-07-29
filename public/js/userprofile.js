async function profileHandler(e) {
    e.preventDefault();
    const id = document.querySelector('#id').value;
    const password = document.querySelector('#password').value;
    const user_name = document.querySelector('#user_name').value;

    const response = await fetch(`/api/users`, {
        method: 'GET',
        body: JSON.stringify({
            id,
            user_name,
            password,
        }),
        headers: {
            'content-type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add profile');
    }
}

document.querySelector('.profile').addEventListener('submit', profileHandler);