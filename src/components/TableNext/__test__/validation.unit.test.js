import { describe, expect, it } from 'vitest';
import { validateHeaders, validateRows } from '../validation';

describe('TableNext props validations', () => {
  describe('validateHeaders', () => {
    it('should throw an error if headers is not an array', () => {
      expect(() => validateHeaders('not-an-array')).toThrow(
        'Property headers needs to be an array.',
      );
    });

    it('should throw an error if a header does not have "content" as a string', () => {
      const invalidHeaders = [{ content: 123 }];
      expect(() => validateHeaders(invalidHeaders)).toThrow(
        'Each item in "headers" must have "content" as a string.',
      );
    });

    it('should throw an error if a header has "size" that is not a positive number', () => {
      const invalidHeaders = [{ content: 'Header 1', size: -1 }];
      expect(() => validateHeaders(invalidHeaders)).toThrow(
        'Each item in "headers" that contains "size" must assign it as positive number',
      );
    });

    it('should throw an error if a header has "isSortable" that is not a boolean', () => {
      const invalidHeaders = [{ content: 'Header 1', isSortable: 123 }];
      expect(() => validateHeaders(invalidHeaders)).toThrow(
        'Each item in "headers" that contains “isSortable” must assign it as boolean',
      );
    });

    it('should pass validation for valid headers', () => {
      const validHeaders = [
        { content: 'Header 1', size: 1, isSortable: true },
        { content: 'Header 2', size: 2 },
      ];
      expect(validateHeaders(validHeaders)).toBe(true);
    });
  });

  describe('validateRows', () => {
    it('should throw an error if rows is not an array', () => {
      expect(() => validateRows('not-an-array')).toThrow(
        'Property rows needs to be an array.',
      );
    });

    it('should throw an error if a row does not have "content" as an array', () => {
      const invalidRows = [{ content: 'not-an-array' }];
      expect(() => validateRows(invalidRows)).toThrow(
        'Each item in "rows" must have "content" as an array.',
      );
    });

    it('should throw an error if a row has "link" but it is not an object or undefined', () => {
      const invalidRows = [{ content: ['Row 1'], link: 'not-an-object' }];
      expect(() => validateRows(invalidRows)).toThrow(
        'Each item in "rows" that contains “link” must assign it as object',
      );
    });

    it('should throw an error if a row has "link" but does not contain "url"', () => {
      const invalidRows = [{ content: ['Row 1'], link: { target: '_blank' } }];
      expect(() => validateRows(invalidRows)).toThrow(
        'Each item in "rows" with "link" must contain "url".',
      );
    });

    it('should throw an error if a row has "link" is undefined', () => {
      const invalidRows = [{ content: ['Row 1 Col 1', 'Row 1 Col 2'] }];
      expect(() => validateRows(invalidRows)).not.toThrow();
    });

    it('should pass validation for valid rows', () => {
      const validRows = [
        { content: ['Row 1 Col 1', 'Row 1 Col 2'] },
        { content: ['Row 2 Col 1', 'Row 2 Col 2'], link: { url: '#' } },
      ];
      expect(validateRows(validRows)).toBe(true);
    });
  });
});
