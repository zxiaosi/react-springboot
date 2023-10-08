import { useLaunch } from "@tarojs/taro";
import "./app.scss"; // 按需引入UI样式
import { updateManager } from "./utils";

const App: React.FC = ({ children }: any) => {
  // props.children 是将要会渲染的页面

  useLaunch(() => {
    updateManager(); // 检查更新
  })

  return children;
};

export default App;
