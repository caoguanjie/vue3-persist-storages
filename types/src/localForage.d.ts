import { IStorageOption } from './types';
export declare class CreateLocalForage {
    private storage;
    private config;
    private lcalForageConfig;
    private waitQueues;
    private debug;
    private encryption;
    private encryptionKey;
    constructor(option?: IStorageOption & LocalForageOptions);
    /**
     * 初始化存储对象
     */
    init(): void;
    /**
     * @description 读取数据库数据
     * @param key 缓存键值
     * @param def 默认值，不传的话默认值为null
     * @returns 本地有数据就那本地数据，没数据就返回默认值
     */
    getItem(key: string, def?: any): Promise<any>;
    /**
      * @description 设置缓存数据
      * @param key 缓存键
      * @param value 缓存值,
      * @member value的类型 支持以下类型
      *  Array
      ArrayBuffer
      Blob
      Float32Array
      Float64Array
      Int8Array
      Int16Array
      Int32Array
      Number
      Object
      Uint8Array
      Uint8ClampedArray
      Uint16Array
      Uint32Array
      String
      */
    setItem(key: string, value: any, _isOpenExpires?: boolean | undefined, expires?: number | undefined): Promise<any>;
    /**
     * @description 从缓存删除某项
     * @param {string}  key  缓存键
     */
    removeItem(key: string): Promise<unknown>;
    /**
     * @description 清空所有缓存
     */
    clear(): Promise<unknown>;
    /**
       * 获取本地数据库的大小，主要是获取indexDB的大小
       * {
          quota: 440922000000, // 最大可用字节数, 浏览器存储空间配额
          usage: 27300000,     // 已用字节数, 浏览器已经使用的存储空间大小，
          usageDetails: {        // 这个返回结果不固定
              indexedDB: 676000, // indexedDB的使用占用空间的大小情况，单位字节，
              cacheapi: 26500000,  // 缓存空间
              serviceworker: 52800  // serviceworker服务
          }
      } */
    getSize(): Promise<string | null>;
}
export declare const LocalForageStorage: CreateLocalForage;
export default LocalForageStorage;
