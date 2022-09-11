---
category: Components
type: 表单
title: Layout  
subTitle: 布局
---

当你想任意布局，且不受外界阻力时。

## 何时使用
- 需要用户自定义操作布局内容
- 提供两种模式，默认模式和自定义模式任其选择

![gif](http://101.43.178.134:8888/down/VYECa40o6pHI)


## API 
| 参数       | 说明           | 类型    | 可选 | 默认值 |
| ---------- | -------------- | ------- | ---- | ------ |
| column     | 列数           | number  | -    | 4      |
| row        | 行数           | number  | -    | 4      |
| iscustom   | 是否自定义     | boolean | -    | false      |
| cellHeight | 单元格高度     | number  | -    | 40      |
| cellWidth  | 单元格高度宽度 | number  | -    | 40      |


### callback
- `checkCallback(k: [startY:number, startX:number, endY:number, endX:number], pos:number[], style: {left: number, top: number, width: number, height: number})`
  - jsx使用
    ```jsx
        const target = useRef(null);
        useEffect(() => {
            target.current.checkCallback = (historyListPos,curPos,style) => {}
        }, [])
        return <sp-layout ref={target} ></sp-layout>
    ```
  - html使用
    ```html
        <html>
            <sp-layout id='layout'></sp-layout>
            <script>
                /** '$' for jquery */
                $('#layout').checkCallback = (historyListPos,curPos,style) => {}
            </script>
        </html>

    ```