async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();

  if (username && password && email) {
    const emailResponse = await fetch('/api/users/email', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!emailResponse.ok) {
      alert(emailResponse.statusText);
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    // Check response and redirect if sucess
    response.ok ? document.location.replace('/') : alert(response.statusText);
  }
}

async function loginFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    // Check response
    response.ok ? document.location.replace('/') : showError();
  }
}

if (document.querySelector('.login-form')) {
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
} else {
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
}

showError = () => {
    loginFormEl = document.querySelector('.login-button');
    errorEl = document.createElement('p')
    errorEl.textContent = 'Error in login! Check password or username'
    loginFormEl.append(errorEl)
};
