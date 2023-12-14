// Rules to activate materialize components
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
});

$(document).ready(function () {
  // Initialize the select element
  $('select').formSelect();
});

let api_key = 'api_key=live_GXx2F1Ayeoal1aDl1IEuTiLn4Gt8aoSwO1Aygme94jZ8YBTACVWWoKpjHsecEbCl';

fetch(`https://api.thecatapi.com/v1/images/search?limit=10`)
.then(resp => resp.json())
.then(function(data) {
  let carousel = document.querySelector('.carousel');

  // Loop through the array of image URLs and create carousel items
    data.forEach((catImage) => {
    // Create a new carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
  
    // Create an image element and set its src attribute
    const imgElement = document.createElement('img');
    imgElement.classList.add('card-carousel');
    imgElement.src = catImage.url;
  
    // Append the image to the carousel item
    carouselItem.appendChild(imgElement);
  
    // Append the carousel item to the carousel container
    carousel.appendChild(carouselItem);
  });

  // Initialize Materialize Carousel
  M.Carousel.init(carousel, {
    duration: 300,
    fullWidth: true,
    indicators: true,
    dist: 0,
    padding: 10,
    numVisible: 2
  });
  })
  .catch(function(error) {
    console.log(error);
  });


  document.addEventListener('DOMContentLoaded', function () {
  // Fetch a random cat fact
  fetch('https://catfact.ninja/fact')
  .then(resp => resp.json())
  .then(function(data) {
    console.log(data);
    // Get the div where the cat fact will be displayed
    const catFactDiv = document.getElementById('cat_fact');

    // Create a paragraph element to display the fact
    const factParagraph = document.createElement('p');

    factParagraph.textContent = data.fact

    // Append the fact to the div
    catFactDiv.appendChild(factParagraph);

  })
  .catch(function(error) {
    console.log(error);
  });
  });

  const generateFactButton = document.getElementById('generate_fact_button');

  generateFactButton.addEventListener('click', function () {

  const catFactDiv = document.getElementById('cat_fact');
  catFactDiv.textContent = '';

  // Fetch a new random cat fact when the button is clicked
  fetch('https://catfact.ninja/fact')
  .then(resp => resp.json())
  .then(function(data) {
    
    // Create a paragraph element to display the fact
    let factParagraph = document.createElement('p');
    factParagraph.textContent = data.fact

    // Append the fact to the div
    catFactDiv.appendChild(factParagraph);
  })
  .catch(function(error) {
    console.log(error);
  });
  });


// Function to create a card based on breed information
function createCard(breed, imageUrl, id) {
  const card = document.createElement('div');
  card.className = 'col s12 m4';
  card.innerHTML = `
    <div class="card center large">
        <img class='card-image' src="https://cdn2.thecatapi.com/images/${imageUrl}.jpg"
      <div class="card-content">
        <h2 class="card-title">${breed}</h2>
        <a class="waves-effect waves-light btn more_info" href="../pages/single-breed-cat.html?${id}"><i class="material-icons left">info</i>Click for more information</a>
      </div>
    </div>
  `;
  return card;
}

// Initial fetch for a couple of breeds
const initialBreeds = ['Chausie', 'Donskoy', 'Himalayan', 'Abyssinian', 'Siamese', 'Sphynx']; // Example breeds
const cardContainer = document.getElementById('breed-card-container');

// Use Promise.all to wait for all initial fetch requests to complete
// 
Promise.all(initialBreeds.map(breed => 
  fetch(`https://api.thecatapi.com/v1/breeds/search?q=${breed}&api_key=${api_key}`)
    .then(resp => resp.json())
    .then(function (data) {
      console.log(data);
      // Create a card and append it to the container
      const card = createCard(data[0].name, data[0].reference_image_id, data[0].id);
      cardContainer.appendChild(card);
    })
    .catch(function (error) {
      console.log(error);
    })
))
.then(() => {
  return fetch("https://api.thecatapi.com/v1/breeds");
})
.then(resp => resp.json())
.then(function (data) {
  
  // Get the select element
  const selectElement = document.querySelector('select');

  // Loop through the breeds and create options
  data.forEach(breed => {
    // Create a new option element
    const option = document.createElement('option');

    // Set the value and text of the option
    option.value = breed.name;
    option.text = breed.name;

    // Append the option to the select element
    selectElement.appendChild(option);
  })

  // Update the select to reflect the changes
  $('select').formSelect();

  // Add event listener for the select element
  selectElement.addEventListener('change', function () {
    const selectedBreed = this.value;

    fetch(`https://api.thecatapi.com/v1/breeds/search?q=${selectedBreed}&api_key=${api_key}`)
      .then(resp => resp.json())
      .then(function (data) {
        console.log(data);
        // Clear previous cards
        cardContainer.innerHTML = '';

        data.forEach(breedInfo => {
          const card = createCard(breedInfo.name, breedInfo.reference_image_id, breedInfo.id);
          cardContainer.appendChild(card);
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  });
})
.catch(function (error) {
  console.log(error);
});