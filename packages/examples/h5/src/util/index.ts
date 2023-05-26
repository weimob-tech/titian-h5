type Attr = Record<Option['key'], any>;

type ListItem = {
  value: unknown;
  property?: string;
  attr?: unknown;
};

type Option = {
  key: string;
  list?: ListItem[];
};

type Options = Array<Option>;

export function mergeOptionIntoAttrs(options: Options, attr: Attr) {
  const afterAttr: Record<Option['key'], ListItem['value']> = {};
  options.forEach(opt => {
    const attrVal = attr[opt.key];
    if (Array.isArray(opt.list)) {
      opt.list.forEach(o => {
        if (o.value === attrVal) {
          afterAttr[opt.key] = o.value;

          if (o.property) {
            Object.assign(afterAttr, o.property);
          } else if (o.attr) {
            Object.assign(afterAttr, o.attr);
          } else {
            afterAttr[opt.key] = o.value;
          }
        }
      });
    } else {
      afterAttr[opt.key] = attr[opt.key];
    }
  });
  return afterAttr;
}

export const getResponsivePixel = (px: number) => (document.documentElement.clientWidth / 750) * px;

const REGEXP = /^-?[0-9]+(.[0-9]+)?$/;

export function addUnit(value: string | number): string {
  if (REGEXP.test(`${value}`)) {
    return `${getResponsivePixel(Number(value))}px`;
  }
  return value as string;
}
