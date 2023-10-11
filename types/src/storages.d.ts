import { IStorageOption } from './types';
export declare class CreateStorage {
    private storage;
    private isOpenExpires;
    private day;
    private encryption;
    private encryptionKey;
    private prefix;
    private suffix;
    constructor(option?: IStorageOption);
    /**
     * @description 设置缓存
     * @param key 缓存键
     * @param value 缓存值
     * @param expires 到期时间
     * @param isOpen 是否开启到期时间的计算
     */
    setItem(key: string, value: any, expires?: number | null, isOpen?: boolean | null): void;
    /**
     * @description 读取缓存
     * @param {string} key 缓存键
     * @param {any} def 默认值，不传的话默认值为null
     * @returns 返回缓存值，如果超出有效期，则返回null或者用户自定义的默认值
     */
    getItem(key: string, def?: any): any;
    /**
     * @description 从缓存删除某项
     * @param {string}  key  缓存键
     */
    removeItem(key: string): void;
    /**
     * @description 清空所有缓存
     */
    clear(): void;
}
export declare const storage: CreateStorage;
export default storage;
