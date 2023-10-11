import { PersistOptions } from './types';
export declare const isPlainObject: (v: unknown) => v is PersistOptions;
export declare const isBoolean: (v: unknown) => v is boolean;
export declare const isArray: (v: unknown) => v is any[];
export declare const isUndefined: (v: unknown) => v is undefined;
export declare function isReactive(value: unknown): boolean;
export declare function isReadonly(value: unknown): boolean;
export declare function isProxy(value: unknown): boolean;
/**
 * @description 计算有效期的时间，单位：秒
 * @param day 有限期的天数，单位：天
 * @returns 有效期的毫秒级时间戳
 */
export declare function getExpiresTime(day: number): number;
/**
 *
 * @param key
 * @returns 输出键值，例如指定前缀：Login。那么返回的是：LOGIN_KEY
 */
export declare function getKey(key: string, prefix?: string, suffix?: string): string;
/**
 * 随机生成任意长度的随机数
 * @param size 需要生成随机数据的长度
 * @returns
 */
export declare const genRanHex: (size: number) => string;
export declare function setEncryptionKey(encryption: boolean): string;
/**
 * 根据加密解密的参数决定是否对值进行加密解密
 * 加密方法
 * @param encryption
 */
export declare function handleEncryptData(key: string, value: any): string;
/**
 * 根据加密解密的参数决定是否对值进行加密解密
 * 解密方法
 * @param encryption
 */
export declare function handleDecryptData(key: string, value: string): any;
