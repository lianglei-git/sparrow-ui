---
order: 3
title: 不同的方向
---
## desc-cn

12个方向

```jsx
const buttonWidth = 90
const Basic = () => {
    return <div className='code-demo'>
    <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
        <sp-popover title='标题' 
        trigger='click' content='提示内容' placement='top-left' get-popup-container='.show-components'>
            <sp-button>TL</sp-button>
        </sp-popover>
        <sp-popover title='标题'
        trigger='click' content='提示内容'  placement='top' get-popup-container='.show-components'>
            <sp-button>Top</sp-button>
        </sp-popover>
        <sp-popover title='标题' 
        trigger='click' content='提示内容' placement='top-right' get-popup-container='.show-components'>
            <sp-button>TR</sp-button>
        </sp-popover>
    </div>
    <div style={{ width: buttonWidth, float: 'left' }}>
        <sp-popover title='标题' 
        trigger='click' content='提示内容' placement='left-top' 
        ispreventdefault='false' get-popup-container='.show-components'>
            <sp-button>LT</sp-button>
        </sp-popover>
        <sp-popover title='标题' 
        trigger='click' content='提示内容' placement='left' get-popup-container='.show-components'>
            <sp-button>Left</sp-button>
        </sp-popover>
        <sp-popover title='标题' 
        trigger='click' content='提示内容' placement='left-bottom' get-popup-container='.show-components'>
            <sp-button>LB</sp-button>
        </sp-popover>
    </div>
    <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
        <sp-popover title='标题' 
        trigger='click' content='提示内容' placement='right-top' get-popup-container='.show-components'>
            <sp-button>RT</sp-button>
        </sp-popover>
        <sp-popover title='标题' 
        trigger='click' content='提示内容' placement='right' get-popup-container='.show-components'>
            <sp-button>Right</sp-button>
        </sp-popover>
        <sp-popover title='标题' 
        trigger='click' content='提示内容' placement='right-bottom' get-popup-container='.show-components'>
            <sp-button>RB</sp-button>
        </sp-popover>
    </div>
    <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
        <sp-popover title='标题' 
        trigger='click' content='提示内容' placement='bottom-left' get-popup-container='.show-components'>
            <sp-button>BL</sp-button>
        </sp-popover>
        <sp-popover title='标题' 
        trigger='click' content='提示内容' placement='bottom' get-popup-container='.show-components'>
            <sp-button>Bottom</sp-button>
        </sp-popover>
        <sp-popover title='标题' 
        trigger='click' content='提示内容'  placement='bottom-right' get-popup-container='.show-components'
        >
            <sp-button>BR</sp-button>
        </sp-popover>
    </div>
    </div>
}

ReactDOM.render(<Basic />, mountNode);
```


<style>
.code-demo {
    margin-left: 100px;
}
.code-demo sp-button {
    min-width: 90px;
    margin: 0 !important;
    border-radius: 1px;
}
.code-demo sp-popover {
    padding:5px
}
</style>