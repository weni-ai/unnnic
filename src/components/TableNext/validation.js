const validateHeader = (header) => {
  const isContentString = typeof header.content !== 'string';
  if (isContentString) {
    throw new Error('Each item in "headers" must have "content" as a string.');
  }

  const isSizeInvalid =
    'size' in header &&
    ((header.size !== 'auto' && typeof header.size !== 'number') ||
      header.size < 0);
  if (isSizeInvalid) {
    throw new Error(
      'Each item in "headers" that contains "size" must assign it as positive number or equals to "auto"',
    );
  }

  const isSortableBoolean =
    'isSortable' in header && typeof header.isSortable !== 'boolean';
  if (isSortableBoolean) {
    throw new Error(
      'Each item in "headers" that contains “isSortable” must assign it as boolean',
    );
  }
};

export const validateHeaders = (headers) => {
  if (!Array.isArray(headers)) {
    throw new Error('Property headers needs to be an array.');
  }

  headers.forEach(validateHeader);

  return true;
};

const validateRow = (cell) => {
  const isContentArray = !('content' in cell) || !Array.isArray(cell.content);
  if (isContentArray) {
    throw new Error('Each item in "rows" must have "content" as an array.');
  }

  const isLinkObject =
    'link' in cell &&
    typeof cell.link !== 'object' &&
    typeof cell.link !== 'undefined';
  if (isLinkObject) {
    throw new Error(
      'Each item in "rows" that contains “link” must assign it as object',
    );
  }

  const isLinkWithoutUrl = cell.link && !('url' in cell.link);
  if (isLinkWithoutUrl) {
    throw new Error('Each item in "rows" with "link" must contain "url".');
  }
};

export const validateRows = (rows) => {
  if (!Array.isArray(rows)) {
    throw new Error('Property rows needs to be an array.');
  }

  rows.forEach(validateRow);

  return true;
};
