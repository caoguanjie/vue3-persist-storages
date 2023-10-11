/**
 * 一个简单的控制台日志显示的hook小工具
 * 使用方法：  const { log } = useLogger(); log.success('日志工具', '好成功')
 * @returns
 */
export declare const useLogger: () => {
    print: (title: string, content?: any, type?: string) => void;
    log: {
        primary: (content?: any, title?: string) => void;
        success: (content?: any, title?: string) => void;
        info: (content?: any, title?: string) => void;
        warning: (content?: any, title?: string) => void;
        danger: (content?: any, title?: string) => void;
    };
};
export declare const fitslog: {
    primary: (content?: any, title?: string) => void;
    success: (content?: any, title?: string) => void;
    info: (content?: any, title?: string) => void;
    warning: (content?: any, title?: string) => void;
    danger: (content?: any, title?: string) => void;
};
