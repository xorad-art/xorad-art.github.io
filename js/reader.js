// Handles every interaction with the reader element
// Meant to be loaded while the main markdown element and the rest
// of the page is already loaded.

let currentSlide = 0;
let startX = 0;
let isDragging = false;

function updatePageCount() {
    const slides = document.querySelectorAll('.carousel-image');
    const pageCount = document.querySelector('.page-count');
    const start = document.querySelector('.btn-start');
    const altPrev = document.querySelector('.alt-prev');
    const altNext = document.querySelector('.alt-next');
    const end = document.querySelector('.btn-end');

    // Update the page count text
    pageCount.textContent = `${currentSlide + 1} / ${slides.length}`;

    // Disable/Enable buttons based on current slide
    start.disabled = currentSlide === 0;
    altPrev.disabled = start.disabled;
    altNext.disabled = currentSlide === slides.length - 1;
    end.disabled = altNext.disabled;
}

function checkForReader() {
    const mainElement = document.getElementById('main');
    if (mainElement && mainElement.querySelector('.reader')) {
        updatePageCount();
    }
}

// Create a MutationObserver to monitor changes in the #main element once every 200ms
// This NEEDS to be debounced because otherwise Firefox will trigger it infinitely.
const observer = new MutationObserver(debounce(() => {
    checkForReader();
}, 200));

const mainElement = document.getElementById('main');
if (mainElement) {
    checkForReader();
    observer.observe(mainElement, { childList: true, subtree: true });
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-image');
    currentSlide = (currentSlide + direction);
    if (currentSlide >= slides.length) {
        currentSlide = slides.length - 1
    } else if (currentSlide <= 0) {
        currentSlide = 0
    }
    moveSlides();
}

function goToEnd() {
    const slides = document.querySelectorAll('.carousel-image');
    currentSlide = slides.length - 1;
    moveSlides();
}

function goToStart() {
    currentSlide = 0;
    moveSlides();
}

function moveSlides() {
    const offset = -currentSlide * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
    updatePageCount();
}

// Event listener for key presses
document.addEventListener('keydown', function(event) {
    if (event.key === 'a' || event.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (event.key === 'd' || event.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Event listeners for dragging
const carousel = document.querySelector('.carousel-images');

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('touchstart', startDrag);

carousel.addEventListener('mousemove', drag);
carousel.addEventListener('touchmove', drag);

carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('mouseleave', endDrag);
carousel.addEventListener('touchend', endDrag);

function startDrag(event) {
    isDragging = true;
    startX = event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;
}

function drag(event) {
    if (!isDragging) return;

    const x = event.type.includes('mouse') ? event.pageX : event.touches[0].pageX;
    const moveX = x - startX;

    // Dragging the carousel-images
    carousel.style.transform = `translateX(calc(${moveX}px + ${-currentSlide * 100}%))`;
}

function endDrag(event) {
    if (!isDragging) return;
    isDragging = false;

    const endX = event.type.includes('mouse') ? event.pageX : event.changedTouches[0].pageX;
    const deltaX = endX - startX;

    if (deltaX > 50) {
        changeSlide(-1);  // Swipe right
    } else if (deltaX < -50) {
        changeSlide(1);   // Swipe left
    } else {
        // Snap back to the current slide if the swipe wasn't far enough
        carousel.style.transform = `translateX(${-currentSlide * 100}%)`;
    }
}

function toggleFit() {
    const carouselContainer = document.querySelector('.reader-container');
    carouselContainer.classList.toggle('fit-screen');

    // Optionally, change the button text based on the state
    const toggleButton = document.getElementById('toggle-fit');
    if (carouselContainer.classList.contains('fit-screen')) {
        toggleButton.innerHTML = '&times;';
        document.addEventListener('keydown', handleEscKey);
    } else {
        const img = document.createElement('img');
        img.src = '/assets/resize-icon.svg';
        img.alt = 'Fit on screen';
        toggleButton.textContent = '';
        toggleButton.appendChild(img);
        document.removeEventListener('keydown', handleEscKey);
    }
}

function handleEscKey(event) {
    if (event.key === 'Escape') {
        const carouselContainer = document.querySelector('.reader-container');
        if (carouselContainer.classList.contains('fit-screen')) {
            toggleFit(); // Exit fit-screen mode
        }
    }
}