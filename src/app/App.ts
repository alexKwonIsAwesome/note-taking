import { createTabs } from '../tabs/Tabs';
import { createButton } from '../button/Button';
import { createNoteCard, Note } from '../note-card/NoteCard';
import { createCreateNoteModal } from '../create-note-modal/CreateNoteModal';

const $template = document.createElement('template');

$template.innerHTML = /* html */ `
  <div>
    <div class="bg-gray-100 min-h-screen">
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
    <div data-target="create-note-modal"></div>
  </div>
`;

const NOTES = 'notes';
const ARCHIVED = 'archived';

type Category = 'notes' | 'archived';

interface Props {
  activeCategory: Category;
  notes: Note[];
  createModal: {
    isOpen: boolean;
    onCancel: () => void;
    onCreate: (note: Note) => void;
  };
  manageModal?: {
    isOpen: boolean;
    onCancel: () => void;
    onSave: () => void;
  };
  onCategoryChange?: (category: Category) => void;
  onCreateButtonClick: () => void;
  // onNoteClick?: (note: Note) => void;
  // onCreate?: () => void;
}

export const createApp = ({
  activeCategory,
  onCategoryChange,
  notes,
  createModal,
  onCreateButtonClick,
}: Props) => {
  const $element = $template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

  $element.querySelector('[data-target="create-button"]')!.replaceWith(
    createButton({
      size: 'base',
      children: 'Create',
      onClick: () => {
        onCreateButtonClick();
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
      activeKey: activeCategory,
      onChange: (key) => {
        if (onCategoryChange) {
          onCategoryChange(key as Category);
        }
      },
    })
  );

  const $noteCardsFragment = new DocumentFragment();
  notes
    .filter(({ isArchived }) => {
      return activeCategory === 'archived' ? isArchived : !isArchived;
    })
    .forEach(({ title, content }) => {
      $noteCardsFragment.appendChild(
        createNoteCard({
          title,
          content,
          isArchived: false,
          onClick: () => {
            console.log('Clicked note card');
          },
        })
      );
    });
  $element
    .querySelector('[data-target="note-cards"]')!
    .replaceWith($noteCardsFragment);

  if (createModal.isOpen) {
    $element.querySelector('[data-target="create-note-modal"]')!.replaceWith(
      createCreateNoteModal({
        isOpen: createModal.isOpen,
        onCancel: createModal.onCancel,
        onCreate: createModal.onCreate,
      })
    );
  }

  return $element;
};
