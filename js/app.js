/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
class Section {
    constructor(Id) {
        this.Id = Id;
        this.active = false;
        this.data = undefined;
    }
}

let Sections = [];


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function scrollToTop() {
    window.scrollTo(0, 0);
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function initialize() {
    //Get a list of the documents sections and store section info in an 
    //array of section classes
    const sections = document.querySelectorAll('section');
    for (let i = 0; i < sections.length; i++) {
        section = new Section(sections[i].id);
        //check if the section has data
        section.data = sections[i].dataset.nav;
        if (i === 0)
            section.active = true;
        Sections.push(section);
    }

    //Build the navigation 
    if (Sections.length > 0) {
        //Get the unordered list container for the list items
        const ul = document.getElementById('navbar__list');
        if (ul !== null) {
            Sections.forEach(section => {
                addNavItem(ul,section);
            });
        }
    }

    window.onscroll = scrolling;
}
// build the nav


// Add class 'active' to section when near top of viewport
function scrolling() {
    console.log(document.documentElement.scrollTop);


}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
function addNavItem(ul,section)
{
    const li = document.createElement("li");
    li.setAttribute('class', 'menu__link');
    li.setAttribute('data-link',section.id);
    //li.appendChild(document.createTextNode(section.data));
    const link = document.createElement('a');
    link.setAttribute('href', `#${section.id}`);
    link.setAttribute('name', section.Id);
    link.innerText = section.data;
    li.appendChild(link);
    ul.appendChild(li);
}
// Scroll to section on link click

// Set sections as active
