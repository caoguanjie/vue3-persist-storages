## 特点

- ✅ ` pinia ` 的持久化
- ✅ 各个模块支持自定义持久化配置
- ✅ 支持` indexedDB、storage `进行存储，解决容量大小问题
- ✅ 支持通过配置` 前缀、后缀 `，防止子项目之间持久化数据互相污染
- ✅ 支持普通对象和代理对象的存储
- ✅ 支持数据的AES加密和解密

## 安装

```js
// npm
npm i pinia-plugin-persistedstore
// yarn
yarn add pinia-plugin-persistedstore
// pnpm
pnpm i pinia-plugin-persistedstore
```

## 使用

### 初始化

```ts
// 直接配置插件
import { createPinia } from 'pinia'
import piniaPluginPersistedStore from 'pinia-plugin-persistedstore'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
```

如果你不想要同域名下子项目持久化数据之间互相污染，可以配置前缀或后缀

```ts
// 为缓存添加前缀后缀
import { createPlugin } from 'pinia-plugin-persistedstore';

const store = createPinia();

const store = createPinia();

store.use(
  createPlugin({
    prefix: 'sunshine_prefix',
    suffix: 'sunshine_suffix',
  }),
);
```

### 模块配置

模块想要启用持久化，可以配置 ` persist ` 参数，它的类型是 ` TPersist ` 

```ts
export interface IBasePersist {
  // 持久化存储的key（可选）
  key?: string;
  // 需要持久化的数据的路径（可选）
  paths?: string[];
  // 还原前执行函数（可选）
  beforeRestore?: (context: PiniaPluginContext) => void;
  // 还原后执行函数（可选）
  afterRestore?: (context: PiniaPluginContext) => void;
  // 还原失败打印报错（可选）
  debug?: boolean;
}

export interface IPersist extends IBasePersist {
  // storage类型，有localStorage、sessionStroage（可选）
  storage?: Storage;
  // 使用 indexedDB 或 storage（可选）
  type?: 'storage' | 'db';
}

// persist 的类型
export type TPersist = boolean | IPersist;
```

当你要启用持久化时，可以这么做

```ts
export const useUserStore = defineStore({
  id: 'app-user',
  persist: true, // 开启持久化
  state: (): UserState => ({
    name: 'sunshine'
  })
});
```

当你设置 ` persist = true ` 时，此模块开启了持久化功能，相当于传入了

```ts
  persist: {
    storage: localStorage,
    type: 'storage',
    key: $store.id, // 此模块的默认id
    paths: null,
    beforeRestore: null,
    afterRestore: null,
    debug: false,
  }
```

当然你也可以自己去进行配置，比如以下例子

```ts
export const useUserStore = defineStore({
  id: 'app-user',
  persist: {
    type: 'db',
    key: 'user_key',
    paths: ['userInfo', 'token'],
    beforeRestore: () => {
      console.log('beforeRestore');
    },
    afterRestore: () => {
      console.log('afterRestore');
    },
    debug: true,
  },
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
  }),
});
```