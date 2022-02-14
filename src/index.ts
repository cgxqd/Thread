export default class Thread<Events> {
    public events: Map<keyof Events, { handler: string }>;
    constructor() {
        this.events = new Map();
    }
    /**
     * 订阅事件
     * @param type 事件类型
     * @param handler 子线程处理函数
     */
    on<Event extends keyof Events>(type: Event, handler: (data: Events[Event]) => void): void {
        this.events.set(type, {
            handler: `(function(){\nonmessage = (event) => {\nlet data = event.data;\n(${handler.toString()})(data);};})()`,
        });
    }
    /**
     * 发布事件
     * @param type 事件类型
     * @param cb 主线程接收到子线程传递数据的回调
     * @param data 主线程传递给子线程的数据
     * @param isAbort 是否收到子线程的数据后立刻终止当前线程，默认 true
     * @returns 返回当前 Worker
     */
    emit<Event extends keyof Events>(
        type: Event,
        cb: (data: any) => void,
        data: Events[Event],
        isAbort = true
    ): Worker {
        // 当主线程没有传数据过来时
        let handler = this.events.get(type)!.handler;
        let url = URL.createObjectURL(new Blob([handler]));

        // 创建线程
        const worker = new Worker(url);

        // 向子线程发送消息
        data && worker.postMessage(data);

        // 监听子线程发送过来的消息
        worker.onmessage = (event) => {
            // 是否终止当前线程
            isAbort && worker.terminate();
            cb(event.data);
        };

        return worker;
    }
}