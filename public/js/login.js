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

const signupFormHandler = async (e) => {
    e.preventDefault();

    const userUsername = document.getElementById('signUpUsername').value.trim();
    const userPassword = document.getElementById('signUpPassword').value.trim();
    const firstName = document.getElementById('signUpFirst').value.trim();
    const lastName = document.getElementById('signUpLastName').value.trim();
    const bio = document.getElementById('signUpBio').value.trim();

    if (userUsername && userPassword) {
        const res = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ userUsername, userPassword, firstName, lastName, bio }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace('/');
        } else {
            alert(res.statusText);
        }
    }
};

const signupFormHandler = async (e) => {
        e.preventDefault();
        
        const userUsername = document.getElementById('signUpUsername').value.trim();
        const userPassword = document.getElementById('signUpPassword').value.trim();
        const firstName = document.getElementById('signUpFirst').value.trim();
        const lastName = document.getElementById('signUpLastName').value.trim();
        const bio = document.getElementById('signUpBio').value.trim();

        console.log(userPassword);
        console.log(firstName);
        console.log(lastName);
        console.log(bio);
        
        if (userUsername && userPassword) {
            const res = await fetch('/api/users', {
              method: 'POST',
              body: JSON.stringify({ userUsername, userPassword, firstName, lastName, bio }),
              headers: { 'Content-Type': 'application/json' },
            });
            if (res.ok) {
              document.location.replace('/');
            } else {
              alert(res.statusText);
            }
          }
    };

document
  .querySelector('.sign-up-form')
  .addEventListener('submit', signupFormHandler);

document
    .querySelector('#signup-btn')
    .addEventListener('click', signupFormHandler);

document
    .querySelector('#login-btn')
    .addEventListener('click', loginHandler);

