import { Story, Meta } from '@storybook/html';
import { createButton } from './Button';

export default {
  title: 'Components/Button',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xl', 'lg', 'base', 'sm', 'xs'],
    },
    onClick: { action: 'onClick' },
  },
} as Meta;

const Template: Story<Parameters<typeof createButton>[0]> = (args) => {
  return createButton(args);
};

export const Primary = Template.bind({});
Primary.args = {
  size: 'xl',
  children: 'Primary XL',
};
