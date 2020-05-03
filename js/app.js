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
class SectionInfo {
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

    //create a container for all the sections
    const div = document.createElement('div');
    div.id = 'sectionContainer';
    div.addEventListener('scroll', makeActive, false);

    let parentNode;
    for (let i = 0; i < sections.length; i++) {
        sectionInfo = new SectionInfo(sections[i].id);
        //check if the section has data
        sectionInfo.data = sections[i].dataset.nav;
        if (i === 0) {
            sectionInfo.active = true;

            //get the parent of the first section
            parentNode = sections[0].parentNode;
            parentNode.appendChild(div);
        }
        Sections.push(sectionInfo);

        div.appendChild(sections[i]);
        //parentNode.insertBefore(div,sections[i]);

    }
    if (Sections.length > 0) {
        buildNavigation();
    }

    //window.onscroll = scrolling;
}
// build the nav
function buildNavigation() {
    //Get the unordered list container for the list items
    const ul = document.getElementById('navbar__list');
    if (ul !== null) {
        Sections.forEach(section => {
            addNavItem(ul, section);
        });
    }
}


// Add class 'active' to section when near top of viewport
function makeActive() {
    let activeSection = null;

    //the sections are scrolling with in the container. Check the sections's relation
    //with the container to figure out which section should be active
    Sections.forEach(sectionInfo => {
        const container = document.getElementById('sectionContainer');
        var cTop = container.scrollTop;
        var cBottom = cTop + container.clientHeight;
        const containerRect = container.getBoundingClientRect();

        const section = document.getElementById(`${sectionInfo.Id}`);
        const sectionRect = section.getBoundingClientRect();
        var eTop = section.offsetTop;
        var eBottom = eTop + section.clientHeight;

        const verticalInView = (eBottom <= cBottom);
        if (verticalInView) {
            activeSection = sectionInfo.Id;
        }
    });

    if (activeSection !== null) {
        Sections.forEach(sectionInfo => {
            if (sectionInfo.Id == activeSection) {
                if (!sectionInfo.active) {
                    sectionInfo.active = true;

                    const section = document.getElementById(`${sectionInfo.Id}`);
                    section.classList.add("your-active-class");

                    //Hide the header when the first section is active
                    const header = document.getElementsByClassName('page__header');
                    if (sectionInfo.data === 'Section 1') {
                        header[0].style.display = 'none';
                    }
                    else {
                        header[0].style.display = 'block';
                        //Highlight the active section nav menu item
                        const menuItem = document.getElementsByName(`${sectionInfo.Id}`);
                        if (menuItem !== null)
                        {
                            menuItem[0].style.border = "thick solid #CCC";
                        }
                    }
                }
            }
            else {
                const section = document.getElementById(`${sectionInfo.Id}`);
                if (sectionInfo.active) {
                    section.classList.remove("your-active-class");
                }

                //Unhighlight non-active nav menu item
                const menuItem = document.getElementsByName(`${sectionInfo.Id}`);
                if (menuItem !== null)
                {
                    menuItem[0].style.border = "none";
                }

                sectionInfo.active = false;
            }
        });
    }

}


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
function addNavItem(ul, section) {
    const li = document.createElement("li");
    li.setAttribute('class', 'menu__link');
    li.setAttribute('data-link', section.Id);
    li.setAttribute('data-link', section.Id);
    li.style.border = 'none';
    //li.appendChild(document.createTextNode(section.data));
    const link = document.createElement('a');
    link.setAttribute('href', `#${section.Id}`);
    link.setAttribute('name', section.Id);
    link.innerText = section.data;
    li.appendChild(link);
    ul.appendChild(li);

}
// Scroll to section on link click

// Set sections as active
