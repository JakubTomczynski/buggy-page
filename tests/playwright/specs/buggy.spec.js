/**
 * Buggy Page - Playwright Test Suite
 * 
 * This test file demonstrates how to test the various bugs in the Buggy Page training site.
 * Some tests are designed to PASS (detecting the bug correctly)
 * Some tests are designed to FAIL (demonstrating the bug)
 * 
 * Bug IDs correspond to the cheatsheet.html documentation
 */

const { test, expect } = require('@playwright/test');

// ============================================================
// 🟢 EASY BUGS
// ============================================================

test.describe('Easy Bugs', () => {
  
  /**
   * BUG-EASY-01: Broken link leads to 404
   * This test PASSES by detecting the broken link
   */
  test('BUG-EASY-01: should detect broken link to About page', async ({ page }) => {
    await page.goto('/pages/links.html');
    
    // Find the About Page link
    const aboutLink = page.locator('a:has-text("About Page")');
    await expect(aboutLink).toBeVisible();
    
    // Get the href and verify it leads to a non-existent page
    const href = await aboutLink.getAttribute('href');
    expect(href).toBe('about.html');
    
    // Navigate and verify 404 (page not found)
    await aboutLink.click();
    await expect(page).toHaveURL(/about\.html/);
    // The page should show 404 or not exist
  });

  /**
   * BUG-EASY-02: Missing alt text on images
   * This test PASSES by detecting images without proper alt text
   */
  test('BUG-EASY-02: should detect images missing alt text', async ({ page }) => {
    await page.goto('/');
    
    // Find image with data-bug-id
    const buggyImage = page.locator('[data-bug-id="BUG-EASY-02"]');
    await expect(buggyImage).toBeVisible();
    
    // Verify alt text is missing
    const altText = await buggyImage.getAttribute('alt');
    expect(altText).toBeNull(); // Bug detected: no alt attribute
  });

  /**
   * BUG-EASY-03: Typo in button text
   * This test PASSES by detecting the typo
   */
  test('BUG-EASY-03: should detect typo in button text', async ({ page }) => {
    await page.goto('/pages/buttons.html');
    
    // Look for the typo "Sbumit" instead of "Submit"
    const typoButton = page.locator('button:has-text("Sbumit")');
    await expect(typoButton).toBeVisible();
    
    // This proves the bug exists - button has typo
  });

  /**
   * BUG-EASY-04: Wrong placeholder text
   * This test PASSES by detecting wrong placeholder
   */
  test('BUG-EASY-04: should detect wrong placeholder in email field', async ({ page }) => {
    await page.goto('/pages/forms.html');
    
    const emailInput = page.locator('[data-bug-id="BUG-EASY-04"]');
    await expect(emailInput).toBeVisible();
    
    // Get placeholder text
    const placeholder = await emailInput.getAttribute('placeholder');
    
    // Bug: placeholder says "phone number" but field is for email
    expect(placeholder).toContain('phone'); // Detects the bug
  });

  /**
   * BUG-EASY-05: Visible Lorem Ipsum text
   * This test PASSES by detecting Lorem Ipsum
   */
  test('BUG-EASY-05: should detect visible Lorem Ipsum text', async ({ page }) => {
    await page.goto('/');
    
    const loremText = page.locator('[data-bug-id="BUG-EASY-05"]');
    await expect(loremText).toBeVisible();
    
    const text = await loremText.textContent();
    expect(text).toContain('Lorem ipsum'); // Bug detected: Lorem ipsum visible
  });

});

// ============================================================
// 🟡 MEDIUM BUGS
// ============================================================

