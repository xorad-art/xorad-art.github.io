
// Loads the template from the given html file and modifies the given element
// with the template.
function loadTemplate(element, templateFile) {
    const container = document.getElementById(element);
    fetch(templateFile) // Adjust the path as needed
            .then(response => response.text())
            .then(template => {
                container.innerHTML = template;
            })
            .catch(error => console.error(`Error loading ${templateFile} to ${element}:`, error));
}

// Loads the contents of a markdown file into the given element
function loadMarkdown(element, markdownFile) {
    const container = document.getElementById(element);
    window.location.hash = encodeURIComponent(markdownFile);

    fetch(markdownFile) // Adjust the path as needed
            .then(response => response.text())
            .then(markdown => {
                const output = "<div class='markdown-body'>" + marked.parse(markdown) + "</div>";
                container.innerHTML = output;
                container.style.display = "block";
            })
            .catch(error => console.error(`Error loading ${markdownFile} to ${element}:`, error));
    }

// Loads the content for the given element based on the fragment identifier
function loadPrevContent(element){
    // Check if there is a fragment identifier in the URL
    const initialMarkdownFile = decodeURIComponent(window.location.hash.substring(1));
    // Load the initial content based on the fragment identifier
    if (initialMarkdownFile) {
        console.log(`Loading ${initialMarkdownFile}`);
        loadMarkdown(element, initialMarkdownFile);
    } else {
        const container = document.getElementById(element);
        container.style.display = "block";
    }
}

// Generates the featured content on the home page
// BIG TO DO: Make this dynamic this is just a placeholder
function generateFeatured() {
    const featured = document.getElementById("featured");
    console.log("Generating featured content");
}