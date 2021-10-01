import { Story, Meta } from '@storybook/html';
import { createApp } from './App';

export default {
  title: 'Components/App',
  argTypes: {},
} as Meta;

const Template: Story<Parameters<typeof createApp>[0]> = (args) => {
  return createApp(args);
};

export const Primary = Template.bind({});
Primary.args = {
  category: 'notes',
  notes: [
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
    },
  ],
};
