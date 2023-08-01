const userUsername = getElementById('inputUsername');
const userPassword = getElementById('inputPassword');
 
// the stored value is whatever the user entered for password
const enteredUsername = userUsername.value;
const enteredPassword = userPassword.value;

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
};

document
.querySelector('.login-form')
.addEventListener('submit', loginFormHandler);
