const loginHandler = async (e) => {
    e.preventDefault();

    const userUsername = getElementById('inputUsername');
    const userPassword = getElementById('inputPassword');

    const enteredUsername = userUsername.value.trim();
    const enteredPassword = userPassword.value.trim();

    if (enteredPassword && enteredUsername) {
        const res = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ enteredUsername, enteredPassword }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (res.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler);

    // password must be blah blah function