const CONTENT_FOLDER = "content/";

// Loads html from the given file and modifies the element content
// with the template.
function loadTemplate(element, templateFile) {
    const container = document.getElementById(element);
    fetch(templateFile) // Adjust the path as needed
        .then(response => response.text())
        .then(template => {
            container.innerHTML = template;
            console.log(`Loaded template ${templateFile}`)
        })
        .catch(error => console.error(`Error loading ${templateFile} to ${element}:`, error));
}

// Loads the contents of a markdown file into the given element
function loadMarkdown(element, markdownFile) {
    const container = document.getElementById(element);
    window.location.hash = encodeURIComponent(markdownFile);

    // Hide the contact info if it's visible
    hideContactInfo();

    const renderer = makeCustomRenderer();

    window.scrollTo(0, 0);

    fetch(CONTENT_FOLDER + markdownFile)
        .then(response => {
            if (response.status === 404) {
                throw new Error('404');
            }
            return response.text();
        })
        .then(markdown => {
            const html = marked.parse(markdown, { renderer: renderer });
            const output = "<div class='markdown-body'>" + html + "</div>";
            container.innerHTML = output;
        })
        .catch(error => {
            if (error.message === '404') {
                // Display custom 404 response formatted in markdown
                fetch(CONTENT_FOLDER + '404.md')
                    .then(response => response.text())
                    .then(markdown => {
                        const output = "<div class='markdown-body'>" + marked.parse(markdown) + "</div>";
                        container.innerHTML = output;
                    })
                    .catch(error => {
                        console.error('Error loading 404.md:', error);
                    });
            } else {
                console.error(`Error loading ${markdownFile} to ${element}:`, error);
            }
        });
}


// TODO: Add code highlighting support
function makeCustomRenderer() {
    const renderer = new marked.Renderer();
    renderer.link = function (href, title, text) {
        var result = ``;
        const isAbsoluteURL = /^(https?:\/\/|\/\/)/i.test(href);
        if (isAbsoluteURL) {
            result = `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`;
        }
        else if (href.endsWith('.md')) {
            result = `<button onclick="loadMarkdown('main', '${href}')" title="${title || ''}">${text}</button>`;
        }
        else if (href.endsWith('/')) {
            // This is then a folder of images, so a reader a is loaded
            // Along with their scripts if they haven't already
            if (typeof currentSlide === 'undefined') {
                loadScript('js/reader.js');
            } else {
                currentSlide = 0;
            }
            result = generateCarousel(href, title);
        }
        else {
            console.error(`Link contains unrecognized pattern: ${href}`)
        }
        return result;
    };

    renderer.image = function (href, title, text) {
        // If it's a youtube video, embed it
        if (href.startsWith('https://youtu.be') || href.startsWith('https://www.youtube.com')) {
            let parts = href.split('/');
            let videoId = parts[parts.length - 1];
            return `<iframe class="yt" src="https://www.youtube.com/embed/${videoId}" title="${title || ''}" allow="accelerometer" frameborder="0" allowfullscreen></iframe>`
        }
        return `<img src="${href}" alt="${text}" title="${title || ''}">`;
    };

    renderer.heading = function (text, level) {
        // const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
        if (level === 1) {
            document.title = 'Xorad - ' + text;
        }
        return `<h${level}>${text}</h${level}>`;
    }

    return renderer;
}

function generateCarousel(folder, info) {
    console.log(`Generating carousel with folder ${folder} and info: ${info}`);
    if (info == '') {
        console.error(`Generating a Carousel failed,
        requires information for page count and fileformat, example:
        '[text](/folder/ "5,webp")'`);
        return "Error";
    }
    const parts = info.split(',');
    if (parts.length != 2) {
        console.error(`Generating a Carousel failed,
        Incorrect format for page count and fileformat, example:
        '[text](/folder/ "5,webp")'`);
        return "Error";
    }
    let pages = parseInt(parts[0],10);
    let fileformat = parts[1];
    var result = '';

    result += `<div class="reader-container">
    <div class="reader">
        <div class="carousel-header">
            <button class="btn-start" onclick="goToStart()" disabled><<</button>
            <button class="alt-prev" onclick="changeSlide(-1)" disabled><</button>
            <span class="page-count"></span>
            <button class="alt-next" onclick="changeSlide(1)" disabled>></button>
            <button class="btn-end" onclick="goToEnd()" disabled>>></button>
            <button id="toggle-fit" onclick="toggleFit()"><img src="/assets/resize-icon.svg" alt="Fit on screen"></img></button>
        </div>
        <div class="carousel">
            <div class="carousel-images">`;

    for (let i = 0; i < pages; i++) {
        result += `<img src="${folder}/p${i}.${fileformat}" alt="Page ${i + 1}" class="carousel-image"></img>`;
    }
    result += `</div>
            <button class="prev" onclick="changeSlide(-1)"></button>
            <button class="next" onclick="changeSlide(1)"></button>
        </div>
        </div>
    </div>`;
    return result;
}