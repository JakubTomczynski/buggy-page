/**
 * Buggy Page - JavaScript with Intentional Bugs
 * This file contains various bugs for QA training purposes
 */

// Counter functionality
// BUG-MEDIUM-05: Counter increments by 2 instead of 1
document.addEventListener('DOMContentLoaded', function() {
    const incrementBtn = document.getElementById('increment-btn');
    const counterDisplay = document.getElementById('main-counter');
    
    if (incrementBtn && counterDisplay) {
        let count = 0;
        incrementBtn.addEventListener('click', function() {
            count += 2; // BUG: Should be += 1
            counterDisplay.textContent = count;
        });
    }

    // Initialize dynamic ID elements
    initDynamicIds();
    
    // Initialize flaky element
    initFlakyElement();
    
    // Initialize delayed button
    initDelayedButton();
    
    // Initialize shadow DOM
    initShadowDOM();
    
    // Initialize infinite scroll
    initInfiniteScroll();
    
    // Initialize iframe timing
    initIframeTiming();
    
    // Initialize localStorage bug
    initLocalStorageBug();
    
    // Initialize double-click listener
    initDoubleClickListener();
    
    // Initialize memory leak demo
    initMemoryLeak();
    
    // Initialize form handlers
    initFormHandlers();
});

// BUG-HARD-02: Dynamic IDs that change on page refresh
function initDynamicIds() {
    const dynamicElements = document.querySelectorAll('.dynamic-id');
    dynamicElements.forEach(el => {
        const randomId = 'element-' + Math.random().toString(36).substr(2, 9);
        el.id = randomId;
        el.setAttribute('data-dynamic-id', randomId);
    });
}

// BUG-EXPERT-01: Flaky element - randomly fails ~30% of clicks
function initFlakyElement() {
    const flakyBtn = document.getElementById('flaky-btn');
    const flakyResult = document.getElementById('flaky-result');
    
    if (flakyBtn && flakyResult) {
        flakyBtn.addEventListener('click', function(e) {
            // 30% chance of failure
            if (Math.random() < 0.3) {
                e.preventDefault();
                e.stopPropagation();
                flakyResult.textContent = 'Click failed! Try again.';
                flakyResult.style.color = '#ef4444';
                return;
            }
            flakyResult.textContent = 'Click successful!';
            flakyResult.style.color = '#22c55e';
        });
    }
}

// BUG-HARD-01: Race condition - button only works after 2-second delay
function initDelayedButton() {
    const delayedBtn = document.getElementById('delayed-btn');
    const delayedResult = document.getElementById('delayed-result');
    
    if (delayedBtn && delayedResult) {
        let isReady = false;
        
        // Button only becomes functional after 2 seconds
        setTimeout(() => {
            isReady = true;
            delayedBtn.classList.add('ready');
        }, 2000);
        
        delayedBtn.addEventListener('click', function() {
            if (!isReady) {
                delayedResult.textContent = 'Not ready yet! Wait...';
                delayedResult.style.color = '#f59e0b';
                return;
            }
            delayedResult.textContent = 'Action completed!';
            delayedResult.style.color = '#22c55e';
        });
    }
}

// BUG-EXPERT-03: Element inside shadow DOM with bugs
function initShadowDOM() {
    const shadowHost = document.getElementById('shadow-host');
    
    if (shadowHost) {
        const shadow = shadowHost.attachShadow({ mode: 'open' });
        
        shadow.innerHTML = `
            <style>
                .shadow-content {
                    padding: 1rem;
                    background: #1e293b;
                    border-radius: 8px;
                }
                .shadow-btn {
                    padding: 0.75rem 1.5rem;
                    background: #4f46e5;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                }
                .shadow-input {
                    padding: 0.75rem;
                    margin-right: 0.5rem;
                    border: 1px solid #334155;
                    border-radius: 8px;
                    background: #0f172a;
                    color: white;
                }
                .shadow-result {
                    margin-top: 1rem;
                    color: #94a3b8;
                }
            </style>
            <div class="shadow-content" data-bug-id="BUG-EXPERT-03">
                <input type="text" class="shadow-input" id="shadow-input" placeholder="Type here">
                <button class="shadow-btn" id="shadow-btn">Submit</button>
                <div class="shadow-result" id="shadow-result"></div>
            </div>
        `;
        
        // BUG: Event listener doesn't properly update result on first click
        const shadowBtn = shadow.getElementById('shadow-btn');
        const shadowInput = shadow.getElementById('shadow-input');
        const shadowResult = shadow.getElementById('shadow-result');
        
        let clickCount = 0;
        shadowBtn.addEventListener('click', function() {
            clickCount++;
            // BUG: Only works properly on second click
            if (clickCount % 2 === 1) {
                shadowResult.textContent = 'Processing...';
            } else {
                shadowResult.textContent = 'Value: ' + shadowInput.value;
            }
        });
    }
}

