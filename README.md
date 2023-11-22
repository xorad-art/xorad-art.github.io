
# xorad-art.github.io

A simple website for my art and projects.

## Development

I'm using the simplest tools when it comes to web development, so, I'm using (almost) raw HTML, CSS and JavaScript. For some quality of life, instead of writing directly in css, I'm using [Sass](https://sass-lang.com/) to make it easier to write and maintain.

Most of my notes are done in [Markdown](https://www.markdownguide.org/), so, I'm using [Marked.js](https://marked.js.org/) to parse markdown files into HTML.

[GitHub Pages](https://pages.github.com/) has been a lifesaver for hosting this website in a simple way.

## Notes

To host a local server and avoid some restrictions to file previews, I'm using [http-server](https://www.npmjs.com/package/http-server) to serve the files.

```bash
http-server
```

Thanks to using Sass, I have to compile the files into css. With the `watch` command, any change in the `/sass/` folder is automatically compiled to `/css/`.

```bash
sass --watch style/sass/main.scss:style/css/style.css
```

If at any point I forget what to do I can always go back here and read this.
