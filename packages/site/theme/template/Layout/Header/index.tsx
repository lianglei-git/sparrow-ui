import React, { useEffect, useRef, useState } from "react";
import { Link } from "bisheng/router";
import "./index.less";

import { getSettingState, setSettingState } from "../../utils/index";
// import { $ } from 'packages/components/lines/common/dom';
let location = { pathname: "" };
if (typeof window != "undefined") {
  location = window.location;
}

const SettingModal = (props) => {
  const SettingState = getSettingState();
  let [visible, setVisible] = useState(false);
  let [switch_SW_value, setSwitch_SW_value] = useState(SettingState.useSW);
  let modalone = useRef();
  let switch_SW = useRef();
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);
  useEffect(() => {
    modalone.current.onClose = () => {
      setVisible(false);
    };
    switch_SW.current.onClick = () => {
      setSwitch_SW_value(!switch_SW_value);
    };
  }, []);

  const onClose = () => {
    props?.onClose?.();
    setVisible(false);
  };
  const onOk = () => {
    props?.onOk?.();
    setVisible(false);
    setSettingState({
      useSW: switch_SW_value,
    });
    history.go(0);
    // Spui.Message.success({
    //     message: '魔法最终战胜了魔法',
    //     duration: 3000,
    //     showclose: true,
    //     center: true
    // })
  };
  return (
    <>
      <sp-modal
        ref={modalone}
        title="设置"
        visible={visible}
        class="SettingModal"
      >
        <div slot="content" className="SettingModalContent">
          <p>
            <span>是否开启 Service Worker</span>
            <sp-switch value={switch_SW_value} ref={switch_SW}></sp-switch>
          </p>
        </div>
        <div slot="footer">
          <sp-button2 size="small" onClick={onClose}>
            取消
          </sp-button2>
          <sp-button2 size="small" type="primary" onClick={onOk}>
            确认
          </sp-button2>
        </div>
      </sp-modal>
    </>
  );
};

const Header = () => {
  const [isotherClass, setOther] = useState("");
  const [settingVisible, SetSettingVisible] = useState(false);
  const l = [
    {
      to: "/",
      label: "设计",
    },
    {
      to: "/docs/react/index/",
      label: "文档",
    },
    {
      to: "/components/overview/",
      label: "组件",
    },
    // {
    //     to: '/theme',
    //     label: '主题'
    // },
    {
      to: () => (
        <a href="https://github.com/lianglei-git/" target="_blank">
          github
        </a>
      ),
      label: "github",
    },
    {
      to: "/custom",
      label: "定制",
    },
  ];
  const randomBack = (e) => {
    const hot = `hue-rotate(${~~(Math.random() * 360)}deg)`;
    document.body.style.filter = hot;
  };
  useEffect(() => {
    setOther(location.pathname == "/" ? "" : "other");
    if (location.pathname !== "/") {
      (document.querySelector("#react-content") as HTMLElement).classList.add(
        "active"
      );
    } else {
      (
        document.querySelector("#react-content") as HTMLElement
      ).classList.remove("active");
    }
  }, [location.pathname]);

  return (
    <section className={["Header", isotherClass].join(" ")}>
      <div className={isotherClass}>
        <div className="l-h">
          <Link to="/" className="logo">
            <div className="img"> </div>
            <span>Sprrow</span>
          </Link>
          <div className="sun" onClick={(e) => randomBack(e)}>
            <span className="sp-icon sp-icon-earth"></span>
          </div>
          {/* <div style={{width: 200}}>
                    <sp-search placeholder='搜索组件' allow-clear='true' enter-button='false' bordered='true' className='seatch-site' prefix='<span class="sp-icon sp-icon-search"></span>'></sp-search>
                    <div className='fixed--searchComs'></div>
                </div> */}
        </div>
        {/** 动画 */}
        <div className="c-center"></div>
        <div className="r-h">
          <div className="dev">
            <sp-badge text=" ">
              <div
                className="sp-icon sp-icon-shezhi1 settingicon"
                onClick={() => SetSettingVisible(true)}
              ></div>
            </sp-badge>
          </div>
          <div className="l">
            <ul>
              {l.map((i) => {
                return (
                  <li
                    key={i.label}
                    className={
                      location.pathname == i.to ||
                      (location.pathname.indexOf("components") > -1 &&
                        typeof i.to == "string" &&
                        i.to.indexOf("components") > -1)
                        ? "active"
                        : ""
                    }
                  >
                    {typeof i.to == "function" ? (
                      i.to()
                    ) : (
                      <Link to={i.to}> {i.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <SettingModal
        visible={settingVisible}
        onClose={() => SetSettingVisible(false)}
        onOk={() => SetSettingVisible(false)}
      />
    </section>
  );
};

export default Header;
