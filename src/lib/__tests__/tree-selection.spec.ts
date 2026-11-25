import { describe, it, expect } from 'vitest';
import type { SelectOption } from '@/components/Select/types';
import {
  filterTreeOptions,
  getCheckState,
  getDisplayOptions,
  getDrivingChildren,
  getVisibleChildren,
  isTreeOptions,
  toggleOptionValue,
  withImpliedChildren,
} from '@/lib/tree-selection';

const getValue = (option: SelectOption) => option.value;

const delay: SelectOption = { label: 'Delay', value: 'delay' };
const tracking: SelectOption = { label: 'Tracking', value: 'tracking' };
const delivery: SelectOption = {
  label: 'Delivery',
  value: 'delivery',
  children: [
    delay,
    tracking,
    { label: 'Locked', value: 'locked', disabled: true },
  ],
};
const payment: SelectOption = {
  label: 'Payment',
  value: 'payment',
  children: [{ label: 'Pix', value: 'pix' }],
};
const other: SelectOption = { label: 'Other', value: 'other' };
const options = [delivery, payment, other];

const toggle = (values: unknown[], option: SelectOption, checked: boolean) =>
  toggleOptionValue(options, values, option, checked, getValue);

describe('tree-selection', () => {
  it('detects tree options', () => {
    expect(isTreeOptions(options)).toBe(true);
    expect(isTreeOptions([other])).toBe(false);
  });

  it('drives a parent by its enabled children, or all when none is enabled', () => {
    expect(getDrivingChildren(delivery).map(getValue)).toEqual([
      'delay',
      'tracking',
    ]);

    const locked = { value: 'p', children: [{ value: 'c', disabled: true }] };
    expect(getDrivingChildren(locked).map(getValue)).toEqual(['c']);
  });

  describe('search', () => {
    const matches = (option: SelectOption) =>
      String(option.label).toLowerCase().includes('track');

    it('keeps roots that match or have a matching child', () => {
      expect(filterTreeOptions(options, matches)).toEqual([delivery]);
    });

    it('shows only matching children under a non-matching root', () => {
      expect(getVisibleChildren(delivery, matches).map(getValue)).toEqual([
        'tracking',
      ]);
    });

    it('shows every child under a matching root', () => {
      expect(getVisibleChildren(delivery, () => true)).toHaveLength(3);
    });
  });

  it('adds the enabled children implied by a parent value', () => {
    expect(withImpliedChildren(options, ['delivery'], getValue)).toEqual([
      'delivery',
      'delay',
      'tracking',
    ]);
  });

  describe('getCheckState', () => {
    const stateOf = (option: SelectOption, values: unknown[]) =>
      getCheckState(option, new Set(values), getValue);

    it('returns the leaf selection', () => {
      expect(stateOf(other, ['other'])).toBe(true);
      expect(stateOf(other, [])).toBe(false);
    });

    it('returns true, less or false for a parent', () => {
      expect(stateOf(delivery, ['delay', 'tracking'])).toBe(true);
      expect(stateOf(delivery, ['delay'])).toBe('less');
      expect(stateOf(delivery, [])).toBe(false);
    });
  });

  describe('toggleOptionValue', () => {
    it('checks a parent with its enabled children', () => {
      expect(toggle([], delivery, true)).toEqual([
        'delay',
        'tracking',
        'delivery',
      ]);
    });

    it('unchecks a parent and its children', () => {
      expect(
        toggle(['delay', 'tracking', 'delivery'], delivery, false),
      ).toEqual([]);
    });

    it('adds the parent once its last driving child is checked', () => {
      expect(toggle(['delay'], tracking, true)).toEqual([
        'delay',
        'tracking',
        'delivery',
      ]);
    });

    it('removes the parent when a child is unchecked', () => {
      expect(toggle(['delay', 'tracking', 'delivery'], delay, false)).toEqual([
        'tracking',
      ]);
    });

    it('toggles a leaf and keeps unknown values', () => {
      expect(toggle(['unknown'], other, true)).toEqual(['unknown', 'other']);
      expect(toggle(['unknown', 'other'], other, false)).toEqual(['unknown']);
    });
  });

  it('displays a full parent instead of its children, in tree order', () => {
    const selected = new Set(['other', 'pix', 'payment', 'delay']);

    expect(getDisplayOptions(options, selected, getValue)).toEqual([
      delay,
      payment,
      other,
    ]);
  });
});
