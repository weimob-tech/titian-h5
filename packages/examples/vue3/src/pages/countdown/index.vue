<template>
  <CustomPage :center="false" :options="options" @change="onChange">
    <div class="countdown-container" :style="`--countdown-color: ${attrs.color};--countdown-background: ${bgColor}`">
      <TiCountdown :time="11111111" :variant="attrs.variant" :format="attrs.format" ref="countdownRef" />
      <div className="actions-container">
        <img
          v-if="status !== STATE.START"
          @click="onStart"
          className="action-item"
          src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/play.svg"
        />
        <img
          v-if="status !== STATE.PAUSE"
          @click="onPause"
          className="action-item"
          src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/pause.svg"
        />
        <img
          @click="onReset"
          className="action-item"
          src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/replay.svg"
        />
      </div>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiCountdown, TiCountdownProps } from 'titian-h5-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
const options: IOptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'mode',
    desc: '模式 ',
    value: 'module',
    list: [
      { value: 'number', label: '数字', attr: { variant: 'pure', format: 'DD 天 HH : mm : ss SSS' } },
      {
        value: 'module',
        label: '模块',
        attr: { variant: 'block', format: 'DD 天 HH : mm : ss SSS' },
      },
    ],
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    type: 'radio',
    name: 'Day',
    key: 'day',
    desc: '天数',
    value: false,
    list: [
      { value: false, label: '无', attr: { format: 'HH : mm : ss' } },
      { value: true, label: '有', attr: { format: 'DD 天 HH : mm : ss' } },
    ],
  },
  {
    type: 'radio',
    name: 'Millisecond',
    key: 'second',
    desc: '毫秒',
    value: false,
    list: [
      { value: false, label: '无' },
      { value: true, label: '有', attr: { format: 'HH : mm : ss SSS' } },
    ],
  },
];
interface Attrs extends TiCountdownProps {
  color?: string;
}
const STATE = { START: 'start', PAUSE: 'pause' };
const status = ref(STATE.PAUSE);
const countdownRef = ref();
const bgColor = ref('#fff2f2');
const attrs = ref<Attrs>({});
const hexToRGB = (hex: string, a: number | string) => {
  let alpha = false;
  let h: number | string = hex.slice(hex.startsWith('#') ? 1 : 0);
  if (h.length === 3) {
    h = [...h].map(x => x + x).join('');
  } else if (h.length === 8) {
    alpha = true;
  } else if (h.length === 6) {
  } else {
    return hex;
  }
  h = parseInt(h, 16);
  const isAlpha = alpha || a;
  a = a || `${h & 255}`;
  return `rgb${isAlpha ? 'a' : ''}(${h >>> (alpha ? 24 : 16)}, ${
    (h & (alpha ? 16711680 : 65280)) >>> (alpha ? 16 : 8)
  }, ${(h & (alpha ? 65280 : 255)) >>> (alpha ? 8 : 0)}${isAlpha ? `, ${a}` : ''})`;
};
const onChange = (detail: Attrs) => {
  attrs.value = detail;
  bgColor.value = hexToRGB(detail.color || '#fa2c19', 0.1);
};
const onStart = () => {
  countdownRef.value.$el.start();
  status.value = STATE.START;
};
const onPause = () => {
  countdownRef.value?.$el.pause();
  status.value = STATE.PAUSE;
};
const onReset = () => {
  countdownRef.value?.$el.reset();
  countdownRef.value?.$el.start();
  status.value = STATE.START;
};
</script>
<style>
.countdown-container {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: none;
}

.actions-container {
  display: flex;
  position: absolute;
  bottom: 100px;
}

.action-item {
  width: 60px;
  height: 60px;
  padding: 0 24px;

  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.custom-panel {
  display: flex;
  align-items: center;

  font-size: 26px;
}

.d,
.time {
  min-width: 24px;

  color: var(--neutral-color-2);
  font-size: 28px;
  line-height: 40px;
  text-align: center;
}

.d {
  margin: 0 4px;

  color: #000;
}

.day.d {
  margin: 0 16px 0 0;

  font-size: 24px;
}

.time {
  display: inline-flex;
  box-sizing: content-box;
  justify-content: center;
  min-width: 30px;
  padding: 0 6px;

  border-radius: 8px;

  background: var(--time-bg-color, rgba(250, 44, 25, 1000%));

  font-size: 26px;
  font-weight: bolder;
  line-height: 40px;
  text-align: center;
}

.time.day-time {
  margin-right: 4px;
  padding: 0;

  background: none;
}

.ms {
  min-width: 50px;
}
</style>
