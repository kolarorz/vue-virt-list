export const isScrollElement = (element: HTMLElement) => {
  const clientHeight =
    element === document.documentElement
      ? element.clientHeight
      : element.offsetHeight;
  const clientWidth =
    element === document.documentElement
      ? element.clientWidth
      : element.offsetWidth;

  return (
    element.scrollHeight > clientHeight || element.scrollWidth > clientWidth
  );
};

/**
 * 从当前节点向上查找所有的滚动元素
 * @param container 当前节点
 * @param top 查找到 top 节点就终止，不再继续查找
 * @returns
 */
export const getScrollElements = (
  container: HTMLElement,
  top: HTMLElement = document.documentElement,
): HTMLElement[] => {
  const scrollElements: HTMLElement[] = [];
  let element: HTMLElement | null = container;
  while (element && element !== top) {
    if (isScrollElement(element)) {
      scrollElements.push(element);
    }
    element = element.parentElement;
  }
  return scrollElements;
};

export const getScrollParentElement = (
  container: HTMLElement,
  top: HTMLElement = document.documentElement,
): HTMLElement | null => {
  let scrollElement: HTMLElement | null = null;
  let element: HTMLElement | null = container;
  while (element && element !== top && !scrollElement) {
    if (isScrollElement(element)) {
      scrollElement = element;
    }
    element = element.parentElement;
  }
  return scrollElement;
};

export const isSiblingElement = (a: Element, b: Element) => {
  return a.previousElementSibling === b || a.nextElementSibling === b;
};

export const findAncestorWithClass = (element: Element, className: string) => {
  let ancestor = element.parentElement;

  while (ancestor) {
    if (ancestor.classList.contains(className)) {
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  }

  return null; // 如果没有找到包含指定类名的祖先元素
};

export function getPrevSibling(element: Element) {
  let sibling = element.previousElementSibling;

  // 忽略文本节点或注释节点
  while (sibling && (sibling.nodeType === 3 || sibling.nodeType === 8)) {
    sibling = sibling.previousElementSibling;
  }

  if (sibling?.classList.contains('virt-tree-item')) return sibling;
  return undefined;
}

export function getNextSibling(element: Element) {
  let sibling = element.nextElementSibling;

  // 忽略文本节点或注释节点
  while (sibling && (sibling.nodeType === 3 || sibling.nodeType === 8)) {
    sibling = sibling.nextElementSibling;
  }

  if (sibling?.classList.contains('virt-tree-item')) return sibling;
  return undefined;
}

// export function getDragoverPlacement(placement: number[]) {
//   if (placement.length <= 0) {
//     return [0.33, 0.66];
//   }

//   if (placement.length === 1) {
//     const placementNumber = Number(placement[0]);
//     const inValidNumber = isNaN(placementNumber);
//     if (inValidNumber || placementNumber < 0 || placementNumber > 100) {
//       return [0.33, 0.66];
//     }
//     return [placementNumber / 100, 1 - placementNumber / 100];
//   }

//   const innerPlacement = placement.slice(0, 2);
//   const inValidNumber = innerPlacement.some(
//     (item) => isNaN(Number(item)) || Number(item) < 0 || Number(item) > 100,
//   );

//   if (inValidNumber) {
//     return [0.33, 0.66];
//   }

//   const topPlacement = Number(innerPlacement[0]) / 100;
//   const bottomPlacement = Number(innerPlacement[1]) / 100;
//   if (topPlacement + bottomPlacement > 1) {
//     return [topPlacement, 1 - topPlacement];
//   }

//   return [topPlacement, bottomPlacement];
// }

// function getPrevSiblingTreeContent(hoverTreeItem: Element) {
//   // 找到 hoverTreeItem 的前一个元素，可能不存在
//   const hoverTreeItemPrevious = getPrevSibling(hoverTreeItem as Element);
//   let preTreeNodeContentElement: Element | null = null;
//   for (const child of Array.from(
//     hoverTreeItemPrevious?.firstElementChild?.children ?? [],
//   )) {
//     if (child.classList?.contains('virt-tree-node-content')) {
//       preTreeNodeContentElement = child;
//     }
//   }
//   // console.warn('前一个', preTreeNodeContentElement);
//   return preTreeNodeContentElement;
// }

// function getNextSiblingTreeContent(hoverTreeItem: Element) {
//   const hoverTreeItemNext = getNextSibling(hoverTreeItem as Element);
//   let nextTreeNodeContentElement: Element | null = null;
//   for (const child of Array.from(
//     hoverTreeItemNext?.firstElementChild?.children ?? [],
//   )) {
//     if (child.classList?.contains('virt-tree-node-content')) {
//       nextTreeNodeContentElement = child;
//     }
//   }
//   console.warn('后一个', nextTreeNodeContentElement);
// }
