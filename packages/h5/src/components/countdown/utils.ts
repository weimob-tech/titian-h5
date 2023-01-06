export interface TimeDataType {
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}
export function formatDuration(ms: number): TimeDataType {
  ms = Math.abs(ms);
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return time;
  // return Object.entries(time)
  //   .filter((val) => val[1] !== 0)
  //   .reduce((res, [key, value]) => ((res[key] = value), res), {} as any);
}
const padLeft = (str: string | number, num = 2, fill = '0') => String(str).padStart(num, fill);

export function formatDate(timeData: TimeDataType, formatStr: string, tag?: string) {
  const time = {
    DD: padLeft(timeData.day),
    D: padLeft(timeData.day, 1),
    HH: padLeft(timeData.hour),
    H: padLeft(timeData.hour, 1),
    mm: padLeft(timeData.minute),
    m: padLeft(timeData.minute, 1),
    ss: padLeft(timeData.second),
    s: padLeft(timeData.second, 1),
    SSS: padLeft(timeData.millisecond, 3),
  };
  if (tag === 'group') {
    const res: { [P in keyof TimeDataType]?: string } = {};
    const keyMap = new Map();
    keyMap.set('DD', 'day');
    keyMap.set('D', 'day');
    keyMap.set('HH', 'hour');
    keyMap.set('H', 'hour');
    keyMap.set('mm', 'minute');
    keyMap.set('m', 'minute');
    keyMap.set('ss', 'second');
    keyMap.set('s', 'second');
    keyMap.set('SSS', 'millisecond');
    // 此处需要保证循环顺序
    keyMap.forEach((value, key) => {
      if (formatStr.includes(key) && !res[value as keyof TimeDataType]) {
        res[value as keyof TimeDataType] = time[key as keyof typeof time];
      }
    });
    return res;
  }
  return formatStr.replace(
    new RegExp(`${Object.keys(time).join('|')}`, 'g'),
    subStr => time[subStr as keyof typeof time] || '',
  );
}

export function isDifferentTime(time1: number, time2: number, formatStr: string) {
  const actionsMap = new Map([
    ['SSS', () => time1 !== time2],
    ['s', () => Math.floor(time1 / 1000) !== Math.floor(time2 / 1000)],
    ['m', () => Math.floor(time1 / 60000) !== Math.floor(time2 / 60000)],
    ['H', () => Math.floor(time1 / 3600000) !== Math.floor(time2 / 3600000)],
    ['D', () => Math.floor(time1 / 86400000) !== Math.floor(time2 / 86400000)],
  ]);
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of actionsMap) {
    if (formatStr.includes(key)) {
      return value();
    }
  }
  return true;
}
