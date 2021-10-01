import { Story, Meta } from '@storybook/html';
import { createCard } from './Card';

export default {
  title: 'Components/Card',
  argTypes: {},
} as Meta;

const Template: Story<Parameters<typeof createCard>[0]> = (args) => {
  return createCard(args);
};

export const Default = Template.bind({});
Default.args = {
  children: 'Lorem ipsum dolor sit amet',
};
