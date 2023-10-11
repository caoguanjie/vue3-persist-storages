/*
 * @Author: caoguanjie 
 * @Date: 2023-10-11 19:35:30 
 * @Last Modified by:   caoguanjie 
 * @Last Modified time: 2023-10-11 19:35:30 
 */

import Cookies from 'js-cookie'
import { IStorageOption } from './types';
import { getKey, handleDecryptData, handleEncryptData, setEncryptionKey } from "./utils"


export class CreateCookies {
    private encryption: boolean;
    private isOpenExpires: boolean;
    private day: number
    private encryptionKey: string
    private prefix: string; // 开发者能自定义一些键值的前缀，例如：prefix=fits，最后保存本地的键值有可能是fitslogin
    private suffix: string; // 开发者能自定义一些键值的前缀，例如：prefix=fits，最后保存本地的键值有可能是fitslogin
    constructor(option: IStorageOption = {}) {
        const { prefix = '', suffix = '', isOpenExpires = false, day = 7, encryption = false } = option
        this.prefix = prefix
        this.suffix = suffix
        this.encryption = encryption
        this.isOpenExpires = isOpenExpires
        this.day = day
        this.encryptionKey = setEncryptionKey(encryption)
    }



    /**
     * @description 设置cookie
     * @param {string} name cookie 名称
     * @param  {*} value cookie 值 
     * @param {number=} expire 过期时间 
     * @param isOpen 是否打开过期时间的设置
     */
    setItem(name: string, value: any, expires: number | null = this.day, isOpen: boolean | null = this.isOpenExpires) {
        const _expires = expires !== null && isOpen ? expires : undefined;
        Cookies.set(getKey(name, this.prefix, this.suffix), this.encryption ? handleEncryptData(this.encryptionKey, value) : JSON.stringify(value), { expires: _expires })
    }

    /**
     * 根据名字获取cookie值
     * @description Cookies.get()取不到值的时候会返回undefined
     * @param name
     */
    getItem(name: string): string {
        const data = Cookies.get(getKey(name, this.prefix, this.suffix));
        if (data && this.encryption) {
            return handleDecryptData(this.encryptionKey, data)
        } else {
            return data || ''
        }

    }

    /**
     * 根据名字删除指定的cookie
     * 注意，删除不存在的cookie不会报错也不会有返回
     * @param key 
     */
    removeItem(key: string) {
        Cookies.remove(getKey(key, this.prefix, this.suffix));
    }

}


export default CreateCookies
