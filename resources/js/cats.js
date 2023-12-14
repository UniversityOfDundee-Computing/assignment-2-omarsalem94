// Rules to activate materialize components
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
});

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
    // Get the div where the dog fact will be displayed
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