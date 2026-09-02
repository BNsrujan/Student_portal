# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
└── /src 

  ├── /assets 

  ├── /components 

  ├── /views 

  ├── /services 

  ├── /utils 

  ├── /hooks 

  ├── /store 

  └── App.js 

  ├── index.js 

  ├── index.css 

The assets folder contains all of the project's static files, such as your logo, fonts, images, and favicons. 
Components folder contains a bit collection of UI codes such as buttons, forms, avatars, and so on. 
The views folder contains all your React application's web pages. 
Services folder contains code that allows you to interact with external API resources. 
The utils folder contains reusable function snippets for performing quick tasks like text truncation or down casing. 
Hooks folder contains codes and logic that can be reused across multiple components. 
The store folder houses your state management files, such as Redux, which are used to make certain functions and variables available throughout your application. 
The main component of your React application is the App.js file. This file connects all components and views. 
Index.js file is the React application's entry point. It is responsible for bootstrapping the React library and mounting it on the root element. 
index.css is the main and global CSS file for our application. Any writing style to this file will apply throughout the project.  