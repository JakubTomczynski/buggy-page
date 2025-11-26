/**
 * Buggy Page - JavaScript
 */

// Counter functionality
document.addEventListener('DOMContentLoaded', function() {
    const incrementBtn = document.getElementById('increment-btn');
    const counterDisplay = document.getElementById('main-counter');
    
    if (incrementBtn && counterDisplay) {
        let count = 0;
        incrementBtn.addEventListener('click', function() {
            count += 2;
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

// Dynamic IDs that change on page refresh
function initDynamicIds() {
    const dynamicElements = document.querySelectorAll('.dynamic-id');
    dynamicElements.forEach(el => {
        const randomId = 'element-' + Math.random().toString(36).substr(2, 9);
        el.id = randomId;
        el.setAttribute('data-dynamic-id', randomId);
    });
}

// Flaky element
function initFlakyElement() {
    const flakyBtn = document.getElementById('flaky-btn');
    const flakyResult = document.getElementById('flaky-result');
    
    if (flakyBtn && flakyResult) {
        flakyBtn.addEventListener('click', function(e) {
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

// Delayed button
function initDelayedButton() {
    const delayedBtn = document.getElementById('delayed-btn');
    const delayedResult = document.getElementById('delayed-result');
    
    if (delayedBtn && delayedResult) {
        let isReady = false;
        
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

// Shadow DOM element
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
        
        const shadowBtn = shadow.getElementById('shadow-btn');
        const shadowInput = shadow.getElementById('shadow-input');
        const shadowResult = shadow.getElementById('shadow-result');
        
        let clickCount = 0;
        shadowBtn.addEventListener('click', function() {
            clickCount++;
            if (clickCount % 2 === 1) {
                shadowResult.textContent = 'Processing...';
            } else {
                shadowResult.textContent = 'Value: ' + shadowInput.value;
            }
        });
    }
}

// Infinite scroll
function initInfiniteScroll() {
    const scrollContainer = document.getElementById('scroll-container');
    const loadMore = document.getElementById('load-more');
    
    if (scrollContainer && loadMore) {
        let loadCount = 0;
        const maxLoads = 3;
        
        loadMore.addEventListener('click', function() {
            loadCount++;
            
            if (loadCount > maxLoads) {
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

// iFrame timing
function initIframeTiming() {
    const iframeContainer = document.getElementById('iframe-container');
    
    if (iframeContainer) {
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

// LocalStorage bug
function initLocalStorageBug() {
    const storageInput = document.getElementById('storage-input');
    const saveBtn = document.getElementById('save-storage');
    const loadBtn = document.getElementById('load-storage');
    const storageResult = document.getElementById('storage-result');
    
    if (storageInput && saveBtn && loadBtn && storageResult) {
        saveBtn.addEventListener('click', function() {
            const value = storageInput.value;
            
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

// Double click listener
function initDoubleClickListener() {
    const doubleClickBtn = document.getElementById('double-click-btn');
    const doubleClickResult = document.getElementById('double-click-result');
    
    if (doubleClickBtn && doubleClickResult) {
        let firstClick = true;
        
        doubleClickBtn.addEventListener('click', function() {
            if (firstClick) {
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

// Memory leak demo
function initMemoryLeak() {
    const leakBtn = document.getElementById('memory-leak-btn');
    const leakStatus = document.getElementById('leak-status');
    
    if (leakBtn && leakStatus) {
        const leakedData = [];
        let clickCount = 0;
        
        leakBtn.addEventListener('click', function() {
            clickCount++;
            
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
    // Email form handler
    const emailForm = document.getElementById('email-form');
    const emailInput = document.getElementById('email-input');
    const emailResult = document.getElementById('email-result');
    
    if (emailForm && emailInput && emailResult) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = emailInput.value;
            
            if (email.includes('@')) {
                emailResult.textContent = 'Email accepted!';
                emailResult.className = 'success-message';
            } else {
                emailResult.textContent = 'Invalid email format';
                emailResult.className = 'error-message';
            }
        });
    }
    
    // Required field form handler
    const requiredForm = document.getElementById('required-form');
    const requiredResult = document.getElementById('required-result');
    
    if (requiredForm && requiredResult) {
        requiredForm.addEventListener('submit', function(e) {
            e.preventDefault();
            requiredResult.textContent = 'Form submitted successfully!';
            requiredResult.className = 'success-message';
        });
    }
    
    // Wrong message form handler
    const wrongMsgForm = document.getElementById('wrong-msg-form');
    const wrongMsgResult = document.getElementById('wrong-msg-result');
    
    if (wrongMsgForm && wrongMsgResult) {
        wrongMsgForm.addEventListener('submit', function(e) {
            e.preventDefault();
            wrongMsgResult.textContent = 'Password reset email sent!';
            wrongMsgResult.className = 'success-message';
        });
    }
    
    // Registration form handler
    const clearForm = document.getElementById('clear-form');
    const clearResult = document.getElementById('clear-result');
    const clearUsername = document.getElementById('clear-username');
    const clearEmail = document.getElementById('clear-email');
    const clearPhone = document.getElementById('clear-phone');
    
    if (clearForm && clearResult) {
        clearForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phone = clearPhone ? clearPhone.value : '';
            if (!/^\d{10}$/.test(phone)) {
                clearResult.textContent = 'Invalid phone number (must be 10 digits)';
                clearResult.className = 'error-message';
                
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
