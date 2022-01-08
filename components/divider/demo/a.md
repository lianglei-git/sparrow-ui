---
order: 0
title: 测试板块
---

## desc-cn 
测试咯

```jsx
const Demo = () => {
    return <div>
    <p>阿拉山口多久啊来看电视剧啦看得见阿</p>
        <sp-divider></sp-divider>
    <p>阿拉山口多久啊来看电视剧啦看得见阿</p>
        <sp-divider>标题文字</sp-divider>
        <sp-divider orientation='left'>标题文字</sp-divider>
        <sp-divider orientation='right'>标题文字</sp-divider>
        <sp-divider orientation='right' dashed='true' plain='true'>标题文字</sp-divider>
        <sp-divider dashed='true'></sp-divider>

        标题1<sp-divider type='vertical'></sp-divider>
        标题2<sp-divider type='vertical'></sp-divider>
        标题3
    </div>
}
ReactDOM.render(<Demo />, mountNode)
```

<style>
    sp-collapse {
        margin-top: 20px
    }
</style>