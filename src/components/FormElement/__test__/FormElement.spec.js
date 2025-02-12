import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import UnnnicFormElement from '../FormElement.vue';
import UnnnicIcon from '../../Icon.vue';
import { fullySanitize } from '@/utils/sanitize';

vi.mock('@/utils/sanitize', () => ({
    fullySanitize: vi.fn((input) => input),
}));

describe('UnnnicFormElement.vue', () => {
    it('renders correctly', () => {
        const wrapper = mount(UnnnicFormElement);
        expect(wrapper.exists()).toBe(true);
    });

    it('renders the label when provided', () => {
        const label = 'Test Label';
        const wrapper = mount(UnnnicFormElement, {
            props: { label },
        });

        expect(wrapper.text()).toContain(label);
        expect(fullySanitize).toHaveBeenCalledWith(label);
    });

    it('applies the disabled class when the disabled prop is true', () => {
        const wrapper = mount(UnnnicFormElement, {
            props: { disabled: true },
        });

        expect(wrapper.classes()).toContain('unnnic-form-element--disabled');
    });

    it('renders the error message when provided', () => {
        const errorMessage = 'Error occurred!';
        const wrapper = mount(UnnnicFormElement, {
            props: { error: errorMessage },
        });

        expect(wrapper.text()).toContain(errorMessage);
        expect(fullySanitize).toHaveBeenCalledWith(errorMessage);
    });

    it('renders the UnnnicIcon when there is an error message', () => {
        const wrapper = mount(UnnnicFormElement, {
            props: { error: 'Error text' },
        });

        expect(wrapper.findComponent(UnnnicIcon).exists()).toBe(true);
    });

    it('renders the rightMessage slot correctly', () => {
        const wrapper = mount(UnnnicFormElement, {
            slots: {
                rightMessage: '<span class="test-right-message">Right Message</span>',
            },
        });

        expect(wrapper.find('.test-right-message').exists()).toBe(true);
    });

    it('renders the message when provided', () => {
        const message = 'This is a message';
        const wrapper = mount(UnnnicFormElement, {
            props: { message },
        });

        expect(wrapper.text()).toContain(message);
        expect(fullySanitize).toHaveBeenCalledWith(message);
    });

    it('validates the size prop correctly', () => {
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

        const validSizes = ['md', 'sm'];
        validSizes.forEach((size) => {
            const wrapper = mount(UnnnicFormElement, { props: { size } });
            expect(wrapper.props().size).toBe(size);
        });

        mount(UnnnicFormElement, { props: { size: 'invalid' } });

        expect(consoleWarnSpy).toHaveBeenCalled();

        consoleWarnSpy.mockRestore();
    });


    it('computes shouldShowErrorSection correctly', async () => {
        const wrapper = mount(UnnnicFormElement, {
            props: { error: 'Error message' },
        });

        expect(wrapper.vm.shouldShowErrorSection).toBe(true);

        await wrapper.setProps({ error: true });
        expect(wrapper.vm.shouldShowErrorSection).toBe(false);

        const wrapperWithSlot = mount(UnnnicFormElement, {
            props: { error: true },
            slots: {
                rightMessage: '<span>Right message</span>',
            },
        });

        expect(wrapperWithSlot.vm.shouldShowErrorSection).toBe(true);
    });

});
