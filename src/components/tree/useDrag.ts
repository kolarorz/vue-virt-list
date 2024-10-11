import {
  onMounted,
  watch,
  type SetupContext,
  type ShallowRef,
  type Ref,
} from 'vue-demi';
import type { TreeNode, TreeNodeKey, TreeNodeData } from './type';
import type { VirtList } from 'vue-virt-list';
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
  virtListRef,
  dragging,
  getTreeNode,
  hasExpanded,
  expandNode,
  emits,
}: {
  props: TreeProps;
  virtListRef: ShallowRef<InstanceType<typeof VirtList> | null>;
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

  const dragBox = document.createElement('div');
  dragBox.classList.add('virt-tree-drag-box');

  const dragLine = document.createElement('div');
  dragLine.classList.add('virt-tree-drag-line');
  dragLine.style.paddingLeft = `${props.indent}px`;

  const levelArrow = document.createElement('div');
  levelArrow.classList.add('virt-tree-drag-line-arrow');

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
    if (!hoverTreeItem) {
      return;
    }

    const hoverTreeId = hoverTreeItem?.dataset?.id;
    if (!hoverTreeId) return;
    const hoverTreeNode = getTreeNode(hoverTreeId);
    if (!hoverTreeNode) return;

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
    const hoverTreeItemRect = hoverTreeItem?.getBoundingClientRect();
    if (!hoverTreeItemRect) return;

    const elementTop = hoverTreeItemRect.top;
    const elementHeight = hoverTreeItemRect.height;
    // 鼠标相对于元素顶部的距离
    const relativeY = mouseY - elementTop;
    // 计算鼠标相对于元素高度的比例
    const positionRatio = relativeY / elementHeight;

    if (positionRatio < 0.33) {
      placement = 'top';
    } else if (positionRatio > 0.66) {
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

      // 一旦发生变化立马清除定时器
      if (hoverExpandTimer) {
        clearTimeout(hoverExpandTimer);
        hoverExpandTimer = null;
      }

      if (placement === 'center') {
        dragEffect = false;
        // console.log('鼠标在中部', dragEffect);
        // 判断是否能够进入disableDragIn
        const id = hoverTreeItem?.dataset?.id;
        if (!id) return;
        const node = getTreeNode(id);
        if (!node) return;
        parentNode = node;
        prevNode = undefined;
        if (hasStyleTreeItem?.contains(dragLine)) {
          hasStyleTreeItem?.removeChild(dragLine);
        }

        // 待确定的功能
        // const result = props?.beforeDrag({
        //   placement,
        //   node: sourceNode as TreeNode,
        //   prevNode: prevNode,
        //   parentNode: parentNode,
        // });
        // console.log('result', result);
        // if (!result) {
        //   return;
        // }

        // 被禁用
        if (node.data?.disableDragIn) return;

        // 添加 box
        hoverTreeItem?.appendChild(dragBox);
        hasStyleTreeItem = hoverTreeItem;

        dragEffect = true;

        // 开启定时器，自动展开节点
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

      if (!sourceNode) return;

      // 这里先处理平级
      if (placement !== 'center') {
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
