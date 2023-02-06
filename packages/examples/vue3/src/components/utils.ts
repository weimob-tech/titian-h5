import { IOptionType } from './page.interface';

export function formatOption(data: IOptionType[]): IOptionType[] {
  const options: (IOptionType & { show?: boolean })[] = data;
  options.forEach(item => {
    item.show = true;
  });
  options.forEach(element => {
    if (element.type === 'color') {
      element.value = element.value || '#fa2c19';
    } else if (element.type === 'radius') {
      element.value = element.value || 0;
    } else if (element.type === 'radio') {
      const target = element.list.find((item, index) => {
        if (item.value === element.value) {
          element.currentIndex = index;
          return true;
        }
        return false;
      });
      if (!target?.hiddenItems) return;
      target.hiddenItems.forEach(it => {
        const item = options.find(el => el.key === it);
        // 只有当他自己显示的情况下，才能控制他的hiddenItems
        element.show && item && (item.show = false);
      });
    }
  });
  return options;
}
