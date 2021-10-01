import { Story, Meta } from '@storybook/html';
import { createNoteCard } from './NoteCard';

export default {
  title: 'Components/NoteCard',
  argTypes: {},
} as Meta;

const Template: Story<Parameters<typeof createNoteCard>[0]> = (args) => {
  return createNoteCard(args);
};

export const Default = Template.bind({});
Default.args = {
  title: 'Note title Lorem ipsum dolor sit amet. Adveniat regnum tuum Lorem ipsum dolor sit amet. Adveniat regnum tuum',
  content: 'Lorem ipsum dolor sit amet. Adveniat regnum tuum Lorem ipsum dolor sit amet. Adveniat regnum tuum Lorem ipsum dolor sit amet. Adveniat regnum tuum Lorem ipsum dolor sit amet. Adveniat regnum tuum Lorem ipsum dolor sit amet. Adveniat regnum tuum Lorem ipsum dolor sit amet. Adveniat regnum tuum Lorem ipsum dolor sit amet. Adveniat regnum tuum Lorem ipsum dolor sit amet. Adveniat regnum tuum Lorem ipsum dolor sit amet. Adveniat regnum tuumLorem ipsum dolor sit amet. Adveniat regnum tuum',
};