test.describe('Medium Bugs', () => {

  /**
   * BUG-MEDIUM-01: Form accepts invalid email format
   * This test PASSES by proving the form accepts invalid emails
   */
  test('BUG-MEDIUM-01: should accept invalid email format (bug)', async ({ page }) => {
    await page.goto('/pages/forms.html');
    
    const emailInput = page.locator('#email-input');
    const submitBtn = page.locator('#email-form button[type="submit"]');
    const result = page.locator('#email-result');
    
    // Enter an invalid email (just has @, no domain)
    await emailInput.fill('invalid@');
    await submitBtn.click();
    
    // Bug: form accepts this invalid email
    await expect(result).toContainText('Email accepted');
  });

  /**
   * BUG-MEDIUM-02: Required field not actually required
   * This test PASSES by proving required field can be empty
   */
  test('BUG-MEDIUM-02: should allow empty required field (bug)', async ({ page }) => {
    await page.goto('/pages/forms.html');
    
    const submitBtn = page.locator('#required-form button[type="submit"]');
    const result = page.locator('#required-result');
    
    // Submit without filling the required field
    await submitBtn.click();
    
    // Bug: form submits successfully even though field is empty
    await expect(result).toContainText('submitted successfully');
  });

  /**
   * BUG-MEDIUM-03: Wrong success message
   * This test PASSES by detecting wrong message
   */
  test('BUG-MEDIUM-03: should show wrong success message (bug)', async ({ page }) => {
    await page.goto('/pages/forms.html');
    
    const nameInput = page.locator('#contact-name');
    const messageInput = page.locator('#contact-message');
    const submitBtn = page.locator('#wrong-msg-form button[type="submit"]');
    const result = page.locator('#wrong-msg-result');
    
    await nameInput.fill('John Doe');
    await messageInput.fill('Test message');
    await submitBtn.click();
    
    // Bug: shows "Password reset" message for contact form
    await expect(result).toContainText('Password reset');
  });

  /**
   * BUG-MEDIUM-04: Dropdown has duplicate options
   * This test PASSES by detecting duplicate options
   */
  test('BUG-MEDIUM-04: should have duplicate dropdown options (bug)', async ({ page }) => {
    await page.goto('/pages/forms.html');
    
    const dropdown = page.locator('#country-select');
    
    // Get all options
    const options = await dropdown.locator('option').allTextContents();
    
    // Count occurrences of "United States"
    const usCount = options.filter(opt => opt === 'United States').length;
    
    // Bug: United States appears twice
    expect(usCount).toBe(2);
  });

  /**
   * BUG-MEDIUM-05: Counter increments by 2 instead of 1
   * This test FAILS because it expects increment of 1
   */
  test('BUG-MEDIUM-05: counter should increment by 1 (will fail)', async ({ page }) => {
    await page.goto('/');
    
    const counter = page.locator('#main-counter');
    const incrementBtn = page.locator('#increment-btn');
    
    // Initial value should be 0
    await expect(counter).toHaveText('0');
    
    // Click once
    await incrementBtn.click();
    
    // Bug: This will fail because counter shows 2, not 1
    await expect(counter).toHaveText('1');
  });

  /**
   * BUG-MEDIUM-06: Hidden element that should be visible
   * This test PASSES by detecting the hidden element
   */
  test('BUG-MEDIUM-06: should detect hidden special offers section (bug)', async ({ page }) => {
    await page.goto('/');
    
    const hiddenSection = page.locator('[data-bug-id="BUG-MEDIUM-06"]');
    
    // Bug: element should be visible but is hidden
    await expect(hiddenSection).toBeHidden();
  });

});

// ============================================================
// 🟠 HARD BUGS
// ============================================================

test.describe('Hard Bugs', () => {

  /**
   * BUG-HARD-01: Race condition - button works after delay
   * This test demonstrates the timing issue
   */
  test('BUG-HARD-01: button should not work immediately (timing bug)', async ({ page }) => {
    await page.goto('/pages/buttons.html');
    
    const delayedBtn = page.locator('#delayed-btn');
    const result = page.locator('#delayed-result');
    
    // Click immediately (before 2 second delay)
    await delayedBtn.click();
    
    // Bug: button doesn't work yet, shows "Not ready"
    await expect(result).toContainText('Not ready');
  });

  /**
   * BUG-HARD-01: Same button works AFTER waiting
   * This test PASSES when waiting appropriately
   */
  test('BUG-HARD-01: button works after 2 second delay', async ({ page }) => {
    await page.goto('/pages/buttons.html');
    
    const delayedBtn = page.locator('#delayed-btn');
    const result = page.locator('#delayed-result');
    
    // Wait for the button to become ready
    await page.waitForTimeout(2500);
    await delayedBtn.click();
    
    // Now it works
    await expect(result).toContainText('Action completed');
  });

  /**
   * BUG-HARD-02: Dynamic IDs change on refresh
   * This test shows IDs are unpredictable
   */
  test('BUG-HARD-02: should have dynamic IDs that change', async ({ page }) => {
    await page.goto('/pages/buttons.html');
    
    // Get the first dynamic button's ID
    const dynamicBtn = page.locator('.dynamic-id').first();
    const id1 = await dynamicBtn.getAttribute('id');
    
    // Refresh the page
    await page.reload();
    
    // Get the ID again
    const id2 = await page.locator('.dynamic-id').first().getAttribute('id');
    
    // Bug: IDs are different after refresh
    expect(id1).not.toBe(id2);
  });

  /**
   * BUG-HARD-03: Viewport dependent button
   * This test shows button is disabled on mobile viewport
   */
  test('BUG-HARD-03: button disabled on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/pages/buttons.html');
    
    const viewportBtn = page.locator('.viewport-btn');
    
    // Button should have reduced opacity on mobile
    const opacity = await viewportBtn.evaluate(el => 
      window.getComputedStyle(el).opacity
    );
    
    // Bug: button is faded/disabled on mobile
    expect(parseFloat(opacity)).toBe(0.5);
  });

  /**
   * BUG-HARD-04: Form clears data on error
   * This test demonstrates the data loss bug
   */
  test('BUG-HARD-04: form clears all data on validation error (bug)', async ({ page }) => {
    await page.goto('/pages/forms.html');
    
    const username = page.locator('#clear-username');
    const email = page.locator('#clear-email');
    const phone = page.locator('#clear-phone');
    const submitBtn = page.locator('#clear-form button[type="submit"]');
    
    // Fill the form
    await username.fill('testuser');
    await email.fill('test@example.com');
    await phone.fill('123'); // Invalid phone (not 10 digits)
    
    // Submit
    await submitBtn.click();
    
    // Bug: all fields are cleared after error
    await expect(username).toHaveValue('');
    await expect(email).toHaveValue('');
  });

  /**
   * BUG-HARD-05: Infinite scroll breaks after 3 loads
   * This test demonstrates the breaking behavior
   */
  test('BUG-HARD-05: infinite scroll breaks after 3 loads', async ({ page }) => {
    await page.goto('/pages/buttons.html');
    
    const loadMore = page.locator('#load-more');
    
    // Click load more 4 times
    for (let i = 0; i < 4; i++) {
      await loadMore.click();
      await page.waitForTimeout(100);
    }
    
    // Bug: button should be disabled and show error
    await expect(loadMore).toHaveText(/Error/);
  });

});

