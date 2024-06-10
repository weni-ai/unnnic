import { action } from '@storybook/addon-actions';
import CardCompany from '../components/Card/CardCompany.vue';

export default {
  title: 'Card/CardCompany',
  component: CardCompany,
  argTypes: {
    onJoin: action('join'),
  },
};

export const Normal = {
  args: {
    title: 'Weni',
    tag: 'Gratuita',
    description: 'Description',
    joinLabel: 'Join',
    options: [
      {
        icon: 'view-1-1',
        title: 'View members',
        click() {
          console.log('view');
        },
      },
      {
        icon: 'delete-1-1',
        title: 'Delete organization',
        scheme: 'feedback-red',
        click() {
          console.log('delete');
        },
      },
    ],
    members: [
      {
        name: 'Cristian',
        photo:
          'https://weni-sp-connect-staging.s3.amazonaws.com/media/user/avatars/av_ef64cdfa-26b9-4896-93ba-098c00724d88.jpg?AWSAccessKeyId=AKIATQ3M7WDGK6GLYL6V&Signature=ka1ANr0Z6MuiRHKkOFbz%2Fr6krA4%3D&Expires=1625729559',
      },
      {
        name: 'Cristian',
        photo:
          'https://weni-sp-connect-staging.s3.amazonaws.com/media/user/avatars/av_ef64cdfa-26b9-4896-93ba-098c00724d88.jpg?AWSAccessKeyId=AKIATQ3M7WDGK6GLYL6V&Signature=ka1ANr0Z6MuiRHKkOFbz%2Fr6krA4%3D&Expires=1625729559',
      },
      {
        name: 'Cristian',
        photo:
          'https://weni-sp-connect-staging.s3.amazonaws.com/media/user/avatars/av_ef64cdfa-26b9-4896-93ba-098c00724d88.jpg?AWSAccessKeyId=AKIATQ3M7WDGK6GLYL6V&Signature=ka1ANr0Z6MuiRHKkOFbz%2Fr6krA4%3D&Expires=1625729559',
      },
      {
        name: 'Cristian',
        photo:
          'https://weni-sp-connect-staging.s3.amazonaws.com/media/user/avatars/av_ef64cdfa-26b9-4896-93ba-098c00724d88.jpg?AWSAccessKeyId=AKIATQ3M7WDGK6GLYL6V&Signature=ka1ANr0Z6MuiRHKkOFbz%2Fr6krA4%3D&Expires=1625729559',
      },
      {
        name: 'Cristian',
        photo:
          'https://weni-sp-connect-staging.s3.amazonaws.com/media/user/avatars/av_ef64cdfa-26b9-4896-93ba-098c00724d88.jpg?AWSAccessKeyId=AKIATQ3M7WDGK6GLYL6V&Signature=ka1ANr0Z6MuiRHKkOFbz%2Fr6krA4%3D&Expires=1625729559',
      },
    ],
    membersDescription: '+24 members',
  },
};
