import {
  format as dateFnsFormat,
  isValid,
  parse as dateFnsParse,
} from 'date-fns';

import dayjs from '@/utils/date';

export type DateInput = string | Date;

export type FormatDateOptions = {
  parseFormat?: string;
  useDateFns?: boolean;
};

function toDateFnsFormatPattern(dayjsPattern: string): string {
  return dayjsPattern.replaceAll('YYYY', 'yyyy').replaceAll('DD', 'dd');
}

// DatePicker emits unpadded values like "9-21-2026". Padded tokens (MM/DD)
// fail to parse those in dayjs; unpadded tokens still accept "09-21-2026".
function toFlexibleDayjsParsePattern(dayjsPattern: string): string {
  return dayjsPattern.replaceAll('DD', 'D').replaceAll('MM', 'M');
}

function toDateFnsParsePattern(dayjsPattern: string): string {
  return toFlexibleDayjsParsePattern(dayjsPattern)
    .replaceAll('YYYY', 'yyyy')
    .replaceAll('D', 'd');
}

export function formatWithDayjs(
  value: DateInput,
  outputFormat: string,
  parseFormat?: string,
): string {
  const parsed =
    parseFormat && typeof value === 'string'
      ? dayjs(value, toFlexibleDayjsParsePattern(parseFormat))
      : dayjs(value);
  return parsed.format(outputFormat);
}

export function formatWithDateFns(
  value: DateInput,
  outputFormat: string,
  parseFormat?: string,
): string {
  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else if (parseFormat) {
    date = dateFnsParse(value, toDateFnsParsePattern(parseFormat), new Date());
  } else {
    date = new Date(value);
  }

  if (!isValid(date)) {
    return 'Invalid Date';
  }

  return dateFnsFormat(date, toDateFnsFormatPattern(outputFormat));
}

export function formatDate(
  value: DateInput,
  outputFormat: string,
  options: FormatDateOptions = {},
): string {
  const { parseFormat, useDateFns = false } = options;

  return useDateFns
    ? formatWithDateFns(value, outputFormat, parseFormat)
    : formatWithDayjs(value, outputFormat, parseFormat);
}
