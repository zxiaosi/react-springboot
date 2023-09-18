import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import zhCN from "antd/locale/zh_CN"; // 引入 Ant Design 中文包

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>

    {/* react-router-dom 的 BrowserRouter 组件: 使用浏览器的内置历史记录堆栈进行导航 */}
    <BrowserRouter>

      {/* antd 的 ConfigProvider 组件: 实现中英文切换 */}
      <ConfigProvider locale={zhCN} >

        <App />

      </ConfigProvider >

    </BrowserRouter >

  </React.StrictMode>
);
