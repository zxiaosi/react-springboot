import { Title } from "@/assets/js/global";

/** 动态设置页面标题 -- 可不要 */
const DomTitle = ({ title, children }: { title?: string; children: JSX.Element }) => {
  document.title = `${title} | ${Title}`; // 页面名
  return children;
};

export default DomTitle;