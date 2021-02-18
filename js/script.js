/***************************************
 * 
 * Navigation Style on Scroll
 * 
 **************************************/
//Variables
const nav = document.querySelector('nav');
const header = document.querySelector('.header');
// Header Options
const headerOptions = {
    rootMargin: '-150px 0px 0px 0px'
};
// Observer 
const headerObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        !entry.isIntersecting ? nav.classList.add('nav__scrolled') :  nav.classList.remove('nav__scrolled');
    });
}, headerOptions);

headerObserver.observe(header);

/***************************************
 * 
 * Review Carousel
 * 
 **************************************/
// Variables //
const slideContainer = document.querySelector('.slide-container');
const slide = document.querySelector('.slides');
let slides = document.querySelectorAll('.slide');

// Carousel Affects
let index = 1;
const interval = 5000;
let slideId;

// Clones for infitine loop //
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// ID for clones
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);

// Find the width of the element
let slideWith = slides[index].clientWidth;

// Make sure the first image is overlapping the cloned one
slide.style.transform = `translateX(${-slideWith * index}px)`;

// Automatic Carousel
const startSlide = () => {
    slideId = setInterval(() => {
        index++;
        slide.style.transform = `translateX(${-slideWith * index}px)`;
        slide.style.transition = '2s ease-in-out';
    }, interval);
};

// Repeat loop once the image have come to the end
slide.addEventListener('transitionend', () => {
    let slides = document.querySelectorAll('.slide');
    if(slides[index].id === firstClone.id) {
        slide.style.transition = 'none';
        index = 1;
        slide.style.transform = `translateX(${-slideWith * index}px)`;
    }
});

// Stop the slider on mouseover
slideContainer.addEventListener('mouseenter', () => {
    clearInterval(slideId);
});

// continue Slider on mouse exit
slideContainer.addEventListener('mouseleave', startSlide);


startSlide();