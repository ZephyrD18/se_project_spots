# Spots

## Overview

Spots is a responsive photo-sharing web application where users can manage their profile and interact with photo cards through a connected API.

Users can:

- Edit their profile information
- Update their profile avatar
- Add new photo posts
- Like and unlike photo cards
- Delete their own cards with confirmation
- Preview images in a modal view

This project focuses on modular JavaScript, reusable validation, API integration, and responsive layout.

---

## Live Features

- Profile information is loaded from the server on page load
- Profile avatar is loaded from the server on page load
- Cards are loaded from the server on page load
- Edit profile modal with validation
- Update avatar modal with validation
- Add new post modal with real-time validation
- Delete confirmation modal
- Image preview modal
- Like and unlike photo cards
- Changes persist after page refresh
- Close modals with Escape key
- Close modals by clicking outside the modal
- Disabled submit button when inputs are invalid
- Fully responsive layout

---

## Tech Stack

- **HTML5** for semantic structure
- **CSS3** for responsive layout and styling
- **Vanilla JavaScript (ES6 modules)** for DOM logic and interactivity
- **Webpack** for bundling and development server
- **Babel** for JavaScript transpilation
- **PostCSS + Autoprefixer + cssnano** for CSS processing and optimization
- **REST API** for persistent profile and card data

---

## Key Concepts Demonstrated

- API requests encapsulated in an `Api` class
- Promise handling with centralized error logging
- Template cloning for dynamic card rendering
- Reusable modal open and close logic
- Reusable form validation with a config object
- Separation of concerns using modules
- Persistent data rendering from a backend API
- Responsive design across desktop and mobile layouts

---

## Project Functionality

### Profile

Users can edit their name and description through a modal form. The updated profile information is saved to the server and remains after refreshing the page.

### Avatar

Users can hover over the profile image to reveal the edit icon. Clicking it opens the avatar form modal, where a new avatar image URL can be submitted and saved to the server.

### Cards

Cards are fetched from the API on page load. Users can add cards, like or unlike them, preview them in a larger modal, and delete them through a confirmation modal.

### Validation

All form fields are validated through one reusable validation system. Invalid inputs show error messages and disable the submit button until corrected.

---

## Screenshots

Add screenshots or GIFs here showing:

- Desktop layout
- Mobile layout
- Edit profile modal
- Add post modal
- Avatar modal
- Delete confirmation modal

---

## Author

**Issam Driwech**  
Software Engineer in training

---

## Deployment

[Live Project on GitHub Pages](https://zephyrd18.github.io/se_project_spots/)

[Pitch Video](https://www.loom.com/share/9a4484a802a04bc19e7247af60c1044c)
