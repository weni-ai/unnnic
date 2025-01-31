/**
 * Removes all HTML tags while preserving plain text content.
 * @param {string} input
 * @returns {string}
 */
export function escapeHtml(input) {
    if (typeof input !== 'string') return '';

    // Remove all HTML tags while keeping the text content
    return input.replace(/<[^>]*>/g, '');
}

/**
 * Checks if a URL is safe (http, https, mailto).
 * @param {string} url
 * @returns {boolean}
 */
function isSafeUrl(url) {
    try {
        const parsedUrl = new URL(url);
        return ['http:', 'https:', 'mailto:'].includes(parsedUrl.protocol);
    } catch (e) {
        return false;
    }
}

/**
 * Sanitizes HTML by allowing only certain tags and removing dangerous attributes.
 * @param {string} input
 * @param {Array<string>} allowedTags
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeHtml(input, allowedTags = [], maxLength = 1000) {
    if (typeof input !== 'string') return '';

    // Limit text length
    if (input.length > maxLength) {
        input = input.substring(0, maxLength);
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;

    const elements = tempDiv.getElementsByTagName('*');
    for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];

        // Remove disallowed tags
        if (!allowedTags.includes(el.nodeName.toLowerCase())) {
            el.parentNode.removeChild(el);
            continue;
        }

        // Remove dangerous attributes
        const attributes = el.attributes;
        for (let j = attributes.length - 1; j >= 0; j--) {
            const attrName = attributes[j].name.toLowerCase();
            const attrValue = attributes[j].value;

            if (attrName.startsWith('on') || attrName === 'srcdoc') {
                el.removeAttribute(attrName);
            } else if (['href', 'src'].includes(attrName) && !isSafeUrl(attrValue)) {
                el.removeAttribute(attrName);
            }
        }
    }

    return tempDiv.innerHTML;
}
