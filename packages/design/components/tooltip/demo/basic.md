---
order: 2
title: 不同的方向
---
## desc-cn

12个方向

```jsx
const buttonWidth = 90
const Basic = () => {
    return <div className='code-demo'>
    <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
        <sp-tooltip title='prompt text' placement='top-left' get-popup-container='.show-components'>
            <sp-button>TL</sp-button>
        </sp-tooltip>
        <sp-tooltip title='prompt text' placement='top' get-popup-container='.show-components'>
            <sp-button>Top</sp-button>
        </sp-tooltip>
        <sp-tooltip title='prompt text' placement='top-right' get-popup-container='.show-components'>
            <sp-button>TR</sp-button>
        </sp-tooltip>
    </div>
    <div style={{ width: buttonWidth, float: 'left' }}>
        <sp-tooltip title='prompt text' placement='left-top' get-popup-container='.show-components'>
            <sp-button>LT</sp-button>
        </sp-tooltip>
        <sp-tooltip title='prompt text' placement='left' get-popup-container='.show-components'>
            <sp-button>Left</sp-button>
        </sp-tooltip>
        <sp-tooltip title='prompt text' placement='left-bottom' get-popup-container='.show-components'>
            <sp-button>LB</sp-button>
        </sp-tooltip>
    </div>
    <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
        <sp-tooltip title='prompt text' placement='right-top' get-popup-container='.show-components'>
            <sp-button>RT</sp-button>
        </sp-tooltip>
        <sp-tooltip title='prompt text' placement='right' get-popup-container='.show-components'>
            <sp-button>Right</sp-button>
        </sp-tooltip>
        <sp-tooltip title='prompt text' placement='right-bottom' get-popup-container='.show-components'>
            <sp-button>RB</sp-button>
        </sp-tooltip>
    </div>
    <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
        <sp-tooltip title='prompt text' placement='bottom-left' get-popup-container='.show-components'>
            <sp-button>BL</sp-button>
        </sp-tooltip>
        <sp-tooltip title='prompt text' placement='bottom' get-popup-container='.show-components'>
            <sp-button>Bottom</sp-button>
        </sp-tooltip>
        <sp-tooltip title='prompt text' placement='bottom-right' get-popup-container='.show-components'
        >
            <sp-button>BR</sp-button>
        </sp-tooltip>
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
.code-demo sp-tooltip {
    padding:5px
}
</style>