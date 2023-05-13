// @ts-nocheck
import { Link } from "bisheng/router";
import React from "react";
import "./index.less";
import './useSW.js'

if (typeof window !== "undefined") {
  window.$ = (s) => document.querySelector(s);
}
const Home = () => {
  return (
    <div className="home">
      <div className="logo-home"></div>
      <h1>Sparrow UI</h1>
      <h2>一个基于JavaScript的响应式的简洁UI组件库</h2>
      <div className="ot">
        <sp-button type="primary" shape="round">
          <Link to="/components/overview/">开始使用</Link>
        </sp-button>
        <sp-button shape="round">
          <a href="https://github.com/lianglei-git" target="_blank">
            Github
          </a>
        </sp-button>
      </div>
      <div className="fixed-cop">
        <span>Copyright © 2021-present Sparrow</span>
        &nbsp;|&nbsp;
        <span>
          <a href="https://beian.miit.gov.cn/" target="_blank">
            京ICP备2022004287号
          </a>
        </span>
      </div>
    </div>
  );
};
export default Home;
