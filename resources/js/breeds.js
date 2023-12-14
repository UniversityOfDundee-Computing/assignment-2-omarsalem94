// Rules to activate materialize components
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
  $('.carousel').carousel();
});

$(document).ready(function () {
  // Initialize the select element
  $('select').formSelect();

  let api_key = 'api_key=live_5Z8ovOq9Ol9IKTqHssHvOlrvNYdzY1v6SPcoZ2xRXIOvLd8tdISWbowR9oh6y3wN';

  // Function to create a card based on breed information
  function createCard(breed, imageUrl, id) {
    const card = document.createElement('div');
    card.className = 'col s12 m4';
    card.innerHTML = `
      <div class="card center large">
          <img class='card-image' src="https://cdn2.thedogapi.com/images/${imageUrl}.jpg"
        <div class="card-content">
          <h2 class="card-title">${breed}</h2>
          <a class="waves-effect waves-light btn more_info" href="../pages/single-breed.html?${id}"><i class="material-icons left">info</i>Click for more information</a>
        </div>
      </div>
    `;
    return card;
  }

  // Initial fetch for a couple of breeds
  const initialBreeds = ['Barbet', 'Beagle', 'Boerboel', 'Boxer', 'Chinook', 'Greyhound']; // Example breeds
  const cardContainer = document.getElementById('breed-card-container');

  // Use Promise.all to wait for all initial fetch requests to complete
  Promise.all(initialBreeds.map(breed => 
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}&api_key=${api_key}`)
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data[0].name);
        console.log(data[0].reference_image_id);
        // Create a card and append it to the container
        const card = createCard(data[0].name, data[0].reference_image_id, data[0].id);
        cardContainer.appendChild(card);
      })
      .catch(function (error) {
        console.log(error);
      })
  ))
  .then(() => {
    // Fetch dog breeds from the API
    // https://dog.ceo/api/breeds/list/all
    return fetch("https://api.thedogapi.com/v1/breeds");
  })
  .then(resp => resp.json())
  .then(function (data) {
    console.log(data);
    

    // Get the select element
    const selectElement = document.querySelector('select');

    // Loop through the breeds and create options

    data.forEach(breed => {
      // Create a new option element
      const option = document.createElement('option');

      // Set the value and text of the option
      option.value = breed.name;
      option.text = breed.name;
      // console.log(breed);

      // Append the option to the select element
      selectElement.appendChild(option);
    })
  
    // Update the select to reflect the changes
    $('select').formSelect();

    // Add event listener for the select element
    selectElement.addEventListener('change', function () {
      const selectedBreed = this.value;

      // Fetch additional information about the selected breed
      // https://dog.ceo/api/breed/${selectedBreed}/images/random

      fetch(`https://api.thedogapi.com/v1/breeds/search?q=${selectedBreed}&api_key=${api_key}`)
        .then(resp => resp.json())
        .then(function (data) {
          console.log(data);
          // Clear previous cards
          cardContainer.innerHTML = '';
          data.forEach(breedInfo => {
            // console.log(breedInfo)
            // console.log(breedInfo.name);
            // console.log(breedInfo.reference_image_id);
            const card = createCard(breedInfo.name, breedInfo.reference_image_id, breedInfo.id);
            cardContainer.appendChild(card);
          })
          // // Create a card for the selected breed and append it to the container
          // const card = createCard(selectedBreed, data.message);
          // cardContainer.appendChild(card);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  })
  .catch(function (error) {
    console.log(error);
  });
});
