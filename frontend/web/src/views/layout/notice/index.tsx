import { EditOutlined, EyeOutlined, LikeOutlined, MessageOutlined, SearchOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Input, List, Space, Tag } from "antd";
import { useState } from "react";
import styles from './index.module.less';

import mockData from '@/apis/mock.json';
import { convertToTree, timeAgoInChinese } from "@/utils";

const commentData = convertToTree(mockData); // 评论数据

const Index = () => {
  const [search, setSearch] = useState({
    value: '', // 搜索框值
    loading: false, // 搜索框loading
  });
  const [tabId, setTabId] = useState(1); // 0: 论坛, 1: 最新
  const [isOpen, setIsOpen] = useState(false); // 是否展开所有评论
  const [isReply, setIsReply] = useState(Array.from({ length: commentData.length }).fill(false)); // 是否开启回复评论

  /**
   * 搜索事件
   */
  const onSearch = () => {
    setSearch({ ...search, loading: true });

    // 模拟请求
    setTimeout(() => {
      setSearch({ ...search, loading: false });
      setTabId(0);
      resetIsReply()
    }, 2000);
  }

  /**
   * 展开所有评论
   */
  const onOpenAllComment = () => {
    setIsOpen(!isOpen);
    resetIsReply()
  }

  /**
   * 展开子评论
   */
  const onOpenComment = (idx: number) => {
    console.log("onOpenComment", idx);
    isReply[idx] = !isReply[idx]; // 切换当前评论的回复状态
    isReply.splice(idx + 1); // 删除当前评论下的所有子状态
    setIsReply(JSON.parse(JSON.stringify(isReply))); // 深拷贝, 页面渲染
  }

  /**
   * 判断是否是第一层评论组件
   * @param item 评论数据 具体的某一条
   * @param isFirst 是否是第一层评论
   */
  const isFirstComment = (item: any, isFirst: boolean = false): any => {
    if (isFirst) {
      return <>{renderChildren(item)}</>
    } else {
      return isReply[item.id] && item?.children?.length > 0 && <div className={styles.children}>{renderChildren(item?.children)}</div>
    }
  }

  /**
   * 生成子列表
   * @param listItem 评论数据
   */
  const renderChildren = (listItem: any) => {
    return (
      <List
        bordered
        itemLayout="vertical"
        pagination={{
          onChange: (page) => {
            console.log(page, listItem?.[page - 1].id);
            isReply[listItem?.[page - 1].id] = false; // 重置当前评论的回复状态
            setIsReply(JSON.parse(JSON.stringify(isReply))); // 深拷贝, 页面渲染
          },
          pageSize: 1,
        }}
        dataSource={listItem}
        renderItem={(item: any) => (
          <List.Item key={item.id}>
            <>
              {/* 评论内容 */}
              <List.Item.Meta
                avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${item.id}`} />}
                title={
                  <div className={styles.title}>
                    <div>{item.createUser}</div>
                    <div> {timeAgoInChinese(item.createTime)}</div>
                  </div>
                }
                description={
                  <div className={styles.desc}>{item.comment}</div>
                }
              />

              {/* 评论信息 */}
              <div className={styles.actions}>
                <div className={styles.otherInfoItem} >
                  <StarOutlined style={{ color: item.collectedFlag && "red" }} />
                  <div>{item.collectedCount}</div>
                </div>
                <div className={styles.otherInfoItem}>
                  <LikeOutlined style={{ color: item.likedFlag && "red" }} />
                  <div>{item.likedCount}</div>
                </div>
                <div className={styles.otherInfoItem}>
                  <MessageOutlined />
                  <div>{item.repliedCount}</div>
                </div>
                <div className={styles.otherInfoItem} onClick={() => item?.children.length > 0 ? onOpenComment(item.id) : {}}>
                  <EditOutlined />
                  <div>回复评论</div>
                </div>
              </div>

              {/* 子列表 */}
              {isFirstComment(item, false)}
            </>
          </List.Item >
        )
        }
      />
    )
  }

  /**
   * 重置setIsReply
   */
  const resetIsReply = () => {
    setIsReply(Array.from({ length: commentData.length }).fill(false));
  }

  return (
    <div className={styles.page}>
      {/* 头部: 搜索框+面包屑 */}
      <div className={styles.header}>

        {/* 搜索框 */}
        <div className={styles.searchBtn}>
          <Space.Compact className={styles.search}>
            <Input value={search.value} placeholder="请输入" prefix={<SearchOutlined style={{ color: "#BFBFBF" }} />} onChange={(e) => setSearch({ ...search, value: e.target.value })} />
            <Button type="primary" loading={search.loading} onClick={onSearch}>{search.loading ? "正在搜索" : "搜索"}</Button>
          </Space.Compact>

          <Button type="primary">我要提问</Button>
        </div>

        {/* 面包屑 */}
        <Breadcrumb
          className={styles.breadcrumb}
          items={["论坛", "最新"].map((item, index) => {
            return {
              title: <a className={tabId === index ? styles.active : ''} onClick={() => setTabId(index)}>{item}</a>,
            };
          })}
        />
      </div>

      {
        tabId === 0 && (<div style={{ margin: "20px 0" }}>我是论坛组件</div>)
      }

      {
        tabId === 1 && (
          <>
            {/* 中间: 博客 */}
            <div className={styles.blog}>

              {/* 博客标题 */}
              <div className={styles.title}>
                <div>与其等待与能力匹配的机会, 不会培养与机会匹配的能力</div>
                <Tag color="success">未回答</Tag>
              </div>

              {/* 博客身份 */}
              <Tag className={styles.identity}>admin</Tag>

              {/* 博客内容 */}
              <div className={styles.article}>
                蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态， 提供跨越设计与开发的体验解决方案。
                蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态， 提供跨越设计与开发的体验解决方案。
              </div>

              {/* 博客标签 */}
              <div className={styles.tag}>
                <div className={styles.tagLeft}>
                  <Tag>数据</Tag>
                  <Tag>功能</Tag>
                </div>

                <Button
                  size="small"
                  className={styles.tagRight}
                  icon={<MessageOutlined />}
                  onClick={onOpenAllComment}
                >点我展开评论</Button>
              </div>

              {/* 博客信息 */}
              <div className={styles.otherInfo}>
                <div className={styles.otherInfoItem}>
                  <StarOutlined />
                  <div>收藏</div>
                </div>
                <div className={styles.otherInfoItem}>
                  <EyeOutlined />
                  <div>140</div>
                </div>
                <div className={styles.otherInfoItem}>
                  <MessageOutlined />
                  <div>6</div>
                </div>
              </div>
            </div>

            {/* 底部: 评论 */}
            {
              isOpen && <div className={styles.comment}>
                {/* 评论总计 */}
                <div className={styles.sum}>{mockData.length} 回复</div>

                {/* 评论列表 */}
                {isFirstComment(commentData, true)}
              </div>
            }
          </>
        )
      }
    </div >
  );
};

export default Index;
