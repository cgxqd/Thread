import Thread from "../src/index";

type even = "add" | "reduce";
type Events = {
    [K in even]: {
        x: number;
        y: number;
    };
};

let thread = new Thread<Events>();

thread.on("add", (data) => {
    console.log("add:主线程的数据", data);
    self.postMessage(data.x + data.y, null);
});
thread.on("reduce", (data) => {
    console.log("reduce:主线程的数据", data);
    self.postMessage(data.x - data.y, null);
});

thread.emit(
    "add",
    (res) => {
        console.log("add: res", res);
    },
    { x: 1, y: 2 }
);

thread.emit(
    "reduce",
    (res) => {
        console.log("reduce: res", res);
    },
    { x: 3, y: 2 }
);
