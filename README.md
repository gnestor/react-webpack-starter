# React Webpack Starter

This project is a boilerplate for using:
* [React](https://github.com/facebook/react)
* [ES6 with Babel](http://babeljs.io)
* [Webpack](http://webpack.github.io) for bundling Javascript and CSS files
* [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html) for local testing with hot module reloading
* [React Transform](https://github.com/gaearon/react-transform-hmr) for hot module reloading React components

### Usage

* Install: `npm install`
* Run dev server: `npm start` (http://localhost:8080)
* Create production bundle: `npm run bundle`

### Project Structure

* `/css`: CSS files
* `/js`: Javascript/JSX files
  * `/js/index.js`: The entry file where Webpack will start bundling dependencies, dependencies' depedencies, etc.
* `/static/bundle.js`: The bundle file that is created by Webpack
* `.eslint*`: ESLint config files
* `webpack.config*.js`: Webpack config files
* `index.html`: The app's main file

### Linting

ESLint with React linting options have been enabled

```
npm run lint
```

or use the eslint plugin for your editor's linter (e.g. https://github.com/AtomLinter/linter-eslint)

### Notes

* At the time of publishing, babel-plugin-react-transform and react-transform-hmr are not yet compatible with Babel 6. Upgrading to Babel 6 will require refactoring of the Webpack config.
