async function logout() {
  const response = await fetch('/api/users/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });
  if (!response.ok) alert(response.statusText);
}
// add event listener on logout button
document.querySelector('#logout-option').addEventListener('click', logout);
