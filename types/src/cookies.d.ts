import { IStorageOption } from './types';
export declare class CreateCookies {
    private encryption;
    private isOpenExpires;
    private day;
    private encryptionKey;
    private prefix;
    private suffix;
    constructor(option?: IStorageOption);
    /**
     * @description 设置cookie
     * @param {string} name cookie 名称
     * @param  {*} value cookie 值
     * @param {number=} expire 过期时间
     * @param isOpen 是否打开过期时间的设置
     */
    setItem(name: string, value: any, expires?: number | null, isOpen?: boolean | null): void;
    /**
     * 根据名字获取cookie值
     * @description Cookies.get()取不到值的时候会返回undefined
     * @param name
     */
    getItem(name: string): string;
    /**
     * 根据名字删除指定的cookie
     * 注意，删除不存在的cookie不会报错也不会有返回
     * @param key
     */
    removeItem(key: string): void;
}
export declare const CookiesStorage: CreateCookies;
export default CookiesStorage;
