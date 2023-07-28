import { Component, PropsWithChildren } from "react";

// 按需引入 TaroUI 组件
import "taro-ui/dist/style/components/icon.scss"; // icon
import "taro-ui/dist/style/components/button.scss"; // button
import "taro-ui/dist/style/components/loading.scss"; // loading

import "./app.less";

class App extends Component<PropsWithChildren> {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
