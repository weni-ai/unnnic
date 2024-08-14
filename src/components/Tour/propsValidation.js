const validateStep = (step) => {
  const { title, description, attachedElement, popoverPosition } = step;
  const hasObrigatoryProps =
    'title' in step &&
    'description' in step &&
    'attachedElement' in step &&
    'popoverPosition' in step;

  if (!hasObrigatoryProps) {
    throw new Error(
      'Each item in "steps" must have "title", "description", "attachedElement" and "popoverPosition".',
    );
  }

  const isTitleInvalid = typeof title !== 'string' || !title.trim();
  if (isTitleInvalid) {
    throw new Error('"title" must be a padded string');
  }

  const isDescriptionInvalid =
    typeof description !== 'string' || !description.trim();
  if (isDescriptionInvalid) {
    throw new Error('"description" must be a padded string');
  }

  const isAttachedElementInvalid = !(attachedElement instanceof HTMLElement);
  if (isAttachedElementInvalid) {
    throw new Error('"attachedElement" must be an HTML element.');
  }
  const validPopoverPositions = ['top', 'bottom', 'left', 'right'];
  const isPopoverPositionInvalid =
    !validPopoverPositions.includes(popoverPosition);
  if (isPopoverPositionInvalid) {
    throw new Error(
      '"popoverPosition" must be one of "top", "bottom", "left", or "right".',
    );
  }

  if ('padding' in step) {
    const isPaddingInvalidType =
      typeof step.padding !== 'object' || step.padding === null;
    if (isPaddingInvalidType) {
      throw new Error(
        'Each item in "steps" that contains "padding" must assign it as an object.',
      );
    }

    const isPaddingEmpty = !(step.padding.vertical || step.padding.horizontal);
    if (isPaddingEmpty) {
      throw new Error(
        'Each item in "steps" that contains "padding" must assign it as an object with "vertical" and/or "horizontal" keys.',
      );
    }

    const isPaddingVerticalInvalid =
      'vertical' in step.padding && typeof step.padding.vertical !== 'number';
    if (isPaddingVerticalInvalid) {
      throw new Error('"vertical" in "padding" must be a number.');
    }

    const isPaddingHorizontalInvalid =
      'horizontal' in step.padding &&
      typeof step.padding.horizontal !== 'number';
    if (isPaddingHorizontalInvalid) {
      throw new Error('"horizontal" in "padding" must be a number.');
    }
  }
};

export const validateSteps = (steps) => {
  if (!Array.isArray(steps)) {
    throw new Error('Property steps needs to be a padded array.');
  }

  if (!steps?.[0]) {
    throw new Error('Steps property cannot be an empty array.');
  }

  steps.forEach(validateStep);

  return true;
};