// ============================================================
// 🔴 EXPERT BUGS
// ============================================================

test.describe('Expert Bugs', () => {

  /**
   * BUG-EXPERT-01: Flaky element
   * This test demonstrates flakiness (may pass or fail randomly)
   */
  test('BUG-EXPERT-01: flaky button may fail randomly', async ({ page }) => {
    await page.goto('/pages/buttons.html');
    
    const flakyBtn = page.locator('#flaky-btn');
    const result = page.locator('#flaky-result');
    
    // Click the flaky button
    await flakyBtn.click();
    
    // This might show success or failure randomly
    const text = await result.textContent();
    console.log('Flaky result:', text);
    
    // We just verify the button responds
    await expect(result).not.toBeEmpty();
  });

  /**
   * BUG-EXPERT-03: Shadow DOM element
   * This test shows how to interact with Shadow DOM
   */
  test('BUG-EXPERT-03: shadow DOM button only works on second click', async ({ page }) => {
    await page.goto('/pages/buttons.html');
    
    // Wait for shadow DOM to be attached
    await page.waitForSelector('#shadow-host');
    
    // Access shadow DOM elements using evaluate
    const shadowInput = page.locator('#shadow-host').locator('input');
    const shadowBtn = page.locator('#shadow-host').locator('button');
    
    // Fill input in shadow DOM
    await shadowInput.fill('Hello');
    
    // First click - bug: shows "Processing..."
    await shadowBtn.click();
    
    // Check result in shadow DOM
    const result1 = await page.evaluate(() => {
      const host = document.getElementById('shadow-host');
      return host.shadowRoot.getElementById('shadow-result').textContent;
    });
    expect(result1).toContain('Processing');
    
    // Second click - now shows the value
    await shadowBtn.click();
    
    const result2 = await page.evaluate(() => {
      const host = document.getElementById('shadow-host');
      return host.shadowRoot.getElementById('shadow-result').textContent;
    });
    expect(result2).toContain('Hello');
  });

  /**
   * BUG-EXPERT-05: LocalStorage corruption
   * This test demonstrates data corruption with special characters
   */
  test('BUG-EXPERT-05: localStorage corrupts with special characters', async ({ page }) => {
    await page.goto('/pages/forms.html');
    
    const input = page.locator('#storage-input');
    const saveBtn = page.locator('#save-storage');
    const loadBtn = page.locator('#load-storage');
    const result = page.locator('#storage-result');
    
    // Save data with special characters
    await input.fill('<script>alert("xss")</script>');
    await saveBtn.click();
    
    // Try to load it
    await loadBtn.click();
    
    // Bug: data is corrupted
    await expect(result).toContainText('corrupted');
  });

  /**
   * BUG-EXPERT-06: Event listener fires on second click only
   * This test demonstrates the double-click bug
   */
  test('BUG-EXPERT-06: event only fires on second click', async ({ page }) => {
    await page.goto('/pages/buttons.html');
    
    const btn = page.locator('#double-click-btn');
    const result = page.locator('#double-click-result');
    
    // First click - does nothing
    await btn.click();
    await expect(result).toHaveText('');
    
    // Second click - now it works
    await btn.click();
    await expect(result).toContainText('Action triggered');
  });

});

// ============================================================
// EXAMPLE: Testing with data-bug-id attributes
// ============================================================

test.describe('Using data-bug-id for reliable selection', () => {
  
  test('should select elements by data-bug-id attribute', async ({ page }) => {
    await page.goto('/');
    
    // Using data-bug-id is more reliable than text or CSS selectors
    const counterSection = page.locator('[data-bug-id="BUG-MEDIUM-05"]');
    await expect(counterSection).toBeVisible();
    
    // Find bug element and verify it exists
    const loremBug = page.locator('[data-bug-id="BUG-EASY-05"]');
    await expect(loremBug).toBeVisible();
  });

});
