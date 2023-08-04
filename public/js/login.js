const loginHandler = async (e) => {
    e.preventDefault();

    const userUsername = document.getElementById('inputUsername');
    const userPassword = document.getElementById('inputPassword');

    const enteredUsername = userUsername.value.trim();
    const enteredPassword = userPassword.value.trim();

    if (enteredPassword && enteredUsername) {
        console.log(enteredPassword);
        console.log(enteredUsername);
        const res = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ enteredUsername, enteredPassword }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (res.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to log in');
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler);
