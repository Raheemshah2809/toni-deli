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
