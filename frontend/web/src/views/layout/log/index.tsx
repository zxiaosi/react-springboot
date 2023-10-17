import { useTestApi } from "@/apis";
import { useEffect, useRef, useState } from "react";
import { Button, Image as AntdImage } from 'antd';
import defaultImg from "@/assets/images/default.png";
import { ImageUrl } from "@/assets/js/global";
import styles from "./index.module.less";

const Index = () => {
  const { repsonse } = useTestApi();

  const [testData, setTestData] = useState({
    url: "",
    axis: [],
  });

  const [canvasSize, setCanvasSize] = useState({
    width: 300,
    height: 150,
  })

  const containerSize = useRef({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const el = document.getElementById("container") as HTMLDivElement;
    containerSize.current = { width: el.clientWidth, height: el.clientHeight };
  }, [])

  useEffect(() => {
    if (repsonse?.data?.url) { // 获取图片尺寸
      const image = new Image() as HTMLImageElement;
      image.src = ImageUrl + repsonse?.data?.url;

      image.onload = () => {
        const { width, height } = image;
        const scale = width / containerSize.current.width;
        setCanvasSize({ width: width / scale, height: height / scale });
      }
    }

    setTestData({ ...repsonse?.data });
  }, [repsonse])

  const handleClick = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    if (canvas) {
      const { width, height } = canvasSize;
      const ctx = canvas.getContext('2d');

      const scale = width / containerSize.current.width;

      const image = new Image() as HTMLImageElement;
      image.src = ImageUrl + testData?.url;

      image.onload = () => {
        ctx?.clearRect(0, 0, width, height); // 清除画布
        ctx?.drawImage(image, 0, 0, width / scale, height / scale);

        for (let i = 0; i < testData?.axis?.length; i++) {
          const [x, y, w, h]: any = testData?.axis[i];
          ctx?.strokeRect(x, y, w, h);
        }
      }
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <AntdImage
          src={testData?.url ? ImageUrl + testData?.url : defaultImg}
          className={styles.img}
          preview={testData?.url ? true : false}
        />
      </div>

      <div className={styles.transformed} onClick={handleClick}>
        <Button type="primary" >识别</Button>
      </div>

      <div id="container" className={styles.container}>
        <canvas id="canvas" {...canvasSize} />
      </div>
    </div>
  );
};

export default Index;
