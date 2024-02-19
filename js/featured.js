function loadFeatured(element, json, count) {
    const container = document.getElementById(element);
    let string = `<p class="description">Illustrator, sometimes developer, occasionally clever</p>
    <div id="featured"></div>`;
    container.innerHTML = string;

    for (let i = 0; i < count; i++) {
        addFeaturedItem("featured", json, i);
    }
}

function addFeaturedItem(element, json, i) {
    const container = document.getElementById(element);
    let item = json[i];
    const side = i % 2 === 0 ? "left" : "right";
    container.innerHTML += `
    <div class="featuredItem">
        <div class="${side}">
            <div class="container"><img class="featured-image fade-out" src="${item.image}" alt="${item.imageAlt}"></div>
            <button onclick="loadMarkdown('main', '${item.link}.md')" class="overlay">
                <h3 class="title">${item.title}</h3>
                <p class="description">${item.desc}</p>
            </button>
        </div>
    </div>`;
}