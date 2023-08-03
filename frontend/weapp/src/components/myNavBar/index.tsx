import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { getNavBarHeight } from "../utils";
import styles from "./index.module.scss";

const {
  statusBarHeight,
  navHeight,
  capsuleMargin,
  capsuleWidth,
  capsuleSumWidth,
} = getNavBarHeight(); // 顶部状态栏高度

interface Props {
  /** 标题 */
  title?: string;

  /** 左侧图标 */
  leftIcon?: string;

  /** 图标颜色 */
  iconColor?: string;

  /** 返回链接 */
  backUrl?: string;

  /** 弹窗提示 */
  modalText?: string;

  /** 自定义返回事件 */
  backFunc?: () => void;
}

/**
 * 顶部导航栏
 * @param props {@link Props}
 */
const MyNavBar = (props: Props) => {
  const {
    title = "",
    leftIcon = "",
    iconColor = "#000",
    backUrl,
    modalText,
    backFunc,
  } = props;

  /** 返回事件 */
  const back = () => {
    // 跳转链接
    if (backUrl) {
      Taro.reLaunch({ url: backUrl });
      return;
    }

    // 弹窗提示
    if (modalText) {
      Taro.showModal({
        title: "是否退出本页面?",
        content: modalText,
        confirmText: "退出",
        cancelText: "不退出",
        success: function (res) {
          if (res.confirm) {
            Taro.navigateBack({ delta: 1 });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    }

    // 自定义返回事件
    if (backFunc) {
      backFunc();
      return;
    }

    // 返回上一页
    Taro.navigateBack({ delta: 1 });
  };

  return (
    <View
      className={styles.navBar}
      style={{
        height: statusBarHeight + navHeight + "px",
        paddingTop: statusBarHeight + "px",
      }}
    >
      <View
        className={styles.back}
        style={{
          width: capsuleWidth + "px",
          margin: `0 ${capsuleMargin}px`,
        }}
      >
        {leftIcon && (
          <AtIcon value={leftIcon} color={iconColor} onClick={back} />
        )}
      </View>

      <View
        className={styles.title}
        style={{ marginRight: capsuleSumWidth + "px" }}
      >
        {title}
      </View>
    </View>
  );
};

export default MyNavBar;
