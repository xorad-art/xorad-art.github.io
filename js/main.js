const FEATURED_LIMIT = 6;
const INITIAL_FEATURED = 3;

// When everything is loaded, load the header, the main content, and the footer
document.addEventListener("DOMContentLoaded", function () {
    // Load templates
    loadTemplate("nav", "templates/nav.html");
    loadTemplate("footer", "templates/footer.html");
    let json = null;

    // If there's a fragment identifier, load it
    // Otherwise, load the main page
    if (window.location.hash) {
        console.log("Loading previous content");
        const file = decodeURIComponent(window.location.hash.substring(1));
        loadMarkdown("main", file);
    } else {
        let loaded = INITIAL_FEATURED;

        console.log("Loading main content");
        fetch('js/featured.json')
            .then(response => response.json())
            .then(data => {
                json = data;
                loadFeatured("main", data, INITIAL_FEATURED);
                addEventListener("scroll", function () {
                    let isMainPage = window.location.hash === "";
                    if (isMainPage &&
                        loaded < FEATURED_LIMIT &&
                        (window.innerHeight + window.scrollY >= document.body.offsetHeight)
                    ) {
                        addFeaturedItem("featured", data, loaded);
                        loaded++;
                    }
                });
            })
            .catch(error => console.error("Error loading featured content:", error));
    }

    // If by any reason the fragment identifier changes, load the new content
    window.addEventListener("hashchange", function () {
        const file = decodeURIComponent(window.location.hash.substring(1));
        if (file !== "") {
            loadMarkdown("main", file);
        } else {
            loadFeatured("main", json, INITIAL_FEATURED);
        }
    });

    window.addEventListener("scroll", checkFeaturedVisibility);
});


document.addEventListener("click", (e) => {
    const link = e.target.closest("a.dynamic-link");
    if (!link) return;

    // Middle-click, Ctrl-click, Cmd-click → let browser open new tab
    if (e.button === 1 || e.metaKey || e.ctrlKey) return;

    e.preventDefault();

    const file = decodeURIComponent(link.getAttribute("href").substring(1));
    loadMarkdown("main", file);
});