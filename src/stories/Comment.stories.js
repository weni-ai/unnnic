import unnnicComment from '../components/Comment/Comment.vue';
import unnnicButton from '../components/Button/Button.vue';
import unnnicDropdown from '../components/Dropdown/Dropdown.vue';
import unnnicDropdownItem from '../components/Dropdown/DropdownItem.vue';
import unnnicIconSvg from '../components/Icon-svg.vue';

export default {
  title: 'Example/Comment',
  component: unnnicComment,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicComment,
    unnnicButton,
    unnnicDropdown,
    unnnicDropdownItem,
    unnnicIconSvg,
  },
  template: `
  <unnnic-comment v-bind="$props">
    <unnnic-dropdown slot="actions">
      <unnnic-icon-svg
        slot="trigger"
        icon="navigation-menu-vertical-1"
        size="sm"
      />
      <unnnic-dropdown-item>
        <unnnic-button
          type="terciary"
          iconLeft="pencil-write-1"
          text="Edit comment"
          size="small"
        />
      </unnnic-dropdown-item>
      <unnnic-dropdown-item>
        <unnnic-button
          type="terciary"
          iconLeft="delete-1"
          text="Delete Comment"
          size="small"
        />
      </unnnic-dropdown-item>
    </unnnic-dropdown>    
  </unnnic-comment>
  `,
});

export const Default = Template.bind({});
Default.args = {
  avatar:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8qiVsOfzasQWdcm81N6WmPicyHp50mMkvgw&usqp=CAU',
  title: 'This is the username',
  time: '- 2 hours ago',
  text:
    'This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment',
};
