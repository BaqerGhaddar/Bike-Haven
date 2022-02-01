async function addItemHandler(event) {
  event.preventDefault();

  // const id = document.querySelector('.bike-card');
  const id = $('.bike-card').data('id');

  console.log(typeof id);
  console.log(id);
  // const part_id = document.querySelector('button').id;
  const response = await fetch('/wishlist', {
    method: 'POST',
    body: JSON.stringify({
      bike_id: id
      // part_id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/wishlist');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.wishlist-btn')
  .addEventListener('click', addItemHandler);
