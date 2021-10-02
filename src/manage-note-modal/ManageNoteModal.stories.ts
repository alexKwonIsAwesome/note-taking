import { Story, Meta } from '@storybook/html';
import { createManageNoteModal } from './ManageNoteModal';

export default {
  title: 'Components/ManageNoteModal',
  argTypes: {},
} as Meta;

const Template: Story<Parameters<typeof createManageNoteModal>[0]> = (args) => {
  return createManageNoteModal(args);
};

export const Default = Template.bind({});
Default.args = {
  note: {
    title: 'Lorem ipsum dolor sit amet',
    content:
      'Makahanya bara mitta sinkyo. Kanzazei bosatzu. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet',
    isArchived: false,
  },
  isOpen: true,
  isMoreMenuOpen: false,
};
