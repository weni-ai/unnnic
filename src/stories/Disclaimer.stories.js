import unnnicDisclaimer from '../components/Disclaimer/Disclaimer.vue';
import icons from '../utils/iconList';
import colors from '../utils/colorsList';

export default {
    title: 'Example/Disclaimer',
    component: unnnicDisclaimer,
    args: {},
    argTypes: {
        text: { control: { type: 'text' } },
        icon: { options: icons, control: { type: 'select', } },
        iconColor: { options: colors, control: { type: 'select', } },
    },
};

const Template = (args) => ({
    components: {
        unnnicDisclaimer,
    },
    setup() {
        return { args };
    },
    props: Object.keys(args),
    template: `
     <div>
       <unnnic-disclaimer v-bind="args" />
     </div>
    `,
});

export const Default = Template.bind({});

Default.args = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    icon: 'alert-circle-1-1',
    iconColor: 'feedback-yellow',
};
