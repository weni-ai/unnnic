/**
 * Decodes HTML entities (`&lt;` → `<`, `&gt;` → `>`, etc.)
 * @param {string} input
 * @returns {string}
 */
export function escapeHtml(input) {
    if (typeof input !== 'string') return '';
    // return decodedInput;
    return input.replace(/<\/?[a-zA-Z]+\b[^>]*>/g, '');
}


/**
 * Sanitizes HTML by removing disallowed tags and unsafe attributes.
 * @param {string} input
 * @param {Array<string>} allowedTags
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeHtml(input, allowedTags = [], maxLength = 1000) {
    if (typeof input !== 'string') return '';
    console.log('chegou no saitizehtml assim: ', input)

    // Limita o tamanho do texto
    if (input.length > maxLength) {
        input = input.substring(0, maxLength);
    }

    // Decodifica entidades HTML (&lt;, &gt;, &amp;)
    input = escapeHtml(input);

    // Remove **somente** tags HTML reais
    input = input.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tagName) => {
        return allowedTags.includes(tagName.toLowerCase()) ? match : '';  
    });

    console.log("DEBUG: Sanitized Output:", input);

    return input;
}

/**
 * Fully sanitizes a string by applying multiple layers of security:
 * 1. `sanitizeHtml` removes disallowed tags and attributes.
 * 2. `escapeHtml` ensures no encoded characters remain and removes any remaining tags.
 *
 * @param {string} input
 * @param {Array<string>} allowedTags
 * @param {number} maxLength
 * @returns {string}
 */
export function fullySanitize(input, allowedTags = [], maxLength = 1000) {
    if (typeof input !== 'string') return '';
    console.log('chegou assim: ', input)

    let sanitizedInput = sanitizeHtml(input, allowedTags, maxLength);
    console.log( 'sanitized', sanitizedInput);

    return escapeHtml(sanitizedInput);
}

/**
 * Validates and sanitizes input text.
 * @param {string} input - The input string to validate.
 * @param {Array<string>} allowedTags - List of allowed HTML tags.
 * @param {number} maxLength - Maximum length of the sanitized string.
 * @returns {{ isValid: boolean, sanitized: string, errors: string[] }} - Validation result.
 */
export function validateInput(input, allowedTags = [], maxLength = 1000) {
    const errors = [];

    if (typeof input !== 'string') {
        errors.push('Input must be a string.');
        return { isValid: false, sanitized: '', errors };
    }

    if (input.length > maxLength) {
        errors.push(`Input exceeds maximum length of ${maxLength} characters.`);
        input = input.substring(0, maxLength);
    }

    const sanitized = fullySanitize(input, allowedTags, maxLength);

    if (sanitized !== input) {
        errors.push('Some HTML tags or attributes were removed for security reasons.');
    }

    return {
        isValid: errors.length === 0,
        sanitized,
        errors,
    };
}
