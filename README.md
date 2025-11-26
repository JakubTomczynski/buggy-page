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
│   └── styles.css          # Styling with intentional CSS bugs
├── js/
│   └── app.js              # JavaScript with intentional JS bugs
├── cheatsheet.html         # Cheat sheet revealing all bugs
├── pages/
│   ├── forms.html          # Page with buggy forms
│   ├── buttons.html        # Page with buggy buttons/interactions
│   ├── links.html          # Page with broken/buggy links
│   └── 404.html            # Custom 404 page
├── tests/
│   └── playwright/
│       ├── playwright.config.js
│       ├── package.json
│       └── specs/
│           └── buggy.spec.js   # Example Playwright tests
└── README.md               # This file
```

## 🐛 Bug Categories

### 🟢 Easy Bugs (5)
Perfect for beginners - obvious issues that can be spotted visually:
1. **BUG-EASY-01**: Broken link leads to 404
2. **BUG-EASY-02**: Missing alt text on images
3. **BUG-EASY-03**: Typo in button text
4. **BUG-EASY-04**: Wrong placeholder text in input
5. **BUG-EASY-05**: Visible Lorem Ipsum text

### 🟡 Medium Bugs (6)
Requires some investigation and interaction:
1. **BUG-MEDIUM-01**: Form accepts invalid email format
2. **BUG-MEDIUM-02**: Required field not actually required
3. **BUG-MEDIUM-03**: Wrong success message displayed
4. **BUG-MEDIUM-04**: Dropdown has duplicate options
5. **BUG-MEDIUM-05**: Counter increments by 2 instead of 1
6. **BUG-MEDIUM-06**: Hidden element that should be visible

### 🟠 Hard Bugs (5)
Timing, state, and viewport-related issues:
1. **BUG-HARD-01**: Race condition - button works after 2s delay
2. **BUG-HARD-02**: Dynamic IDs change on page refresh
3. **BUG-HARD-03**: Element only clickable in specific viewport
4. **BUG-HARD-04**: Form clears all data on validation error
5. **BUG-HARD-05**: Infinite scroll breaks after 3 loads

### 🔴 Expert Bugs (6)
Complex scenarios requiring advanced testing skills:
1. **BUG-EXPERT-01**: Flaky element - randomly fails ~30% of clicks
2. **BUG-EXPERT-02**: Memory leak on repeated action
3. **BUG-EXPERT-03**: Element inside Shadow DOM with bugs
4. **BUG-EXPERT-04**: iFrame with timing issues
5. **BUG-EXPERT-05**: LocalStorage corrupts on certain inputs
6. **BUG-EXPERT-06**: Event listener only fires on second click

## 📋 Cheat Sheet

View the complete bug cheat sheet at [cheatsheet.html](cheatsheet.html) which includes:
- Bug ID for each bug
- Difficulty level with color coding
- Page location
- Description of the bug
- Expected vs Actual behavior
- Hints for finding/reproducing

## 🧪 Testing Tips

### Using data-bug-id Attributes
Each bug has a `data-bug-id` attribute for easy identification in tests:

```javascript
// Example: Select element by bug ID
const element = page.locator('[data-bug-id="BUG-EASY-05"]');
```

### Handling Timing Issues
```javascript
// Wait for element to be ready
await page.waitForTimeout(2500); // For delayed button bug

// Wait for specific condition
await expect(element).toBeVisible({ timeout: 5000 });
```

### Testing Shadow DOM
```javascript
// Access Shadow DOM elements
const shadowHost = page.locator('#shadow-host');
const shadowElement = shadowHost.locator('>>> #shadow-input');
```

### Viewport Testing
```javascript
// Test mobile viewport
await page.setViewportSize({ width: 375, height: 667 });
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add New Bugs**: Create a new intentional bug and document it in the cheatsheet
2. **Improve Tests**: Add more comprehensive Playwright tests
3. **Enhance Documentation**: Improve the README or add tutorials
4. **Fix Design Issues**: Make the site look more professional

### Guidelines
- Each bug should have a unique `data-bug-id` attribute
- Add comments in code marking where bugs are (for learning purposes)
- Update the cheatsheet with new bugs
- Add corresponding Playwright tests

## 📄 License

MIT License - feel free to use this project for training and educational purposes.

## 🔗 Links

- [Cheat Sheet](cheatsheet.html)
- [Playwright Documentation](https://playwright.dev)
- [Report Issues](https://github.com/JakubTomczynski/buggy-page/issues)
