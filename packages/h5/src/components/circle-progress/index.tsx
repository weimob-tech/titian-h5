import { Component, h, Element, Prop, Watch } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { getStyle, addShadowRootStyle } from '../common/utils';
import { hexToRGB, RGBAToHex } from '../common/utils/color';
import * as namespace from '../common/utils/namespace';
import { raf } from '../common/utils/raf';

@Component({
  tag: 'ti-circle-progress',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCircleProgress implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string = '';

  @Prop() value = 0;

  @Prop() size = 80;

  @Prop() strokeWidth = 4;

  @Prop() color?: string;

  @Prop() strokeColor?: string;

  @Prop() bufferBgColor?: string;

  @Prop() font?: string;

  @Prop() buffer = 0;

  @Prop() showProgress?: boolean = false;

  private currentValue: number;

  private currentBufferValue: number;

  private ctx: CanvasRenderingContext2D;

  private canvas: HTMLCanvasElement;

  private rafId: number;

  private width: number;

  private height: number;

  private targetValue: number;

  targetBufferValue: number;

  @Watch('value')
  valueChange(val: number) {
    this.targetValue = ((val * 2) / 100 - 0.5) * Math.PI;
    if (this.canvas && this.rafId) {
      raf.cancel(this.rafId, () => {
        this.rafId = null;
      });
    }
    this.doRender();
  }

  @Watch('buffer')
  bufferChange(val: number) {
    this.targetBufferValue = ((val * 2) / 100 - 0.5) * Math.PI;
    if (this.canvas && this.rafId) {
      raf.cancel(this.rafId, () => {
        this.rafId = null;
      });
    }
    this.doRender();
  }

  componentWillLoad(): void | Promise<void> {
    this.valueChange(this.value);
    this.bufferChange(this.buffer);

    addShadowRootStyle.call(this);
  }

  componentDidLoad(): void {
    this.currentValue = -0.5 * Math.PI;
    this.currentBufferValue = -0.5 * Math.PI;
    const selector = namespace.handle('circle-progress', 'canvas');
    const canvas: HTMLCanvasElement = this.host.shadowRoot.querySelector(`.${selector}`);
    let color = getStyle<HTMLCanvasElement>(canvas, 'color');
    color = RGBAToHex(`${color}`);
    this.color = color || this.color || '#fa2c19';
    this.init(canvas);
  }

  private init(canvas: HTMLCanvasElement) {
    if (!canvas) return;

    this.width = Number.parseFloat(`${getStyle(canvas, 'width')}`);
    this.height = Number.parseFloat(`${getStyle(canvas, 'height')}`);
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;

    this.doRender();
  }

  private doRender() {
    if (!this.canvas) return;
    this.rafId = raf(this.renderLoop.bind(this));
  }

  private renderLoop() {
    this.renderView();
    if (this.currentValue < this.targetValue) {
      this.rafId = raf(this.renderLoop.bind(this));
    }
  }

  private renderView() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBg();
    if (this.buffer > 0) {
      this.drawBuffer();
    }
    this.draw();
  }

  handleDraw(curValue: number, targetValue: number, color: string, defaultEndAngle?: number) {
    const { ctx } = this;
    const { strokeWidth } = this;

    const endAngle = defaultEndAngle || Math.min(curValue, targetValue);

    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, (this.width - strokeWidth) / 2, -0.5 * Math.PI, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.stroke();
  }

  private draw() {
    const { color } = this;
    this.currentValue += 0.01 * Math.PI;

    this.handleDraw(this.currentValue, this.targetValue, color);
  }

  private drawBg() {
    const { strokeColor } = this;
    this.handleDraw(0, 0, strokeColor || hexToRGB(this.color, 0.1), 2 * Math.PI);
  }

  private drawBuffer() {
    const { bufferBgColor } = this;
    this.currentBufferValue += 0.015 * Math.PI;

    this.handleDraw(this.currentBufferValue, this.targetBufferValue, bufferBgColor || hexToRGB(this.color, 0.3));
  }

  render() {
    return (
      <div class={`${namespace.join('circle-progress')} ${this.extClass}`} part={this.extClass}>
        <canvas
          class={namespace.handle('circle-progress', 'canvas')}
          height={this.size}
          width={this.size}
          style={this.color ? { color: this.color } : {}}
        />
        {this.showProgress ? (
          <div style={{ font: this.font, color: this.color }} class={namespace.handle('circle-progress', 'text')}>
            {this.value}%
          </div>
        ) : (
          <slot />
        )}
      </div>
    );
  }
}
