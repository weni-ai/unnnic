export const validateItem = (item) => {
  const { label, children } = item;
  const hasObrigatoryProps = !!label.trim();

  if (!hasObrigatoryProps) {
    throw new Error('Each item in "items" must have "label".');
  }

  if (children && Array.isArray(children)) {
    children.forEach(validateItem);
  }

  return true;
};

export const validateItems = (items) => {
  if (!items?.[0]) {
    throw new Error('Items property cannot be an empty array.');
  }

  items.forEach(validateItem);

  return true;
};
