import { Component, h, Prop, Element, Method, State } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import { join, handle } from '../common/utils/namespace';
import { getParent } from '../common/utils/relation';

@Component({
  tag: 'ti-step-item',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiStepItem implements BasicComponentAbstract {
  @Element() host!: HTMLTiStepItemElement;

  @Prop() extCss = '';

  @Prop() extClass?: string;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() title: string;

  @Prop() subtitle: string;

  @Prop() description: string;

  @Prop() time: string;

  @Prop() icon: string;

  @Prop() checked: boolean = null;

  @Prop() subtitleAlign: string;

  @Prop() hasLine: boolean;

  @Prop() useTitleSlot: boolean;

  @Prop() useSubtitleSlot: boolean;

  @Prop() useDescriptionSlot: boolean;

  @Prop() useTimeSlot: boolean;

  @State() checkedFormParent: boolean = null;

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-steps',
      relations: 'ancestor',
    })[0];
  }

  @Method()
  async updateDataFromParent() {
    const { parent } = this;
    if (!parent) return;
    const { children } = await parent.getImperativeHandle();
    const index = children.indexOf(this.host);
    this.subtitleAlign = this.subtitleAlign || parent.subtitleAlign;
    this.hasLine = index !== children.length - 1;
    this.checkedFormParent = this.checkCurrent(parent.current, index);
  }

  private checkCurrent(current, index) {
    if (Array.isArray(current)) {
      return current.indexOf(index) > -1;
    }
    return current === index;
  }

  componentWillLoad() {
    this.updateDataFromParent();
    addShadowRootStyle.call(this);
  }

  render() {
    const {
      extClass,
      checked,
      checkedFormParent,
      extStyle,
      icon,
      hasLine,
      subtitleAlign,
      title,
      subtitle,
      description,
      time,
      useTitleSlot,
      useSubtitleSlot,
      useDescriptionSlot,
      useTimeSlot,
    } = this;
    return (
      <div
        part={extClass}
        class={`${join('steps-item', [{ active: checked ?? checkedFormParent }])} ${extClass}`}
        style={{ ...stringToAttrStyle(extStyle) }}
      >
        <div class={handle('steps-item', ['left'])}>
          <div class={handle('steps-item', ['icon-box'])}>
            {icon ? <ti-icon name={icon} /> : <div class={handle('steps-item', ['dot'])} />}
          </div>
          {hasLine && <div class={handle('steps-item', ['line'])} />}
        </div>
        <div class={handle('steps-item', ['content'])}>
          {(title || subtitle || useTitleSlot || useSubtitleSlot) && (
            <div class={handle('steps-item', ['title-box'])}>
              <div class={handle('steps-item', ['title'])}>{useTitleSlot ? <slot name="title" /> : title}</div>
              <div class={join('steps-item-subtitle', [{ right: subtitleAlign === 'right' }])}>
                {useSubtitleSlot ? <slot name="subtitle" /> : subtitle}
              </div>
            </div>
          )}
          {(description || useDescriptionSlot) && (
            <div class={handle('steps-item', ['desc'])}>
              {useDescriptionSlot ? <slot name="description" /> : description}
            </div>
          )}
          {(time || useTimeSlot) && (
            <div class={handle('steps-item', ['time'])}>{useTimeSlot ? <slot name="time" /> : time}</div>
          )}
        </div>
      </div>
    );
  }
}
