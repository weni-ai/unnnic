import UnnnicVideo from '../components/Video/Video.vue';
import VideoSample from './assets/videos/weni.mp4';

export default {
  title: 'Data Display/Video',
  tags: ['autodocs'],
  argTypes: { src: { control: { type: 'file', accept: 'video/*' } } },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicVideo },
    data() {
      return {
        video: VideoSample,
      };
    },
    template: `
      <UnnnicVideo :src="video"/>
    `,
  }),
};

export const Default = {};
