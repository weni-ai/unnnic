import { describe, expect, it } from 'vitest';

import {
  formatDate,
  formatWithDateFns,
  formatWithDayjs,
} from '@/utils/formatDate';

describe('formatDate helpers', () => {
  it('formats ISO dates to input format with dayjs', () => {
    expect(formatWithDayjs('2025-01-10', 'MM-DD-YYYY', 'YYYY-MM-DD')).toBe(
      '01-10-2025',
    );
  });

  it('formats ISO dates to input format with date-fns using dayjs tokens', () => {
    expect(formatWithDateFns('2025-01-10', 'MM-DD-YYYY', 'YYYY-MM-DD')).toBe(
      '01-10-2025',
    );
  });

  it('formats picker dates to MM DD YYYY with both libraries', () => {
    expect(formatWithDayjs('2025-01-10', 'MM DD YYYY', 'YYYY-MM-DD')).toBe(
      '01 10 2025',
    );
    expect(formatWithDateFns('2025-01-10', 'MM DD YYYY', 'YYYY-MM-DD')).toBe(
      '01 10 2025',
    );
  });

  it('parses MM-DD-YYYY into YYYY-MM-DD with both libraries', () => {
    expect(formatWithDayjs('01-10-2025', 'YYYY-MM-DD', 'MM-DD-YYYY')).toBe(
      '2025-01-10',
    );
    expect(formatWithDateFns('01-10-2025', 'YYYY-MM-DD', 'MM-DD-YYYY')).toBe(
      '2025-01-10',
    );
  });

  it('parses unpadded DatePicker values like 9-21-2026 with both libraries', () => {
    expect(formatWithDayjs('9-21-2026', 'YYYY-MM-DD', 'MM-DD-YYYY')).toBe(
      '2026-09-21',
    );
    expect(formatWithDateFns('9-21-2026', 'YYYY-MM-DD', 'MM-DD-YYYY')).toBe(
      '2026-09-21',
    );
    expect(formatWithDayjs('9-5-2026', 'YYYY-MM-DD', 'MM-DD-YYYY')).toBe(
      '2026-09-05',
    );
    expect(formatWithDateFns('9-5-2026', 'YYYY-MM-DD', 'MM-DD-YYYY')).toBe(
      '2026-09-05',
    );
  });

  it('dispatches to dayjs by default and to date-fns when useDateFns is true', () => {
    expect(
      formatDate('2025-01-10', 'MM-DD-YYYY', { parseFormat: 'YYYY-MM-DD' }),
    ).toBe('01-10-2025');

    expect(
      formatDate('2025-01-10', 'MM-DD-YYYY', {
        parseFormat: 'YYYY-MM-DD',
        useDateFns: true,
      }),
    ).toBe('01-10-2025');
  });

  it('formats Date objects with both libraries', () => {
    const date = new Date(2025, 0, 10);

    expect(formatWithDayjs(date, 'DDMMYYYY')).toBe('10012025');
    expect(formatWithDateFns(date, 'DDMMYYYY')).toBe('10012025');
    expect(formatDate(date, 'DDMMYYYY', { useDateFns: true })).toBe('10012025');
  });
});
