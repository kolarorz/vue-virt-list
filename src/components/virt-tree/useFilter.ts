import {
  computed,
  shallowRef,
  triggerRef,
  type ShallowReactive,
  type ShallowRef,
} from 'vue-demi';
import type { TreeInfo, TreeNode, TreeNodeKey } from './type';
import type { TreeProps } from './useTree';
import type { VirtList } from '../virt-list';

const isFunction = (value: unknown) =>
  typeof value === 'function' ||
  value instanceof Function ||
  Object.prototype.toString.call(value) === '[object Function]';

export const useFilter = ({
  props,
  treeInfo,
  virtListRef,
}: {
  props: TreeProps;
  treeInfo: ShallowReactive<TreeInfo | undefined>;
  virtListRef: ShallowRef<typeof VirtList | null>;
}) => {
  const hiddenNodeKeySet = shallowRef<Set<TreeNodeKey>>(new Set([]));
  const hiddenExpandIconKeySet = shallowRef<Set<TreeNodeKey>>(new Set([]));

  const filterable = computed(() => {
    return isFunction(props.filterMethod);
  });

  function doFilter(query: string) {
    if (!filterable.value) {
      return;
    }
    const expandKeySet = new Set<TreeNodeKey>();
    const hiddenExpandIconKeys = hiddenExpandIconKeySet.value;
    const hiddenKeys = hiddenNodeKeySet.value;
    const family: TreeNode[] = [];
    const nodes = treeInfo.treeNodes || [];
    const filter = props.filterMethod;
    hiddenKeys.clear();
    function traverse(nodes: TreeNode[]) {
      nodes.forEach((node) => {
        // 每次遍历都生成 searchedIndex
        const searchedIndex =
          query === ''
            ? -1
            : node.title?.toLowerCase().indexOf(query.toLowerCase());
        node.searchedIndex = searchedIndex;

        family.push(node);
        if (filter?.(query, node)) {
          family.forEach((member) => {
            // 仅加入非叶子节点
            if (!member.isLeaf) {
              expandKeySet.add(member.key);
            }
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
    virtListRef.value?.scrollToTop();
    return expandKeySet;
  }

  function isForceHiddenExpandIcon(node: TreeNode): boolean {
    return hiddenExpandIconKeySet.value.has(node.key);
  }

  return {
    hiddenExpandIconKeySet,
    hiddenNodeKeySet,
    doFilter,
    isForceHiddenExpandIcon,
  };
};
