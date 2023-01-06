import { Component, h, Host, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { hexToRGB } from '../common/utils/color';
import { isPlainObject, stringToAttrStyle } from '../common/utils/index';
import { join, handle } from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

const closeDouble = [
  {
    d: 'M210.289778 210.289778c-166.599111 166.627556-166.599111 436.792889 0 603.420444 166.627556 166.599111 436.792889 166.599111 603.420444 0 166.599111-166.627556 166.599111-436.792889 0-603.420444-166.627556-166.599111-436.792889-166.599111-603.420444 0z',
    fill: 'rgb(158, 158, 158)',
  },
  {
    d: 'M342.044444   631.978667l2.588445-2.901334L461.738667 512l-117.105778-117.077333a35.555556 35.555556 0 0 1 47.388444-52.878223l2.901334 2.588445L512 461.738667l117.077333-117.105778a35.555556 35.555556 0 0 1 52.878223 47.388444l-2.588445 2.901334L562.261333 512l117.105778 117.077333a35.555556 35.555556 0 0 1-47.388444 52.878223l-2.901334-2.588445L512 562.261333l-117.077333 117.105778a35.555556 35.555556 0 0 1-52.878223-47.388444z',
    fill: 'rgb(255, 255, 255)',
  },
];

const checkbox = [
  {
    d: 'M1024 0v1024H0V0h1024z m-253.216 358.656a40 40 0 0 0-53.376-1.76l-3.2 3.008-262.08 273.664-143.968-134.24-2.368-2.048a40 40 0 0 0-55.2 57.408l3.008 3.168 201.696 188.096 316.704-330.72 2.08-2.368c13.12-16 11.904-39.648-3.296-54.208z',
    fill: 'rgb(255, 44, 25)',
  },
];

const innerSvgPath = {
  'checkbox': checkbox,
  'close-double': closeDouble,
};

function getSvgBackgroundImage(data: {
  name?: string;
  viewBox: string;
  paths?: JSXBase.SVGAttributes | JSXBase.SVGAttributes[];
  fills: string | string[];
  extStyle?: string;
  size?: string | number;
  rotate?: string;
  useMask?: boolean;
}): {
  [key: string]: string;
} {
  const start = `${encodeURI('<svg')} viewBox='${data.viewBox}' xmlns='http://www.w3.org/2000/svg'  ${encodeURI('>')}`;
  const end = encodeURI('</svg>');
  let path = '';
  if (data.paths && !Array.isArray(data.paths)) {
    data.paths = data.paths ? [data.paths] : [];
  }
  const { name } = data;
  if (name && name in innerSvgPath) {
    path = innerSvgPath[name as keyof typeof innerSvgPath]
      .map(
        (item, index) =>
          `${encodeURI('<path')} d='${item.d}' fill='${data.fills[index] || item.fill}'${encodeURI('/>')}`,
      )
      .join(' ');
  } else if (data.paths && Array.isArray(data.paths) && data.paths.length > 0) {
    path = data.paths
      .map(pathItem => {
        const keys: (keyof JSXBase.SVGAttributes<SVGElement>)[] = Object.keys(
          pathItem,
        ) as (keyof JSXBase.SVGAttributes<SVGElement>)[];

        const pathStr = keys.map(attrKey => `${attrKey}='${pathItem[attrKey]}'`).join(' ');
        return `${encodeURI('<path ')} ${pathStr} ${encodeURI('/>')}`;
      })
      .join(' ');
  } else {
    return {};
  }
  const style = data.extStyle ? { ...stringToAttrStyle(data.extStyle) } : {};
  if (data.useMask) {
    style['-webkit-mask-image'] = ` url("data:image/svg+xml, ${start + path + end}")`;
    style['mask-image'] = ` url("data:image/svg+xml, ${start + path + end}")`;
  } else {
    style['background-image'] = ` url("data:image/svg+xml, ${start + path + end}")`;
  }

  if (data.size) {
    style.width = addUnit(data.size);
    style.height = addUnit(data.size);
  }

  if (data.rotate) {
    style.transform = `rotate(${data.rotate})`;
  }
  return style;
}

@Component({
  tag: 'ti-svg-path-view',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
})
export class TiSvgPathView implements BasicComponentAbstract {
  @Prop() extClass?: string;

  @Prop() extStyle?: string;

  @Prop() name?: string;

  @Prop() fills!: string | string[];

  @Prop() size?: string | number;

  @Prop() spin?: boolean;

  @Prop() paths?: JSXBase.SVGAttributes | JSXBase.SVGAttributes[];

  @Prop() viewBox?: string = '0 0 1024 1024';

  @Prop() rotate?: string;

  @Prop() useMask?: boolean = false;

  @State() svgPathFillColor: string[] = [];

  @State() svgPath: JSXBase.SVGAttributes[] = [];

  innerFills: string[] = [];

  innerPaths: JSXBase.SVGAttributes[] = [];

  @Event({ composed: false, bubbles: false }) tiClick: EventEmitter<string>;

  @Watch('fills')
  observerFills(next: string | string[], prev: string | string[]) {
    if (prev === next) {
      return;
    }
    const curFills = typeof next === 'string' ? JSON.parse(next) : next;
    this.innerFills = // eslint-disable-next-line no-nested-ternary
      (Array.isArray(curFills) ? curFills : typeof curFills === 'string' && curFills ? [curFills] : []) as string[];
  }

  @Watch('paths')
  observerPaths(
    next: string | JSXBase.SVGAttributes | JSXBase.SVGAttributes[],
    prev: string | JSXBase.SVGAttributes | JSXBase.SVGAttributes[],
  ) {
    if (prev === next) {
      return;
    }
    const curPaths = typeof next === 'string' ? JSON.parse(next) : next;
    this.innerPaths = (Array.isArray(curPaths) ? curPaths : [curPaths]).filter(path => isPlainObject(path));
  }

  @Watch('fills')
  @Watch('paths')
  observer() {
    const { innerFills, innerPaths } = this;
    const svgPathFillColor = innerFills.map(col => {
      if (col.indexOf('#') === 0) {
        return hexToRGB(col);
      }
      return col;
    });

    const svgPath = innerPaths.map(path => {
      if (path.fill) {
        if (path.fill.indexOf('#') === 0) {
          return {
            ...path,
            fill: hexToRGB(path.fill),
          };
        }
      }
      return path;
    });
    this.svgPathFillColor = svgPathFillColor;
    this.svgPath = svgPath;
  }

  componentDidLoad() {
    const { paths, fills } = this;
    const curPaths = typeof paths === 'string' ? JSON.parse(paths) : paths;
    const curFills = typeof fills === 'string' ? JSON.parse(fills) : fills;
    this.innerPaths = (Array.isArray(curPaths) ? curPaths : [curPaths]).filter(path => isPlainObject(path));
    this.innerFills = // eslint-disable-next-line no-nested-ternary
      (Array.isArray(curFills) ? curFills : typeof curFills === 'string' && curFills ? [curFills] : []) as string[];
    this.observer();
  }

  onClick = () => {
    this.tiClick.emit(this.name);
  };

  render() {
    const {
      name,
      spin,
      extStyle,
      rotate,
      size,
      svgPathFillColor,
      viewBox = '0 0 1024 1024',
      useMask,
      svgPath,
      extClass,
    } = this;
    const className = `${join('svg-path-view')} ${handle('svg-path-view', [spin ? 'spin' : ''])} ${extClass || ''}`;
    const style = getSvgBackgroundImage({
      name,
      fills: svgPathFillColor,
      viewBox,
      paths: svgPath,
      size,
      rotate,
      extStyle,
      useMask,
    });
    return <Host class={className} style={style} onClick={this.onClick} />;
  }
}
