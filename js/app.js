/**
 * Main application logic
 * Handles the form, generates text, and manages the clipboard
 */
document.addEventListener('DOMContentLoaded', () => {
    const btnGenerate = document.getElementById('btnGenerate');
    const btnReset = document.getElementById('btnReset');

    if(btnGenerate) {
        btnGenerate.addEventListener('click', generateRequestText);
    }

    if(btnReset) {
        btnReset.addEventListener('click', () => {
            // Simply reloads the page and clears the form
            location.reload();
        });
    }
});

/**
 * Takes form data and generates the formal request
 */
function generateRequestText() {
    // Get values or use placeholders
    const name = document.getElementById('fullName').value.trim() || '[YOUR NAME]';
    const email = document.getElementById('email').value.trim() || '[YOUR EMAIL]';
    const phone = document.getElementById('phone').value.trim() || '[YOUR PHONE]';
    const address = document.getElementById('address').value.trim() || '[YOUR ADDRESS]';

    // Request template
    const template = `To the Privacy Officer / Data Protection Officer,

I am writing to formally request the immediate deletion of all personal data associated with me from your databases, systems, and any third-party partners you share data with, pursuant to my rights under the General Data Protection Regulation (GDPR - Article 17 Right to erasure) and the California Consumer Privacy Act (CCPA).

I demand that you permanently remove my records and opt me out of any future data collection or sale. 

My identifying information to be removed is as follows:
- Full Name: ${name}
- Email Address: ${email}
- Phone Number: ${phone}
- Associated Address: ${address}

Please consider this a blanket request for all affiliated companies under your parent organization. I expect written confirmation that this action has been completed within the legally mandated timeframe.

Sincerely,

${name}`;

    // Insert text into textarea
    document.getElementById('generatedText').value = template;

    // Switch section visibility
    document.getElementById('formSection').classList.remove('active-section');
    document.getElementById('formSection').classList.add('hidden-section');

    document.getElementById('resultSection').classList.remove('hidden-section');
    document.getElementById('resultSection').classList.add('active-section');
}

/**
 * Universal function to copy from input/textarea elements
 */
window.copyValue = function(elementId, successMessage) {
    const element = document.getElementById(elementId);
    if (!element) return;

    // Select text (fallback for older browsers)
    element.select();

    // Modern Clipboard API
    navigator.clipboard.writeText(element.value)
        .then(() => {
            alert(successMessage);
        })
        .catch(err => {
            console.error('Copy error: ', err);
            // Fallback
            document.execCommand('copy');
            alert(successMessage);
        });
};

/**
 * Special function to copy text from a div element (email list)
 */
window.copyEmails = function() {
    const emailsDiv = document.getElementById('brokerEmails');
    if (!emailsDiv) return;

    const textToCopy = emailsDiv.innerText.trim();

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert('Emails copied! Paste them into the BCC (Blind Carbon Copy) field in your email client.');
        })
        .catch(err => {
            console.error('Email copy error: ', err);
            alert('Copy failed. Please select and copy the text manually.');
        });
};