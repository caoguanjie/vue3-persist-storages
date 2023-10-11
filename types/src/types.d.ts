import { PiniaPluginContext } from "pinia";
export interface Vue3PersistStorages {
    storage?: Storage | LocalForage;
    isOpenExpires?: boolean;
    day?: number;
    prefix?: string;
    suffix?: string;
    debug?: boolean;
    encryption?: boolean;
    encryptionKey?: string;
    getItem<T>(key: string): Promise<T | null> | T;
    setItem<T>(key: string, value: T, expires?: number, isOpenExpires?: boolean): Promise<T | null> | T;
    removeItem<T>(key: string): Promise<T | null> | T;
    clear<T>(): Promise<T | null> | T;
    init(): void;
    getSize<T>(): Promise<T | null>;
}
export interface IExtendPersist extends PersistOptions {
    storages: Vue3PersistStorages;
}
export interface IPluginOption {
    prefix?: string;
    suffix?: string;
    name?: string;
    storeName?: string;
    debug?: boolean;
    encryption?: boolean;
}
/**
 * storage入参
 */
export interface IStorageOption extends IPluginOption {
    storage?: Storage;
    isOpenExpires?: boolean;
    day?: number;
}
export interface PersistOptions extends IStorageOption {
    type?: 'storage' | 'indexedDB' | 'cookies';
    key?: string;
    paths?: string[];
    beforeRestore?: (context: PiniaPluginContext) => void;
    afterRestore?: (context: PiniaPluginContext) => void;
}
export type TPersist = boolean | PersistOptions | PersistOptions[];
export type Store = PiniaPluginContext['store'];
export type PartialState = Partial<Store['$state']>;
declare module 'pinia' {
    interface DefineStoreOptionsBase<S extends StateTree, Store> {
        persist?: TPersist;
    }
}
export interface Target {
    __v_skip?: boolean;
    __v_isReactive?: boolean;
    __v_isReadonly?: boolean;
    __v_raw?: any;
    __v_reactive?: any;
    __v_readonly?: any;
}
export declare const enum ReactiveFlags {
    skip = "__v_skip",
    isReactive = "__v_isReactive",
    isReadonly = "__v_isReadonly",
    raw = "__v_raw",
    reactive = "__v_reactive",
    readonly = "__v_readonly"
}
