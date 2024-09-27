import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import Breadcrumb from '../Breadcrumb.vue';

function setup(props) {
  return mount(Breadcrumb, { props });
}

describe('Breadcrumb', () => {
  let wrapper;

  const crumbs = [
    { name: 'First Page Name', path: '/first-page' },
    { name: 'Second Page Name', path: '/first-page/second-page' },
    { name: 'Last Page Name', path: '/first-page/second-page/last-page' },
  ];

  beforeEach(() => {
    wrapper = setup({
      crumbs,
    });
  });

  it('renders the right icon the same amount as the breadcrumbs length minus one', () => {
    const rightIcons = wrapper.findAll('[data-test="right-icon"]');

    expect(rightIcons.length).toBe(crumbs.length - 1);
  });

  it.each(crumbs)('renders $name breadcrumb', ({ name }) => {
    const breadcrumb = wrapper.find(`[data-test="${name}"]`);

    expect(breadcrumb.exists()).toBeTruthy();
    expect(breadcrumb.text()).contains(name);
  });

  const allCrumbsButLast = crumbs.slice(0, -1);
  const lastCrumb = crumbs.at(-1);

  it.each(allCrumbsButLast)(
    '$name has not the "active" class name',
    ({ name }) => {
      const breadcrumb = wrapper.find(`[data-test="${name}"]`);

      expect(breadcrumb.wrapperElement.className).not.contains('active');
    },
  );

  it(`'${lastCrumb.name}' has the "active" class name`, () => {
    const breadcrumb = wrapper.find(`[data-test="${lastCrumb.name}"]`);

    expect(breadcrumb.wrapperElement.className).contains('active');
  });

  describe.each(crumbs)(
    'when the user clicks on the $name breadcrumb',
    (crumb) => {
      it('emits the crumb-click event with the respective crumb object', () => {
        const breadcrumb = wrapper.find(`[data-test="${crumb.name}"]`);

        breadcrumb.trigger('click');

        expect(wrapper.emitted('crumb-click')).toHaveLength(1);
        expect(wrapper.emitted('crumb-click')).toContainEqual([crumb]);
      });
    },
  );
});
