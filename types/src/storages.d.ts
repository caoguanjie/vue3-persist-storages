import { IStorageOption } from './types';
export declare class CreateStorage {
    /** 默认值： localStorage*/
    private storage;
    /** 前缀，会自动加到 key 值的前面，默认值：'' */
    private prefix;
    /** 后缀，会自动加到 key 值的后面,默认值：''*/
    private suffix;
    /** 是否开启有效期设置,默认值：false */
    private isOpenExpires;
    /** 有效期设置，和isOpenExpires配搭使用，单位：天, 默认值：7 天 */
    private day;
    /** 是否开启AES加密和解密数据， 默认值：false */
    private encryption;
    /** 加密时需要的密钥，自动生成，不需要设置 */
    private encryptionKey;
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
export default CreateStorage;
