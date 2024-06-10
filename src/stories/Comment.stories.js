import UnnnicComment from '../components/Comment/Comment.vue';
import UnnnicButton from '../components/Button/Button.vue';
import UnnnicDropdown from '../components/Dropdown/Dropdown.vue';
import UnnnicDropdownItem from '../components/Dropdown/DropdownItem.vue';
import UnnnicIcon from '../components/Icon.vue';

export default {
  title: 'Example/Comment',
  component: UnnnicComment,
  render: (args) => ({
    components: {
      UnnnicComment,
      UnnnicButton,
      UnnnicDropdown,
      UnnnicDropdownItem,
      UnnnicIcon,
    },
    setup() {
      return { args };
    },
    template: `
    <unnnic-comment v-bind="args">
      <template #avatar>
        <img src="https://images.unsplash.com/photo-1568564321589-3e581d074f9b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fGRvZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80" />
      </template>
      <template #actions>
        <unnnic-dropdown>
          <template #trigger>
            <unnnic-icon
              icon="navigation-menu-vertical-1"
              size="sm"
            />
          </template>
          <unnnic-dropdown-item>
            <unnnic-button
              type="tertiary"
              iconLeft="pencil-write-1"
              text="Edit comment"
              size="small"
            />
          </unnnic-dropdown-item>
          <unnnic-dropdown-item>
            <unnnic-button
              type="tertiary"
              iconLeft="delete-1"
              text="Delete Comment"
              size="small"
            />
          </unnnic-dropdown-item>
        </unnnic-dropdown>
      </template>
    </unnnic-comment>
    `,
  }),
};

export const Default = {
  args: {
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8qiVsOfzasQWdcm81N6WmPicyHp50mMkvgw&usqp=CAU',
    title: 'This is the username',
    time: '- 2 hours ago',
    text: 'This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment This is a very very very very very very very very very very very long comment',
  },
};
