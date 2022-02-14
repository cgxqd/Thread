export default class Thread<Events> {
    events: Map<keyof Events, {
        handler: string;
    }>;
    constructor();
    /**
     * 订阅事件
     * @param type 事件类型
     * @param handler 子线程处理函数
     */
    on<Event extends keyof Events>(type: Event, handler: (data: Events[Event]) => void): void;
    /**
     * 发布事件
     * @param type 事件类型
     * @param cb 主线程接收到子线程传递数据的回调
     * @param data 主线程传递给子线程的数据
     * @param isAbort 是否收到子线程的数据后立刻终止当前线程，默认 true
     * @returns 返回当前 Worker
     */
    emit<Event extends keyof Events>(type: Event, cb: (data: any) => void, data: Events[Event], isAbort?: boolean): Worker;
}
//# sourceMappingURL=index.d.ts.map