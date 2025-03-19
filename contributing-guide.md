# Contributing to VendorVault

First off, thank you for considering contributing to VendorVault! It's people like you that make this project such a great tool.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report. Following these guidelines helps maintainers understand your report, reproduce the behavior, and find related reports.

* **Use the GitHub issue search** — check if the issue has already been reported.
* **Check if the issue has been fixed** — try to reproduce it using the latest `main` branch.
* **Use the bug report template** — when you create a new issue, you will see a template that guides you through collecting and providing the information we need.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion, including completely new features and minor improvements to existing functionality.

* **Use the GitHub issue search** — check if the enhancement has already been suggested.
* **Use the feature request template** — when you create a new issue, you will see a template that guides you through collecting and providing the information we need.

### Your First Code Contribution

Unsure where to begin contributing? You can start by looking through these `beginner-friendly` and `help-wanted` issues:

* **Beginner-friendly issues** - issues which should only require a few lines of code, and a test or two.
* **Help wanted issues** - issues which should be a bit more involved than `beginner-friendly` issues.

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Include screenshots and animated GIFs in your pull request whenever possible
* Follow the [JavaScript](#javascript-styleguide) and [React](#react-styleguide) styleguides
* Include thoughtfully-worded, well-structured tests
* Document new code based on the [Documentation Styleguide](#documentation-styleguide)
* End all files with a newline
* Avoid platform-dependent code

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* Consider starting the commit message with an applicable emoji:
    * 🎨 `:art:` when improving the format/structure of the code
    * 🐎 `:racehorse:` when improving performance
    * 🔒 `:lock:` when dealing with security
    * 📝 `:memo:` when writing docs
    * 🐛 `:bug:` when fixing a bug
    * 🔥 `:fire:` when removing code or files
    * 💚 `:green_heart:` when fixing the CI build
    * ✅ `:white_check_mark:` when adding tests
    * 🔖 `:bookmark:` when releasing / version tags
    * 🚀 `:rocket:` when deploying

### JavaScript Styleguide

All JavaScript code is linted with [ESLint](https://eslint.org/) and formatted with [Prettier](https://prettier.io/).

* Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
* Prefer async/await to callbacks or Promises
* Use arrow functions over anonymous function expressions
* Use template literals instead of string concatenation
* Use ES6 destructuring when possible
* Use meaningful variable names

### React Styleguide

* Use functional components with hooks instead of class components
* Use React.Fragment instead of additional divs
* Use CSS-in-JS or Tailwind CSS for styling
* Use prop-types for type checking or TypeScript
* Keep components small and focused
* Use the container/presentational pattern

### Documentation Styleguide

* Use [Markdown](https://guides.github.com/features/mastering-markdown/) for documentation.
* Reference methods and classes in markdown with the custom `{@link}` syntax.
* Use JSDoc comments for functions, classes, and methods.

## Development Setup

To set up VendorVault for local development:

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/vendor-vault.git`
3. Install dependencies: `cd vendor-vault && npm install`
4. Set up your environment variables: `cp .env.example .env`
5. Start the development server: `npm run dev`

### Running Tests

```bash
# Run all tests
npm test

# Run specific tests
npm test -- --testPathPattern=components

# Run tests in watch mode
npm test -- --watch
```

## Community

Join our community:

* [Discord](https://discord.gg/yourdiscordlink)
* [GitHub Discussions](https://github.com/yourusername/vendor-vault/discussions)

## Attribution

This Contributing Guide is adapted from the [Atom Contributing Guide](https://github.com/atom/atom/blob/master/CONTRIBUTING.md).
