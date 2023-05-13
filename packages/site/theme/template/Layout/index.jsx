import React from "react";
import H from "./Header";
import "../../static/index.js";
// 编译器认识（package.json），webpack不认识...
import "design/components/index";
import "./loadstyle";


// ~/.ssh/known_hosts
// 20.205.243.166 ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAq2A7hRGmdnm9tUDbO9IDSwBK6TbQa+PXYPCPy6rbTrTtw7PHkccKrpp0yVhp5HdEIcKr6pLlVDBfOLX9QUsyCOV0wzfjIJNlGEYsdlLJizHhbn2mUjvSAHQqZETYP81eFzLQNnPHt4EVVUh7VfDESU84KezmD5QlWpXLmvU31/yMf+Se8xhHTvKSCZIFImWwoG6mbUoWf9nzpIoaSjB+weqqUUmpaaasXVal72J+UX2B+2RPW3RcT0eOzQgqlJL3RKrTJvdsjE3JEAvGq3lGHSZXy28G3skua2SmVi/w4yCE6gbODqnTWlg7+wC604ydGXA8VJiS5ap43JXiUFFAaQ==
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { children } = this.props;
    return (
      <>
        <sp-affix
          offset-top="0"
          style={{ zIndex: "9", background: "#fff", width: "100%" }}
          className="sspp"
        >
          <H></H>
        </sp-affix>
        {children}
      </>
    );
  }
}
