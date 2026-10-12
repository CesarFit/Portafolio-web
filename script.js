"use strict";

const currentPath = window.location.pathname.toLowerCase();
const currentPage = currentPath.endsWith("/")
    ? "index.html"
    : currentPath.substring(currentPath.lastIndexOf("/") + 1);

const navigationLinks = document.querySelectorAll(
    'nav[aria-label="Main navigation"] a[href]'
);

navigationLinks.forEach((link) => {
    const linkPath = new URL(link.href, window.location.href).pathname.toLowerCase();
    const linkPage = linkPath.substring(linkPath.lastIndexOf("/") + 1);

    if (linkPage === currentPage) {
        link.setAttribute("aria-current", "page");
    } else {
        link.removeAttribute("aria-current");
    }
});

const navigation = document.querySelector('nav[aria-label="Main navigation"]');

if (navigation) {
    const navigationToggle = navigation.querySelector(".nav-toggle");
    const navigationList = navigation.querySelector("#primary-navigation");

    if (navigationToggle && navigationList) {
        const setNavigationOpen = (isOpen) => {
            navigation.classList.toggle("is-open", isOpen);
            navigationToggle.setAttribute("aria-expanded", String(isOpen));
            navigationToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        };

        navigationToggle.addEventListener("click", () => {
            const isExpanded = navigationToggle.getAttribute("aria-expanded") === "true";
            setNavigationOpen(!isExpanded);
        });

        navigationList.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setNavigationOpen(false));
        });

        navigation.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navigationToggle.getAttribute("aria-expanded") === "true") {
                setNavigationOpen(false);
                navigationToggle.focus();
            }
        });

        navigation.classList.add("nav-ready");
    }
}

function filterProjects(category) {
    const projects = document.querySelectorAll("#projects .project-item");
    let visibleCount = 0;

    projects.forEach((project) => {
        const matchesCategory = category === "all" || project.dataset.category === category;
        project.hidden = !matchesCategory;

        if (matchesCategory) {
            visibleCount += 1;
        }
    });

    document.querySelectorAll(".project-filter").forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.filter === category));
    });

    const projectCount = document.querySelector("#project-count");
    if (projectCount) {
        projectCount.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "project" : "projects"}`;
    }
}

document.querySelectorAll(".project-filter").forEach((button) => {
    button.addEventListener("click", () => filterProjects(button.dataset.filter));
});

const projectLightbox = document.querySelector("#project-lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

function openProjectImage(trigger) {
    const previewImage = trigger.querySelector("img");
    const projectTitle = trigger.closest(".project-item").querySelector("h3").textContent;
    const fullSizeUrl = new URL(previewImage.src);
    fullSizeUrl.searchParams.set("w", "1400");
    fullSizeUrl.searchParams.set("h", "875");
    fullSizeUrl.searchParams.set("q", "85");

    lightboxImage.src = fullSizeUrl.href;
    lightboxImage.alt = previewImage.alt;
    lightboxCaption.textContent = projectTitle;

    if (typeof projectLightbox.showModal === "function") {
        projectLightbox.showModal();
        lightboxClose.focus();
    } else {
        window.open(fullSizeUrl.href, "_blank", "noopener,noreferrer");
    }
}

function closeProjectImage() {
    if (projectLightbox && projectLightbox.open) {
        projectLightbox.close();
    }
}

if (projectLightbox && lightboxImage && lightboxCaption && lightboxClose) {
    document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
        trigger.addEventListener("click", () => openProjectImage(trigger));
    });

    lightboxClose.addEventListener("click", closeProjectImage);
    projectLightbox.addEventListener("click", (event) => {
        if (event.target === projectLightbox) {
            closeProjectImage();
        }
    });
}

function validateContactField(field) {
    const value = field.value.trim();
    const label = field.parentElement.querySelector("label").textContent.trim().toLowerCase();
    const message = document.querySelector(`#${field.id}-message`);
    const minimumLength = Number(field.getAttribute("minlength"));
    const maximumLength = Number(field.getAttribute("maxlength"));
    let errorMessage = "";

    if (field.required && !value) {
        errorMessage = `Enter your ${label}.`;
    } else if (field.type === "email" && field.validity.typeMismatch) {
        errorMessage = "Enter a valid email address, such as name@example.com.";
    } else if (minimumLength && value.length < minimumLength) {
        errorMessage = `Enter at least ${minimumLength} characters.`;
    } else if (maximumLength && value.length > maximumLength) {
        errorMessage = `Use no more than ${maximumLength} characters.`;
    }

    const isValid = errorMessage === "";
    field.setAttribute("aria-invalid", String(!isValid));

    if (message) {
        message.textContent = isValid ? "Looks good." : errorMessage;
        message.dataset.state = isValid ? "valid" : "error";
    }

    return isValid;
}

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    const contactFields = Array.from(contactForm.querySelectorAll("input, textarea"));
    const formStatus = contactForm.querySelector("#form-status");

    contactForm.noValidate = true;

    contactFields.forEach((field) => {
        field.addEventListener("input", () => {
            validateContactField(field);
            formStatus.textContent = "";
            formStatus.removeAttribute("data-state");
        });

        field.addEventListener("blur", () => validateContactField(field));
    });

    contactForm.addEventListener("submit", (event) => {
        const allFieldsAreValid = contactFields.map(validateContactField).every(Boolean);
        event.preventDefault();

        if (!allFieldsAreValid) {
            formStatus.textContent = "Please correct the highlighted fields before continuing.";
            formStatus.dataset.state = "error";
            const firstInvalidField = contactFields.find((field) => field.getAttribute("aria-invalid") === "true");
            firstInvalidField.focus();
            return;
        }

        formStatus.textContent = "All fields are valid, but message sending is not configured yet.";
        formStatus.dataset.state = "valid";
    });
}
