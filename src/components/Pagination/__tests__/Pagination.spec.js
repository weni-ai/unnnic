import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import Pagination from '../Pagination.vue';

function setup(props) {
  return mount(Pagination, { props });
}

describe('Pagination', () => {
  describe('when pagination is not disabled', () => {
    let wrapper;

    describe('when the user is on the first page', () => {
      beforeEach(() => {
        wrapper = setup({
          modelValue: 1,
          max: 10,
          disabled: false,
        });
      });

      it('should show 1, 2, 3, ..., 10 page buttons', () => {
        const texts = wrapper
          .findAll('[data-test="page-button"]')
          .map((element) => element.text());

        ['1', '2', '3', '...', '10'].forEach((value, index) => {
          expect(texts[index]).contains(value);
        });
      });

      it('the previous button should be disabled', () => {
        expect(
          wrapper.find('[data-test="previous-button"]').isDisabled(),
        ).toBeTruthy();
      });

      describe('when the user clicks on the next button', () => {
        beforeEach(() => {
          wrapper.find('[data-test="next-button"]').trigger('click');
        });

        it('emits @update:model-value with page number 2', () => {
          expect(wrapper.emitted('update:model-value')).toHaveLength(1);
          expect(wrapper.emitted('update:model-value')).toContainEqual([2]);
        });
      });

      describe('when the user clicks on the right ellipsis button', () => {
        beforeEach(() => {
          wrapper.findAll('[data-test="page-button"]').at(-2).trigger('click');
        });

        it('emits @update:model-value with page number 4', () => {
          expect(wrapper.emitted('update:model-value')).toHaveLength(1);
          expect(wrapper.emitted('update:model-value')).toContainEqual([4]);
        });
      });
    });

    describe('when the user is on the second page', () => {
      beforeEach(() => {
        wrapper = setup({
          modelValue: 2,
          max: 10,
          disabled: false,
        });
      });

      it('should show 1, 2, 3, ..., 10 page buttons', () => {
        const texts = wrapper
          .findAll('[data-test="page-button"]')
          .map((element) => element.text());

        ['1', '2', '3', '...', '10'].forEach((value, index) => {
          expect(texts[index]).contains(value);
        });
      });

      describe('when the user clicks on the previous button', () => {
        beforeEach(() => {
          wrapper.find('[data-test="previous-button"]').trigger('click');
        });

        it('emits @update:model-value with page number 1', () => {
          expect(wrapper.emitted('update:model-value')).toHaveLength(1);
          expect(wrapper.emitted('update:model-value')).toContainEqual([1]);
        });
      });
    });

    describe('when the user is on the last page', () => {
      beforeEach(() => {
        wrapper = setup({
          modelValue: 11,
          max: 10,
          disabled: false,
        });
      });

      it('the next button should be disabled', () => {
        expect(
          wrapper.find('[data-test="next-button"]').isDisabled(),
        ).toBeTruthy();
      });
    });

    describe('when the user is on the 9th page', () => {
      beforeEach(() => {
        wrapper = setup({
          modelValue: 9,
          max: 10,
          disabled: false,
        });
      });

      it('should show 1, ..., 8, 9, 10 page buttons', () => {
        const texts = wrapper
          .findAll('[data-test="page-button"]')
          .map((element) => element.text());

        ['1', '...', '8', '9', '10'].forEach((value, index) => {
          expect(texts[index]).contains(value);
        });
      });

      describe('when the user clicks on the left ellipsis button', () => {
        beforeEach(() => {
          wrapper.findAll('[data-test="page-button"]').at(1).trigger('click');
        });

        it('emits @update:model-value with page number 7', () => {
          expect(wrapper.emitted('update:model-value')).toHaveLength(1);
          expect(wrapper.emitted('update:model-value')).toContainEqual([7]);
        });
      });
    });

    describe('when the user is on the 4rd page', () => {
      beforeEach(() => {
        wrapper = setup({
          modelValue: 4,
          max: 10,
          disabled: false,
        });
      });

      it('should show 1, ..., 4 ..., 10 page buttons', () => {
        const texts = wrapper
          .findAll('[data-test="page-button"]')
          .map((element) => element.text());

        ['1', '...', '4', '...', '10'].forEach((value, index) => {
          expect(texts[index]).contains(value);
        });
      });

      describe('when the user clicks on the right ellipsis button', () => {
        beforeEach(() => {
          wrapper.findAll('[data-test="page-button"]').at(-2).trigger('click');
        });

        it('emits @update:model-value with page number 5', () => {
          expect(wrapper.emitted('update:model-value')).toHaveLength(1);
          expect(wrapper.emitted('update:model-value')).toContainEqual([5]);
        });
      });
    });

    describe('when the user is on the 3rd page', () => {
      beforeEach(() => {
        wrapper = setup({
          modelValue: 3,
          max: 10,
          disabled: false,
        });
      });

      describe('when the user wants clicks on the next page button', () => {
        it('emits @update:model-value with page number 4', () => {
          wrapper.find('[data-test="next-button"]').trigger('click');

          expect(wrapper.emitted('update:model-value')).toHaveLength(1);
          expect(wrapper.emitted('update:model-value')).toContainEqual([4]);
        });
      });
    });

    describe('when the user is on the 7th page', () => {
      beforeEach(() => {
        wrapper = setup({
          modelValue: 9,
          max: 10,
          disabled: false,
        });
      });

      describe('when the user wants clicks on the previous page button', () => {
        it('emits @update:model-value with page number 8', () => {
          wrapper.find('[data-test="previous-button"]').trigger('click');

          expect(wrapper.emitted('update:model-value')).toHaveLength(1);
          expect(wrapper.emitted('update:model-value')).toContainEqual([8]);
        });
      });
    });
  });
});
