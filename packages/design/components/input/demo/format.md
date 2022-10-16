---
order: 5
title: 输入时格式化展示
---

## desc-cn 
结合 `Tooltip` 组件，实现一个数值输入框，方便内容超长时的全量展现。


```jsx
function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component {
  onChange = (e, value) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  };


  componentDidMount() {
      this.refs.demo.onChange = this.onChange
  }

  render() {
    const { value } = this.props;
    const title = value ? (
      value !== '-' ? formatNumber(value) : '-'
    ) : (
      'Input a number'
    );
    return (
      <sp-tooltip
        trigger={['focus']}
        title={title}
        placement="top-left"
        get-popup-container='.show-components'
        offcenter='-15'
      >
        <sp-input
          {...this.props}
          ref='demo'
          placeholder="Input a number"
          maxLength={25}
        />
      </sp-tooltip>
    );
  }
}

class NumericInputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  onChange = value => {
      console.log(value)
    this.setState({ value });
  };

  render() {
    return (
      <NumericInput style={{ width: 120 }} value={this.state.value} onChange={this.onChange} />
    );
  }
}

ReactDOM.render(<NumericInputDemo />, mountNode);
```
