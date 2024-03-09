const CONTENT_FOLDER = "assets/content/";

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
    const contact = document.getElementById("contact");
    window.location.hash = encodeURIComponent(markdownFile);

    // Hide the contact info if it's visible
    hideContactInfo();

    const renderer = new marked.Renderer();
    renderer.link = function(href, title, text) {
        if (href.startsWith('/assets/content/')) {
            const file = href.substring(16);
            return `<button onclick="loadMarkdown('main', '${file}')" title="${title || ''}">${text}</button>`;
        }
        return `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`;
    };

    window.scrollTo(0, 0);

    fetch(CONTENT_FOLDER + markdownFile)
            .then(response => {
                if (response.status === 404) {
                    throw new Error('404');
                }
                return response.text();
            })
            .then(markdown => {
                const html = marked.parse(markdown, {renderer: renderer});
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