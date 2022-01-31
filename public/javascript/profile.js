// ftceh request
// var data = {items: [
//     {
//       title: "Hello",
//       description: "Hello Text",
//       image: "https://via.placeholder.com/300x100",
//     },
//     {
//       title: "Card title",
//       description: "Some quick example text to build on the card title and make up the bulk of the card's content.<p>Another paragraph</p><p>Another paragraph</p>",
//       image: "https://via.placeholder.com/300x100",
//     }
// ]};

var source = document.getElementById('profile-template').innerHTML;
var template = Handlebars.compile(source);
var html = template(data);

document.getElementById('content').innerHTML = html;
console.log(html);

// $('#profile-modal').on('shown.bs.modal', function () {
//     $('#myInput').trigger('focus')
//   })
