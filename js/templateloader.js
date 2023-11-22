
// Loads the template from the given html file and modifies the given element
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

    fetch(markdownFile) // Adjust the path as needed
            .then(response => response.text())
            .then(markdown => {
                const output = "<div class='markdown-body'>" + marked.parse(markdown) + "</div>";
                container.innerHTML = output;
            })
            .catch(error => console.error(`Error loading ${markdownFile} to ${element}:`, error));
}

function showFeatured(element) {
    const container = document.getElementById(element);
    console.log("Generating featured content");
    // Multiline string literal
    // const string = `
    // <p class="description">Illustrator, sometimes developer, occasionally clever</p>
    // <div id="featured">
    //     <h2>Featured</h2>
    //     <div class="left">
    //         <div class="container"><img src="assets/media/braum.jpg" alt="Some of my work"></div><a
    //             href="art/recent-ilustrations" class="image-overlay">
    //             <h3 class="title">Recent Ilustrations</h3>
    //             <p class="description">Whenever I find time to draw</p>
    //         </a>
    //     </div>
    //     <div class="right">
    //         <div class="container"><img src="assets/media/Leptos_logo_miniature.jpg" alt="Some of my work"></div><a
    //             href="code/this-website" class="image-overlay">
    //             <h3 class="title">This Website</h3>
    //             <p class="description">Made piece by piece inside the Rust Leptos Framework</p>
    //         </a>
    //     </div>
    //     <div class="left">
    //         <div class="container"><img src="assets/media/10.jpg" alt="Some of my work"></div><a
    //             href="other/working-on-a-degree" class="image-overlay">
    //             <h3 class="title">Working on a Degree</h3>
    //             <p class="description">Computer Systems Engineering in Mexico</p>
    //         </a>
    //     </div>
    //     <div class="right">
    //         <div class="container"><img src="https://picsum.photos/200/301" alt="Some of my work"></div><a
    //             href="writing/check-out-my-blog" class="image-overlay">
    //             <h3 class="title">Check out my blog</h3>
    //             <p class="description">I write about whatever I feel like writing about</p>
    //         </a>
    //     </div>
    //     <div class="left">
    //         <div class="container"><img src="https://picsum.photos/200/302" alt="Some of my work"></div><a
    //             href="code/deep-learning-and-music" class="image-overlay">
    //             <h3 class="title">Deep Learning and Music</h3>
    //             <p class="description">A project that uses deep learning to categorize music</p>
    //         </a>
    //     </div>
    // </div>
    // `;
    let string = "<p>holiwi</p>";

    container.innerHTML = string;
}

// Makes the changes to the page relating to the footer
// links and contact information
function displayContactInfo() {
    document.getElementById("footer").classList.toggle("hidden");
    // loadTemplate("main", "templates/contact.html");
    // Wait for the animation to finish
    setTimeout(function () {
        loadTemplate("footer", "templates/contact.html");
    }, 500);
}