const $tabTemplate = document.createElement('template');
const $selectedTabTemplate = document.createElement('template');

$tabTemplate.innerHTML = /* html */ `
  <a
    href="#"
    class="
      text-gray-600
      hover:text-gray-800
      px-3
      py-2
      font-medium
      text-sm
      rounded-md
    "
  >
    <div data-target="name"></div>
  </a>
`;

$selectedTabTemplate.innerHTML = /* html */ `
  <a
    href="#"
    class="bg-gray-200 text-gray-800 px-3 py-2 font-medium text-sm rounded-md"
    aria-current="page"
  >
    <div data-target="name"></div>
  </a>
`;

export type TabKey = string | number;

export type Tab = {
  key: TabKey;
  name: string;
};
interface Props extends Tab {
  activeKey: TabKey;
  onClick: (key: TabKey) => void;
}

export const createTab = ({ key, activeKey, name, onClick }: Props) => {
  const $template = key === activeKey ? $selectedTabTemplate : $tabTemplate;
  const $element = $template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLAnchorElement;

  $element.addEventListener('click', () => {
    onClick(key);
  });

  const $nameTarget = $element.querySelector('[data-target="name"]');
  if ($nameTarget) {
    $nameTarget.replaceWith(name);
  }

  return $element;
};
