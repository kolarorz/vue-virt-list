type Item = {
    index: number;
    id: string;
    text: string;
};
export declare function getList(length: number, start?: number): Item[];
type PersonItem = {
    index: number;
    id: string;
    avatar: string;
    name: string;
};
export declare function getAvatarList(length: number, start?: number): PersonItem[];
export declare function asyncGetList(length: number, start?: number, time?: number): Promise<any[]>;
export declare function getHorizontalList(count: number): {
    id: number;
    width: number;
}[];
type TreeItem = {
    index: number;
    id: string;
    text: string;
    children?: TreeItem[];
};
export declare function getTreeList(): TreeItem[];
export {};
