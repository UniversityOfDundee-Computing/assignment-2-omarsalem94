// Rules to activate materialize components
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
});

// API used in the website:
// For random dog images:
// https://api.thedogapi.com

// For all the dog breeds and information about each breed:
// https://dog.ceo/dog-api

// For random dog fact
// https://dogapi.dog/api/v2/facts

fetch(`https://dog.ceo/api/breeds/image/random/5`)
.then(resp => resp.json())
.then(function(data) {

  let carousel = document.querySelector('.carousel');

  // Loop through the array of image URLs and create carousel items
    data.message.forEach((dogImage) => {
    // Create a new carousel item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
  
    // Create an image element and set its src attribute
    const imgElement = document.createElement('img');
    imgElement.classList.add('card-carousel');
    imgElement.src = dogImage;
  
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
  // Fetch a random dog fact
  fetch('https://dogapi.dog/api/v2/facts')
  .then(resp => resp.json())
  .then(function(data) {

    // Get the div where the dog fact will be displayed
    const dogFactDiv = document.getElementById('dog_fact');

    // Create a paragraph element to display the fact
    const factParagraph = document.createElement('p');

    factParagraph.textContent = data.data[0].attributes.body

    // Append the fact to the div
    dogFactDiv.appendChild(factParagraph);

  })
  .catch(function(error) {
    console.log(error);
  });
  });

  const generateFactButton = document.getElementById('generate_fact_button');

  generateFactButton.addEventListener('click', function () {

  const dogFactDiv = document.getElementById('dog_fact');
  dogFactDiv.textContent = '';

  // Fetch a new random dog fact when the button is clicked
  fetch('https://dogapi.dog/api/v2/facts')
  .then(resp => resp.json())
  .then(function(data) {
    
    // Create a paragraph element to display the fact
    let factParagraph = document.createElement('p');
    factParagraph.textContent = data.data[0].attributes.body

    // Append the fact to the div
    dogFactDiv.appendChild(factParagraph);
  })
  .catch(function(error) {
    console.log(error);
  });
  });


