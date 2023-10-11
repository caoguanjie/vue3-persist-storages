/*
 * @Author: caoguanjie 
 * @Date: 2023-10-11 16:36:00 
 * @Last Modified by: caoguanjie
 * @Last Modified time: 2023-10-11 19:36:30
 */

import { IStorageOption } from './types';
import { getExpiresTime, getKey, handleDecryptData, handleEncryptData, setEncryptionKey } from './utils';



export class CreateStorage {
    private storage: Storage;
    private isOpenExpires: boolean;
    private day: number
    private encryption: boolean;
    private encryptionKey: string
    private prefix: string; // 开发者能自定义一些键值的前缀，例如：prefix=fits，最后保存本地的键值有可能是fitslogin
    private suffix: string; // 开发者能自定义一些键值的前缀，例如：prefix=fits，最后保存本地的键值有可能是fitslogin
    constructor(option: IStorageOption = {}) {
        const { prefix = '', suffix = '', storage = localStorage, isOpenExpires = false, day = 7, encryption = false } = option
        this.storage = storage;
        this.prefix = prefix
        this.suffix = suffix
        this.encryption = encryption
        this.isOpenExpires = isOpenExpires ?? false
        this.day = day ?? 7
        this.encryptionKey = setEncryptionKey(this.encryption)
    }


    /**
     * @description 设置缓存
     * @param key 缓存键
     * @param value 缓存值
     * @param expires 到期时间
     * @param isOpen 是否开启到期时间的计算
     */
    setItem(key: string, value: any, expires: number | null = this.day, isOpen: boolean | null = this.isOpenExpires) {
        const stringData = isOpen ? JSON.stringify({
            value,
            expires: expires !== null ? new Date().getTime() + getExpiresTime(expires) : null
        }) : JSON.stringify(value)
        this.storage.setItem(getKey(key, this.prefix, this.suffix), this.encryption ? handleEncryptData(this.encryptionKey, stringData) : stringData)
    }

    /**
     * @description 读取缓存
     * @param {string} key 缓存键
     * @param {any} def 默认值，不传的话默认值为null
     * @returns 返回缓存值，如果超出有效期，则返回null或者用户自定义的默认值
     */
    getItem(key: string, def: any = null) {
        let item = this.storage.getItem(getKey(key, this.prefix, this.suffix));
        if (item) {
            try {
                if (this.encryption) {
                    // 如果是加密过的字符串，先解密
                    item = handleDecryptData(this.encryptionKey, item) || ''
                }
                const data = JSON.parse(item as string);
                const { value, expires } = data;
                // 在有效期内返回
                if (expires) {
                    if (expires >= Date.now()) {
                        return value;
                    } else {
                        // 如果超过到期时间了，就删除当前的值
                        this.removeItem(key);
                    }

                } else {
                    return data
                }

            } catch (e) {
                // 当item拿不到键值对的时候，证明数据异常，返回默认值
                return def
            }
        }
        return def
    }

    /**
     * @description 从缓存删除某项
     * @param {string}  key  缓存键
     */
    removeItem(key: string) {
        this.storage.removeItem(getKey(key, this.prefix, this.suffix));
    }

    /**
     * @description 清空所有缓存
     */
    clear() {
        this.storage.clear();
    }


}



export default CreateStorage
