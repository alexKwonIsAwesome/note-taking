import { createApp } from './app/App';

const state = {
  activeCategory: 'notes',
  notes: [
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
      isArchived: false,
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
      isArchived: false,
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
      isArchived: true,
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
      isArchived: false,
    },
    {
      title: 'Note Title',
      content: 'Lorem ipsum dolor sit amet.',
      isArchived: false,
    },
  ],
  createModal: {
    isOpen: false,
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
      createModal: {
        isOpen: state.createModal.isOpen,
        onCancel: () => {
          state.createModal.isOpen = false;
          render();
        },
        onCreate: (note) => {
          state.notes.unshift(note);
          state.createModal.isOpen = false;
          render();
        },
      },
      onCreateButtonClick: () => {
        state.createModal.isOpen = true;
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
