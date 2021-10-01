import { Story, Meta } from '@storybook/html';
import { createTabs } from './Tabs';

export default {
  title: 'Components/Tabs',
  argTypes: {
    onChange: {
      action: 'change',
    },
  },
} as Meta;

const Template: Story<Parameters<typeof createTabs>[0]> = (args) => {
  return createTabs(args);
};

export const Default = Template.bind({});
Default.args = {
  tabs: [
    {
      key: 0,
      name: 'Tab 1',
    },
    {
      key: 1,
      name: 'Tab 2',
    },
    {
      key: 2,
      name: 'Tab 3',
    },
  ],
  activeKey: 0,
};
