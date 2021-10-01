const $template = document.createElement('template');

$template.innerHTML = /* html */ `
  <button
    type="button"
    class="
      shadow-sm
      py-3
      px-4
      rounded-lg
      bg-white
      border border-gray-300
      hover:border-gray-400
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
    "
  >
    <div data-target="children"></div>
  </button>
`;

interface Props {
  children?: Node | string;
}

export const createCard = ({ children }: Props) => {
  const $element = $template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

  const $childrenTarget = $element.querySelector('[data-target="children"]');
  if ($childrenTarget) {
    $childrenTarget.replaceWith(children ?? '');
  }

  return $element;
};
