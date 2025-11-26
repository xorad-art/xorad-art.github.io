// Function to handle scroll events
function checkFeaturedVisibility() {
    if (window.location.hash === "") {
        const images = document.querySelectorAll('.featured-image');

        images.forEach(image => {
            if (isInViewport(image)) {
                image.classList.remove('fade-out');
                image.classList.add('fade-in');
            }
        })
    }
}

function loadFeatured(element, json, count) {
    const container = document.getElementById(element);
    let string = `<p class="description">Illustrator, sometimes developer, occasionally clever</p>
    <div id="featured"></div>`;
    container.innerHTML = string;

    for (let i = 0; i < count; i++) {
        addFeaturedItem("featured", json, i);
    }

    checkFeaturedVisibility();
}

function addFeaturedItem(element, json, i) {
    const container = document.getElementById(element);
    let item = json[i];
    const side = i % 2 === 0 ? "left" : "right";

    function hasExtension(name) {
        const base = name.split('/').pop();
        const lastDot = base.lastIndexOf('.');
        return lastDot > 0;
    }
    const link = hasExtension(item.link) ? item.link : item.link + '.md';

    container.innerHTML += `
    <div class="featuredItem">
        <div class="${side}">
            <div class="container"><img class="featured-image fade-out" src="${item.image}" alt="${item.imageAlt}"></div>
            <button onclick="loadMarkdown('main', '${link}')" class="overlay">
                <h3 class="title">${item.title}</h3>
                <p class="description">${item.desc}</p>
            </button>
        </div>
    </div>`;
}

