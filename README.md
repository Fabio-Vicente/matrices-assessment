# Matrices Assessment

This project was developed as part of a job position assessment, with a strong focus on code quality, performance, accessibility, and architectural best practices. The implementation closely follows the provided model, including all its unique nuances and behaviors, even in cases where alternative approaches could have been used.

## Modern SPA Architecture with Next.js

- **Single Page Application:** The app is built as a true SPA, leveraging Next.js for its robust structure, developer experience, and scalability. While Next.js is often used for SSR and SSG, it also excels as a foundation for modern, client-driven applications like this one.

## Semantic HTML & Accessibility

- **Semantic Structure:** The codebase uses semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<ul>`, `<li>`, `<article>`, etc.) to improve accessibility and maintainability.
- **ARIA & Keyboard Support:** ARIA attributes, roles, and keyboard navigation are thoughtfully applied to ensure the app is usable for all users, including those using assistive technologies.

## Responsive Design

- **Responsiveness:** Care was taken to try to accomadate the application component on different screens sizes. Even not beeing fully responsive, it can have good response for large desktops, tablets and even some kind of mobile devices.

## Key Technical Highlights

### Redux for Business Logic

- **Centralized State Management:** All business logic and state transitions are managed using Redux, ensuring a clear separation between UI and logic.
- **Redux Toolkit:** The app leverages Redux Toolkit for concise reducer logic and improved developer experience.

### Performance Optimizations

- **Memoized Hooks:** Custom hooks and selectors are memoized to prevent unnecessary recalculations and re-renders, especially in list-heavy UI components.
- **React.memo HOC:** Components that depend only on specific props or slices of state are wrapped with `React.memo` to further reduce re-rendering and boost performance.

### Entity Adapter for Efficient State

- **Normalized State:** Redux's Entity Adapter is used to store messages and threads in a normalized structure, enabling fast lookups and updates.
- **Reduced Re-renders:** By using selectors and the adapter, the app avoids unnecessary re-renders, even as the message list grows or changes frequently.

## AI-Assisted Development (Cursor)

- **Token Mapping:** AI was instrumental in mapping all hard-coded color and style values to design tokens, ensuring a scalable and maintainable theme system.
- **Redux Store Configuration:** AI provided guidance and automation in setting up the Redux store, Entity Adapter, and selectors for optimal performance.
- **Code Improvements:** Throughout development, AI suggested best practices for memoization, state normalization, and code organization, leading to a more robust and performant codebase.

## Model Fidelity

- **Exact Behavior:** The application was built to behave exactly as the provided model, including all its specific UI and UX nuances. This includes edge cases and behaviors that might not be typical in a production app, but were required for assessment fidelity.
- **No Unnecessary Abstractions:** Even when alternative or more generic solutions were possible, the implementation prioritizes matching the model's requirements and user experience.

## Customizing App Simulation Parameters

You can easily simulate different scenarios by modifying parameters in the `src/common/mock` directory:

- **Current Date:** Change the current date used by the app in `src/common/mock/time.ts`.
- **User:** Change the local user (the email account in use) in `src/common/mock/user.ts`.
- **Email List:** Modify the list of emails/messages in `src/common/mock/messages.ts`.

This flexibility allows you to test and demonstrate the app's behavior under various conditions and user profiles.

---

**Note:** This project demonstrates not only technical proficiency with React, Redux, and modern frontend tooling, but also the ability to follow detailed requirements and leverage AI tools for rapid, high-quality delivery.
