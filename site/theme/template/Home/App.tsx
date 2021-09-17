import React from 'react'
import {renderRoutes} from 'react-router-config'
import {NavLink as Link} from 'react-router-dom'
function App({route} :any) {
  return (
    <div className="App">
      提交MAC连通性
      <Link to="/a">跳转？？？：：A</Link>
      {renderRoutes(route.routes)}
    </div>
  );
}

export default App;
