import {
  onMounted,
  watch,
  type SetupContext,
  type ShallowRef,
  type Ref,
  type ShallowReactive,
} from 'vue-demi';
import type { TreeInfo, TreeNode, TreeNodeData, TreeNodeKey } from './type';
import type { VirtList } from '../virt-list';
import { DRAGEND, DRAGSTART, type TreeEmits, type TreeProps } from './useTree';
import {
  getScrollParentElement,
  isSiblingElement,
  findAncestorWithClass,
  getPrevSibling,
  getNextSibling,
} from './utils';

export const useDrag = ({
  props,
  treeInfo,
  virtListRef,
  dragging,
  getTreeNode,
  hasExpanded,
  expandNode,
  emits,
}: {
  props: TreeProps;
  treeInfo: ShallowReactive<TreeInfo | undefined>;
  virtListRef: ShallowRef<typeof VirtList | null>;
  dragging: Ref<boolean>;
  getTreeNode: (key: TreeNodeKey) => TreeNode | undefined;
  hasExpanded: (node: TreeNode) => boolean;
  expandNode: (key: TreeNodeKey | TreeNodeKey[], expanded: boolean) => void;
  emits: SetupContext<typeof TreeEmits>['emit'];
}) => {
  let startX = 0;
  let startY = 0;
  let initialX = 10;
  let initialY = 10;
  // 鼠标位置
  let mouseX = 0;
  let mouseY = 0;
  // 是否是一个有效的拖拽
  let dragEffect = false;
  // 拖拽线前后元素的最小层级，用来生成层级分段
  let minLevel = 1;
  // 拖拽线前后元素的最大层级，用来生成层级分段
  let maxLevel = 1;
  // 结束拖拽的时候，拖拽的层级
  let targetLevel = 1;
  // 标识同级拖拽至可拖拽区域底部
  let dragAreaBottom = false;

  let placement: 'center' | 'top' | 'bottom' | '' = '';
  let lastPlacement: 'center' | 'top' | 'bottom' | '' = '';

  // 被拖拽节点
  let sourceTreeItem: HTMLElement | null = null;
  // 克隆节点
  let cloneTreeItem: HTMLElement | null = null;
  // 有样式的节点 - 用来记录设置过样式的节点，便于删除样式
  let hasStyleTreeItem: HTMLElement | null = null;
  // 当前鼠标悬浮下的元素
  let hoverTreeItem: HTMLElement | null = null;
  // 上一个鼠标悬浮下的元素 - 用来和当前悬浮的元素比较
  let lastHoverTreeItem: HTMLElement | null = null;
  // 当前悬浮元素的前一个节点
  let prevTreeItem: HTMLElement | null = null;
  // 当前悬浮元素的后一个节点
  let nextTreeItem: HTMLElement | null = null;
  // 滚动元素，用来操作滚动的
  let scrollElement: HTMLElement | null = null;
  // 当前拖拽元素的父节点
  let dragAreaParentElement: HTMLElement | null = null;

  // 被操作的节点，延时折叠
  let sourceExpandTimer: NodeJS.Timeout | null = null;
  // 鼠标悬浮下的元素，延时打开
  let hoverExpandTimer: NodeJS.Timeout | null = null;
  // 自动滚动的定时器
  let autoScrollTimer: NodeJS.Timeout | null = null;

  // 拖出节点
  let sourceNode: TreeNode | undefined = undefined;
  // 拖入节点的前一个节点
  let prevElementNode: TreeNode | undefined = undefined;
  // 同级别 - 拖入节点的父节点
  let parentNode: TreeNode | undefined = undefined;
  // 同级别 - 拖入节点的前一个节点
  let prevNode: TreeNode | undefined = undefined;
  // 同级别 - 拖入节点的下一个节点
  let nextNode: TreeNode | undefined = undefined;

  // 找到目标元素 virt-tree-item
  let scrollElementRect: DOMRect | undefined = undefined;
  let clientElementRect: DOMRect | undefined = undefined;

  let topPlacement = 0.33;
  let bottomPlacement = 0.66;

  const dragBox = document.createElement('div');
  dragBox.classList.add('virt-tree-drag-box');

  const dragLine = document.createElement('div');
  dragLine.classList.add(
    props.crossLevelDraggable
      ? 'virt-tree-drag-line'
      : 'virt-tree-drag-line-same-level',
  );
  dragLine.style.paddingLeft = `${props.indent}px`;

  const levelArrow = document.createElement('div');
  levelArrow.classList.add('virt-tree-drag-line-arrow');

  const allowDragArea = document.createElement('div');
  allowDragArea.classList.add('virt-tree-all-drag-area');

  function onDragstart(event: MouseEvent) {
    event.preventDefault();
    sourceTreeItem = event
      .composedPath()
      .find((v) =>
        (v as HTMLElement).classList?.contains('virt-tree-item'),
      ) as HTMLElement;

    event.preventDefault();
    event.stopPropagation();

    const clientElement = virtListRef.value?.$el;
    clientElementRect = clientElement?.getBoundingClientRect();
    scrollElement = getScrollParentElement(clientElement);
    scrollElementRect = scrollElement?.getBoundingClientRect();
    // console.log('scrollElement', scrollElement);

    scrollElement?.addEventListener('scroll', onScroll);
    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('mouseup', onMouseup);
    document.addEventListener('keydown', onKeydown);
  }

  function onScroll() {
    if (dragging.value) {
      dragProcess();
    }
  }

  function calcSize(nodes: TreeNode[]) {
    let size = 0;
    for (const child of nodes || []) {
      if (child.children && child.children?.length > 0 && hasExpanded(child)) {
        size += calcDragArea(child);
      }
      size += virtListRef.value?.getItemSize(child.key);
    }
    return size;
  }

  function calcDragArea(parentNode?: TreeNode) {
    if (!parentNode) {
      return calcSize(treeInfo.treeNodes || []);
    }
    return calcSize(parentNode?.children || []);
  }

  function createDragArea(sourceNode: TreeNode<TreeNodeData>) {
    if (!sourceNode) return;

    const dragAreaSize = calcDragArea(sourceNode.parent);
    dragAreaParentElement = document.querySelector(
      sourceNode?.level === 1
        ? `.virt-list__client .${props.customGroup}`
        : `.${props.customGroup} [data-id="${sourceNode?.parent?.key}"]`,
    ) as HTMLElement;

    const parentElRect = dragAreaParentElement?.getBoundingClientRect();
    allowDragArea.style.width = `${parentElRect.width}px`;
    allowDragArea.style.height = `${dragAreaSize}px`;
    allowDragArea.style.top = `${sourceNode?.level === 1 ? 0 : parentElRect.height + (dragAreaParentElement?.offsetTop ?? 0)}px`;
    virtListRef.value!.listRefEl.style.position = 'relative';
    virtListRef.value?.listRefEl.append(allowDragArea);
  }

  function dragstart() {
    if (!sourceTreeItem) return;
    // 找到目标元素的virt-tree-node，判断是否展开状态，如果是，则定时1s后折叠
    // 数据&交互处理
    const nodeKey = sourceTreeItem?.dataset?.id ?? '';
    sourceNode = getTreeNode(nodeKey);
    if (!sourceNode) return;

    // 禁止拖出
    if (sourceNode.data?.disableDragOut) {
      return;
    }

    emits(DRAGSTART, {
      sourceNode: sourceNode,
    });

    // 判断节点是否展开了
    const isExpanded = hasExpanded(sourceNode);
    if (isExpanded) {
      expandNode(nodeKey, false);
    }

    if (!props.crossLevelDraggable) {
      createDragArea(sourceNode);
    }

    const sourceTreeItemRect = sourceTreeItem.getBoundingClientRect();
    sourceTreeItem.classList.add('virt-tree-item--drag');
    if (props.dragClass) {
      sourceTreeItem.classList.add(props.dragClass);
    }

    cloneTreeItem = sourceTreeItem.cloneNode(true) as HTMLElement;
    cloneTreeItem.classList.add('virt-tree-item--ghost');
    if (props.dragGhostClass) {
      cloneTreeItem.classList.add(props.dragGhostClass);
    }
    cloneTreeItem.style.position = 'fixed';
    cloneTreeItem.style.width = `${sourceTreeItemRect.width}px`;
    cloneTreeItem.style.height = `${sourceTreeItemRect.height}px`;
    document.body.append(cloneTreeItem);

    return cloneTreeItem;
  }

  // 自动滚动
  function autoScroll() {
    if (scrollElement !== null && scrollElementRect !== undefined) {
      // 每次先清除旧定时器
      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
      // 判断是否在可视区域
      if (clientElementRect) {
        if (
          mouseX < clientElementRect.left ||
          mouseX > clientElementRect.right ||
          mouseY < clientElementRect.top ||
          mouseY > clientElementRect.bottom
        ) {
          return;
        }
      }
      // 4等分
      const equalPart = scrollElementRect.height / 4;
      const multiple = 20;
      if (
        scrollElementRect.top < mouseY &&
        mouseY < scrollElementRect.top + equalPart
      ) {
        const relative =
          (1 - (mouseY - scrollElementRect.top) / equalPart) * multiple;
        if (!autoScrollTimer) {
          autoScrollTimer = setInterval(() => {
            scrollElement!.scrollTop -= relative;
          }, 10);
        }
      } else if (
        scrollElementRect.top + equalPart * 3 < mouseY &&
        mouseY < scrollElementRect.bottom
      ) {
        const relative =
          ((mouseY - (scrollElementRect.top + equalPart * 3)) / equalPart) *
          multiple;
        if (!autoScrollTimer) {
          autoScrollTimer = setInterval(() => {
            scrollElement!.scrollTop += relative;
          }, 10);
        }
      }
    }
  }

  function buildDragLine(level: number) {
    dragLine.innerHTML = '';
    for (let i = 0; i < level; i++) {
      const lineBlock = document.createElement('div');
      if (i === level - 1) {
        // 最后一个占满
        lineBlock.style.flex = '1';
        lineBlock.style.backgroundColor = 'var(--virt-tree-color-drag-line)';
      } else {
        lineBlock.style.width = `${props.indent - 4}px`;
      }
      lineBlock.style.height = '100%';
      lineBlock.style.position = 'relative';
      dragLine.appendChild(lineBlock);
    }
  }

  function findTargetLevelParent(childNode: TreeNode, targetLevel?: number) {
    if (!childNode || !targetLevel) return null;
    let parentNode = childNode.parent;
    while (parentNode) {
      if (parentNode.level === targetLevel) {
        return parentNode;
      }
      parentNode = parentNode.parent;
    }
    return null;
  }

  function updateDragRelateNode(hoverTreeItem: HTMLElement) {
    // 添加 line
    hoverTreeItem?.appendChild(dragLine);
    hasStyleTreeItem = hoverTreeItem;

    if (placement === 'top') {
      // console.log('鼠标在 TOP');
      dragLine.style.top = '-1px';
      dragLine.style.bottom = 'auto';
      nextTreeItem = hoverTreeItem;
      prevTreeItem = getPrevSibling(hoverTreeItem) as HTMLElement;
    } else {
      // console.log('鼠标在 BOTTOM');
      dragLine.style.top = 'auto';
      dragLine.style.bottom = '-1px';
      prevTreeItem = hoverTreeItem;
      nextTreeItem = getNextSibling(hoverTreeItem) as HTMLElement;
    }
    // 开始处理逻辑
    const prevId = prevTreeItem?.dataset?.id;
    const nextId = nextTreeItem?.dataset?.id;

    prevElementNode = prevId ? getTreeNode(prevId) : undefined;
    nextNode = nextId ? getTreeNode(nextId) : undefined;
  }

  function sameLevelDragProcess(
    hoverTreeNode: TreeNode,
    hoverTreeItem: HTMLElement,
    positionRatio: number,
  ) {
    // 特殊处理，如果 hover 的元素是当前拖拽源数据分类下 的最后一个元素

    if (hoverTreeNode.isLast && hoverTreeNode.isLeaf) {
      const allDragLevelNode = findTargetLevelParent(
        hoverTreeNode,
        sourceNode?.level,
      );
      if (allDragLevelNode?.isLast) {
        placement = 'bottom';
        dragEffect = true;
        dragAreaBottom = true;

        updateDragRelateNode(hoverTreeItem);

        const currentLevel = sourceNode?.level ?? 1;
        targetLevel = currentLevel;

        buildDragLine(currentLevel);
        return;
      }
    }
    dragAreaBottom = false;
    if (
      hoverTreeNode.level !== sourceNode?.level ||
      hoverTreeNode.parent?.data.id !== sourceNode?.parent?.data.id
    ) {
      prevTreeItem = null;
      nextTreeItem = null;
      return;
    }

    if (positionRatio > topPlacement) {
      placement = 'bottom';
    } else {
      placement = 'top';
    }

    if (placement === 'bottom' && hasExpanded(hoverTreeNode)) {
      lastHoverTreeItem = null;
      prevTreeItem = null;
      nextTreeItem = null;
      return;
    }

    // 如果什么都没变，不需要接续判断了
    if (lastHoverTreeItem !== hoverTreeItem || placement !== lastPlacement) {
      if (
        lastHoverTreeItem &&
        !isSiblingElement(lastHoverTreeItem, hoverTreeItem)
      ) {
        // 移除 line
        if (hasStyleTreeItem?.contains(dragLine)) {
          hasStyleTreeItem?.removeChild(dragLine);
        }
      }

      lastPlacement = placement;
      lastHoverTreeItem = hoverTreeItem;

      // 在元素上下两边，目前无禁用所以，都dragEffect都为true
      dragEffect = true;
      updateDragRelateNode(hoverTreeItem);

      const currentLevel = hoverTreeNode?.level ?? 1;
      targetLevel = currentLevel;
      buildDragLine(currentLevel);
    }
  }

  function crossLevelDragProcess(
    hoverTreeItem: HTMLElement,
    positionRatio: number,
    hoverTreeItemRect: DOMRect,
    hoverTreeNode: TreeNode,
    hoverTreeId: TreeNodeKey,
  ) {
    if (positionRatio < topPlacement) {
      placement = 'top';
    } else if (positionRatio > bottomPlacement) {
      placement = 'bottom';
    } else {
      placement = 'center';
    }

    // 如果什么都没变，不需要接续判断了
    if (lastHoverTreeItem !== hoverTreeItem || placement !== lastPlacement) {
      if (
        lastHoverTreeItem &&
        !isSiblingElement(lastHoverTreeItem, hoverTreeItem)
      ) {
        // 移除 line
        if (hasStyleTreeItem?.contains(dragLine)) {
          hasStyleTreeItem?.removeChild(dragLine);
        }
        // 移除 box
        if (hasStyleTreeItem?.contains(dragBox)) {
          hasStyleTreeItem?.removeChild(dragBox);
        }
      }

      lastPlacement = placement;
      lastHoverTreeItem = hoverTreeItem;

      // 操作元素和hover元素不能一致
      if (hoverTreeItem === sourceTreeItem) {
        // 移除 line
        if (hasStyleTreeItem?.contains(dragLine)) {
          hasStyleTreeItem?.removeChild(dragLine);
        }
        // 移除 box
        if (hasStyleTreeItem?.contains(dragBox)) {
          hasStyleTreeItem?.removeChild(dragBox);
        }
        dragEffect = false;
        return;
      }

      // 一旦发生变化立马清除定时器
      if (hoverExpandTimer) {
        clearTimeout(hoverExpandTimer);
        hoverExpandTimer = null;
      }

      if (placement === 'center') {
        dragEffect = false;
        // console.log('鼠标在中部', dragEffect);
        // 判断是否能够进入disableDragIn
        parentNode = hoverTreeNode;
        prevNode = undefined;
        if (hasStyleTreeItem?.contains(dragLine)) {
          hasStyleTreeItem?.removeChild(dragLine);
        }

        // 被禁用
        if (hoverTreeNode.data?.disableDragIn || !props.crossLevelDraggable)
          return;

        // 添加 box
        hoverTreeItem?.appendChild(dragBox);
        hasStyleTreeItem = hoverTreeItem;

        dragEffect = true;

        // 开启定时器，自动展开节点
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

      // 在元素上下两边，目前无禁用所以，都dragEffect都为true
      dragEffect = true;
      // 移除 box
      if (hasStyleTreeItem?.contains(dragBox)) {
        hasStyleTreeItem?.removeChild(dragBox);
      }
      // 添加 line
      hoverTreeItem?.appendChild(dragLine);
      hasStyleTreeItem = hoverTreeItem;

      if (placement === 'top') {
        // console.log('鼠标在 TOP');
        dragLine.style.top = '-1px';
        dragLine.style.bottom = 'auto';
        nextTreeItem = hoverTreeItem;
        prevTreeItem = getPrevSibling(hoverTreeItem) as HTMLElement;
      } else {
        // console.log('鼠标在 BOTTOM');
        dragLine.style.top = 'auto';
        dragLine.style.bottom = '-1px';
        prevTreeItem = hoverTreeItem;
        nextTreeItem = getNextSibling(hoverTreeItem) as HTMLElement;
      }

      // console.log('prevTreeItem', prevTreeItem);
      // console.log('nextTreeItem', nextTreeItem);

      // 开始处理逻辑
      const prevId = prevTreeItem?.dataset?.id;
      const nextId = nextTreeItem?.dataset?.id;

      prevElementNode = prevId ? getTreeNode(prevId) : undefined;
      nextNode = nextId ? getTreeNode(nextId) : undefined;

      // console.log('prevElementNode', prevElementNode?.level);
      // console.log('nextNode', nextNode?.level);

      // 用最大层级生成 line-block
      minLevel = Math.min(prevElementNode?.level ?? 1, nextNode?.level ?? 1);
      maxLevel = Math.max(prevElementNode?.level ?? 1, nextNode?.level ?? 1);
      // console.log('minLevel', minLevel, 'maxLevel', maxLevel);

      buildDragLine(maxLevel);

      // 清空
      dragLine.innerHTML = '';
      for (let i = 0; i < maxLevel; i++) {
        const lineBlock = document.createElement('div');
        // const firstLevelLine = document.createElement('div');
        if (i === maxLevel - 1) {
          // 最后一个占满
          lineBlock.style.flex = '1';
        } else {
          lineBlock.style.width = `${props.indent - 4}px`;
        }
        lineBlock.style.height = '100%';
        lineBlock.style.position = 'relative';
        dragLine.appendChild(lineBlock);
      }
    }

    if (placement !== 'center') {
      // 需要减去第一个indent
      const relativeX = mouseX - hoverTreeItemRect.left - props.indent;
      targetLevel = Math.ceil(relativeX / props.indent);
      if (targetLevel <= minLevel) targetLevel = minLevel;
      if (targetLevel >= maxLevel) targetLevel = maxLevel;
      const targetElement = dragLine.childNodes[targetLevel - 1];
      targetElement.appendChild(levelArrow);
      for (let i = minLevel - 1; i <= maxLevel - 1; i++) {
        const current = dragLine.childNodes[i] as HTMLElement;
        if (i < targetLevel - 1) {
          current.style.backgroundColor =
            'var(--virt-tree-color-drag-line-disabled)';
        } else {
          current.style.backgroundColor = 'var(--virt-tree-color-drag-line)';
        }
      }
    }
  }

  function dragProcess() {
    // 判断是否在可视区域，不在则移除
    if (clientElementRect) {
      if (
        mouseX < clientElementRect.left ||
        mouseX > clientElementRect.right ||
        mouseY < clientElementRect.top ||
        mouseY > clientElementRect.bottom
      ) {
        // 移除 line
        if (hasStyleTreeItem?.contains(dragLine)) {
          hasStyleTreeItem?.removeChild(dragLine);
        }
        // 移除 box
        if (hasStyleTreeItem?.contains(dragBox)) {
          hasStyleTreeItem?.removeChild(dragBox);
        }
        lastHoverTreeItem = null;

        dragEffect = false;
      }
    }

    // 获取hover元素
    const hoverElement = document.elementFromPoint(mouseX, mouseY);
    if (!hoverElement) return;
    hoverTreeItem = findAncestorWithClass(hoverElement, 'virt-tree-item');
    if (!hoverTreeItem) return;
    const hoverTreeId = hoverTreeItem?.dataset?.id;
    if (!hoverTreeId) return;
    const hoverTreeNode = getTreeNode(hoverTreeId);
    if (!hoverTreeNode) return;
    const hoverTreeItemRect = hoverTreeItem?.getBoundingClientRect();
    if (!hoverTreeItemRect) return;

    const elementTop = hoverTreeItemRect.top;
    const elementHeight = hoverTreeItemRect.height;
    // 鼠标相对于元素顶部的距离
    const relativeY = mouseY - elementTop;
    // 计算鼠标相对于元素高度的比例
    const positionRatio = relativeY / elementHeight;

    if (hoverTreeNode.data.disableDragIn) {
      // 如果禁止拖入，就不需要中间区域判断了
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
      hoverTreeId,
    );
  }

  function onMousemove(event: any) {
    if (!cloneTreeItem) {
      dragstart();
    }
    if (!cloneTreeItem) return;

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
      // 延迟一下，不然click仍然会被触发
      setTimeout(() => {
        dragging.value = false;
      }, 0);
      if (!props.crossLevelDraggable) {
        if (allowDragArea) {
          allowDragArea.innerHTML = '';
          allowDragArea?.remove?.();
        }
        dragAreaParentElement = null;
      }

      if (!sourceNode) return;

      // 这里先处理平级
      if (dragAreaBottom && !props.crossLevelDraggable) {
        parentNode = sourceNode?.parent;
        const hoverTreeId = hoverTreeItem?.dataset?.id;
        if (!hoverTreeId) return;
        const hoverTreeNode = getTreeNode(hoverTreeId);
        if (!hoverTreeNode) return;
        prevNode = findTargetLevelParent(hoverTreeNode, sourceNode?.level)!;
      } else if (placement !== 'center') {
        parentNode = undefined;
        if (prevElementNode) {
          if (prevElementNode.level >= targetLevel) {
            // 父级或者平级
            let diffLevel = prevElementNode.level - targetLevel;
            // console.log('差值', diffLevel);
            prevNode = prevElementNode;
            parentNode = prevElementNode.parent;
            while (diffLevel > 0) {
              prevNode = prevNode?.parent;
              parentNode = parentNode?.parent;
              diffLevel--;
            }
          } else {
            // 子集 差值要么0 要么 1
            if (targetLevel - prevElementNode.level === 1) {
              // 子集
              parentNode = prevElementNode;
            } else {
              // 平级
              parentNode = prevElementNode.parent;
              prevNode = prevElementNode;
            }
          }
        } else if (!props.crossLevelDraggable) {
          prevNode = undefined;
        }
      }

      emits(
        DRAGEND,
        dragEffect
          ? {
              node: sourceNode as TreeNode,
              prevNode: prevNode,
              parentNode: parentNode,
            }
          : undefined,
      );

      // 移除 line
      if (hasStyleTreeItem?.contains(dragLine)) {
        hasStyleTreeItem?.removeChild(dragLine);
      }
      // 移除 box
      if (hasStyleTreeItem?.contains(dragBox)) {
        hasStyleTreeItem?.removeChild(dragBox);
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
        sourceTreeItem.classList.remove('virt-tree-item--drag');
        sourceTreeItem = null;
      }

      if (hoverExpandTimer) {
        clearTimeout(hoverExpandTimer);
        hoverExpandTimer = null;
      }

      if (sourceExpandTimer) {
        clearTimeout(sourceExpandTimer);
        sourceExpandTimer = null;
      }

      if (autoScrollTimer) {
        clearInterval(autoScrollTimer);
        autoScrollTimer = null;
      }
    }

    if (sourceTreeItem) {
      sourceTreeItem.style.opacity = '1';
      sourceTreeItem = null;
    }

    scrollElement?.removeEventListener('scroll', onScroll);
    document.removeEventListener('mousemove', onMousemove);
    document.removeEventListener('mouseup', onMouseup);
  }
  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      // ESC 取消拖拽
      dragEffect = false;
      onMouseup();
    }
  }

  return {
    onDragstart,
  };
};
