import { createCard } from '../card/Card';

const $template = document.createElement('template');
$template.innerHTML = /* html */ `
  <div class="aspect-w-1 aspect-h-1 text-left">
    <div data-target="card"></div>
  </div>
`;

const $childrenTemplate = document.createElement('template');
$childrenTemplate.innerHTML = /* html */ `
  <div class="-mt-2 h-full text-left overflow-hidden">
    <div>
      <p class="line-clamp-2 max-h-14 m-0 text-lg font-medium text-gray-900">
        <span data-target="title"></span>
      </p>
    </div>
    <div class="mt-2">
      <p class="line-clamp-5 m-0 text-sm text-gray-500">
        <span data-target="content"></span>
      </p>
    </div>
  </div>
`;

export interface Note {
  title: string;
  content: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends Note {
  onClick: () => void;
}

export const createNoteCard = ({ title, content, onClick }: Props) => {
  const $element = $template.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

  if (onClick) {
    $element.addEventListener('click', onClick);
  }

  const $children = $childrenTemplate.content.firstElementChild!.cloneNode(
    true
  ) as HTMLElement;

  const $titleTarget = $children.querySelector('[data-target="title"]');
  if ($titleTarget) {
    $titleTarget.replaceWith(title);
  }

  const $contentTarget = $children.querySelector('[data-target="content"]');
  if ($contentTarget) {
    $contentTarget.replaceWith(content);
  }

  const $cardTarget = $element.querySelector('[data-target="card"]');
  if ($cardTarget) {
    $cardTarget.replaceWith(
      createCard({
        children: $children,
      })
    );
  }

  return $element;
};
