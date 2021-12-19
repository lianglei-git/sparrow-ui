---
order: 1
title: 最基本的用法
---
## desc-cn

12个方向

```jsx
const buttonWidth = 70
const Basic = () => {
    return <div className='code-demo'>
    <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
        <sp-tooltip title='text' placement='top-left' get-popup-container='.show-components'>
            <sp-button>TL</sp-button>
        </sp-tooltip>
        <sp-tooltip title='text' placement='top' get-popup-container='.show-components'>
            <sp-button>Top</sp-button>
        </sp-tooltip>
        <sp-tooltip title='text' placement='top-right' get-popup-container='.show-components'>
            <sp-button>TR</sp-button>
        </sp-tooltip>
    </div>
    <div style={{ width: buttonWidth, float: 'left' }}>
        <sp-tooltip title='text' placement='left-top' get-popup-container='.show-components'>
            <sp-button>LT</sp-button>
        </sp-tooltip>
        <sp-tooltip title='text' placement='left' get-popup-container='.show-components'>
            <sp-button>Left</sp-button>
        </sp-tooltip>
        <sp-tooltip title='text' placement='left-bottom' get-popup-container='.show-components'>
            <sp-button>LB</sp-button>
        </sp-tooltip>
    </div>
    <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
        <sp-tooltip title='text' placement='right-top' get-popup-container='.show-components'>
            <sp-button>RT</sp-button>
        </sp-tooltip>
        <sp-tooltip title='text' placement='right' get-popup-container='.show-components'>
            <sp-button>Right</sp-button>
        </sp-tooltip>
        <sp-tooltip title='text' placement='right-bottom' get-popup-container='.show-components'>
            <sp-button>RB</sp-button>
        </sp-tooltip>
    </div>
    <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
        <sp-tooltip title='text' placement='bottom-left' get-popup-container='.show-components'>
            <sp-button>BL</sp-button>
        </sp-tooltip>
        <sp-tooltip title='text' placement='bottom' get-popup-container='.show-components'>
            <sp-button>Bottom</sp-button>
        </sp-tooltip>
        <sp-tooltip title='text' placement='bottom-right' get-popup-container='.show-components'
        >
            <sp-button>BR</sp-button>
        </sp-tooltip>
    </div>
    </div>
}

ReactDOM.render(<Basic />, mountNode);
```


<style>
.code-demo sp-button {
    min-width: 90px;
    margin: 0 !important;
    
}
.code-demo sp-tooltip {
    padding:5px
}
</style>