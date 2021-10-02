import { createTabs } from '../tabs/Tabs';
import { createButton } from '../button/Button';
import { createNoteCard, Note } from '../note-card/NoteCard';
import { createCreateNoteModal } from '../create-note-modal/CreateNoteModal';
import { createManageNoteModal } from '../manage-note-modal/ManageNoteModal';

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
    <div data-target="manage-note-modal"></div>
  </div>
`;

const NOTES = 'notes';
const ARCHIVED = 'archived';

export type Category = 'notes' | 'archived';

interface Props {
  activeCategory: Category;
  notes: Note[];
  activeNote: Note | null;
  createModal: {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (note: Note) => void;
  };
  manageModal: {
    isOpen: boolean;
    isMoreMenuOpen: boolean;
    onClose: () => void;
    onSave: (
      noteRef: Note,
      { title, content }: { title: Note['title']; content: Note['content'] }
    ) => void;
    onOpenMoreMenu: () => void;
    onCloseMoreMenu: () => void;
    onArchive: (note: Note) => void;
    onUnarchive: (note: Note) => void;
    onDelete: (note: Note) => void;
  };
  onCategoryChange: (category: Category) => void;
  onCreateButtonClick: () => void;
  onNoteClick: (note: Note) => void;
}

export const createApp = ({
  activeCategory,
  onCategoryChange,
  notes,
  activeNote,
  createModal,
  manageModal,
  onCreateButtonClick,
  onNoteClick,
}: Props) => {
  const $element = $template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

  document.addEventListener('keydown', (evt) => {
    if (evt.key !== 'Escape') {
      return;
    }

    if (createModal.isOpen) {
      createModal.onClose();
      return;
    }

    if (manageModal.isOpen) {
      manageModal.onClose();
      return;
    }
  });

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
        onCategoryChange(key as Category);
      },
    })
  );

  const $noteCardsFragment = new DocumentFragment();
  notes
    .filter(({ isArchived }) => {
      return activeCategory === 'archived' ? isArchived : !isArchived;
    })
    .forEach((note) => {
      const { title, content } = note;
      $noteCardsFragment.appendChild(
        createNoteCard({
          title,
          content,
          isArchived: false,
          onClick: () => {
            console.log('Clicked note card');
            onNoteClick(note);
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
        onClose: createModal.onClose,
        onCreate: createModal.onCreate,
      })
    );
  }

  if (manageModal.isOpen && activeNote) {
    $element.querySelector('[data-target="manage-note-modal"]')!.replaceWith(
      createManageNoteModal({
        note: activeNote,
        isOpen: manageModal.isOpen,
        isMoreMenuOpen: manageModal.isMoreMenuOpen,
        onSave: manageModal.onSave,
        onClose: manageModal.onClose,
        onOpenMoreMenu: manageModal.onOpenMoreMenu,
        onCloseMoreMenu: manageModal.onCloseMoreMenu,
        onArchive: manageModal.onArchive,
        onUnarchive: manageModal.onUnarchive,
        onDelete: manageModal.onDelete,
      })
    );
  }

  return $element;
};
