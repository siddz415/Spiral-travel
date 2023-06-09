async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
             method: 'post',
             body: JSON.stringify({
                 username,
                 password
             }),
             headers: { 'Content-Type': 'application/json' }
         });
   
         if(response.ok){
             //go to the main page
             document.location.replace('/dashboard')
         } else {
            alert('Account does not exist');
            //  alert(response.statusText);
         }
     }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);