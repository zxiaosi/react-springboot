import { useUserInfoApi } from "@/apis";
import MyEcharts from "@/components/myEcharts";
import { Button, Card, Skeleton } from "antd";
import { useState } from "react";

const Index = () => {
  const [loading, setLoading] = useState(false);

  const { mutate, repsonse } = useUserInfoApi();

  const handleClick = () => {
    setLoading(true);
    mutate().then(() => {
      setLoading(false);
    });
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <Card title="测试接口" style={{ width: "auto", marginBottom: 20 }}>
        <Skeleton active loading={!repsonse?.data || loading}>
          <p>业务码: {repsonse?.code}</p>
          <p>接口描述: {repsonse?.msg}</p>
          <p>接口数据: {JSON.stringify(repsonse?.data)}</p>
        </Skeleton>
      </Card>

      <Button type="primary" onClick={handleClick}>点我更新接口</Button>

      <MyEcharts />
    </div>
  );
};

export default Index;
