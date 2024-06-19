import { computed, shallowRef, triggerRef, type ShallowRef } from 'vue-demi';
import type { ITreeInfo, ITreeNode, TreeKey } from './type';
import type { TreeProps } from './useTree';

const isFunction = (value: unknown) =>
  typeof value === 'function' ||
  value instanceof Function ||
  Object.prototype.toString.call(value) === '[object Function]';

export const useFilter = (
  props: TreeProps,
  tree: ShallowRef<ITreeInfo | undefined>,
) => {
  const hiddenNodeKeySet = shallowRef<Set<TreeKey>>(new Set([]));
  const hiddenExpandIconKeySet = shallowRef<Set<TreeKey>>(new Set([]));

  const filterable = computed(() => {
    return isFunction(props.filterMethod);
  });

  function doFilter(query: string) {
    if (!filterable.value) {
      return;
    }
    const expandKeySet = new Set<TreeKey>();
    const hiddenExpandIconKeys = hiddenExpandIconKeySet.value;
    const hiddenKeys = hiddenNodeKeySet.value;
    const family: ITreeNode[] = [];
    const nodes = tree.value?.treeNodes || [];
    const filter = props.filterMethod;
    hiddenKeys.clear();
    function traverse(nodes: ITreeNode[]) {
      nodes.forEach((node) => {
        family.push(node);
        if (filter?.(query, node.data)) {
          family.forEach((member) => {
            expandKeySet.add(member.key);
          });
        } else if (node.isLeaf) {
          hiddenKeys.add(node.key);
        }
        const children = node.children;
        if (children) {
          traverse(children);
        }
        if (!node.isLeaf) {
          if (!expandKeySet.has(node.key)) {
            hiddenKeys.add(node.key);
          } else if (children) {
            let allHidden = true;
            for (const childNode of children) {
              if (!hiddenKeys.has(childNode.key)) {
                allHidden = false;
                break;
              }
            }
            if (allHidden) {
              hiddenExpandIconKeys.add(node.key);
            } else {
              hiddenExpandIconKeys.delete(node.key);
            }
          }
        }
        family.pop();
      });
    }
    traverse(nodes);
    triggerRef(hiddenNodeKeySet);
    triggerRef(hiddenExpandIconKeySet);
    return expandKeySet;
  }

  function isForceHiddenExpandIcon(node: ITreeNode): boolean {
    return hiddenExpandIconKeySet.value.has(node.key);
  }

  return {
    hiddenExpandIconKeySet,
    hiddenNodeKeySet,
    doFilter,
    isForceHiddenExpandIcon,
  };
};
