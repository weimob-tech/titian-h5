import { useState } from 'react';
import { TiSearch, TiSearchProps, TiIcon } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';
import './index.css';
interface SearchAttrsProps extends TiSearchProps {
  radius?: number;
  style?: number;
  align?: boolean;
  dashed?: number;
}
const options: OptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'dashed',
    name: 'Mode',
    value: 0,
    list: [
      {
        label: '默认',
        value: 0,
        attr: { style: 0 },
        hiddenItems: ['style'],
      },
      {
        label: '自定义',
        value: 1,
        attr: { style: 0 },
        hiddenItems: ['style'],
      },
      {
        label: '搭配组件',
        value: 2,
        attr: {},
      },
    ],
  },
  {
    type: 'radio',
    desc: '对齐',
    key: 'align',
    name: 'Align',
    value: 0,
    list: [
      {
        label: '居左',
        value: 0,
        attr: { align: false },
      },
      {
        label: '居中',
        value: 1,
        attr: { style: 0, align: true },
        hiddenItems: ['style'],
      },
    ],
  },
  {
    type: 'radio',
    desc: '搭配',
    key: 'style',
    name: 'Style',
    value: 0,
    list: [
      {
        label: '搭配1',
        value: 0,
      },
      {
        label: '搭配2',
        value: 1,
      },
      {
        label: '搭配3',
        value: 2,
      },
    ],
  },
  {
    type: 'radius',
    name: 'Radius',
    key: 'radius',
    desc: '圆角',
    value: 8,
    max: 16,
  },
];

const extCss = `
  .titian-search.search-box {
    border-radius: 10px;
    --icon-color: #212121;
  }
  .titian-search.diy {
    background-color: #f3f3f3;
  }
  .search-inner-class {
    background-color: #fff !important;
  }
`;
const Search: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<SearchAttrsProps>({} as SearchAttrsProps);
  const change = (attrs: any) => {
    console.log(attrs);
    setAttrs(attrs);
  };

  return (
    <Page options={options} change={change}>
      <div
        style={
          {
            'width': '100%',
            'margin': '0 28px',
            '--search-radius': attrs.radius + 'px',
          } as React.CSSProperties
        }
      >
        {attrs.style === 0 ? (
          <TiSearch
            ext-class={attrs.dashed === 1 ? 'diy search-box' : 'search-box'}
            extCss={extCss}
            search-inner-class={attrs.dashed === 1 ? 'search-inner-class' : ''}
            placeholder="请输入代填项引导文案"
            center={attrs.align}
            alwaysShowPrefix
            onSearch={e => {
              console.log('onSearch', e);
            }}
            onInput={e => {
              console.log('onInput', e);
            }}
          ></TiSearch>
        ) : attrs.style === 1 ? (
          <TiSearch
            ext-class="search-box"
            extCss={extCss}
            placeholder="请输入代填项引导文案"
            center={attrs.align}
            alwaysShowPrefix
          >
            <div slot="prefix" className="prefix">
              <span>请选择</span>
              <ti-icon name="arrow-down" size="32" />
            </div>
            <TiIcon slot="icon" name="scan" size="32" />
          </TiSearch>
        ) : (
          <TiSearch
            onSearch={e => {
              console.log('111', e);
            }}
            ext-class="search-box"
            extCss={extCss}
            search-button-class="test"
            placeholder="请输入代填项引导文案"
            center={attrs.align}
            alwaysShowPrefix
          >
            <div slot="prefix" className="prefix">
              <TiIcon name="category" size="42" />
            </div>
            <div slot="suffix" className="suffix">
              <TiIcon name="arrange" size="42" />
            </div>
          </TiSearch>
        )}
      </div>
    </Page>
  );
};

export default Search;
