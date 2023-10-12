import { IStorageOption } from './types';
export declare class CreateCookies {
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
     * @description 设置cookie
     * @param {string} name cookie 名称
     * @param  {any} value cookie 值
     * @param {number} expire 过期时间, 单位：day
     * @param {boolean} isOpen 是否打开过期时间的设置
     */
    setItem(key: string, value: any, expires?: number | null, isOpen?: boolean | null): void;
    /**
     * 根据名字获取cookie值
     * @description Cookies.get()取不到值的时候会返回空字符串 ’‘
     * @param name 键名
     */
    getItem(key: string): string;
    /**
     * 根据名字删除指定的cookie
     * 注意，删除不存在的cookie不会报错也不会有返回
     * @param key
     */
    removeItem(key: string): void;
}
export default CreateCookies;
