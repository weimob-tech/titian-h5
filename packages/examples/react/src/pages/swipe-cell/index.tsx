import { useState } from 'react';
import { TiButton, TiCell, TiCellGroup, TiCheckbox, TiImage, TiSwipeCell, TiTag } from 'titian-h5-react';
import Page, { OptionType } from '../../components/page';

import './index.less';

const options: OptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    desc: '模式',
    list: [
      { label: '单元格', value: 1 },
      { label: '商品列表', value: 2 },
    ],
    value: 1,
  },
  {
    key: 'number',
    type: 'radio',
    name: 'Number',
    desc: '按钮数',
    list: [
      { label: '1个', value: 1 },
      { label: '2个', value: 2 },
    ],
    value: 1,
  },

  {
    key: 'direction',
    type: 'radio',
    name: 'Direction',
    desc: '方向',
    list: [
      { label: '左滑', value: 'left' },
      { label: '右滑', value: 'right' },
    ],
    value: 'left',
  },
];

interface Attrs {
  mode?: number;
  number?: number;
  direction?: string;
}

const SwipeCellPage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  console.log('attrs: ', attrs);

  return (
    <div className="swipe-content">
      <Page options={options} change={setAttrs}>
        <TiSwipeCell
          rightWidth={
            attrs.direction === 'right'
              ? attrs.number === 2
                ? attrs.mode === 2
                  ? 264
                  : 276
                : attrs.mode === 2
                ? 132
                : 120
              : 0
          }
          leftWidth={
            attrs.direction === 'left'
              ? attrs.number === 2
                ? attrs.mode === 2
                  ? 264
                  : 276
                : attrs.mode === 2
                ? 132
                : 120
              : 0
          }
          onOpen={res => {
            console.log(`打开 ${res.detail.position}`);
          }}
          onClose={res => {
            console.log(`关闭 ${res.detail.position}`);
          }}
          extClass="page-swipe-cell"
        >
          {attrs.direction === 'left' ? (
            <div className="swipe-action left" slot="left">
              <div className="btn">
                <TiButton
                  extClass={`swipe-cell-btn ${attrs.mode === 2 ? 'swipe-cell-column' : ''}`}
                  buttonInnerClass={`button-inner-class ${attrs.mode === 2 ? 'btn-column' : ''}`}
                  prefixIconClass={`prefix-icon-class ${attrs.mode === 2 ? 'prefix-btn-column' : ''}`}
                  prefixIcon="rate-star"
                  color="#FFA300"
                >
                  收藏
                </TiButton>
              </div>
              {attrs.number === 2 ? (
                <div className="btn">
                  <TiButton
                    prefixIcon="delete"
                    extClass={`swipe-cell-btn ${attrs.mode === 2 ? 'swipe-cell-column' : ''}`}
                    buttonInnerClass={`button-inner-class ${attrs.mode === 2 ? 'btn-column' : ''}`}
                    prefixIconClass={`prefix-icon-class ${attrs.mode === 2 ? 'prefix-btn-column' : ''}`}
                  >
                    删除
                  </TiButton>
                </div>
              ) : null}
            </div>
          ) : null}
          {attrs.mode === 1 ? (
            <TiCellGroup>
              <TiCell desc="居右详细内容文字" required title="标题"></TiCell>
            </TiCellGroup>
          ) : (
            <div className="good-card">
              <div style={{ display: 'flex', marginRight: 10, alignItems: 'center' }}>
                <TiCheckbox defaultChecked />
              </div>
              <TiImage
                width={180}
                height={180}
                radius={12}
                src="https://placemat.imgix.net/placeholder_images/images/000/000/140/original/photo-1416339684178-3a239570f315?ixlib=rb-1.0.0&w=2000&h=1500&fm=auto&crop=faces%2Centropy&fit=crop&txt=2000%C3%971500&txtclr=BFFF&txtalign=middle%2Ccenter&txtfit=max&txtsize=42&txtfont=Avenir+Next+Demi%2CBold&bm=multiply&blend=ACACAC&s=1b48ef9db8a3d3d93756735f5b0cc8e1"
              />
              <div className="good-content">
                <div className="good-title">水洗棉系列整套 卧室三件套包整套满散件包</div>
                <div className="good-action">
                  <TiTag variant="filled" size="small" color="primary" rightIcon="arrow-down">
                    短款露脐装
                  </TiTag>
                </div>
              </div>
            </div>
          )}
          {attrs.direction === 'right' ? (
            <div slot="right" className="swipe-action right">
              <div className="btn">
                <TiButton
                  extClass={`swipe-cell-btn ${attrs.mode === 2 ? 'swipe-cell-column' : ''}`}
                  buttonInnerClass={`button-inner-class ${attrs.mode === 2 ? 'btn-column' : ''}`}
                  prefixIconClass={`prefix-icon-class ${attrs.mode === 2 ? 'prefix-btn-column' : ''}`}
                  prefixIcon="rate-star"
                  color="#FFA300"
                >
                  收藏
                </TiButton>
              </div>
              {attrs.number === 2 ? (
                <div className="btn">
                  <TiButton
                    prefixIcon="delete"
                    extClass={`swipe-cell-btn ${attrs.mode === 2 ? 'swipe-cell-column' : ''}`}
                    buttonInnerClass={`button-inner-class ${attrs.mode === 2 ? 'btn-column' : ''}`}
                    prefixIconClass={`prefix-icon-class ${attrs.mode === 2 ? 'prefix-btn-column' : ''}`}
                  >
                    删除
                  </TiButton>
                </div>
              ) : null}
            </div>
          ) : null}
        </TiSwipeCell>
      </Page>
    </div>
  );
};

export default SwipeCellPage;
