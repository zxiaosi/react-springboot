import { useTestApi } from "@/apis";
import { Button, Card } from "antd";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: userData, mutate, repsonse } = useTestApi();

  useEffect(() => {
    console.log("data", repsonse);
  }, [repsonse]);

  return (
    <div>
      <h1>Dashboard</h1>

      <Card title="测试接口" style={{ width: 300, marginBottom: 20 }}>
        {
          repsonse ? <div>
            <p>业务码: {repsonse?.code}</p>
            <p>接口描述: {repsonse?.msg}</p>
            <p>接口数据: {JSON.stringify(repsonse.data)}</p>
          </div> : <p>加载中...</p>
        }
      </Card>

      <Button type="primary" onClick={async () => {
        mutate({ ...userData })
      }}>点我更新接口</Button>
    </div>
  );
};

export default Dashboard;
