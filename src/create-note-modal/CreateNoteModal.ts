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
        items-end
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
        <div class="hidden sm:block absolute top-0 right-0 pt-6 pr-6">
          <button
            data-target="close-button"
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
          <h3
            class="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Create note
          </h3>

          <div class="mt-6">
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <div class="mt-1">
              <input
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
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
`;

interface Props {
  isOpen: boolean;
  onCreate: (note: Note) => void;
  onClose: () => void;
}

export const createCreateNoteModal = ({ isOpen, onCreate, onClose }: Props) => {
  if (!isOpen) {
    return new DocumentFragment();
  }

  const $element = $template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

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

  const $form = $element.querySelector(
    '[data-target="form"]'
  )! as HTMLFormElement;
  $form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData($form);
    const title = (formData.get('title') || '') as string;
    const content = (formData.get('content') || '') as string;
    onCreate({
      title,
      content,
      isArchived: false,
    });
  });

  return $element;
};
