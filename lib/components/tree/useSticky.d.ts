import type { VirtList } from '../../VirtList';
import { type Ref, type ShallowRef } from 'vue-demi';
import type { TreeNodeKey } from './type';
export declare const useSticky: (virtListRef: Ref<InstanceType<typeof VirtList> | null>, expandedKeysSet: ShallowRef<Set<TreeNodeKey>>) => {
    stickyStack: Ref<TreeNodeKey[]>;
};
