import { Note } from './note-card/NoteCard';
import { Category, createApp } from './app/App';

interface State {
  activeCategory: Category;
  notes: Note[];
  activeNote: Note | null;
  createModal: {
    isOpen: boolean;
  };
  manageModal: {
    isOpen: boolean;
    isMoreMenuOpen: boolean;
  };
}

const state: State = {
  activeCategory: 'notes',
  notes: [
    {
      title: 'Note Title 1',
      content: 'Lorem ipsum dolor sit amet.',
      isArchived: false,
    },
    {
      title: 'Note Title 2',
      content: 'Lorem ipsum dolor sit amet.',
      isArchived: false,
    },
    {
      title: 'Note Title 3',
      content: 'Lorem ipsum dolor sit amet.',
      isArchived: true,
    },
    {
      title: 'Note Title 4',
      content: 'Lorem ipsum dolor sit amet.',
      isArchived: false,
    },
    {
      title: 'Note Title 5',
      content: 'Lorem ipsum dolor sit amet.',
      isArchived: false,
    },
  ],
  activeNote: null,
  createModal: {
    isOpen: false,
  },
  manageModal: {
    isOpen: false,
    isMoreMenuOpen: false,
  },
};

const render = () => {
  requestAnimationFrame(() => {
    const $root = document.querySelector('#root')!;

    const $app = createApp({
      activeCategory: state.activeCategory as 'notes' | 'archived',
      onCategoryChange: (category) => {
        state.activeCategory = category;
        render();
      },
      notes: state.notes,
      activeNote: state.activeNote,
      createModal: {
        isOpen: state.createModal.isOpen,
        onCancel: () => {
          state.createModal.isOpen = false;
          render();
        },
        onCreate: (note) => {
          state.notes.unshift(note);
          state.createModal.isOpen = false;
          state.activeCategory = 'notes';
          render();
        },
      },
      manageModal: {
        isOpen: state.manageModal.isOpen,
        isMoreMenuOpen: state.manageModal.isMoreMenuOpen,
        onClose: () => {
          state.manageModal.isOpen = false;
          state.manageModal.isMoreMenuOpen = false;
          render();
        },
        onSave: (noteRef, { title, content }) => {
          noteRef.title = title;
          noteRef.content = content;
          state.manageModal.isOpen = false;
          render();
        },
        onOpenMoreMenu: () => {
          state.manageModal.isMoreMenuOpen = true;
          render();
        },
        onCloseMoreMenu: () => {
          state.manageModal.isMoreMenuOpen = false;
          render();
        },
        onArchive: (note) => {
          note.isArchived = true;
          state.manageModal.isOpen = false;
          render();
        },
        onUnarchive: (note) => {
          note.isArchived = false;
          state.manageModal.isOpen = false;
          render();
        },
        onDelete: (note) => {
          state.notes = state.notes.filter((noteItem) => noteItem !== note);
          state.manageModal.isOpen = false;
          render();
        },
      },
      onCreateButtonClick: () => {
        state.createModal.isOpen = true;
        render();
      },
      onNoteClick: (note) => {
        state.activeNote = note;
        state.manageModal.isOpen = true;
        render();
      },
    });

    const $currentApp = $root.firstElementChild;
    if ($currentApp) {
      $currentApp.replaceWith($app);
    } else {
      $root.appendChild($app);
    }
  });
};

render();
