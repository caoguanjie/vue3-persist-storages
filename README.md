
# vue3-persist-storages

### 前言
众所周知，前端的存储方案主要是以下几种组成：
* Cookies
* LocalStorage、SessionStorage
* indexedDB
* Web SQL
* SQLite(小型数据库)
  
它们之间各自有相应的API，存在差异性比较大，在实际业务开发中，几乎有可能几种存储方案都会使用，他们各自有各自的优缺点，这里不做过多赘叙，在相同的产品中，对每个持久化存储的方式都有相同需求，于是就有了`vue3-persist-storages`的出现，目标是就是创造相同api，封装相同的功能，兼容各种实际场景，抹平不同存储的差异化调用。

## 特点
- ✅ 囊括了`Cookies`、`LocalStorage`、`SessionStorage`、`indexedDB`、`WebSQL`所有存储方案，可以自定义选择
- ✅ 支持普通对象和`代理对象proxy`的存储
- ✅ 支持本地持久化存储的`有效期设置`
- ✅ 支持通过配置` 前缀、后缀 `，防止父子项目之间持久化数据互相污染
- ✅ 支持本地存储的数据自定义配置`AES加密`和`解密`
- ✅ 封装了pinia plugin 插件，支持pinia 的持久化存储，具体特点如下：
     - 与 [vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) 相似的 API
     - 所有 Store 均可单独配置，也可以全局设置
     - 恢复持久化数据前后的 hook
     - 同样支持`有效期`、`数据加密和解密`、`自定义storage`设置


## 安装

```js
// npm
npm i vue3-persist-storages
// yarn
yarn add vue3-persist-storages
// pnpm
pnpm i vue3-persist-storages
```

