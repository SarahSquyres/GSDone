const loginHandler = async (e) => {
    e.preventDefault();

    const userUsername = document.getElementById('inputUsername').value.trim();
    const userPassword = document.getElementById('inputPassword').value.trim();

    // const enteredUsername = userUsername.value.trim();
    // const enteredPassword = userPassword.value.trim();

    if (userPassword && userUsername) {
        console.log(userUsername);
        console.log(userPassword);
        const res = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ userUsername, userPassword }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (res.ok) {
            document.location.replace('/feedpage');
        } else {
            alert(res.statusText);
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginHandler);

   