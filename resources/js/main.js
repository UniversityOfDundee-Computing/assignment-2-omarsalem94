// Rules to activate materialize components
$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
  $('.carousel').carousel();
});

// API used in the website:
// https://api.thedogapi.com
// https://dog.ceo/dog-api
// 

// API key from https://www.thedogapi.com
// It used to get all breeds information
let api_key = 'api_key=live_5Z8ovOq9Ol9IKTqHssHvOlrvNYdzY1v6SPcoZ2xRXIOvLd8tdISWbowR9oh6y3wN';
// https://api.thedogapi.com/v1/images/search?limit=10&api_key=${api_key}

fetch(`https://dog.ceo/api/breeds/image/random/5`)
.then(resp => resp.json())
.then(function(data) {
  console.log(data);

  let carousel = document.querySelector('.carousel');

    // Loop through the array of image URLs and create carousel items
    // data.forEach((dogImage) => {
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

    console.log(document.getElementsByTagName("img"));
  })
  .catch(function(error) {
    console.log(error);
  });

