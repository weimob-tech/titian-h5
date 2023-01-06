<template>
  <CustomPage :options="options" @change="onChange">
    <div class="input-container">
      <TiInput
        v-for="(item, index) in attrs.group"
        :type="item.type"
        :label="attrs.title || item.title"
        :prefix-icon="attrs.prefixIcons && attrs.prefixIcons[index]"
        :value="item.value"
        :label-class="item.titleClass"
        :required="attrs.required"
        :read-only="item.readonly"
        :text-align="attrs.textAlign"
        :ellipsis-line="item.ellipsisLine"
        :disabled="item.disabled"
        :placeholder="attrs.placeholder || item.placeholder"
        :error="item.error"
        :error-message="item.errorMessage"
      >
        <template v-if="attrs.templateNames">
          <TiIcon v-if="attrs.templateNames[index] === 'scan'" ext-class="suffix-box" slot="suffix" name="scan" />
          <TiIcon
            v-if="attrs.templateNames[index] === 'question'"
            ext-class="suffix-box"
            slot="suffix"
            name="question"
          />
          <div v-if="attrs.templateNames[index] === 'qrcode'" slot="suffix" className="suffix-box red">发验证码</div>
          <div v-if="attrs.templateNames[index] === 'resend'" slot="suffix" className="suffix-box red">重新发送</div>
          <TiImage
            v-if="attrs.templateNames[index] === 'image1'"
            slot="suffix"
            ext-class="suffix-box"
            width="180"
            height="64"
            src="http://img.la/180x64"
          />
          <TiImage
            v-if="attrs.templateNames[index] === 'image2'"
            slot="suffix"
            ext-class="suffix-box"
            width="180"
            height="64"
            src="http://img.la/180x64"
          />
          <div v-if="attrs.templateNames[index] === 'tel'" className="prefix-box" slot="prefix">
            +86
            <TiIcon name="arrow-down" size="28" />
          </div>
          <div v-if="attrs.templateNames[index] === 'city'" className="prefix-box" slot="prefix">
            上海
            <TiIcon name="arrow-down" size="32" />
          </div>
        </template>
      </TiInput>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiInput, TiInputProps, TiIcon, TiImage } from 'titian-h5-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
const options: IOptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'mode',
    desc: '模式  ',
    list: [
      {
        value: 'default',
        label: '基础',
        hiddenItems: ['partner'],
        attr: {
          group: [
            { type: 'text', title: '标题文字', placeholder: '请输入代文字文案' },
            { type: 'digit', title: '标题文字', placeholder: '请输入代数字文案' },
            { type: 'safe-password', title: '标题文字', placeholder: '请输入代密码文案' },
          ],
        },
      },
      {
        value: 'disabled',
        label: '只读禁用',
        hiddenItems: ['partner'],
        attr: {
          group: [
            { title: '标题文字', value: '只读文本样式', readonly: true },
            { title: '标题文字', value: '禁用文本样式', disabled: true },
          ],
        },
      },
      {
        value: 'overflow',
        label: '省略换行',
        hiddenItems: ['partner'],
        attr: {
          group: [
            { title: '限制五个字字', placeholder: '请输入代文字文案', ellipsisLine: 1 },
            { title: '标题过于长支持换行', placeholder: '请输入代文字文案', ellipsisLine: 2 },
          ],
        },
      },
      {
        value: 'error',
        label: '错误提示',
        hiddenItems: ['partner'],
        attr: {
          group: [
            { title: '账户名', placeholder: '请输入代填项引导文案', error: true },
            { title: '身份证', value: '12321312312312', errorMessage: '身份证号格式错误' },
          ],
        },
      },
      {
        value: 'custom',
        label: '自定义',
        attr: {
          group: [
            { title: '标题文字', placeholder: '请输入代填项引导文案' },
            { title: '标题文字', placeholder: '请输入代填项引导文案' },
          ],
        },
      },
    ],
    value: 'default',
  },
  {
    type: 'radio',
    name: 'Title',
    key: 'required',
    desc: '标题区  ',
    list: [
      { value: false, label: '非必填' },
      { value: true, label: '必填 ' },
    ],
    value: true,
  },
  {
    type: 'radio',
    name: 'Style',
    key: 'partner',
    desc: '样式  ',
    list: [
      {
        value: 'icon',
        label: '搭图标',
        attr: { templateNames: ['scan', 'question'] },
      },
      {
        value: 'button',
        label: '搭按钮',
        attr: { templateNames: ['qrcode', 'resend'], title: '验证码', placeholder: '请输入验证码' },
      },
      {
        value: 'image',
        label: '搭图片',
        attr: { templateNames: ['image1', 'image2'], placeholder: '请输入验证信息' },
      },
      {
        value: 'dropdown',
        label: '下拉选项',
        attr: { templateNames: ['tel', 'city'] },
      },
      { value: 'title', label: '标题图标', attr: { title: '文案', prefixIcons: ['camera-point', 'connect'] } },
    ],
    value: 'icon',
  },
  {
    type: 'radio',
    name: 'Align',
    key: 'textAlign',
    desc: '对齐 ',
    list: [
      { value: 'left', label: '左对齐' },
      { value: 'right', label: '右对齐 ' },
    ],
    value: 'left',
  },
];
interface InputAttrs extends TiInputProps {
  group?: Array<TiInputProps & { title: string; readonly: boolean; titleClass: string }>;
  title?: string;
  prefixIcons?: string[];
  templateNames?: string[];
}
const attrs = ref<InputAttrs>({});
const onChange = (detail: InputAttrs) => {
  attrs.value = detail;
};
</script>
<style>
.suffix-box {
  margin-left: 26px;
}

.red {
  color: #fa2c19;
  font-weight: 500;
}

.prefix-box {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.input-container {
  width: calc(100% - 56px);
  margin: 0 28px;
  overflow: hidden;

  border-radius: 20px;

  background: #fff;
}
</style>
