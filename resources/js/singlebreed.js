// Rules to activate materialize components
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
  $('.carousel').carousel();
});

let api_key = 'api_key=live_5Z8ovOq9Ol9IKTqHssHvOlrvNYdzY1v6SPcoZ2xRXIOvLd8tdISWbowR9oh6y3wN';

let searchString = window.location.href.split("?");
searchString = searchString[1];

let url = `https://api.thedogapi.com/v1/breeds/${searchString}&api_key=${api_key}`
 
fetch(url)
.then(resp => resp.json())
.then(function (data) {
  // Create HTML structure
  const dogDetailContainer = document.getElementById('dog-detail-container');

  // Create header with the name of the dog
  const header = document.createElement('h1');
  header.textContent = data.name;
  dogDetailContainer.appendChild(header);

  // Create image element with the breed image
  const image = document.createElement('img');
  image.src = `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`;
  image.style.maxWidth = '100%';
  image.style.height = 'auto';
  image.style.width = '100%';
  dogDetailContainer.appendChild(image);

  // Create a table to display dog information using Materialize
  const table = document.createElement('table');

  
  const propertiesToDisplay = ['bred_for', 'breed_group', 'life_span', 'temperament'];

  // Loop through the data and create list items
  for (const property of propertiesToDisplay) {
      const row = document.createElement('tr');
      const propertyName = document.createElement('td');
      const propertyValue = document.createElement('td');

      propertyName.textContent = property;
      propertyValue.textContent = data[property];

      row.appendChild(propertyName);
      row.appendChild(propertyValue);
      table.appendChild(row);
    }

  // Append the list to the container
  dogDetailContainer.appendChild(table);

  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', function () {
  // Use the browser's history object to navigate back
  window.history.back();
  });
})
.catch(function(error) {
  console.log(error);
})