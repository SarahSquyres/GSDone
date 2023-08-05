// const signupFormHandler = async (e) => {
//     e.preventDefault();
  
//     const userUsername = document.getElementById('signUpUsername').value.trim();
//     const userPassword = document.getElementById('signUpPassword').value.trim();
//     const firstName = document.getElementById('inputFirstName').value.trim();
//     const lastName = document.getElementById('inputLastName').value.trim();
//     const bio = document.getElementById('inputBio').value.trim();
  
//     if (userUsername && userPassword) {
//       const res = await fetch('/api/users', {
//         method: 'POST',
//         body: JSON.stringify({ userUsername, userPassword, firstName, lastName, bio }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (res.ok) {
//         document.location.replace('/');
//       } else {
//         alert(res.statusText);
//       }
//     }
//   };

//   document
//   .querySelector('.sign-up-form')
//   .addEventListener('submit', signupFormHandler);