// BUG-HARD-05: Infinite scroll that breaks after 3 loads
function initInfiniteScroll() {
    const scrollContainer = document.getElementById('scroll-container');
    const loadMore = document.getElementById('load-more');
    
    if (scrollContainer && loadMore) {
        let loadCount = 0;
        const maxLoads = 3; // Bug: breaks after 3 loads
        
        loadMore.addEventListener('click', function() {
            loadCount++;
            
            if (loadCount > maxLoads) {
                // BUG: After 3 loads, it throws an error and stops working
                loadMore.disabled = true;
                loadMore.textContent = 'Error: Cannot load more';
                loadMore.classList.add('btn-danger');
                console.error('Infinite scroll broke after', maxLoads, 'loads');
                return;
            }
            
            // Add more items
            for (let i = 0; i < 5; i++) {
                const item = document.createElement('div');
                item.className = 'scroll-item';
                item.textContent = `Loaded Item ${loadCount}-${i + 1}`;
                scrollContainer.appendChild(item);
            }
        });
    }
}

// BUG-EXPERT-04: iFrame with timing issues
function initIframeTiming() {
    const iframeContainer = document.getElementById('iframe-container');
    
    if (iframeContainer) {
        // BUG: iframe loads content with unpredictable delay
        const iframe = document.createElement('iframe');
        iframe.id = 'timing-iframe';
        iframe.setAttribute('data-bug-id', 'BUG-EXPERT-04');
        
        // Random delay between 1-3 seconds
        const delay = 1000 + Math.random() * 2000;
        
        setTimeout(() => {
            iframe.srcdoc = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { 
                            font-family: sans-serif; 
                            padding: 1rem; 
                            background: #0f172a; 
                            color: #f8fafc; 
                        }
                        button {
                            padding: 0.5rem 1rem;
                            background: #4f46e5;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    <p>iFrame Content Loaded (after ${Math.round(delay)}ms delay)</p>
                    <button onclick="parent.postMessage('iframe-clicked', '*')">Click Me in iFrame</button>
                </body>
                </html>
            `;
            iframeContainer.appendChild(iframe);
        }, delay);
    }
}

// BUG-EXPERT-05: LocalStorage that corrupts on certain inputs
function initLocalStorageBug() {
    const storageInput = document.getElementById('storage-input');
    const saveBtn = document.getElementById('save-storage');
    const loadBtn = document.getElementById('load-storage');
    const storageResult = document.getElementById('storage-result');
    
    if (storageInput && saveBtn && loadBtn && storageResult) {
        saveBtn.addEventListener('click', function() {
            const value = storageInput.value;
            
            // BUG: Corrupts data if input contains special characters
            if (value.includes('<') || value.includes('>') || value.includes('&')) {
                // Intentionally corrupt the data
                localStorage.setItem('buggy-data', '[CORRUPTED]' + btoa(value));
                storageResult.textContent = 'Data saved (but may be corrupted)';
                storageResult.style.color = '#f59e0b';
            } else {
                localStorage.setItem('buggy-data', value);
                storageResult.textContent = 'Data saved successfully';
                storageResult.style.color = '#22c55e';
            }
        });
        
        loadBtn.addEventListener('click', function() {
            const data = localStorage.getItem('buggy-data');
            if (data) {
                if (data.startsWith('[CORRUPTED]')) {
                    storageResult.textContent = 'Error: Data is corrupted!';
                    storageResult.style.color = '#ef4444';
                } else {
                    storageResult.textContent = 'Loaded: ' + data;
                    storageResult.style.color = '#22c55e';
                }
            } else {
                storageResult.textContent = 'No data found';
                storageResult.style.color = '#94a3b8';
            }
        });
    }
}

// BUG-EXPERT-06: Event listener that only fires on second click
function initDoubleClickListener() {
    const doubleClickBtn = document.getElementById('double-click-btn');
    const doubleClickResult = document.getElementById('double-click-result');
    
    if (doubleClickBtn && doubleClickResult) {
        let firstClick = true;
        
        doubleClickBtn.addEventListener('click', function() {
            if (firstClick) {
                // BUG: First click does nothing
                firstClick = false;
                doubleClickResult.textContent = '';
                return;
            }
            doubleClickResult.textContent = 'Action triggered!';
            doubleClickResult.style.color = '#22c55e';
            firstClick = true; // Reset for next pair
        });
    }
}

// BUG-EXPERT-02: Memory leak on repeated action
function initMemoryLeak() {
    const leakBtn = document.getElementById('memory-leak-btn');
    const leakStatus = document.getElementById('leak-status');
    
    if (leakBtn && leakStatus) {
        const leakedData = [];
        let clickCount = 0;
        
        leakBtn.addEventListener('click', function() {
            clickCount++;
            
            // BUG: Each click adds 1MB of data that never gets cleaned up
            const largeArray = new Array(1024 * 1024).fill('x');
            leakedData.push(largeArray);
            
            leakStatus.textContent = `Clicks: ${clickCount} | Memory leaked: ~${clickCount}MB`;
            
            if (clickCount >= 10) {
                leakStatus.textContent += ' (Warning: High memory usage!)';
                leakStatus.style.color = '#ef4444';
            }
        });
    }
}

// Form Handlers
function initFormHandlers() {
    // BUG-MEDIUM-01: Form accepts invalid email format
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email-input');
    const emailResult = document.getElementById('email-result');
    
    if (emailForm && emailInput && emailResult) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailInput.value;
            
            // BUG: Very weak email validation - accepts invalid formats
            if (email.includes('@')) {
                emailResult.textContent = 'Email accepted!';
                emailResult.className = 'success-message';
            } else {
                emailResult.textContent = 'Invalid email format';
                emailResult.className = 'error-message';
            }
        });
    }
    
    // BUG-MEDIUM-02: Required field not actually required
    const requiredForm = document.getElementById('required-form');
    const requiredResult = document.getElementById('required-result');
    
    if (requiredForm && requiredResult) {
        requiredForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // BUG: Doesn't check if required field is empty
            requiredResult.textContent = 'Form submitted successfully!';
            requiredResult.className = 'success-message';
        });
    }
    
    // BUG-MEDIUM-03: Button submits form but shows wrong success message
    const wrongMsgForm = document.getElementById('wrong-msg-form');
    const wrongMsgResult = document.getElementById('wrong-msg-result');
    
    if (wrongMsgForm && wrongMsgResult) {
        wrongMsgForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // BUG: Shows wrong message
            wrongMsgResult.textContent = 'Password reset email sent!'; // Wrong message for a contact form
            wrongMsgResult.className = 'success-message';
        });
    }
    
    // BUG-HARD-04: Form clears all data on validation error
    const clearForm = document.getElementById('clear-form');
    const clearResult = document.getElementById('clear-result');
    const clearUsername = document.getElementById('clear-username');
    const clearEmail = document.getElementById('clear-email');
    const clearPhone = document.getElementById('clear-phone');
    
    if (clearForm && clearResult) {
        clearForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate phone (must be 10 digits)
            const phone = clearPhone ? clearPhone.value : '';
            if (!/^\d{10}$/.test(phone)) {
                clearResult.textContent = 'Invalid phone number (must be 10 digits)';
                clearResult.className = 'error-message';
                
                // BUG: Clears ALL form data on error
                if (clearUsername) clearUsername.value = '';
                if (clearEmail) clearEmail.value = '';
                if (clearPhone) clearPhone.value = '';
                return;
            }
            
            clearResult.textContent = 'Form submitted successfully!';
            clearResult.className = 'success-message';
        });
    }
}

// Viewport dependent button (BUG-HARD-03)
// This is handled by CSS - button not clickable on small viewports

// Listen for iframe messages
window.addEventListener('message', function(event) {
    if (event.data === 'iframe-clicked') {
        const result = document.getElementById('iframe-result');
        if (result) {
            result.textContent = 'iFrame button was clicked!';
            result.style.color = '#22c55e';
        }
    }
});
