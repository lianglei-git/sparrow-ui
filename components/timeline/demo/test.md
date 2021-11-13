---
order: 0
title: 测试模块
---
## desc-cn

测试模块


```jsx

const Test = () => {
    return <div>

        <sp-timeline>
          <sp-timeline-item icon="sp-icon-success">
          内容7778899
        <br />
        999
        <br />
        1012020
        </sp-timeline-item>
       <sp-timeline-item>
          内容7778899
        <br />
        999
        <br />
        1012020
        </sp-timeline-item>
        <sp-timeline-item icon="sp-icon-loading" >阿世界科技</sp-timeline-item>
        </sp-timeline>


        <sp-timeline mode='right'>
          <sp-timeline-item icon="sp-icon-success">
          内容7778899
        <br />
        999
        <br />
        1012020
        </sp-timeline-item>
       <sp-timeline-item>
          内容7778899
        <br />
        999
        <br />
        1012020
        </sp-timeline-item>
        <sp-timeline-item icon="sp-icon-loading" >阿世界科技</sp-timeline-item>
        </sp-timeline>



      <sp-timeline mode='right'>
          <sp-timeline-item icon="sp-icon-success">
          内容7778899
        <br />
        999
        <br />
        1012020
        </sp-timeline-item>
       <sp-timeline-item label='777'>
          内容7778899
        <br />
        999
        <br />
        1012020
        </sp-timeline-item>
        <sp-timeline-item icon="sp-icon-loading" >阿世界科技</sp-timeline-item>
        </sp-timeline>


              <sp-timeline mode='left'>
          <sp-timeline-item icon="sp-icon-success">
          内容7778899
        <br />
        999
        <br />
        1012020
        </sp-timeline-item>
       <sp-timeline-item label='777'>
          内容7778899
        <br />
        999
        <br />
        1012020
        </sp-timeline-item>
        <sp-timeline-item >阿世界科技</sp-timeline-item>
        </sp-timeline>

         <sp-timeline mode='left' pending='flse'>
          <sp-timeline-item icon="sp-icon-success">
          内容7778899
        <br />
        999
        <br />
        1012020
        </sp-timeline-item>
       <sp-timeline-item label='777' icon='sp-icon-close' position='right'>
            <span>Title</span>
            <div> 
                <img src='https://images.cyclingfactory.be/fam_Noah_image_1024x.png'/>
            </div>
        </sp-timeline-item>
        <sp-timeline-item >阿世界科技</sp-timeline-item>
        </sp-timeline>
    </div>
}
ReactDOM.render(<Test />, mountNode);
```