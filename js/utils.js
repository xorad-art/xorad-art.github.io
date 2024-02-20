// Toggles the visibility of the contact info
// Due to async magic, if you press the button fast enough can cause visual glitches
async function toggleContactInfo() {
    const footer = document.getElementById("footer");
    const contact = document.getElementById("contact");
    // Load the template if necessary
    if (contact.innerHTML === ""){
        loadTemplate("contact", "templates/contact.html");
    }

    // Then do the animation
    if (contact.classList.contains("hidden")){
        contact.classList.toggle("hidden");
        footer.classList.toggle("fade-out")

        setTimeout(() => {
            contact.classList.toggle("fade-out");
        }, 20);

        setTimeout(() => {
            footer.classList.toggle("hidden");
        }, 300);
    } else {
        hideContactInfo();
    }
}

// Hide the contact info if it's visible
// This is more reliable than toggleContactInfo() because it doesn't rely on
// the state of the contact element
async function hideContactInfo() {
    const footer = document.getElementById("footer");
    const contact = document.getElementById("contact");

    footer.classList.remove("hidden");
    contact.classList.add("fade-out");
    setTimeout(() => {
        footer.classList.remove("fade-out");
    }, 20);
    setTimeout(() => {
        contact.classList.add("hidden");
    }, 300);
}

// Function to check if the element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle scroll events
function checkFeaturedVisibility() {
    const images = document.querySelectorAll('.featured-image');

    images.forEach(image => {
        if (isInViewport(image)) {
            image.classList.remove('fade-out');
            image.classList.add('fade-in');
        }
    })
}