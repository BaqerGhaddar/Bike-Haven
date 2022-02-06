async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const name = document.querySelector('#name-signup').value.trim();

  if (username && password && email && name) {
    const emailResponse = await fetch('/api/users/email', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' ,
      "Accept": 'application/json'
    }
    });

    if (!emailResponse.ok) {
      alert(emailResponse.statusText);
      return;
    }

    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ email, username, password, name }),
      headers: { 'Content-Type': 'application/json' }
    });
    // Check response and redirect if sucess
    const data = await response.json();

    if (!response.ok) {
      alert(data.errors.message);
    } else {
      document.location.replace('/');
    }
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
  } else {
    showError();
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
  if (document.querySelector('#error-password'))
    document.querySelector('#error-password').remove();
  loginFormEl = document.querySelector('.login-button');
  errorEl = document.createElement('p');
  errorEl.textContent = 'Error in login! Check password or username';
  errorEl.setAttribute('id', 'error-password');
  loginFormEl.append(errorEl);
};
