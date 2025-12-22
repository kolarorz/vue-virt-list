import "vue-demi";
import { DRAGSTART, DRAGEND } from "./useTree.js";
import { getScrollParentElement, findAncestorWithClass, isSiblingElement, getPrevSibling, getNextSibling } from "./utils.js";
const useDrag = ({
  props,
  treeInfo,
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
  let dragAreaBottom = false;
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
  let dragAreaParentElement = null;
  let hoverExpandTimer = null;
  let autoScrollTimer = null;
  let sourceNode = void 0;
  let prevElementNode = void 0;
  let parentNode = void 0;
  let prevNode = void 0;
  let nextNode = void 0;
  let scrollElementRect = void 0;
  let clientElementRect = void 0;
  let topPlacement = 0.33;
  let bottomPlacement = 0.66;
  const dragBox = document.createElement("div");
  dragBox.classList.add("virt-tree-drag-box");
  const dragLine = document.createElement("div");
  dragLine.classList.add(
    props.crossLevelDraggable ? "virt-tree-drag-line" : "virt-tree-drag-line-same-level"
  );
  dragLine.style.paddingLeft = `${props.indent}px`;
  const levelArrow = document.createElement("div");
  levelArrow.classList.add("virt-tree-drag-line-arrow");
  const allowDragArea = document.createElement("div");
  allowDragArea.classList.add("virt-tree-all-drag-area");
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
  function calcSize(nodes) {
    var _a, _b;
    let size = 0;
    for (const child of nodes || []) {
      if (child.children && ((_a = child.children) == null ? void 0 : _a.length) > 0 && hasExpanded(child)) {
        size += calcDragArea(child);
      }
      size += (_b = virtListRef.value) == null ? void 0 : _b.getItemSize(child.key);
    }
    return size;
  }
  function calcDragArea(parentNode2) {
    if (!parentNode2) {
      return calcSize(treeInfo.treeNodes || []);
    }
    return calcSize((parentNode2 == null ? void 0 : parentNode2.children) || []);
  }
  function createDragArea(sourceNode2) {
    var _a, _b, _c;
    if (!sourceNode2)
      return;
    const dragAreaSize = calcDragArea(sourceNode2.parent);
    dragAreaParentElement = document.querySelector(
      (sourceNode2 == null ? void 0 : sourceNode2.level) === 1 ? `.virt-list__client .${props.customGroup}` : `.${props.customGroup} [data-id="${(_a = sourceNode2 == null ? void 0 : sourceNode2.parent) == null ? void 0 : _a.key}"]`
    );
    const parentElRect = dragAreaParentElement == null ? void 0 : dragAreaParentElement.getBoundingClientRect();
    allowDragArea.style.width = `${parentElRect.width}px`;
    allowDragArea.style.height = `${dragAreaSize}px`;
    allowDragArea.style.top = `${(sourceNode2 == null ? void 0 : sourceNode2.level) === 1 ? 0 : parentElRect.height + ((_b = dragAreaParentElement == null ? void 0 : dragAreaParentElement.offsetTop) != null ? _b : 0)}px`;
    virtListRef.value.listRefEl.style.position = "relative";
    (_c = virtListRef.value) == null ? void 0 : _c.listRefEl.append(allowDragArea);
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
    if (!props.crossLevelDraggable) {
      createDragArea(sourceNode);
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
  function buildDragLine(level) {
    dragLine.innerHTML = "";
    for (let i = 0; i < level; i++) {
      const lineBlock = document.createElement("div");
      if (i === level - 1) {
        lineBlock.style.flex = "1";
        lineBlock.style.backgroundColor = "var(--virt-tree-color-drag-line)";
      } else {
        lineBlock.style.width = `${props.indent - 4}px`;
      }
      lineBlock.style.height = "100%";
      lineBlock.style.position = "relative";
      dragLine.appendChild(lineBlock);
    }
  }
  function findTargetLevelParent(childNode, targetLevel2) {
    if (!childNode || !targetLevel2)
      return null;
    let parentNode2 = childNode.parent;
    while (parentNode2) {
      if (parentNode2.level === targetLevel2) {
        return parentNode2;
      }
      parentNode2 = parentNode2.parent;
    }
    return null;
  }
  function updateDragRelateNode(hoverTreeItem2) {
    var _a, _b;
    hoverTreeItem2 == null ? void 0 : hoverTreeItem2.appendChild(dragLine);
    hasStyleTreeItem = hoverTreeItem2;
    if (placement === "top") {
      dragLine.style.top = "-1px";
      dragLine.style.bottom = "auto";
      nextTreeItem = hoverTreeItem2;
      prevTreeItem = getPrevSibling(hoverTreeItem2);
    } else {
      dragLine.style.top = "auto";
      dragLine.style.bottom = "-1px";
      prevTreeItem = hoverTreeItem2;
      nextTreeItem = getNextSibling(hoverTreeItem2);
    }
    const prevId = (_a = prevTreeItem == null ? void 0 : prevTreeItem.dataset) == null ? void 0 : _a.id;
    const nextId = (_b = nextTreeItem == null ? void 0 : nextTreeItem.dataset) == null ? void 0 : _b.id;
    prevElementNode = prevId ? getTreeNode(prevId) : void 0;
    nextNode = nextId ? getTreeNode(nextId) : void 0;
  }
  function sameLevelDragProcess(hoverTreeNode, hoverTreeItem2, positionRatio) {
    var _a, _b, _c, _d;
    if (hoverTreeNode.isLast && hoverTreeNode.isLeaf) {
      const allDragLevelNode = findTargetLevelParent(
        hoverTreeNode,
        sourceNode == null ? void 0 : sourceNode.level
      );
      if (allDragLevelNode == null ? void 0 : allDragLevelNode.isLast) {
        placement = "bottom";
        dragEffect = true;
        dragAreaBottom = true;
        updateDragRelateNode(hoverTreeItem2);
        const currentLevel = (_a = sourceNode == null ? void 0 : sourceNode.level) != null ? _a : 1;
        targetLevel = currentLevel;
        buildDragLine(currentLevel);
        return;
      }
    }
    dragAreaBottom = false;
    if (hoverTreeNode.level !== (sourceNode == null ? void 0 : sourceNode.level) || ((_b = hoverTreeNode.parent) == null ? void 0 : _b.data.id) !== ((_c = sourceNode == null ? void 0 : sourceNode.parent) == null ? void 0 : _c.data.id)) {
      prevTreeItem = null;
      nextTreeItem = null;
      return;
    }
    if (positionRatio > topPlacement) {
      placement = "bottom";
    } else {
      placement = "top";
    }
    if (placement === "bottom" && hasExpanded(hoverTreeNode)) {
      lastHoverTreeItem = null;
      prevTreeItem = null;
      nextTreeItem = null;
      return;
    }
    if (lastHoverTreeItem !== hoverTreeItem2 || placement !== lastPlacement) {
      if (lastHoverTreeItem && !isSiblingElement(lastHoverTreeItem, hoverTreeItem2)) {
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragLine)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragLine);
        }
      }
      lastPlacement = placement;
      lastHoverTreeItem = hoverTreeItem2;
      dragEffect = true;
      updateDragRelateNode(hoverTreeItem2);
      const currentLevel = (_d = hoverTreeNode == null ? void 0 : hoverTreeNode.level) != null ? _d : 1;
      targetLevel = currentLevel;
      buildDragLine(currentLevel);
    }
  }
  function crossLevelDragProcess(hoverTreeItem2, positionRatio, hoverTreeItemRect, hoverTreeNode, hoverTreeId) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (positionRatio < topPlacement) {
      placement = "top";
    } else if (positionRatio > bottomPlacement) {
      placement = "bottom";
    } else {
      placement = "center";
    }
    if (lastHoverTreeItem !== hoverTreeItem2 || placement !== lastPlacement) {
      if (lastHoverTreeItem && !isSiblingElement(lastHoverTreeItem, hoverTreeItem2)) {
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragLine)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragLine);
        }
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragBox)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragBox);
        }
      }
      lastPlacement = placement;
      lastHoverTreeItem = hoverTreeItem2;
      if (hoverTreeItem2 === sourceTreeItem) {
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragLine)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragLine);
        }
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragBox)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragBox);
        }
        dragEffect = false;
        return;
      }
      if (hoverExpandTimer) {
        clearTimeout(hoverExpandTimer);
        hoverExpandTimer = null;
      }
      if (placement === "center") {
        dragEffect = false;
        parentNode = hoverTreeNode;
        prevNode = void 0;
        if (hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.contains(dragLine)) {
          hasStyleTreeItem == null ? void 0 : hasStyleTreeItem.removeChild(dragLine);
        }
        if (((_a = hoverTreeNode.data) == null ? void 0 : _a.disableDragIn) || !props.crossLevelDraggable)
          return;
        hoverTreeItem2 == null ? void 0 : hoverTreeItem2.appendChild(dragBox);
        hasStyleTreeItem = hoverTreeItem2;
        dragEffect = true;
        if (hoverExpandTimer) {
          clearTimeout(hoverExpandTimer);
          hoverExpandTimer = null;
        }
        const isExpanded = hasExpanded(hoverTreeNode);
        if (!isExpanded) {
          if (!hoverExpandTimer) {
            hoverExpandTimer = setTimeout(() => {
              expandNode(hoverTreeId, true);
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
      hoverTreeItem2 == null ? void 0 : hoverTreeItem2.appendChild(dragLine);
      hasStyleTreeItem = hoverTreeItem2;
      if (placement === "top") {
        dragLine.style.top = "-1px";
        dragLine.style.bottom = "auto";
        nextTreeItem = hoverTreeItem2;
        prevTreeItem = getPrevSibling(hoverTreeItem2);
      } else {
        dragLine.style.top = "auto";
        dragLine.style.bottom = "-1px";
        prevTreeItem = hoverTreeItem2;
        nextTreeItem = getNextSibling(hoverTreeItem2);
      }
      const prevId = (_b = prevTreeItem == null ? void 0 : prevTreeItem.dataset) == null ? void 0 : _b.id;
      const nextId = (_c = nextTreeItem == null ? void 0 : nextTreeItem.dataset) == null ? void 0 : _c.id;
      prevElementNode = prevId ? getTreeNode(prevId) : void 0;
      nextNode = nextId ? getTreeNode(nextId) : void 0;
      minLevel = Math.min((_d = prevElementNode == null ? void 0 : prevElementNode.level) != null ? _d : 1, (_e = nextNode == null ? void 0 : nextNode.level) != null ? _e : 1);
      maxLevel = Math.max((_f = prevElementNode == null ? void 0 : prevElementNode.level) != null ? _f : 1, (_g = nextNode == null ? void 0 : nextNode.level) != null ? _g : 1);
      buildDragLine(maxLevel);
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
  function dragProcess() {
    var _a, _b;
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
    if (!hoverTreeItem)
      return;
    const hoverTreeId = (_a = hoverTreeItem == null ? void 0 : hoverTreeItem.dataset) == null ? void 0 : _a.id;
    const sourceTreeId = (_b = sourceTreeItem == null ? void 0 : sourceTreeItem.dataset) == null ? void 0 : _b.id;
    if (!hoverTreeId || !sourceTreeId)
      return;
    const hoverTreeNode = getTreeNode(hoverTreeId);
    if (!hoverTreeNode)
      return;
    if (hoverTreeId === sourceTreeId) {
      sourceTreeItem = hoverTreeItem;
      sourceTreeItem.classList.add("virt-tree-item--drag");
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
    if (hoverTreeNode.data.disableDragIn) {
      topPlacement = 0.5;
      bottomPlacement = 0.5;
    } else {
      topPlacement = 0.33;
      bottomPlacement = 0.66;
    }
    if (!props.crossLevelDraggable) {
      sameLevelDragProcess(hoverTreeNode, hoverTreeItem, positionRatio);
      return;
    }
    crossLevelDragProcess(
      hoverTreeItem,
      positionRatio,
      hoverTreeItemRect,
      hoverTreeNode,
      hoverTreeId
    );
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
    var _a, _b;
    if (dragging.value) {
      setTimeout(() => {
        dragging.value = false;
      }, 0);
      if (!props.crossLevelDraggable) {
        if (allowDragArea) {
          allowDragArea.innerHTML = "";
          (_a = allowDragArea == null ? void 0 : allowDragArea.remove) == null ? void 0 : _a.call(allowDragArea);
        }
        dragAreaParentElement = null;
      }
      if (!sourceNode)
        return;
      if (dragAreaBottom && !props.crossLevelDraggable) {
        parentNode = sourceNode == null ? void 0 : sourceNode.parent;
        const hoverTreeId = (_b = hoverTreeItem == null ? void 0 : hoverTreeItem.dataset) == null ? void 0 : _b.id;
        if (!hoverTreeId)
          return;
        const hoverTreeNode = getTreeNode(hoverTreeId);
        if (!hoverTreeNode)
          return;
        prevNode = findTargetLevelParent(hoverTreeNode, sourceNode == null ? void 0 : sourceNode.level);
      } else if (placement !== "center") {
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
        } else if (!props.crossLevelDraggable) {
          prevNode = void 0;
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
