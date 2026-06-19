import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';

import DropArea from '../DropArea.vue';
import i18n from '@/utils/plugins/i18n';

const createFile = (name, type, sizeBytes = 1024) =>
  new File(['x'.repeat(sizeBytes)], name, { type });

const mountDropArea = (props = {}, listeners = {}) =>
  mount(DropArea, {
    props: {
      currentFiles: [],
      ...props,
    },
    attrs: listeners,
    global: {
      plugins: [i18n],
      stubs: {
        UnnnicIcon: true,
      },
    },
  });

describe('DropArea', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders default title and supported formats', () => {
    const wrapper = mountDropArea({ supportedFormats: '.pdf,.png' });

    expect(wrapper.text()).toContain('Drag your file here or');
    expect(wrapper.attributes('title')).toBeUndefined();
    expect(
      wrapper
        .find('.unnnic-upload-area__dropzone__content__subtitle')
        .attributes('title'),
    ).toBe('.PDF, .PNG');
  });

  it('uses custom subtitle when provided', () => {
    const wrapper = mountDropArea({ subtitle: 'Custom subtitle' });

    expect(wrapper.text()).toContain('Custom subtitle');
  });

  it('opens file picker when dropzone is clicked', async () => {
    const wrapper = mountDropArea();
    const clickSpy = vi.spyOn(wrapper.vm.$refs.file, 'click');

    await wrapper.find('.unnnic-upload-area__dropzone').trigger('click');

    expect(clickSpy).toHaveBeenCalled();
  });

  it('does not react when disabled', async () => {
    const wrapper = mountDropArea({ disabled: true });
    const clickSpy = vi.spyOn(wrapper.vm.$refs.file, 'click');
    const file = createFile('notes.txt', 'text/plain');

    await wrapper.trigger('dragenter');
    await wrapper.trigger('dragover');
    await wrapper.trigger('dragleave');
    await wrapper.trigger('dragend');
    await wrapper.trigger('drop', { dataTransfer: { files: [file] } });
    await wrapper.trigger('click');

    const input = wrapper.find('input[type="file"]');
    Object.defineProperty(input.element, 'files', {
      configurable: true,
      value: [file],
    });
    await input.trigger('input');

    expect(wrapper.classes()).not.toContain(
      'unnnic-upload-area__dropzone__is-dragover',
    );
    expect(clickSpy).not.toHaveBeenCalled();
    expect(wrapper.emitted('update:currentFiles')).toBeUndefined();
  });

  it('handles drag enter, over, leave, and end states', async () => {
    const wrapper = mountDropArea();

    await wrapper.trigger('dragenter');
    expect(wrapper.classes()).toContain(
      'unnnic-upload-area__dropzone__is-dragover',
    );

    await wrapper.trigger('dragover');
    await wrapper.trigger('dragleave');
    expect(wrapper.classes()).not.toContain(
      'unnnic-upload-area__dropzone__is-dragover',
    );

    await wrapper.trigger('dragenter');
    await wrapper.trigger('dragend');
    expect(wrapper.classes()).not.toContain(
      'unnnic-upload-area__dropzone__is-dragover',
    );
  });

  it('adds valid files on drop', async () => {
    const wrapper = mountDropArea({ supportedFormats: '.txt' });
    const file = createFile('notes.txt', 'text/plain');
    const dataTransfer = { files: [file] };

    await wrapper.trigger('drop', { dataTransfer });

    expect(wrapper.emitted('update:currentFiles')[0][0]).toEqual([file]);
    expect(wrapper.emitted('fileChange')[0][0]).toEqual([file]);
  });

  it('adds valid files from file input change', async () => {
    const wrapper = mountDropArea({ supportedFormats: '.txt' });
    const file = createFile('notes.txt', 'text/plain');
    const input = wrapper.find('input[type="file"]');

    Object.defineProperty(input.element, 'files', {
      configurable: true,
      value: [file],
    });

    await input.trigger('input');

    expect(wrapper.emitted('update:currentFiles')).toBeTruthy();
    expect(input.element.value).toBe('');
  });

  it('shows error when multiple files are not allowed', async () => {
    const wrapper = mountDropArea({ acceptMultiple: false });
    const files = [
      createFile('a.txt', 'text/plain'),
      createFile('b.txt', 'text/plain'),
    ];

    await wrapper.trigger('drop', { dataTransfer: { files } });

    expect(wrapper.classes()).toContain(
      'unnnic-upload-area__dropzone__has-error',
    );
    expect(wrapper.emitted('update:currentFiles')).toBeUndefined();

    vi.advanceTimersByTime(5000);
    await flushPromises();
    expect(wrapper.classes()).not.toContain(
      'unnnic-upload-area__dropzone__has-error',
    );
  });

  it('emits unsupportedFormat when handler is provided', async () => {
    const wrapper = mountDropArea(
      { supportedFormats: '.pdf' },
      { onUnsupportedFormat: () => {} },
    );
    const file = createFile('notes.txt', 'text/plain');

    await wrapper.trigger('drop', { dataTransfer: { files: [file] } });

    expect(wrapper.emitted('unsupportedFormat')).toBeTruthy();
  });

  it('shows error for unsupported format without custom handler', async () => {
    const wrapper = mountDropArea({ supportedFormats: '.pdf' });
    const file = createFile('notes.txt', 'text/plain');

    await wrapper.trigger('drop', { dataTransfer: { files: [file] } });

    expect(wrapper.classes()).toContain(
      'unnnic-upload-area__dropzone__has-error',
    );
  });

  it('emits exceededTheMaximumFileSizeLimit when handler is provided', async () => {
    const wrapper = mountDropArea(
      { maxFileSize: 0.001 },
      { onExceededTheMaximumFileSizeLimit: () => {} },
    );
    const file = createFile('large.txt', 'text/plain', 1024 * 1024);

    await wrapper.trigger('drop', { dataTransfer: { files: [file] } });

    expect(wrapper.emitted('exceededTheMaximumFileSizeLimit')).toBeTruthy();
  });

  it('shows error when file exceeds max size without custom handler', async () => {
    const wrapper = mountDropArea({ maxFileSize: 0.001 });
    const file = createFile('large.txt', 'text/plain', 1024 * 1024);

    await wrapper.trigger('drop', { dataTransfer: { files: [file] } });

    expect(wrapper.classes()).toContain(
      'unnnic-upload-area__dropzone__has-error',
    );
  });

  it('accepts any format when supportedFormats is *', async () => {
    const wrapper = mountDropArea({ supportedFormats: '*' });
    const file = createFile('archive.zip', 'application/zip');

    await wrapper.trigger('drop', { dataTransfer: { files: [file] } });

    expect(wrapper.emitted('update:currentFiles')).toBeTruthy();
  });

  it('shows error when maximum uploads is exceeded', async () => {
    const existing = createFile('existing.txt', 'text/plain');
    const wrapper = mountDropArea({
      currentFiles: [existing],
      maximumUploads: 1,
      supportedFormats: '.txt',
    });
    const file = createFile('new.txt', 'text/plain');

    await wrapper.trigger('drop', { dataTransfer: { files: [file] } });

    expect(wrapper.classes()).toContain(
      'unnnic-upload-area__dropzone__has-error',
    );
  });

  it('replaces files when shouldReplace is true', async () => {
    const existing = createFile('existing.txt', 'text/plain');
    const replacement = createFile('new.txt', 'text/plain');
    const wrapper = mountDropArea({
      currentFiles: [existing],
      shouldReplace: true,
      supportedFormats: '.txt',
    });

    await wrapper.trigger('drop', { dataTransfer: { files: [replacement] } });

    expect(wrapper.emitted('update:currentFiles')[0][0]).toEqual([replacement]);
  });

  it('appends files to currentFiles by default', async () => {
    const existing = createFile('existing.txt', 'text/plain');
    const incoming = createFile('new.txt', 'text/plain');
    const wrapper = mountDropArea({
      currentFiles: [existing],
      maximumUploads: 2,
      supportedFormats: '.txt',
    });

    await wrapper.trigger('drop', { dataTransfer: { files: [incoming] } });

    expect(wrapper.emitted('update:currentFiles')[0][0]).toEqual([
      existing,
      incoming,
    ]);
  });

  it('filters out files that exceed max size during addFiles', async () => {
    const wrapper = mountDropArea({
      supportedFormats: '.txt',
      maxFileSize: 0.001,
      maximumUploads: 2,
    });
    const validFile = createFile('notes.txt', 'text/plain', 100);
    const largeFile = createFile('large.txt', 'text/plain', 1024 * 1024);

    await wrapper.trigger('drop', {
      dataTransfer: { files: [validFile, largeFile] },
    });

    expect(wrapper.emitted('update:currentFiles')[0][0]).toEqual([validFile]);
  });

  it('shows invalid subtitle when hasError is true', async () => {
    const wrapper = mountDropArea({ supportedFormats: '.pdf' });
    const file = createFile('notes.txt', 'text/plain');

    await wrapper.trigger('drop', { dataTransfer: { files: [file] } });

    expect(wrapper.text()).toContain('File not supported');
  });

  it('keeps dragover state until all dragenter events are reversed', async () => {
    const wrapper = mountDropArea();

    await wrapper.trigger('dragenter');
    await wrapper.trigger('dragenter');
    await wrapper.trigger('dragleave');

    expect(wrapper.classes()).toContain(
      'unnnic-upload-area__dropzone__is-dragover',
    );

    await wrapper.trigger('dragleave');

    expect(wrapper.classes()).not.toContain(
      'unnnic-upload-area__dropzone__is-dragover',
    );
  });

  it('does not add files from input when validation fails', async () => {
    const wrapper = mountDropArea({ supportedFormats: '.pdf' });
    const file = createFile('notes.txt', 'text/plain');
    const input = wrapper.find('input[type="file"]');

    Object.defineProperty(input.element, 'files', {
      configurable: true,
      value: [file],
    });

    await input.trigger('input');

    expect(wrapper.emitted('update:currentFiles')).toBeUndefined();
    expect(input.element.value).toBe('');
  });

  it('renders custom title and subtitle slots', () => {
    const wrapper = mount(DropArea, {
      props: { currentFiles: [] },
      slots: {
        title: '<strong data-testid="custom-title">Upload</strong>',
        subtitle: '<em data-testid="custom-subtitle">Only CSV</em>',
      },
      global: {
        plugins: [i18n],
        stubs: { UnnnicIcon: true },
      },
    });

    expect(wrapper.find('[data-testid="custom-title"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="custom-subtitle"]').exists()).toBe(true);
  });
});
