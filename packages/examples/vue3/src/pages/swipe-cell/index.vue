<template>
  <div className="swipe-content">
    <CustomPage :options="options" @change="change">
      <TiSwipeCell
        :rightWidth="getWidth(attrs, 'right')"
        :leftWidth="getWidth(attrs, 'left')"
        @open="open"
        @close="close"
        extClass="page-swipe-cell"
      >
        <div class="swipe-action left" slot="left" v-if="attrs.direction === 'left'">
          <div class="btn">
            <TiButton
              :extClass="`swipe-cell-btn ${attrs.mode === 2 ? 'swipe-cell-column' : ''}`"
              :buttonInnerClass="`button-inner-class ${attrs.mode === 2 ? 'btn-column' : ''}`"
              :prefixIconClass="`prefix-icon-class
              ${attrs.mode === 2 ? 'prefix-btn-column' : ''}`"
              prefixIcon="rate-star"
              color="#FFA300"
            >
              收藏
            </TiButton>
          </div>
          <div class="btn" v-if="attrs.number === 2">
            <TiButton
              prefixIcon="delete"
              :extClass="`swipe-cell-btn ${attrs.mode === 2 ? 'swipe-cell-column' : ''}`"
              :buttonInnerClass="`button-inner-class ${attrs.mode === 2 ? 'btn-column' : ''}`"
              :prefixIconClass="`prefix-icon-class ${attrs.mode === 2 ? 'prefix-btn-column' : ''}`"
            >
              删除
            </TiButton>
          </div>
        </div>
        <TiCellGroup v-if="attrs.mode === 1">
          <TiCell desc="居右详细内容文字" required title="标题"></TiCell>
        </TiCellGroup>
        <div class="good-card" v-if="attrs.mode !== 1">
          <div :style="{ display: 'flex', marginRight: '10px', alignItems: 'center' }">
            <TiCheckbox :defaultChecked="true" />
          </div>
          <TiImage
            width="180"
            height="180"
            radius="12"
            src="https://placemat.imgix.net/placeholder_images/images/000/000/140/original/photo-1416339684178-3a239570f315?ixlib=rb-1.0.0&w=2000&h=1500&fm=auto&crop=faces%2Centropy&fit=crop&txt=2000%C3%971500&txtclr=BFFF&txtalign=middle%2Ccenter&txtfit=max&txtsize=42&txtfont=Avenir+Next+Demi%2CBold&bm=multiply&blend=ACACAC&s=1b48ef9db8a3d3d93756735f5b0cc8e1"
          />
          <div class="good-content">
            <div class="good-title">水洗棉系列整套 卧室三件套包整套满散件包</div>
            <div class="good-action">
              <TiTag variant="filled" size="small" color="primary" rightIcon="arrow-down"> 短款露脐装 </TiTag>
            </div>
          </div>
        </div>
        <div slot="right" class="swipe-action right" v-if="attrs.direction === 'right'">
          <div class="btn">
            <TiButton
              :extClass="`swipe-cell-btn ${attrs.mode === 2 ? 'swipe-cell-column' : ''}`"
              :buttonInnerClass="`button-inner-class ${attrs.mode === 2 ? 'btn-column' : ''}`"
              :prefixIconClass="`prefix-icon-class ${attrs.mode === 2 ? 'prefix-btn-column' : ''}`"
              prefixIcon="rate-star"
              color="#FFA300"
            >
              收藏
            </TiButton>
          </div>
          <div class="btn" v-if="attrs.number === 2">
            <TiButton
              prefixIcon="delete"
              :extClass="`swipe-cell-btn ${attrs.mode === 2 ? 'swipe-cell-column' : ''}`"
              :buttonInnerClass="`button-inner-class ${attrs.mode === 2 ? 'btn-column' : ''}`"
              :prefixIconClass="`prefix-icon-class
              ${attrs.mode === 2 ? 'prefix-btn-column' : ''}`"
            >
              删除
            </TiButton>
          </div>
        </div>
      </TiSwipeCell>
    </CustomPage>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiSwipeCell, TiCellGroup, TiCell, TiButton, TiCheckbox, TiImage, TiTag } from '@titian-design/vue';
import { IOptionType } from '../../components/page.interface';
import CustomPage from '../../components/page.vue';

const options: IOptionType[] = [
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

const attrs = ref<Attrs>({});

const change = (detail: Attrs) => {
  attrs.value = detail;
};

const close = () => {
  console.log('close');
};

const open = () => {
  console.log('open');
};

const getWidth = (attrs: Attrs, direction: 'right' | 'left') => {
  const width = attrs.number === 2 ? (attrs.mode === 2 ? 264 : 276) : attrs.mode === 2 ? 132 : 120;
  return attrs.direction === direction ? width : 0;
};
</script>
<style lang="less">
.swipe-content {
  --button-icon-size: 28px;

  & ti-swipe-cell {
    &::part(page-swipe-cell) {
      --icon-line-height: 1;

      width: calc(100% - 56px);
      margin: 0 28px;
    }
  }

  & ti-button {
    &::part(swipe-cell-btn) {
      height: calc(100% - 24px) !important;
      padding: 28px 20px;

      font-size: 24px;
    }

    &::part(swipe-cell-column) {
      padding: 28px 36px;
    }

    &::part(prefix-icon-class) {
      margin-right: 4px;
    }

    &::part(btn-column) {
      flex-direction: column;

      --button-icon-size: 36px;

      ::part(prefix-icon-class) {
        margin-right: 0;
        margin-bottom: 4px;
      }
    }

    &::part(prefix-btn-column) {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}

.swipe-action {
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.swipe-action.left {
  padding-left: 0;
}

.swipe-action.right {
  padding-right: 0;
}

.btn-column {
  flex-direction: column;
}

.prefix-icon {
  margin-right: 0;
  margin-bottom: 10px;
}

.prefix-icon-h {
  margin-right: 8px;
}

.btn {
  display: flex;
  align-items: center;
  height: 100%;
}

.left .btn {
  margin-right: 12px;
}

.right .btn {
  margin-left: 12px;
}

.good-card {
  display: flex;
  padding: 28px;

  border-radius: 20px;

  background: #fff;
}

.good-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 0 0 24px;
}

.good-title {
  color: #212121;
  font-family: PingFangSC-Regular, 'PingFang SC';
  font-size: 28px;
  font-weight: 400;
}

.good-img {
  width: 180px;
  height: 180px;
}

.good-action {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.good-number {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
