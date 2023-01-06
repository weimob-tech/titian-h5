<template>
  <div style="background-color: #f9f9f9">
    <CustomPage :options="options" @change="change">
      <div class="cell-container">
        <TiCell
          :title="attrs.title"
          :arrow="attrs.arrow"
          :required="attrs.required"
          :rightIcon="attrs.information === 1 ? 'plus' : ''"
          :label="attrs.label"
          :subDesc="attrs.subDesc"
          :desc="attrs.desc"
          :alignItems="attrs.alignItems"
          :extStyle="attrs.extStyle"
          :icon="attrs.icon"
          :divider="attrs.mode !== 2"
        >
          <TiTag
            v-if="attrs.slotName === 'slot-icon'"
            ext-style="margin-right: 12px;"
            style="display: contents"
            slot="icon"
          >
            标签
          </TiTag>
          <div class="slot-desc" slot="desc" v-if="attrs.slotName === 'slot-desc'">
            <div v-if="attrs.information === 2">
              <div style="color: #fa2c19">优惠券</div>
              <TiDivider orientation="vertical" :extStyle="dividerTop" :hairline="false" />
              编辑
            </div>
            <TiCheckbox defaultChecked v-if="attrs.information === 3" />
            <TiSwitch v-if="attrs.information === 4" />
            <TiBadge static dot v-if="attrs.information === 5" />
            <TiImage
              v-if="attrs.information === 6"
              width="64"
              height="64"
              radius="{4}"
              src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
              alt="图片"
            />
          </div>
        </TiCell>
        <TiCell
          v-if="attrs.mode !== 2"
          :title="attrs.longTitle"
          :arrow="attrs.arrow"
          :required="attrs.required"
          :rightIcon="attrs.information === 1 ? 'delete' : ''"
          :icon="attrs.icon"
          :divider="false"
          :titleWidth="attrs.titleWidth"
        >
          <TiTag
            v-if="attrs.slotName === 'slot-icon'"
            style="display: contents"
            slot="icon"
            extStyle="margin-right: 12px;"
          >
            标签
          </TiTag>

          <div v-if="attrs.slotName === 'slot-desc'" class="slot-desc" slot="desc">
            <div v-if="attrs.information === 2">
              <TiIcon name="plus" ext-style="margin-right: 8px" />
              添加
            </div>
            <TiCheckbox v-if="attrs.information === 3" :defaultChecked="false" />
            <TiSwitch v-if="attrs.information === 4" defaultValue />
            <TiBadge v-if="attrs.information === 5" :content="999" static />
            <TiImage
              v-if="attrs.information === 6"
              width="64"
              height="64"
              radius="100%"
              src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
              alt="图片"
            />
          </div>
        </TiCell>
      </div>
    </CustomPage>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { TiBadge, TiCellProps, TiCheckbox, TiDivider, TiImage, TiSwitch, TiTag } from 'titian-h5-vue';
import { TiCell } from 'titian-h5-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
import { addUnit } from '../../utils';

const options: IOptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    desc: '模式 ',
    list: [
      {
        label: '基础',
        value: 1,
        hiddenItems: ['partner', 'style'],
        attr: { title: '标题文字', longTitle: '标题文字' },
      },
      {
        label: '附加信息',
        value: 2,
        hiddenItems: ['partner', 'information', 'required'],
        attr: { title: '单行限制五' },
      },
      {
        label: '纯标题',
        value: 3,
        hiddenItems: ['style', 'information', 'required'],
        attr: { title: '标题文字', longTitle: '标题文字较长最大字数限制15个中文字符', titleWidth: '400px' },
      },
    ],
    value: 1,
  },
  {
    key: 'partner',
    type: 'radio',
    name: 'Title',
    desc: '标题区 ',
    list: [
      { label: '搭图标', value: 1, attr: { icon: 'home' } },
      { label: '搭标签', value: 2, attr: { slotName: 'slot-icon' } },
    ],
    value: 1,
  },
  {
    key: 'required',
    type: 'radio',
    name: 'Required',
    desc: '必填 ',
    list: [
      { label: '非必填', value: false },
      { label: '必填', value: true },
    ],
    value: false,
  },
  {
    key: 'style',
    type: 'radio',
    name: 'Style',
    desc: '样式',
    list: [
      { label: '样式1', value: 1, attr: { label: '附加信息', desc: '首行对齐', alignItems: 'flex-start' } },
      { label: '样式2', value: 2, attr: { label: '附加信息', desc: '居中对齐', alignItems: 'center' } },
      {
        label: '样式3',
        value: 3,
        attr: {
          subDesc: '附加信息',
          desc: '首行对齐',
          alignItems: 'flex-start',
          extStyle: '--cell-label-text-color: #FA2C19',
        },
      },
    ],
    value: 1,
  },
  {
    key: 'information',
    type: 'radio',
    name: 'Information',
    desc: '信息区',
    list: [
      { label: '无', value: 0 },
      { label: '图标', value: 1, hiddenItems: ['arrow'] },
      { label: '按钮', value: 2, hiddenItems: ['arrow'], attr: { slotName: 'slot-desc' } },
      { label: '单复选', value: 3, hiddenItems: ['arrow'], attr: { slotName: 'slot-desc' } },
      { label: '开关', value: 4, hiddenItems: ['arrow'], attr: { slotName: 'slot-desc' } },
      { label: '徽标', value: 5, attr: { slotName: 'slot-desc' } },
      { label: '图片', value: 6, attr: { slotName: 'slot-desc' } },
    ],
    value: 0,
  },
  {
    key: 'arrow',
    type: 'radio',
    name: 'Arrow',
    desc: '箭头',
    list: [
      { label: '无', value: false },
      { label: '有', value: true },
    ],
    value: true,
  },
];

interface Attrs extends TiCellProps {
  information?: number;
  mode?: number;
  slotName?: string;
  longTitle?: string;
  titleWidth?: string;
}
const attrs = ref<Attrs>({});
const dividerTop = `--divider-gap:${addUnit(28)}`;

const change = (detail: Attrs) => {
  attrs.value = detail;
};
</script>
<style>
.slot-desc {
  display: flex;
  align-items: center;
  max-height: 42px;

  font-size: 24px;
  font-weight: 500;
}

.cell-container {
  --checkbox-padding-h: 0;
  width: calc(100% - 56px);
  margin: 0 28px;
  overflow: hidden;

  border-radius: 20px;

  background: #fff;
}
</style>
