import { useUserInfoApi } from "@/apis";
import { Button, Card } from "antd";

const Index = () => {
  const { mutate, repsonse } = useUserInfoApi();

  return (
    <div>
      <h1>Dashboard</h1>

      <Card title="测试接口" style={{ width: "auto", marginBottom: 20 }}>
        {
          repsonse ? <div>
            <p>业务码: {repsonse?.code}</p>
            <p>接口描述: {repsonse?.msg}</p>
            <p>接口数据: {JSON.stringify(repsonse.data)}</p>
          </div> : <p>加载中...</p>
        }
      </Card>

      <Button type="primary" onClick={() => mutate()}>点我更新接口</Button>
    </div>
  );
};

export default Index;
