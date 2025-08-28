# MoviesApp-Assignment for Full stack 2, Higher Diploma in Science in Computer Science.  

## Objective: Users can browse the latest and upcoming releases, explore detailed movie info, and curate their personal favorites list.  powered by [The Movie Database (TMDb)](https://api.themoviedb.org).

## Features

- **Home Page**: Displays latest and upcoming movie releases.
- **User Authentication**: Login system to personalize experience and store favorites.
- **Favorites**: Users can select favorite movies.
- **Movie Details**: View reviews, cast info, and additional metadata via interactive buttons.
- **Filtering & Sorting**:
  - Filter by genre and actor *(work in progress)*.
  - Sort by title (A–Z), release date, and rating (descending).
- **Storybook Integration**: UI components documented and tested with Storybook.
- **Future Enhancements**:
  - Connect to external APIs (e.g., Wikipedia) for actor bios.
  - Implement session persistence and database storage for user data.

## Tech Stack

| Category       | Tools & Libraries |
|----------------|------------------|
| **Frontend**   | React, TypeScript, Vite |
| **UI/UX**      | MUI (Material UI), Emotion |
| **Routing**    | React Router DOM |
| **Forms**      | React Hook Form |
| **Data Fetching** | React Query |
| **Linting**    | ESLint, TypeScript ESLint |
| **Testing & Docs** | Storybook, Chromatic |
| **Build Tools** | Vite, TypeScript |

---
## Scripts

Run these commands from the root directory:

| Command | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |

## API Integration

This app connects to [TMDb API](https://api.themoviedb.org) to fetch movie data and applying for an API key

---

## Instructions to setup the application 

1. **Clone the repo from Github**:
   ```bash
   git clone https://github.com/pccork/labMoviesApp.git or download script via Github UI https://github.com/pccork/labMoviesApp
   
2. **Create .env file**:
    Stored created API key to the file VITE_TMDB_KEY="API key"

3. **Demo of movie app**:
    https://youtu.be/_4CX9W1jrCE

## Acknowledgement
This code/ script is based on lecture notes of Full Stack 2,2024 by Mr Frank Walsh

   

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


### Optional: expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
