[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />

<h3 align="center">Marvel VueJS</h3>

<p align="center">
  Java VueJS for Marvel universe data.
  <br />
  <a href="https://github.com/necmettincimen/marvel-vuejs"><strong>Explore the docs »</strong></a>
  <br />
  <br />
  <a href="https://github.com/necmettincimen/marvel-vuejs/issues">Report Bug</a>
  ·
  <a href="https://github.com/necmettincimen/marvel-vuejs/issues">Request Feature</a>
</p>

---

## Table of Contents

- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

---

## About The Project

This project is a Vue.js frontend application that allows users to explore Marvel universe data such as characters, comics, and stories. It provides a modern, interactive user interface to browse, search, and view details about Marvel content. The app is designed for learning, demo, and integration with Marvel APIs.

### Built With

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Vitest](https://vitest.dev/) (unit testing)
- [Playwright](https://playwright.dev/) (e2e testing)
- [ESLint](https://eslint.org/) (linting)

---

## Getting Started

To get a local copy up and running follow these simple steps.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

---

## Usage

Once the application is running, open your browser and go to `http://localhost:5173` (or the port shown in your terminal) to use the Marvel VueJS app.

You can browse, search, and view details about Marvel characters, comics, and your reading list. Authentication features, profile management, and reading list management are available after logging in.

---

## Roadmap

- [x] Add authentication and authorization
- [x] Add Docker support
- [ ] Improve test coverage

See the [open issues](https://github.com/necmettincimen/marvel-vuejs/issues) for more.

---

---

## Architecture

This project follows a modular frontend architecture using Vue 3 and Vite:

- **Components:** Reusable UI elements (e.g., cards, icons, pagination) in `src/components/`.
- **Views:** Page-level components for routing (e.g., CharactersPage, ComicsPage) in `src/views/`.
- **Router:** Handles navigation and routes in `src/router/`.
- **Stores:** State management using Pinia in `src/stores/` (e.g., authentication, characters, comics).
- **Assets:** Static files and styles in `src/assets/`.
- **Types:** TypeScript interfaces for data models in `src/types/`.

**Key Technologies:**

- **Vue 3:** UI framework
- **Vite:** Build tool
- **TypeScript:** Type safety
- **Pinia:** State management
- **Vue Router:** Routing
- **Axios:** HTTP requests
- **Vitest:** Unit testing
- **Playwright:** E2E testing
- **ESLint:** Linting

---

## Example Folder Structure

```
src/
  assets/           # Static assets and styles
  components/       # Reusable UI components
    base/           # Base UI elements (e.g., Pagination)
    cards/          # Card components (e.g., CharacterCard, ComicCard)
    icons/          # Icon components
    layout/         # Layout components (Header, Footer, etc.)
  router/           # Vue Router configuration
  stores/           # Pinia stores (state management)
  types/            # TypeScript interfaces and types
  views/            # Page-level components (e.g., CharactersPage, ComicsPage)
  main.ts           # App entry point
  App.vue           # Root Vue component
public/             # Static public files (favicon, etc.)
```

## Contributing

Contributions are welcome! Please fork the repo and submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

Necmettin Çimen - [@Necmettin Cimen](https://necmettincimen.github.io) - [necmettin.dev@gmail.com](mailto:necmettin.dev@gmail.com)

Project Link: [https://github.com/necmettincimen/marvel-vuejs](https://github.com/necmettincimen/marvel-vuejs)

---

## Acknowledgements

- [Vue.js Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Marvel Developer Portal](https://developer.marvel.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Axios Documentation](https://axios-http.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [ESLint Documentation](https://eslint.org/)

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/necmettincimen/marvel-vuejs.svg?style=for-the-badge
[contributors-url]: https://github.com/necmettincimen/marvel-vuejs/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/necmettincimen/marvel-vuejs.svg?style=for-the-badge
[forks-url]: https://github.com/necmettincimen/marvel-vuejs/network/members
[stars-shield]: https://img.shields.io/github/stars/necmettincimen/marvel-vuejs.svg?style=for-the-badge
[stars-url]: https://github.com/necmettincimen/marvel-vuejs/stargazers
[issues-shield]: https://img.shields.io/github/issues/necmettincimen/marvel-vuejs.svg?style=for-the-badge
[issues-url]: https://github.com/necmettincimen/marvel-vuejs/issues
[license-shield]: https://img.shields.io/github/license/necmettincimen/marvel-vuejs.svg?style=for-the-badge
[license-url]: https://github.com/necmettincimen/marvel-vuejs/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/necmettincimen

---
