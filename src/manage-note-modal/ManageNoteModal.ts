import { Note } from '../note-card/NoteCard';

const $template = document.createElement('template');

$template.innerHTML = /* html */ `
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="
        flex
        items-center
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <!--
    Background overlay, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
      <div
        data-target="bg-overlay"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <!--
    Modal panel, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      To: "opacity-100 translate-y-0 sm:scale-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100 translate-y-0 sm:scale-100"
      To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  -->
      <div
        class="
          inline-block
          w-full
          align-bottom
          bg-white
          rounded-lg
          p-4
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6
        "
      >
        <div class="absolute top-0 right-0 pt-6 pr-6">
          <div class="relative inline-block">
            <button
              data-target="more-menu-button"
              type="button"
              class="
                bg-white
                rounded-md
                text-gray-400
                hover:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-gray-500
              "
            >
              <span class="sr-only">More</span>
              <!-- Heroicon name: outline/x -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>

            <div data-target="more-menu"></div>
          </div>

          <button
            data-target="close-button"
            type="button"
            class="
              ml-4
              bg-white
              rounded-md
              text-gray-400
              hover:text-gray-500
              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-gray-500
            "
          >
            <span class="sr-only">Close</span>
            <!-- Heroicon name: outline/x -->
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form data-target="form">
          <!-- <h3
          class="text-lg leading-6 font-medium text-gray-900"
          id="modal-title"
        >
          Create note
        </h3> -->

          <div class="mt-6">
            <label for="title" class="block text-sm font-medium text-gray-700"
              >Title</label
            >
            <div class="mt-1">
              <input
                data-target="title-input"
                type="text"
                name="title"
                id="title"
                class="
                  shadow-sm
                  focus:ring-gray-500 focus:border-gray-500
                  block
                  w-full
                  sm:text-sm
                  border-gray-300
                  rounded-md
                "
              />
            </div>
          </div>

          <div class="mt-6">
            <label for="content" class="block text-sm font-medium text-gray-700"
              >Content</label
            >
            <div class="mt-1">
              <textarea
                data-target="content-textarea"
                id="content"
                name="content"
                rows="3"
                class="
                  shadow-sm
                  focus:ring-gray-500 focus:border-gray-500
                  block
                  w-full
                  sm:text-sm
                  border border-gray-300
                  rounded-md
                "
              ></textarea>
            </div>
          </div>

          <div class="mt-6">
            <div class="flex justify-end">
              <button
                data-target="cancel-button"
                type="button"
                class="
                  bg-white
                  py-2
                  px-4
                  border border-gray-300
                  rounded-md
                  shadow-sm
                  text-sm
                  font-medium
                  text-gray-700
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-gray-500
                "
              >
                Cancel
              </button>
              <button
                type="submit"
                class="
                  ml-3
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-gray-600
                  hover:bg-gray-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-offset-2
                  focus:ring-gray-500
                "
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
`;

const $moreMenuTemplate = document.createElement('template');
$moreMenuTemplate.innerHTML = /* html */ `
  <div
    class="
      origin-top-right
      absolute
      right-0
      mt-2
      w-56
      rounded-md
      shadow-lg
      bg-white
      ring-1 ring-black ring-opacity-5
      focus:outline-none
    "
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1"
  >
    <div class="py-1" role="none">
      <a
        data-target="archive-menu-item"
        href="#"
        class="text-gray-700 block px-4 py-2 text-sm hover:text-gray-900 hover:bg-gray-100"
        role="menuitem"
        tabindex="-1"
        id="menu-item-0"
        >Archive</a
      >
      <a
        data-target="delete-menu-item"
        href="#"
        class="text-gray-700 block px-4 py-2 text-sm hover:text-gray-900 hover:bg-gray-100"
        role="menuitem"
        tabindex="-1"
        id="menu-item-1"
        >Delete</a
      >
    </div>
  </div>
`;

interface Props {
  note: Note;
  isOpen: boolean;
  isMoreMenuOpen: boolean;
  onSave: (
    noteRef: Note,
    { title, content }: { title: Note['title']; content: Note['content'] }
  ) => void;
  onClose: () => void;
  onOpenMoreMenu: () => void;
  onCloseMoreMenu: () => void;
  onArchive: (note: Note) => void;
  onUnarchive: (note: Note) => void;
  onDelete: (note: Note) => void;
}

export const createManageNoteModal = ({
  note,
  isOpen,
  isMoreMenuOpen,
  onSave,
  onClose,
  onOpenMoreMenu,
  onCloseMoreMenu,
  onArchive,
  onUnarchive,
  onDelete,
}: Props) => {
  if (!isOpen) {
    return new DocumentFragment();
  }

  const $element = $template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

  const handleCloseMoreMenu = () => {
    if (isMoreMenuOpen) {
      onCloseMoreMenu();
      document.removeEventListener('click', handleCloseMoreMenu);
    }
  };
  document.addEventListener('click', handleCloseMoreMenu);

  $element
    .querySelector('[data-target="bg-overlay"]')!
    .addEventListener('click', () => {
      onClose();
    });

  $element
    .querySelector('[data-target="close-button"]')!
    .addEventListener('click', () => {
      onClose();
    });

  $element
    .querySelector('[data-target="cancel-button"]')!
    .addEventListener('click', () => {
      onClose();
    });

  $element
    .querySelector('[data-target="more-menu-button"]')!
    .addEventListener('click', () => {
      onOpenMoreMenu();
    });

  const $form = $element.querySelector(
    '[data-target="form"]'
  )! as HTMLFormElement;
  $form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData($form);
    const title = (formData.get('title') || '') as string;
    const content = (formData.get('content') || '') as string;

    onSave(note, {
      title,
      content,
    });
  });

  (
    $element.querySelector('[data-target="title-input"]')! as HTMLInputElement
  ).value = note.title;
  (
    $element.querySelector(
      '[data-target="content-textarea"]'
    )! as HTMLInputElement
  ).value = note.content;

  const $moreMenu = $moreMenuTemplate.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

  $element
    .querySelector('[data-target="more-menu"]')!
    .replaceWith(isMoreMenuOpen ? $moreMenu : '');

  $moreMenu
    .querySelector('[data-target="archive-menu-item"]')!
    .addEventListener('click', () => {
      if (note.isArchived) {
        onUnarchive(note);
      } else {
        onArchive(note);
      }
    });

  $moreMenu
    .querySelector('[data-target="delete-menu-item"]')!
    .addEventListener('click', () => {
      onDelete(note);
    });

  $moreMenu.querySelector('[data-target="archive-menu-item"]')!.innerHTML =
    note.isArchived ? 'Unarchive' : 'Archive';

  return $element;
};
