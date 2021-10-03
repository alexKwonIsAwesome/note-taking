export const applyDiff = (
  parent: HTMLElement,
  target: HTMLElement,
  source: HTMLElement
) => {
  if (target && !source) {
    target.remove();
    return;
  }

  if (!target && source) {
    parent.appendChild(source);
    return;
  }

  if (areTwoNodesDifferent(target, source)) {
    target.replaceWith(source);
    return;
  }

  const targetChildren = Array.from(target.children);
  const sourceChildren = Array.from(source.children);

  const maxChildrenLength = Math.max(
    targetChildren.length,
    sourceChildren.length
  );

  for (let i = 0; i < maxChildrenLength; i += 1) {
    applyDiff(
      target,
      targetChildren[i] as HTMLElement,
      sourceChildren[i] as HTMLElement
    );
  }
};

const areTwoNodesDifferent = (a: HTMLElement, b: HTMLElement): boolean => {
  const aAttr = a.attributes;
  const bAttr = b.attributes;

  if (aAttr.length !== bAttr.length) {
    return true;
  }

  const isAttrDiffernt = Array.from(aAttr).find((attr) => {
    return a.getAttribute(attr.name) !== b.getAttribute(attr.name);
  });
  if (isAttrDiffernt) {
    return true;
  }

  if (
    a.children.length === 0 &&
    b.children.length === 0 &&
    a.textContent !== b.textContent
  ) {
    return true;
  }

  return false;
};
