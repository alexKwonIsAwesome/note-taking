import { createTabs } from '../tabs/Tabs';
import { createButton } from '../button/Button';
import { createNoteCard, Note } from '../note-card/NoteCard';

const $template = document.createElement('template');

$template.innerHTML = /* html */ `
  <div class="bg-gray-100">
    <div class="p-4 md:p-6">
      <div class="flex justify-between items-center">
        <div class="text-xl font-semibold text-gray-700">Note Taking</div>
        <div data-target="create-button"></div>
      </div>
      <div class="mt-6">
        <div data-target="tabs"></div>
      </div>
      <div class="mt-4 gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
        <div data-target="note-cards"></div>
      </div>
    </div>
  </div>
`;

const NOTES = 'notes';
const ARCHIVED = 'archived';

interface Props {
  category: 'notes' | 'archived';
  notes: Note[];
}

export const createApp = ({ category, notes }: Props) => {
  const $element = $template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

  $element.querySelector('[data-target="create-button"]')!.replaceWith(
    createButton({
      size: 'base',
      children: 'Create',
      onClick: () => {
        console.log('Clicked create button!');
      },
    })
  );

  $element.querySelector('[data-target="tabs"]')!.replaceWith(
    createTabs({
      kind: 'pill',
      tabs: [
        {
          key: NOTES,
          name: 'Notes',
        },
        {
          key: ARCHIVED,
          name: 'Archived',
        },
      ],
      activeKey: category,
      onChange: (key) => {
        console.log('Clicked', key);
      },
    })
  );

  const $noteCardsFragment = new DocumentFragment();
  notes.forEach(({ title, content }) => {
    $noteCardsFragment.appendChild(
      createNoteCard({
        title,
        content,
        onClick: () => {
          console.log('Clicked note card');
        },
      })
    );
  });
  $element
    .querySelector('[data-target="note-cards"]')!
    .replaceWith($noteCardsFragment);

  return $element;
};
