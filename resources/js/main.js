$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.collapsible').collapsible();
  $('.carousel').carousel();
});


fetch("https://api.thedogapi.com/v1/images/search?limit=15")
.then(resp => resp.json())
.then(function(data) {
  console.log(data);

  let carousel = document.querySelector('.carousel');

    // Loop through the array of image URLs and create carousel items
    data.forEach((catImage, index) => {
      // Create a new carousel item
      const carouselItem = document.createElement('a');
      carouselItem.classList.add('carousel-item');
      carouselItem.href = '#' + (index + 1); // Set the href attribute
    
      // Create an image element and set its src attribute
      const imgElement = document.createElement('img');
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

    console.log(document.getElementsByTagName("img"));
  })
  .catch(function(error) {
    console.log(error);
  });

