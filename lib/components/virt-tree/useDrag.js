import "vue-demi";
import { DRAGSTART, DRAGEND } from "./useTree.js";
import { getScrollParentElement, findAncestorWithClass, isSiblingElement, getPrevSibling, getNextSibling } from "./utils.js";
const useDrag = ({
  props,
  virtListRef,
  dragging,
  getTreeNode,
  hasExpanded,
  expandNode,
  emits
}) => {
  let startX = 0;
  let startY = 0;
  let initialX = 10;
  let initialY = 10;
  let mouseX = 0;
  let mouseY = 0;
  let dragEffect = false;
  let minLevel = 1;
  let maxLevel = 1;
  let targetLevel = 1;
  let placement = "";
  let lastPlacement = "";
  let sourceTreeItem = null;
  let cloneTreeItem = null;
  let hasStyleTreeItem = null;
  let hoverTreeItem = null;
  let lastHoverTreeItem = null;
  let prevTreeItem = null;
  let nextTreeItem = null;
  let scrollElement = null;
  let hoverExpandTimer = null;
  let autoScrollTimer = null;
  let sourceNode = void 0;
  let prevElementNode = void 0;
  let parentNode = void 0;
  let prevNode = void 0;
  let nextNode = void 0;
  let scrollElementRect = void 0;
  let clientElementRect = void 0;
  const dragBox = document.createElement("div");
  dragBox.classList.add("virt-tree-drag-box");
  const dragLine = document.createElement("div");
  dragLine.classList.add("virt-tree-drag-line");
  dragLine.style.paddingLeft = `${props.indent}px`;
  const levelArrow = document.createElement("div");
  levelArrow.classList.add("virt-tree-drag-line-arrow");
  function onDragstart(event) {
    var _a;
    event.preventDefault();
    sourceTreeItem = event.composedPath().find(
      (v) => {
        var _a2;
        return (_a2 = v.classList) == null ? void 0 : _a2.contains("virt-tree-item");
      }
    );
    event.preventDefault();
    event.stopPropagation();
    const clientElement = (_a = virtListRef.value) == null ? void 0 : _a.$el;
    clientElementRect = clientElement == null ? void 0 : clientElement.getBoundingClientRect();
    scrollElement = getScrollParentElement(clientElement);
    scrollElementRect = scrollElement == null ? void 0 : scrollElement.getBoundingClientRect();
    scrollElement == null ? void 0 : scrollElement.addEventListener("scroll", onScroll);
    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("mouseup", onMouseup);
    document.addEventListener("keydown", onKeydown);
  }
  function onScroll() {
    if (dragging.value) {
      dragProcess();
    }
  }
  function dragstart() {
    var _a, _b, _c;
    if (!sourceTreeItem)
      return;
    const nodeKey = (_b = (_a = sourceTreeItem == null ? void 0 : sourceTreeItem.dataset) == null ? void 0 : _a.id) != null ? _b : "";
    sourceNode = getTreeNode(nodeKey);
    if (!sourceNode)
      return;
    if ((_c = sourceNode.data) == null ? void 0 : _c.disableDragOut) {
      return;
    }
    emits(DRAGSTART, {
      sourceNode
    });
    const isExpanded = hasExpanded(sourceNode);
    if (isExpanded) {
      expandNode(nodeKey, false);
    }
    const sourceTreeItemRect = sourceTreeItem.getBoundingClientRect();
    sourceTreeItem.classList.add("virt-tree-item--drag");
    if (props.dragClass) {
      sourceTreeItem.classList.add(props.dragClass);
    }
    cloneTreeItem = sourceTreeItem.cloneNode(true);
    cloneTreeItem.classList.add("virt-tree-item--ghost");
    if (props.dragGhostClass) {
      cloneTreeItem.classList.add(props.dragGhostClass);
    }
    cloneTreeItem.style.position = "fixed";
    cloneTreeItem.style.width = `${sourceTreeItemRect.width}px`;
    cloneTreeItem.style.height = `${sourceTreeItemRect.height}px`;
    document.body.append(cloneTreeItem);
    return cloneTreeItem;
  }
  function autoScroll() {
    if (scrollElement !== null && scrollElementRect !== void 0) {
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
      if (clientElementRect) {
        if (mouseX < clientElementRect.left || mouseX > clientElementRect.right || mouseY < clientElementRect.top || mouseY > clientElementRect.bottom) {
          return;
        }
      }
      const equalPart = scrollElementRect.height / 4;
      const multiple = 20;
      if (scrollElementRect.top < mouseY && mouseY < scrollElementRect.top + equalPart) {
        const relative = (1 - (mouseY - scrollElementRect.top) / equalPart) * multiple;
        if (!autoScrollTimer) {
          autoScrollTimer = setInterval(() => {
            scrollElement.scrollTop -= relative;
          }, 10);
        }
      } else if (scrollElementRect.top + equalPart * 3 < mouseY && mouseY < scrollElementRect.bottom) {
        const relative = (mouseY - (scrollElementRect.top + equalPart * 3)) / equalPart * multiple;
        if (!autoScrollTimer) {
          autoScrollTimer = setInterval(() => {
            scrollElement.scrollTop += relative;
          }, 10);
        }
      }
    }
  }
  function dragProcess() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    if (clientElementRect) {
      if (mouseX < clientElementRect.left || mouseX > clientElementRect.right || mouseY < clientElementRect.top || mouseY > clientElementRect.bottom) {
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragLine)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragLine);
        }
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragBox)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragBox);
        }
        lastHoverTreeItem = null;
        dragEffect = false;
      }
    }
    const hoverElement = document.elementFromPoint(mouseX, mouseY);
    if (!hoverElement)
      return;
    hoverTreeItem = findAncestorWithClass(hoverElement, "virt-tree-item");
    if (!hoverTreeItem) {
      return;
    }
    const hoverTreeId = (_a = hoverTreeItem == null ? void 0 : hoverTreeItem.dataset) == null ? void 0 : _a.id;
    if (!hoverTreeId)
      return;
    const hoverTreeNode = getTreeNode(hoverTreeId);
    if (!hoverTreeNode)
      return;
    if (hoverTreeItem === sourceTreeItem) {
      if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragLine)) {
        hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragLine);
      }
      if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragBox)) {
        hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragBox);
      }
      dragEffect = false;
      return;
    }
    const hoverTreeItemRect = hoverTreeItem == null ? void 0 : hoverTreeItem.getBoundingClientRect();
    if (!hoverTreeItemRect)
      return;
    const elementTop = hoverTreeItemRect.top;
    const elementHeight = hoverTreeItemRect.height;
    const relativeY = mouseY - elementTop;
    const positionRatio = relativeY / elementHeight;
    if (positionRatio < 0.33) {
      placement = "top";
    } else if (positionRatio > 0.66) {
      placement = "bottom";
    } else {
      placement = "center";
    }
    if (lastHoverTreeItem !== hoverTreeItem || placement !== lastPlacement) {
      if (lastHoverTreeItem && !isSiblingElement(lastHoverTreeItem, hoverTreeItem)) {
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragLine)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragLine);
        }
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragBox)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragBox);
        }
      }
      lastPlacement = placement;
      lastHoverTreeItem = hoverTreeItem;
      if (hoverExpandTimer) {
        clearTimeout(hoverExpandTimer);
        hoverExpandTimer = null;
      }
      if (placement === "center") {
        dragEffect = false;
        const id = (_b = hoverTreeItem == null ? void 0 : hoverTreeItem.dataset) == null ? void 0 : _b.id;
        if (!id)
          return;
        const node = getTreeNode(id);
        if (!node)
          return;
        parentNode = node;
        prevNode = void 0;
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragLine)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragLine);
        }
        if ((_c = node.data) == null ? void 0 : _c.disableDragIn)
          return;
        hoverTreeItem == null ? void 0 : hoverTreeItem.appendChild(dragBox);
        hasStyleTreeItem = hoverTreeItem;
        dragEffect = true;
        if (hoverExpandTimer) {
          clearTimeout(hoverExpandTimer);
          hoverExpandTimer = null;
        }
        const isExpanded = hasExpanded(node);
        if (!isExpanded) {
          if (!hoverExpandTimer) {
            hoverExpandTimer = setTimeout(() => {
              expandNode(id, true);
              if (hoverExpandTimer) {
                clearTimeout(hoverExpandTimer);
                hoverExpandTimer = null;
              }
            }, 500);
          }
        }
        return;
      }
      dragEffect = true;
      if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragBox)) {
        hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragBox);
      }
      hoverTreeItem == null ? void 0 : hoverTreeItem.appendChild(dragLine);
      hasStyleTreeItem = hoverTreeItem;
      if (placement === "top") {
        dragLine.style.top = "-1px";
        dragLine.style.bottom = "auto";
        nextTreeItem = hoverTreeItem;
        prevTreeItem = getPrevSibling(hoverTreeItem);
      } else {
        dragLine.style.top = "auto";
        dragLine.style.bottom = "-1px";
        prevTreeItem = hoverTreeItem;
        nextTreeItem = getNextSibling(hoverTreeItem);
      }
      const prevId = (_d = prevTreeItem == null ? void 0 : prevTreeItem.dataset) == null ? void 0 : _d.id;
      const nextId = (_e = nextTreeItem == null ? void 0 : nextTreeItem.dataset) == null ? void 0 : _e.id;
      prevElementNode = prevId ? getTreeNode(prevId) : void 0;
      nextNode = nextId ? getTreeNode(nextId) : void 0;
      minLevel = Math.min((_f = prevElementNode == null ? void 0 : prevElementNode.level) != null ? _f : 1, (_g = nextNode == null ? void 0 : nextNode.level) != null ? _g : 1);
      maxLevel = Math.max((_h = prevElementNode == null ? void 0 : prevElementNode.level) != null ? _h : 1, (_i = nextNode == null ? void 0 : nextNode.level) != null ? _i : 1);
      dragLine.innerHTML = "";
      for (let i = 0; i < maxLevel; i++) {
        const lineBlock = document.createElement("div");
        if (i === maxLevel - 1) {
          lineBlock.style.flex = "1";
        } else {
          lineBlock.style.width = `${props.indent - 4}px`;
        }
        lineBlock.style.height = "100%";
        lineBlock.style.position = "relative";
        dragLine.appendChild(lineBlock);
      }
    }
    if (placement !== "center") {
      const relativeX = mouseX - hoverTreeItemRect.left - props.indent;
      targetLevel = Math.ceil(relativeX / props.indent);
      if (targetLevel <= minLevel)
        targetLevel = minLevel;
      if (targetLevel >= maxLevel)
        targetLevel = maxLevel;
      const targetElement = dragLine.childNodes[targetLevel - 1];
      targetElement.appendChild(levelArrow);
      for (let i = minLevel - 1; i <= maxLevel - 1; i++) {
        const current = dragLine.childNodes[i];
        if (i < targetLevel - 1) {
          current.style.backgroundColor = "var(--virt-tree-color-drag-line-disabled)";
        } else {
          current.style.backgroundColor = "var(--virt-tree-color-drag-line)";
        }
      }
    }
  }
  function onMousemove(event) {
    if (!cloneTreeItem) {
      dragstart();
    }
    if (!cloneTreeItem)
      return;
    dragging.value = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
    const dx = mouseX - startX;
    const dy = mouseY - startY;
    cloneTreeItem.style.left = `${initialX + dx}px`;
    cloneTreeItem.style.top = `${initialY + dy}px`;
    autoScroll();
    dragProcess();
  }
  function onMouseup() {
    if (dragging.value) {
      setTimeout(() => {
        dragging.value = false;
      }, 0);
      if (!sourceNode)
        return;
      if (placement !== "center") {
        parentNode = void 0;
        if (prevElementNode) {
          if (prevElementNode.level >= targetLevel) {
            let diffLevel = prevElementNode.level - targetLevel;
            prevNode = prevElementNode;
            parentNode = prevElementNode.parent;
            while (diffLevel > 0) {
              prevNode = prevNode == null ? void 0 : prevNode.parent;
              parentNode = parentNode == null ? void 0 : parentNode.parent;
              diffLevel--;
            }
          } else {
            if (targetLevel - prevElementNode.level === 1) {
              parentNode = prevElementNode;
            } else {
              parentNode = prevElementNode.parent;
              prevNode = prevElementNode;
            }
          }
        }
      }
      emits(
        DRAGEND,
        dragEffect ? {
          node: sourceNode,
          prevNode,
          parentNode
        } : void 0
      );
      if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragLine)) {
        hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragLine);
      }
      if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragBox)) {
        hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragBox);
      }
      if (cloneTreeItem) {
        if (props.dragGhostClass) {
          cloneTreeItem.classList.remove(props.dragGhostClass);
        }
        document.body.removeChild(cloneTreeItem);
        cloneTreeItem = null;
      }
      if (sourceTreeItem) {
        if (props.dragClass) {
          sourceTreeItem.classList.remove(props.dragClass);
        }
        sourceTreeItem.classList.remove("virt-tree-item--drag");
        sourceTreeItem = null;
      }
      if (hoverExpandTimer) {
        clearTimeout(hoverExpandTimer);
        hoverExpandTimer = null;
      }
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
    }
    if (sourceTreeItem) {
      sourceTreeItem.style.opacity = "1";
      sourceTreeItem = null;
    }
    scrollElement == null ? void 0 : scrollElement.removeEventListener("scroll", onScroll);
    document.removeEventListener("mousemove", onMousemove);
    document.removeEventListener("mouseup", onMouseup);
  }
  function onKeydown(event) {
    if (event.key === "Escape") {
      dragEffect = false;
      onMouseup();
    }
  }
  return {
    onDragstart
  };
};
export {
  useDrag
};
