# 🐛 Buggy Page

A deliberately buggy webpage designed for training manual testers and automation testers (specifically Playwright users). This site contains intentional bugs across different difficulty levels to help QA professionals practice finding and documenting defects.

## 🎯 Purpose

This project serves as a training ground for:
- **Manual Testers**: Practice finding bugs visually and through exploratory testing
- **Automation Testers**: Learn to write robust Playwright tests that handle various edge cases
- **QA Students**: Understand different types of bugs and how to reproduce them

## 🚀 Quick Start

### Running the Site Locally

You can run this site using any simple HTTP server:

```bash
# Using Python
python -m http.server 8080

# Using Node.js (after installing http-server)
npx http-server -p 8080

# Using PHP
php -S localhost:8080
```

Then open your browser to [http://localhost:8080](http://localhost:8080)

### Running Playwright Tests

1. Navigate to the tests directory:
```bash
cd tests/playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Run tests:
```bash
# Run all tests
npm test

# Run tests with browser visible
npm run test:headed

# Run tests in debug mode
npm run test:debug

# View test report
npm run test:report
```

## 📁 Project Structure

```
buggy-page/
├── index.html              # Main landing page with navigation
├── css/
│   └── styles.css          # Styling
├── js/
│   └── app.js              # JavaScript functionality
├── cheatsheet.html         # Cheat sheet with bug information
├── pages/
│   ├── forms.html          # Page with forms
│   ├── buttons.html        # Page with buttons/interactions
│   ├── links.html          # Page with links
│   └── 404.html            # Custom 404 page
├── tests/
│   └── playwright/
│       ├── playwright.config.js
│       ├── package.json
│       └── specs/
│           └── buggy.spec.js   # Playwright tests
└── README.md               # This file
```

## 🐛 Bug Categories

The site contains bugs across four difficulty levels:

- **🟢 Easy (5 bugs)**: Perfect for beginners
- **🟡 Medium (6 bugs)**: Requires some investigation
- **🟠 Hard (5 bugs)**: Timing and state-related issues
- **🔴 Expert (6 bugs)**: Complex scenarios

Explore the site and discover them yourself! 🔍✨

## 📋 Cheat Sheet

After attempting to find bugs on your own, you can check the [cheatsheet.html](cheatsheet.html) to verify your findings. The cheat sheet includes:
- Bug ID for each bug
- Difficulty level
- Page location
- Description of the bug
- Expected vs Actual behavior

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add New Bugs**: Create a new intentional bug and document it in the cheatsheet
2. **Improve Tests**: Add more comprehensive Playwright tests
3. **Enhance Documentation**: Improve the README or add tutorials
4. **Fix Design Issues**: Make the site look more professional

### Guidelines
- Each bug should have a unique `data-bug-id` attribute
- Update the cheatsheet with new bugs
- Add corresponding Playwright tests

## 📄 License

MIT License - feel free to use this project for training and educational purposes.

## 🔗 Links

- [Cheat Sheet](cheatsheet.html)
- [Playwright Documentation](https://playwright.dev)
- [Report Issues](https://github.com/JakubTomczynski/buggy-page/issues)
