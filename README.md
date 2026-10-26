# Nila Child Care website
Static site: HTML, CSS, vanilla JS, Bootstrap 5 (CDN). No build step.

## Run locally
    cd nila-child-care
    python3 -m http.server 8000      # then open http://localhost:8000
Forms will show the error message locally: they only work on Netlify (below).

## Deploy to Netlify (free)
1. Go to app.netlify.com > Add new site > Deploy manually, drag this folder in (or connect a Git repo).
2. Site configuration > Forms: confirm "enquiry" and "appointment" are detected.
3. Forms > Notifications: add an email notification for submissions.
4. Submit each form once on the live site to verify.

## Maintain
- Photos: put files in assets/ and add {src, alt} entries to GALLERY in script.js.
- Phone/WhatsApp/menu/footer: top of script.js. Page content: the .html files.
