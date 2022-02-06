async function deleteItemHandler(event) {
    event.preventDefault();
  
    // const id = document.querySelector('.bike-card');
    console.log(event.target);
    const bike_id = $(event.target).data('id');
  
    console.log(bike_id);
    // const part_id = document.querySelector('button').id;
    const response = await fetch(`/api/wishlist/bikes/${bike_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      alert(data.errors);
    } else {
      alert('Item deleted from wishlist');
      // document.location.replace('/wishlist');
    }
  }
  
  $('.delete-icon').on('click', deleteItemHandler);