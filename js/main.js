const featuredLimit = 3;
const initialFeatured = 3;

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
        let loaded = 5;

        console.log("Loading main content");
        fetch('js/featured.json')
            .then(response => response.json())
            .then(data => {
                json = data;
                loadFeatured("main", data, initialFeatured);
                addEventListener("scroll", function () {
                    if (loaded < featuredLimit && (window.innerHeight + window.scrollY >= document.body.offsetHeight)) {
                        if (featuredLimit - loaded >= 1) {
                            addFeaturedItem("featured", data, loaded);
                            loaded++;
                        }
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
            loadFeatured("main", json, initialFeatured);
        }
    });

    window.addEventListener("scroll", checkFeaturedVisibility);
    // Run the function once to check the initial state after a moment
    setTimeout(checkFeaturedVisibility, 100);
});