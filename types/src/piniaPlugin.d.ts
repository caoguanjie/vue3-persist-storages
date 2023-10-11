import { PiniaPluginContext, StateTree } from 'pinia';
import { IExtendPersist, IPluginOption } from './types';
/**
 * 更新本地存储的数据
 * @param state
 * @param persist
 */
export declare const updateStorage: (state: StateTree, persist: IExtendPersist) => void;
export declare const plugin: (context: PiniaPluginContext, _options?: IPluginOption) => void;
export declare const createPlugin: (options: IPluginOption) => (context: PiniaPluginContext) => void;
export default plugin;
