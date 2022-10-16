import './App.css';
import { Message } from '@sparrowend/ui'
import {Button} from 'antd'
import '@sparrowend/ui/dist/spui.css'
function App() {
  const star = () => {
    console.log(99199, '99199');
    Message.success('成功了呀')
  }
  return (
    <div className="App">
      <Button>999</Button>
      <sp-button type="primary" onClick={() => star()}>电我一下</sp-button>
    </div>
  );
}

export default App;
