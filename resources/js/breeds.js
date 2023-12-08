$(document).ready(function () {
  // Initialize the select element
  $('select').formSelect();

  // Function to create a card based on breed information
  function createCard(breed, imageUrl) {
    const card = document.createElement('div');
    card.className = 'col s12 m4';
    card.innerHTML = `
      <div class="card large">
        <div class="card-image">
          <img src="${imageUrl}">
        </div>
        <div class="card-content">
          <h2 class="card-title">${breed}</h2>
          <p>Additional information about the breed...</p>
        </div>
      </div>
    `;
    return card;
  }

  // Initial fetch for a couple of breeds
  const initialBreeds = ['labrador', 'bulldog', 'pitbull']; // Example breeds
  const cardContainer = document.getElementById('breed-card-container');

  // Use Promise.all to wait for all initial fetch requests to complete
  Promise.all(initialBreeds.map(breed => 
    fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
      .then(resp => resp.json())
      .then(function (data) {
        // Create a card and append it to the container
        const card = createCard(breed, data.message);
        cardContainer.appendChild(card);
      })
      .catch(function (error) {
        console.log(error);
      })
  ))
  .then(() => {
    // Fetch dog breeds from the API
    return fetch("https://dog.ceo/api/breeds/list/all");
  })
  .then(resp => resp.json())
  .then(function (data) {
    // Get the breeds from the API response
    const breeds = data.message;

    // Get the select element
    const selectElement = document.querySelector('select');

    // Loop through the breeds and create options
    for (const breed in breeds) {
      if (breeds.hasOwnProperty(breed)) {
        // Create a new option element
        const option = document.createElement('option');

        // Set the value and text of the option
        option.value = breed;
        option.text = breed;

        // Append the option to the select element
        selectElement.appendChild(option);
      }
    }

    // Update the select to reflect the changes
    $('select').formSelect();

    // Add event listener for the select element
    selectElement.addEventListener('change', function () {
      const selectedBreed = this.value;

      // Fetch additional information about the selected breed
      fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random`)
        .then(resp => resp.json())
        .then(function (data) {
          // Clear previous cards
          cardContainer.innerHTML = '';

          // Create a card for the selected breed and append it to the container
          const card = createCard(selectedBreed, data.message);
          cardContainer.appendChild(card);
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
