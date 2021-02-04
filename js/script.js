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
 * Review Functionality
 * 
 **************************************/
HTMLElement.prototype.forEachElement = function(elementType, callback) {
    if(elementType && callback) {
        let elements = this.querySelectorAll(elementType);
        Array.from(elements).forEach((element, index) => {
            callback(element, index);
        });
    }
};

HTMLElement.prototype.addClass = function(className) {
    if(className) {
        this.classList.add(className);
    }
};

HTMLElement.prototype.containsClass = function(className) {
    if(className) {
        return this.classList.contains(className);
    }
    return false;
};

HTMLElement.prototype.removeClass = function(className) {
    if (className) {
        if (this.containsClass(className)) {
            this.classList.remove(className);
        }
    }
};

let TestimonialSlider = (function () {
    class TestimonialSlider {
        constructor(slider) {
            let _this = this;
            this.maxSlides = 0;
            this.currentSlideNumber = 0;
            this.slides = [];
            this.displayTime = 5000;
            const errorMessage = 'please provide a valid testimonialSlider';

            /** checking that a valid testimoanl-slider was provided. */
            if (!slider) {
                throw TypeError(errorMessage);
            } else {
                /** testimonial slider must contain the class testimonial-slider */
                if (!slider.containsClass('testimonial-slider')) {
                    throw TypeError(errorMessage);
                }
            }
            /** appending the slides to the array and making sure the first one is visible */
            slider.forEachElement('li', (slide, index) => {
                if (index == 0) {
                    slide.addClass('selected');
                }
                this.addSlide(slide);
            });
            setInterval(function () {
                //         // if the currentSlide Number is greater than the maxSlides, set it to 0
                //         if(_this.currentSlideNumber > _this.maxSlides) {
                //           _this.currentSlideNumber = 0;
                //           // removing the last slide from the screen
                //           _this.getSlide(maxSlides).removeClass('selected');
                //         } 

                //         // making the current slide visible
                //         // _this.previousSlide().removeClass('selected');
                //         _this.nextSlide().addClass('selected');
                //         _this.currentSlideNumber++;

                // if the current slide number is greater than or equal to the max slides, reset the slide number to 0 and remove the last element from the screen.
                let hideSlideIndex = 0;
                if (_this.currentSlideNumber >= _this.maxSlides) {
                    _this.currentSlideNumber = 0;
                    hideSlideIndex = _this.maxSlides - 1;
                } else {
                    hideSlideIndex = _this.currentSlideNumber > 0 ? _this.currentSlideNumber - 1 : 0;
                }

                // removing previous slide from screen 
                _this.getSlide(hideSlideIndex).removeClass('selected');

                // adding new slide to screen.
                let currentSlide = _this.getSlide(_this.currentSlideNumber);
                currentSlide.addClass('selected');

                _this.currentSlideNumber++;
            }, this.displayTime);
        }

        getSlide(index) {
            if (index < this.maxSlides) {
                return this.slides[index];
            }
                
        }

        addSlide(slide) {
            this.slides.push(slide);
            this.maxSlides++;
        }
    }

    return TestimonialSlider;
})();


let testimonials = [];
/** getting all the testimonal-sliders */
const testimonialSlider = Array.from(document.querySelectorAll('.testimonial-slider'));

testimonialSlider.forEach(slider => {
    testimonials.push(new TestimonialSlider(slider));
});