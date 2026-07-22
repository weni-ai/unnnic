/**
 * Decodes HTML entities (`&lt;` → `<`, `&gt;` → `>`, etc.).
 * @param {string} input
 * @returns {string}
 */
export function escapeHtml(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/<\/?[a-zA-Z]+\b[^>]*>/g, '');
}

/**
 * Sanitizes HTML by removing disallowed tags and unsafe attributes.
 * @param {string} input
 * @param {Array<string>} allowedTags - List of allowed HTML tags.
 * @returns {string}
 */
export function sanitizeHtml(input, allowedTags = []) {
  if (typeof input !== 'string') return '';

  // Decodes HTML entities (&lt;, &gt;, &amp;)
  input = escapeHtml(input);

  // Removes **only** real HTML tags
  input = input.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tagName) => {
    return allowedTags.includes(tagName.toLowerCase()) ? match : '';
  });

  return input;
}

/**
 * Fully sanitizes a string by applying multiple layers of security:
 * 1. `sanitizeHtml` removes disallowed tags and attributes.
 * 2. `escapeHtml` ensures no encoded characters remain and removes any remaining tags.
 *
 * @param {string} input
 * @param {Array<string>} allowedTags - List of allowed HTML tags.
 * @returns {string}
 */
export function fullySanitize(input, allowedTags = []) {
  if (typeof input !== 'string') return '';

  let sanitizedInput = sanitizeHtml(input, allowedTags);

  return escapeHtml(sanitizedInput);
}

/**
 * Validates and sanitizes input text.
 * @param {string} input - The input string to validate.
 * @param {Array<string>} allowedTags - List of allowed HTML tags.
 * @returns {{ isValid: boolean, sanitized: string, errors: string[] }} - Validation result.
 */
export function validateInput(input, allowedTags = []) {
  const errors = [];

  if (typeof input !== 'string') {
    errors.push('Input must be a string.');
    return { isValid: false, sanitized: '', errors };
  }

  const sanitized = fullySanitize(input, allowedTags);

  if (sanitized !== input) {
    errors.push(
      'Some HTML tags or attributes were removed for security reasons.',
    );
  }

  return {
    isValid: errors.length === 0,
    sanitized,
    errors,
  };
}
