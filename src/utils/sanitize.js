// src/utils/sanitize.js

/**
 * @param {string} input 
 * @returns {string} 
 */
export function escapeHtml(input) {
    if (typeof input !== 'string') return '';
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * @param {string} input
 * @returns {string}
 */
export function stripHtml(input) {
    if (typeof input !== 'string') return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;
    return tempDiv.textContent || '';
}

/**
 * @param {string} input 
 * @param {Array<string>} allowedTags 
 * @returns {string} 
 */
export function sanitizeHtml(input, allowedTags = []) {
    if (typeof input !== 'string') return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;

    const elements = tempDiv.getElementsByTagName('*');
    for (let i = elements.length - 1; i >= 0; i--) {
        if (!allowedTags.includes(elements[i].nodeName.toLowerCase())) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    }

    return tempDiv.innerHTML;
}
