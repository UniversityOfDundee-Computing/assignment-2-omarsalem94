// Rules to activate materialize components
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
  $('.carousel').carousel();
});

let api_key = 'live_GXx2F1Ayeoal1aDl1IEuTiLn4Gt8aoSwO1Aygme94jZ8YBTACVWWoKpjHsecEbCl';

let searchString = window.location.href.split("?");
searchString = searchString[1];

let url = `https://api.thecatapi.com/v1/breeds/${searchString}?${api_key}`;

 
fetch(url)
.then(resp => resp.json())
.then(function (data) {
  // Create HTML structure
  const catDetailContainer = document.getElementById('cat-detail-container');

  // Create header with the name of the cat
  const header = document.createElement('h1');
  header.textContent = data.name;
  catDetailContainer.appendChild(header);

  // Create image element with the breed image
  const image = document.createElement('img');
  image.src = `https://cdn2.thecatapi.com/images/${data.reference_image_id}.jpg`;
  image.style.maxWidth = '100%';
  image.style.height = 'auto';
  image.style.width = '100%';
  catDetailContainer.appendChild(image);

  // Create a table to display cat information using Materialize
  const table = document.createElement('table');
  table.classList.add('responsive-table');

  
  const propertiesToDisplay = ['description', 'origin', 'life_span', 'temperament'];

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
  catDetailContainer.appendChild(table);

  const backButton = document.getElementById('back-button');
  backButton.addEventListener('click', function () {
  // Use the browser's history object to navigate back
  window.history.back();
  });
})
.catch(function(error) {
  console.log(error);
})