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
  const dragBox = document.createElement("div");
  dragBox.classList.add("virt-tree-drag-box");
  const dragLine = document.createElement("div");
  dragLine.classList.add("virt-tree-drag-line");
  dragLine.style.paddingLeft = `${props.indent}px`;
  const levelArrow = document.createElement("div");
  levelArrow.classList.add("virt-tree-drag-line-arrow");
  function onDragstart(event) {
    event.preventDefault();
    sourceTreeItem = event.composedPath().find(
      (v) => {
        var _a;
        return (_a = v.classList) == null ? void 0 : _a.contains("virt-tree-item");
      }
    );
    event.preventDefault();
    event.stopPropagation();
    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("mouseup", onMouseup);
    document.addEventListener("keydown", onKeydown);
  }
  function dragstart() {
    var _a, _b, _c, _d;
    if (!sourceTreeItem)
      return;
    const clientElement = (_a = virtListRef.value) == null ? void 0 : _a.$el;
    scrollElement = getScrollParentElement(clientElement);
    scrollElementRect = scrollElement == null ? void 0 : scrollElement.getBoundingClientRect();
    const nodeKey = (_c = (_b = sourceTreeItem == null ? void 0 : sourceTreeItem.dataset) == null ? void 0 : _b.id) != null ? _c : "";
    sourceNode = getTreeNode(nodeKey);
    if (!sourceNode)
      return;
    if ((_d = sourceNode.data) == null ? void 0 : _d.disableDragOut) {
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
  function onMousemove(event) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    if (!cloneTreeItem) {
      dragstart();
    }
    if (!cloneTreeItem)
      return;
    dragging.value = true;
    const clientX = event.clientX;
    const clientY = event.clientY;
    const dx = clientX - startX;
    const dy = clientY - startY;
    cloneTreeItem.style.left = `${initialX + dx}px`;
    cloneTreeItem.style.top = `${initialY + dy}px`;
    const clientElement = (_a = virtListRef.value) == null ? void 0 : _a.$el;
    const clientElementRect = clientElement == null ? void 0 : clientElement.getBoundingClientRect();
    if (clientElementRect) {
      if (clientX < clientElementRect.left || clientX > clientElementRect.right || clientY < clientElementRect.top || clientY > clientElementRect.bottom) {
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
    if (scrollElement && scrollElementRect) {
      if (clientY > scrollElementRect.bottom) {
        if (!autoScrollTimer) {
          autoScrollTimer = setInterval(() => {
            scrollElement.scrollTop += 2;
          }, 10);
        }
      } else if (clientY < scrollElementRect.top) {
        if (!autoScrollTimer) {
          autoScrollTimer = setInterval(() => {
            scrollElement.scrollTop -= 2;
          }, 10);
        }
      } else {
        if (autoScrollTimer) {
          clearInterval(autoScrollTimer);
          autoScrollTimer = null;
        }
      }
    }
    const hoverElement = document.elementFromPoint(clientX, clientY);
    if (!hoverElement)
      return;
    hoverTreeItem = findAncestorWithClass(hoverElement, "virt-tree-item");
    if (!hoverTreeItem) {
      return;
    }
    const hoverTreeId = (_b = hoverTreeItem == null ? void 0 : hoverTreeItem.dataset) == null ? void 0 : _b.id;
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
    const mouseY = event.clientY;
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
        const id = (_c = hoverTreeItem == null ? void 0 : hoverTreeItem.dataset) == null ? void 0 : _c.id;
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
        if ((_d = node.data) == null ? void 0 : _d.disableDragIn)
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
      const prevId = (_e = prevTreeItem == null ? void 0 : prevTreeItem.dataset) == null ? void 0 : _e.id;
      const nextId = (_f = nextTreeItem == null ? void 0 : nextTreeItem.dataset) == null ? void 0 : _f.id;
      prevElementNode = prevId ? getTreeNode(prevId) : void 0;
      nextNode = nextId ? getTreeNode(nextId) : void 0;
      minLevel = Math.min((_g = prevElementNode == null ? void 0 : prevElementNode.level) != null ? _g : 1, (_h = nextNode == null ? void 0 : nextNode.level) != null ? _h : 1);
      maxLevel = Math.max((_i = prevElementNode == null ? void 0 : prevElementNode.level) != null ? _i : 1, (_j = nextNode == null ? void 0 : nextNode.level) != null ? _j : 1);
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
      const relativeX = clientX - hoverTreeItemRect.left - props.indent;
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
