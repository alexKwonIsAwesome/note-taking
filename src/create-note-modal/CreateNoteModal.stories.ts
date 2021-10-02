import { Story, Meta } from '@storybook/html';
import { createCreateNoteModal } from './CreateNoteModal';

export default {
  title: 'Components/CreateNoteModal',
  argTypes: {},
} as Meta;

const Template: Story<Parameters<typeof createCreateNoteModal>[0]> = (args) => {
  return createCreateNoteModal(args);
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true
};
