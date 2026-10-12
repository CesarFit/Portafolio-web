# Cesar Frias Developer Portfolio

A responsive, multi-page developer portfolio built with semantic HTML, CSS, and vanilla JavaScript. It presents an introduction, project concepts, technical skills, and an accessible contact form.

## Features

- Five pages: Home, About Me, Projects, Skills, and Contact
- Shared responsive navigation with a keyboard-operable hamburger menu on small screens
- Active navigation link announcement with `aria-current`
- Responsive project gallery with 12 project concepts and category filters
- Accessible project-image lightbox with larger images, captions, Escape-key support, and a fallback for browsers without native dialog support
- Contact form validation for name, email, subject, and message, with field-level feedback and an announced form status
- Smooth in-page scrolling that respects reduced-motion preferences
- Responsive layouts and accessibility support, including semantic HTML, form labels, descriptive image alternatives, and keyboard focus states

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript

No package manager, framework, or build step is required.

## Project Structure

```text
.
|-- index.html       # Home page
|-- about-me.html    # Developer introduction
|-- projects.html    # Project gallery, filters, and image lightbox
|-- skills.html      # Skills list
|-- contact.html     # Contact form and validation feedback
|-- style.css        # Shared responsive styles
|-- script.js        # Navigation, project filters, lightbox, and form validation
`-- README.md
```

## Run Locally

You can open `index.html` directly in a browser. To preview through a local HTTP server, run this command from the project directory:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Project Images

Project thumbnails are served from Unsplash and request 400 x 250 crops. The lightbox requests larger versions. An internet connection is required to load these images. Replace the image URLs in `projects.html` with local assets or your own hosted images when publishing.

## Contact Form Status

The contact form currently performs client-side validation only. It does not send or store submissions because no form endpoint or backend service is configured. Connect a trusted form service or backend before using it to receive real messages. Client-side validation should not be treated as server-side security validation.

## Publishing

This is a static website and can be hosted by GitHub Pages or another static hosting provider. Publish the repository contents and use `index.html` as the site entry page. Ensure all asset paths remain relative and configure the repository's Pages settings to use the correct branch and folder.

## Browser Support

The site uses standard HTML, CSS, and JavaScript APIs and is intended for current versions of Chrome, Edge, Firefox, and Safari. Browsers without native HTML dialog support open the larger project image in a new tab instead.
