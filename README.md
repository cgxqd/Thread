# Thread
> Web动态线程封装

Thread 是为浏览器而设计的，但在任何支持 Worker api 的浏览器。

## 使用方法
```javascript
import Thread from 'Thread'

const thread = new Thead()

// listen to an event
thread.on('foo',e => console.log('foo',e))

// fire an event
thread.emit('foo',e => console.log('foo',e),{
    text:'test'
})
```

### typtescript
```typescript
import Thread from 'Thread';

type Events = {
  foo: string;
  bar?: number;
};

const thead = new Thread<Events>()
thead.on('foo',e => {}) // 'e' has inferred type 'string'
thread.emit('foo',e => {},42) // Error: Argument of type 'number' is not assignable to parameter of type 'string'. (2345)
```


