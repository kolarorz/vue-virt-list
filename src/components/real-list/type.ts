import type { EmitFunction, BaseListProps } from '../virt-list/type';

export interface NormalEmitFunction<T> extends EmitFunction<T> {
  updateCurrent?: (key: string | number) => void;
}

export interface RealListProps<T extends Record<string, string>>
  extends BaseListProps<T> {
  pageSize: number;
}
