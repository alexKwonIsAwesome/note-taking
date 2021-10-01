import { createTab, Tab, TabKey } from './Tab';

const $pillWhiteBgTabsTemplate = document.createElement('template');
$pillWhiteBgTabsTemplate.innerHTML = /* html */ `
  <div>
    <nav class="flex space-x-4" aria-label="Tabs">
      <div data-target="tabs"></div>
    </nav>
  </div>
`;

interface Props {
  kind?: 'pill' | 'underline';
  bgStyle?: 'white' | 'gray';
  tabs?: Tab[];
  activeKey?: TabKey;
  onChange?: (key: TabKey) => void;
}

export const createTabs = ({
  kind,
  bgStyle,
  tabs = [],
  activeKey = 0,
  onChange,
}: Props) => {
  const $template = $pillWhiteBgTabsTemplate; // TODO: Assign different template by props
  const $element = $template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

  const $tabsFragment = new DocumentFragment();
  tabs.forEach(({ key, name }) => {
    $tabsFragment.appendChild(
      createTab({
        key,
        activeKey,
        name,
        onClick: (key) => {
          if (onChange) {
            onChange(key);
          }
        },
      })
    );
  });

  const $tabsTarget = $element.querySelector('[data-target="tabs"]');
  if ($tabsTarget) {
    $tabsTarget.replaceWith($tabsFragment);
  }

  return $element;
};
