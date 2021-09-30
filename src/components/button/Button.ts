// TODO: unify into a single template and just change the classes based on the size
const $xlButtonTemplate = document.createElement('template');
const $lgButtonTemplate = document.createElement('template');
const $baseButtonTemplate = document.createElement('template');
const $smButtonTemplate = document.createElement('template');
const $xsButtonTemplate = document.createElement('template');

$xlButtonTemplate.innerHTML = /* html */ `
  <button
    type="button"
    class="
      inline-flex
      items-center
      px-6
      py-3
      border border-transparent
      text-base
      font-medium
      rounded-md
      shadow-sm
      text-white
      bg-gray-600
      hover:bg-gray-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
    "
  >
    <div data-flag="children"></div>
  </button>
`;

$lgButtonTemplate.innerHTML = /* html */ `
  <button
    type="button"
    class="
      inline-flex
      items-center
      px-4
      py-2
      border border-transparent
      text-base
      font-medium
      rounded-md
      shadow-sm
      text-white
      bg-gray-600
      hover:bg-gray-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
    "
  >
    <div data-flag="children"></div>
  </button>
`;

$baseButtonTemplate.innerHTML = /* html */ `
  <button
    type="button"
    class="
      inline-flex
      items-center
      px-4
      py-2
      border border-transparent
      text-sm
      font-medium
      rounded-md
      shadow-sm
      text-white
      bg-gray-600
      hover:bg-gray-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
    "
  >
    <div data-flag="children"></div>
  </button>
`;

$smButtonTemplate.innerHTML = /* html */ `
  <button
    type="button"
    class="
      inline-flex
      items-center
      px-3
      py-2
      border border-transparent
      text-sm
      leading-4
      font-medium
      rounded-md
      shadow-sm
      text-white
      bg-gray-600
      hover:bg-gray-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
    "
  >
    <div data-flag="children"></div>
  </button>
`;

$xsButtonTemplate.innerHTML = /* html */ `
  <button
    type="button"
    class="
      inline-flex
      items-center
      px-2.5
      py-1.5
      border border-transparent
      text-xs
      font-medium
      rounded
      shadow-sm
      text-white
      bg-gray-600
      hover:bg-gray-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
    "
  >
    <div data-flag="children"></div>
  </button>
`;

interface Props {
  // kind: 'primary' | 'white';
  size: 'xl' | 'lg' | 'base' | 'sm' | 'xs';
  children?: Node | string;
  onClick?: (ev: MouseEvent) => void;
}

export const createButton = ({ size, children, onClick }: Props) => {
  let $template = $xlButtonTemplate;
  switch (size) {
    case 'xl': {
      $template = $xlButtonTemplate;
      break;
    }
    case 'lg': {
      $template = $lgButtonTemplate;
      break;
    }
    case 'base': {
      $template = $baseButtonTemplate;
      break;
    }
    case 'sm': {
      $template = $smButtonTemplate;
      break;
    }
    case 'xs': {
      $template = $xsButtonTemplate;
      break;
    }
  }

  const $element = $template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLButtonElement;

  if (onClick) {
    $element.addEventListener('click', onClick);
  }

  const $childrenFlag = $element.querySelector('[data-flag="children"]');
  if ($childrenFlag) {
    $childrenFlag.replaceWith(children ?? '');
  }

  return $element;
};
