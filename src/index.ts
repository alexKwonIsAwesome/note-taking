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
