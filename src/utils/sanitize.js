// src/utils/sanitize.js

/**
 * Escapa caracteres perigosos no HTML para evitar XSS.
 * @param {string} input
 * @returns {string}
 */
export function escapeHtml(input) {
    if (typeof input !== 'string') return '';

    // Remove todas as tags HTML, preservando o conteúdo de texto puro
    return input.replace(/<[^>]*>/g, '');
}

/**
 * Remove todas as tags HTML para retornar texto puro.
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
 * Verifica se uma URL é segura (http, https, mailto).
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
 * Sanitiza o HTML permitindo apenas certas tags e removendo atributos perigosos.
 * @param {string} input
 * @param {Array<string>} allowedTags
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeHtml(input, allowedTags = [], maxLength = 1000) {
    if (typeof input !== 'string') return '';

    // Limitar o tamanho do texto
    if (input.length > maxLength) {
        input = input.substring(0, maxLength);
    }

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = input;

    const elements = tempDiv.getElementsByTagName('*');
    for (let i = elements.length - 1; i >= 0; i--) {
        const el = elements[i];

        // Remover tags não permitidas
        if (!allowedTags.includes(el.nodeName.toLowerCase())) {
            el.parentNode.removeChild(el);
            continue;
        }

        // Remover atributos perigosos
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
