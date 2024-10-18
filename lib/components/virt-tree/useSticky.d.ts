import type { VirtList } from '../virt-list';
import { type Ref, type ShallowRef } from 'vue-demi';
import type { TreeNodeKey } from './type';
export declare const useSticky: (virtListRef: Ref<InstanceType<typeof VirtList> | null>, expandedKeysSet: ShallowRef<Set<TreeNodeKey>>) => {
    stickyStack: Ref<TreeNodeKey[]>;
};