## 使用Cookies
> cookies的存储主要采用[js-cookie](https://github.com/js-cookie/js-cookie#readme)作为解决方案


### CreateCookies API
```ts
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

```

### CreateCookies 基本用法

```js
import { CreateCookies } from 'vue3-persist-storages'

const cookies = new CreateCookies()
//  普通使用 string/boolean/number 基本类型
cookies.setItem('name', '张三')
console.log(cookies.getItem('name')) // 输出 张三

// 保存对象，直接传入即可
cookies.setItem('name', {id: '张三'})

// 可以开启有效期、数据加密、前后缀防止数据污染
const cookies = new CreateCookies({
  prefix: '前缀',
  suffix: '后缀',
  isOpenExpires: true,
  day: 0.5,
  encryption: false,
})
```

## 使用Storage
> Storage 分为LocalStorage、SessionStorage，两者的api完全一样，可以直接使用

### CreateStorage API
```ts
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

```

### CreateStorage 基本用法
> 基本使用和cookie的方法一样，`CreateStorage`只是多了一个`storage`属性，可以供开发选择`sessionStorage`还是`localStorage`的存储方式

```js
import { CreateStorage } from 'vue3-persist-storages'

const storage = new CreateStorage()
//  普通使用 string/boolean/number 基本类型
storage.setItem('name', '张三')
console.log(storage.getItem('name')) // 输出 张三

// 保存对象，直接传入即可
storage.setItem('name', {id: '张三'})

// 可以开启有效期、数据加密、前后缀防止数据污染
const storage = new CreateCookies({
  storage: sessionStorage,
  prefix: '前缀',
  suffix: '后缀',
  isOpenExpires: true,
  storage: ,
  day: 0.5,
  encryption: false,
})
```


## 使用indexedDB

indexedDB的API相对更难一些，为了更方便使用和入门，vue3PersistStorages采取了[localForage](https://github.com/localForage/localForage)作为接入`indexedDB`的解决方案，`localForage`只需要通过简单类似 `localStorage API` 的异步存储来改进你的 Web 应用程序的离线体验，它能存储多种类型的数据，而不仅仅是字符串，针对浏览器进行了兼容处理，当浏览器无法兼容`indexedDB`会自动降级使用`localStorage`进行存储。它还有一个优势，就是后续可以拓展方法与`sqlite`进行联动使用。

### CreateLocalForage API
```ts
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
export default CreateLocalForage;

```

### LocalForageOptions 属性
如果你想单纯只使用`LocalForage API`的话，可以只配置`LocalForageOptions`属性，即可跟官方配置一样

|  属性名  |  类型    | 说明    |默认值    | 
| ------- | ------- | --------- |  --------- |
| driver  | string | string[]  | 驱动，也就是选择是存储方式 |      [localforage.INDEXEDDB, localforage.WEBSQL,localforage.LOCALSTORAGE]                          | 
| size | string  | 数据库的大小（以字节为单位）。目前仅在 WebSQL 中使用  | - |
| version | string | 数据库的架构版本。仅在 WebSQL 和 IndexedDB 中使用 | - |
| description | string  | 数据库的描述，主要供开发人员使用 | - |
| name | string  | 数据库的名称 | Vue3PersistStorage |
| storeName | string  | 数据库建表的名称 | DataSheet |

### IStorageOption 属性
如果在希望给`LocalForage`的使用上，加上`有效期设置`、`数据加密解密功能`、`添加前缀后缀`防止数据污染，则需要额外添加`IStorageOption`属性

```ts
export interface IPluginOption {
    // 前缀, 默认值： ""
    prefix?: string;
    // 后缀 默认值： ""
    suffix?: string;
    // 数据库名称, 默认值：Vue3PersistStorage
    name?: string;
    // 数据库中表名，默认值：DataShee
    storeName?: string;
    // 调试模式，还原失败打印报错（可选）
    debug?: boolean;
    // 是否开启加密功能
    encryption?: boolean
}

export interface IStorageOption extends IPluginOption {
    // 是否开启有效期, 默认值：false
    isOpenExpires?: boolean;
    // 有效期默认几天, 默认值: 7天
    day?: number;
}
```

## CreateLocalForage 使用

```js
import { CreateLocalForage } from 'vue3-persist-storages'

// 直接使用localforage的api和相关方法
const localforage = new CreateLocalForage({
  name:'test',
  storeName: 'sheet',
  driver: [localforage.LOCALSTORAGE],
})
// 生成的localforage对象，会直接存放在`CreateLocalForage`的storages属性中，这样可以随时调用，CreateLocalForage没有封装过的关于localforage api的方法，
// 关于localforage更具体的api，可以参考： https://localforage.docschina.org/
localforage.storage.keys((key: any) => { console.log(key); })


// 可以开启有效期、数据加密、前后缀防止数据污染
const localforage = new CreateLocalForage({
  prefix: '前缀',
  suffix: '后缀',
  storage: localStorage,
  isOpenExpires: true,
  day: 0.5,
  encryption: false,
})
localforage.setItem('name', { id: 1 })
console.log(localforage.getItem('name'))

// 可以为单个键值为name，独立设置数据有效期为0.5天，其他数据不设有效期
localforage.setItem('name', { id: 1 }, true, 0.5)
```

## 使用Pinia Plugin 持久化存储

市场上pinia常用的持久化存储方案主要有以下两种：
1. [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate),最主流
2. [pinia-plugin-persist](https://github.com/Seb-L/pinia-plugin-persist)

以上两种方案在实际使用过程中，都发现以下不足：

* 不支持配置前缀后缀
* 不支持indexedDB，可能indexedDB是异步储存
* 不支持配置数据有效期
* 不支持配置数据加密和解密

于是才有了`vue3-persist-storages`，这里的`Pinia Plugin`是基于`CreateLocalForage、CreateCookies、CreateStorage`等三种方法而集成使用的。


### 初始化
```ts
// 直接配置插件
import { createPinia } from 'pinia'
import piniaPluginPersisted from 'vue3-persist-storages'

const pinia = createPinia()
pinia.use(piniaPluginPersisted)
```

### 全局配置
如果你不想要同域名下子项目持久化数据之间互相污染，可以全局配置前缀或后缀、数据库名、表名、是否开启调试、是否开启加密
```ts
export interface IPluginOption {
    // 前缀, 默认值： ""
    prefix?: string;
    // 后缀 默认值： ""
    suffix?: string;
    // 数据库名称, 默认值：Vue3PersistStorage
    name?: string;
    // 数据库中表名，默认值：DataShee
    storeName?: string;
    // 调试模式，还原失败打印报错（可选）
    debug?: boolean;
    // 是否开启加密功能
    encryption?: boolean
}
```

具体使用：

```ts
import { createPinia } from 'pinia'
import {createPlugin} from 'vue3-persist-storages'

const pinia = createPinia()
pinia.use(createPlugin({
  // 前缀
   prefix: '子项目id', 
   // 开启数据加密
   encryption: true,
   // 开启调试
   debug: true
   // 全局配置默认数据库名
   name: 'TestDataBase'
}))
```

### 模块配置

模块想要启用持久化，可以配置 persist 参数，它的类型是 TPersist

```ts
// 全局的配置，单个模块也可以继承，重新配置
export interface IPluginOption {
    // 前缀, 默认值： ""
    prefix?: string;
    // 后缀 默认值： ""
    suffix?: string;
    // 数据库名称, 默认值：Vue3PersistStorage
    name?: string;
    // 数据库中表名，默认值：DataShee
    storeName?: string;
    // 调试模式，还原失败打印报错（可选）
    debug?: boolean;
    // 是否开启加密功能
    encryption?: boolean
}

export interface IStorageOption extends IPluginOption {
    // storage类型，有localStorage、sessionStroage（可选）,可配合type使用
    storage?: Storage;
    // 是否开启有效期, 默认值：false
    isOpenExpires?: boolean;
    // 有效期默认几天, 默认值: 7天
    day?: number;
}

export interface PersistOptions extends IStorageOption {
    // 使用 indexedDB 或 storage（可选）
    type?: 'storage' | 'indexedDB' | 'cookies';
    // 持久化存储的key（可选）
    key?: string;
    // 需要持久化的数据的路径（可选）
    paths?: string[];
    // 还原前执行函数（可选）
    beforeRestore?: (context: PiniaPluginContext) => void;
    // 还原后执行函数（可选）
    afterRestore?: (context: PiniaPluginContext) => void;
}

export type TPersist = boolean | PersistOptions | PersistOptions[];
```

当你要启用持久化时，可以这么做
```ts
export const useUserStore = defineStore({
  id: 'user',
  persist: true, // 开启持久化
  state: () => ({
    name: 'caoguanjie'
  })
});
```
当你设置 persist = true 时，此模块开启了持久化功能，相当于传入了默认配置：

```ts
 persist: {
    type: 'indexedDB',
    name: 'Vue3PersistStorage'
    storeName: 'DataSheet'
    key: $store.id, // 此模块的默认id
    paths: undefined,
    encryption: false,
    beforeRestore: undefined,
    afterRestore: undefined,
    debug: false,
  }
```

当然，你也可以传入`persist`相关对象属性，进行配置，如下：

```ts
export const useUserStore = defineStore({
  id: 'user',
  persist: {
      type: 'indexedDB',
      name: 'TestDataBase'
      storeName: 'DataSheet'
      key: 'customKey', // 自定义id，不传就是默认模块id
      paths: ['name'],
      encryption: true,
      beforeRestore: () =>{
        console.log('beforeRestore');
      },
      afterRestore: () => {
        console.log('afterRestore');
      },
      debug: false
  }, // 开启持久化
  state: () => ({
    name: 'caoguanjie'
  })
});
```

如果遇到模块不同的变量需要用不同的存储方式时，你也可以传入`数组`结构的数据，如下方法：
```ts
persist: [
    {
      type: 'indexedDB',
      encryption: true, // 用户信息可以设置加密
      paths: ["userInfo", "isRememberme", "loginInfo"],
    },
    {
      key: 'accessToken',
      type: 'cookies', // token可以cookies保存，并且可以自定义设置键名为accessToken
      paths: ["token"],
    },
  ],
```

## 已知的问题
1. 使用CreateLocalForage、CreateCookies、CreateStorage中的`setItem`方法，支持单独为某个键值的存储数据，设置有效时间，但是无法为单个数据设置加密和解密。
2. pinia的`store.$subscribe`方法是监控所有模块的对象数据变化的，因此当数据量大的时候，复杂对象的监控会极其消耗性能，甚至造成卡顿的情况，在实际场景中，发现使用indexedDB存储数据超过100MB的时候，每次数据的保存，都会有卡顿的情况。性能差的电脑和手机端尤为明显。
3. 为了兼容pinia的`Options API`和`Composition API`两种写法产生的对象不同，`Vue3PersistStorage`用了`JSON.stringify`序列化和`JSON.parse`反序列化来处理对象，在一定程度上会造成多余的性能开销
4. `Vue3PersistStorage`不支持`vue2`和`SSR`

