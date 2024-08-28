export const validateItem = (item) => {
  const { label, children } = item;
  const hasObrigatoryProps = !!label.trim();
  if (!hasObrigatoryProps) {
    throw new Error('Each item in "items" must have "label".');
  }

  if (children && Array.isArray(children)) {
    children.forEach(validateItem);
  }
};

export const validateItems = (items) => {
  if (!Array.isArray(items)) {
    throw new Error('Property items needs to be a padded array.');
  }

  if (!items?.[0]) {
    throw new Error('Items property cannot be an empty array.');
  }

  items.forEach(validateItem);

  return true;
};
