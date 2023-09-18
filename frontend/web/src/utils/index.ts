import { MyRegEx } from "./constant";

/**
 *  匹配 URL 和 Method 方法
 */
export const matchURLMethod = (str: string = "") => {
  const urlArr = str.match(MyRegEx.HttpOrHttos);
  // console.log("urlArr", urlArr?.[0]);

  const methodArr = str.match(MyRegEx.Method);
  // console.log("methodArr", methodArr?.[0]);

  return [urlArr?.[0], methodArr?.[0]];
};

/**
 * 树形结构转换
 */
export const convertToTree = (data: any[], pid: number = 0) => {
  const result: any[] = [];

  for (const item of data) {
    if (item.replyId === pid) {
      item.children = convertToTree(data, item.id) || [];
      result.push(item);
    }
  }

  return result;
}

/**
 * 根据时间戳计算时间差
 */
export function timeAgoInChinese(dateStr: string) {
  // 转换为时间戳
  const date = new Date(dateStr).getTime(); // 传入的时间
  const now = new Date().getTime(); // 当前时间
  let timeDiff = now - date; // 时间差

  // 定义时间单位
  const units = ['millisecond', 'second', 'minute', 'hour', 'day', 'month', 'year'];
  const unitTimes = [1, 1000, 60, 60, 24, 30, 12]; // 各单位对应的毫秒数

  // 计算时间差
  // eg: timeDiff = 39055157551
  // 39055157551 / 1000 = 39055157.551 (秒)
  // 39055157.551 / 60 = 650919.2925166667 (分)
  // 650919.2925166667 / 60 = 10848.654875277778 (时)
  // 10848.654875277778 / 24 = 452.0272864707407 (天)
  // 452.0272864707407 / 30 = 15.067576215691357 (月)
  let index = 0;
  while (index < unitTimes.length - 1 && timeDiff >= unitTimes[index + 1]) {
    timeDiff = timeDiff / unitTimes[index + 1];
    index++;
  }

  // 根据时间差生成描述
  let result = '';
  if (index === 0) { // 小于1秒
    result = 'just';
  } else {  // 大于1秒
    const englishNumbers = [
      '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
      'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', "eighteen", 'nineteen', 'twenty',
      'twenty one', 'twenty two', 'twenty three', 'twenty four', 'twenty five', 'twenty six', 'twenty seven', 'twenty eight', 'twenty nine', 'thirty'
    ];
    const roundedTimeDiff = Math.round(timeDiff);
    result = `${englishNumbers[roundedTimeDiff]} ${units[index]} ago`;
  }

  return result;
}
