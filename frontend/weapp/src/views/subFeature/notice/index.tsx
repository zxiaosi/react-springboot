import { sendBizApi } from "@/apis";
import MyLayout from "@/components/myLayout";
import { tmplId } from "@/global";
import { Textarea, View } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import { useState } from "react";
import { AtAccordion, AtIcon, AtSteps, AtTabs, AtTabsPane } from "taro-ui";
import { Item } from "taro-ui/types/steps";
import styles from "./index.module.scss";

let isAuth = false; // 是否授权

const issues = [
  { title: '页面问题', children: ['页面加载慢', '页面崩溃', '页面错位', '页面空白'] },
  { title: '功能问题', children: ['功能不可用', '功能异常', '功能缺失', '功能错误'] },
  { title: '其他' }
]

const Index = () => {
  const router = useRouter();

  const routerParams = JSON.parse(router?.params?.item || "{}");

  const [current, setCurrent] = useState(0); // 当前步骤

  const [stepItems, setSetpItems] = useState<Item[]>([
    { title: '订阅服务通知' },
    { title: '选择问题类型' },
    { title: '发送服务通知' }
  ]);

  const [issuesOpen, setIssuesOpen] = useState(new Array(issues.length).fill(false)); // 问题反馈是否展开

  const [issueInfo, setIssueInfo] = useState({ // 问题反馈信息
    type: '', // 问题类型
    subType: '' as string | undefined, // 问题子类型
    content: '', // 问题描述
  });

  /**
   * 步骤改变事件
   * @param newCurrent 点击的步骤
   */
  const handleChange = (newCurrent: number) => {
    if (current == 0) {
      if (isAuth) {
        setCurrent(newCurrent);
        stepItems[current].status = "success";
        setSetpItems(JSON.parse(JSON.stringify(stepItems)));
        return
      } else {
        Taro.showToast({ title: '请先授权', icon: 'none' });
        return;
      }
    }

    if (current == 1) {
      if (newCurrent == 0) {
        setCurrent(newCurrent);
        setSetpItems(stepItems.map((step) => { return { ...step, status: undefined } }));
        return
      }

      if (newCurrent == 2) {
        if (issueInfo.type) {
          setCurrent(newCurrent);
          stepItems[current].status = "success";
          setSetpItems(JSON.parse(JSON.stringify(stepItems)));
          return;
        } else {
          Taro.showToast({ title: '请选择问题类型', icon: 'none' });
          return;
        }
      }
    }

    if (current == 2) {
      if (newCurrent == 0) {
        setCurrent(newCurrent);
        setSetpItems(stepItems.map((step) => { return { ...step, status: undefined } }));
        return
      }

      if (newCurrent == 1) {
        setCurrent(newCurrent);
        stepItems[0].status = "success";
        setSetpItems(stepItems.map((step, idx) => { return { ...step, status: idx == 0 ? "success" : undefined } }));
        return
      }
    }
  }

  /**
   * 获取授权
   */
  const handleAuth = () => {
    Taro.requestSubscribeMessage({
      tmplIds: [tmplId],
      success: (res) => {
        if (res[tmplId] == 'accept') {
          console.log("用户点击同意--", res);
          isAuth = true;

          // 跳转到下一步
          setCurrent(current + 1)
          stepItems[current].status = "success";
          setSetpItems(JSON.parse(JSON.stringify(stepItems)));
        } else {
          console.log("用户点击拒绝--", res);
        }
      },
      fail: (err) => {
        console.log("订阅消息打开失败", err);
      }
    })
  }

  /**
   * 打开关闭事件
   * @param open 是否打开
   * @param idx 索引
   */
  const handleOpen = (open: boolean, idx: number) => {
    setIssuesOpen(issuesOpen.map((bool, index) => index === idx ? open : bool));
  }

  /**
   * 子问题点击事件
   * @param idx 索引
   * @param subIdx 子索引
   */
  const handleIssueClick = (idx: number, subIdx: number) => {
    // 保存问题类型
    const type = issues[idx].title;
    const subType = subIdx > -1 ? issues[idx]?.children?.[subIdx] : '';
    setIssueInfo({ type, subType, content: '' });

    // 跳转到下一步
    setCurrent(current + 1)
    setSetpItems(stepItems.map((item, index) => index === current ? { ...item, status: "success" } : item));
  }

  /**
   * 提交事件
   */
  const handleSubmit = async () => {
    const { type, subType, content } = issueInfo;
    console.log("问题反馈信息", issueInfo);
    const { data: { code } } = await sendBizApi(`${type}${subType ? `-${subType}` : ''}${content ? `-${content}` : ''}`);

    if (code == 0) {
      setSetpItems(stepItems.map((step) => { return { ...step, status: "success" } }));
    } else {
      Taro.showToast({ title: '发送失败', icon: 'none' });
    }
  }

  return (
    <MyLayout
      isUseBgColor={true}
      leftIcon="chevron-left"
      title={routerParams?.name}
      backFunc={() => Taro.navigateBack()}
    >
      <View className={styles.page}>
        <View className={styles.title}>问题反馈消息订阅</View>

        <View className={styles.context}>
          <AtSteps
            items={stepItems}
            current={current}
            onChange={handleChange}
            className={styles.steps}
          />

          <AtTabs current={current} tabList={[]} onClick={() => { }} className={styles.tabs}>
            <AtTabsPane current={current} index={0}>
              <View className={styles.subscribe} onClick={handleAuth}>
                <View className={styles.btn} style={{ width: "40%" }}>点击进行授权</View>
              </View>
            </AtTabsPane>

            <AtTabsPane current={current} index={1} >
              <View className={styles.issues}>
                {issues.map((issue, idx) => (
                  issue.children ? <AtAccordion
                    title={issue.title}
                    open={issuesOpen[idx]}
                    onClick={(open: boolean) => handleOpen(open, idx)}
                  >
                    {
                      issue.children?.map((subIssue, subIdx) => (
                        <View className={styles.subIssue} onClick={() => handleIssueClick(idx, subIdx)}>
                          <View>{subIssue}</View>
                          <AtIcon value='chevron-right' size='20' color='#ccc' />
                        </View>
                      ))
                    }
                  </AtAccordion>
                    : <View className={styles.issue} onClick={() => handleIssueClick(idx, -1)}>
                      <View>{issue.title}</View>
                      <AtIcon value='chevron-right' size='24' color='#ccc' />
                    </View>
                ))}
              </View>
            </AtTabsPane>

            <AtTabsPane current={current} index={2}>
              <View className={styles.send}>
                <View className={styles.column}>
                  <View className={styles.label}>问题类型: </View>
                  <View>{issueInfo.type}{issueInfo.subType && `-${issueInfo.subType}`}</View>
                </View>

                <View className={styles.column}>
                  <View className={styles.label}>问题描述: </View>

                  <Textarea
                    autoHeight
                    maxlength={400}
                    placeholder="请描述详细内容"
                    value={issueInfo.content}
                    className={styles.textarea}
                    onInput={(e) => setIssueInfo({ ...issueInfo, content: e.detail.value })}
                  />
                </View>

                <View className={styles.btn} onClick={handleSubmit}>提 交</View>
              </View>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    </MyLayout>
  )
}

export default Index;