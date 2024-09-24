const isScrollElement = (element) => {
  const clientHeight = element === document.documentElement ? element.clientHeight : element.offsetHeight;
  const clientWidth = element === document.documentElement ? element.clientWidth : element.offsetWidth;
  return element.scrollHeight > clientHeight || element.scrollWidth > clientWidth;
};
const getScrollParentElement = (container, top = document.documentElement) => {
  let scrollElement = void 0;
  let element = container;
  while (element && element !== top && !scrollElement) {
    if (isScrollElement(element)) {
      scrollElement = element;
    }
    element = element.parentElement;
  }
  return scrollElement;
};
const isSiblingElement = (a, b) => {
  return a.previousElementSibling === b || a.nextElementSibling === b;
};
const findAncestorWithClass = (element, className) => {
  let ancestor = element.parentElement;
  while (ancestor) {
    if (ancestor.classList.contains(className)) {
      return ancestor;
    }
    ancestor = ancestor.parentElement;
  }
  return null;
};
function getPrevSibling(element) {
  let sibling = element.previousElementSibling;
  while (sibling && (sibling.nodeType === 3 || sibling.nodeType === 8)) {
    sibling = sibling.previousElementSibling;
  }
  if (sibling == null ? void 0 : sibling.classList.contains("virt-tree-item"))
    return sibling;
  return void 0;
}
function getNextSibling(element) {
  let sibling = element.nextElementSibling;
  while (sibling && (sibling.nodeType === 3 || sibling.nodeType === 8)) {
    sibling = sibling.nextElementSibling;
  }
  if (sibling == null ? void 0 : sibling.classList.contains("virt-tree-item"))
    return sibling;
  return void 0;
}
export {
  findAncestorWithClass,
  getNextSibling,
  getPrevSibling,
  getScrollParentElement,
  isScrollElement,
  isSiblingElement
};
