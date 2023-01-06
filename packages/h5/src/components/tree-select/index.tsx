import { Component, h, Prop, State, Watch, Event, EventEmitter, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { isCustomEvent, stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { join } from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

type TreeOption = {
  label?: string;
  value?: string;
  children?: TreeOption[];
};

const defaultProps = {
  defaultIndex: 0,
  height: '100%',
  maxCount: Number.MAX_SAFE_INTEGER,
  icon: 'selected',
};
@Component({
  tag: 'ti-tree-select',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiTreeSelect {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() extClass?: string = '';

  @Prop() defaultIndex?: number = defaultProps.defaultIndex;

  @Prop() options?: TreeOption[] = [];

  @Prop() activeValue?: string[] = [];

  @Prop() disabledValue?: unknown[] = [];

  @Prop() height: string | number = defaultProps.height;

  @Prop() maxCount?: number = defaultProps.maxCount;

  @Prop() icon?: string = defaultProps.icon;

  @Prop() alias?: Record<string, string> = {};

  @State() list: TreeOption[] = [];

  @State() sidebar: unknown[] = [];

  @Event({ eventName: 'changeNav', composed: false }) changeNavEvent!: EventEmitter<{
    index: number;
    item: TreeOption;
  }>;

  @Event({ eventName: 'changeItem', composed: false }) changeItemEvent!: EventEmitter<{
    item: TreeOption;
    activeValue: string[];
    current: TreeOption & {
      isActive: boolean;
    };
  }>;

  @Watch('options')
  ObserverOptions(opts: TreeOption[]) {
    if (opts.length > 0) {
      const index = this.defaultIndex || defaultProps.defaultIndex;
      const childrenAlias = this.alias.children || 'children';
      const list = (this.options || [])[index][childrenAlias] || [];

      this.list = list;
    }
  }

  onClick = (event: CustomEvent<number> | Event) => {
    if (!isCustomEvent(event)) {
      return;
    }
    const index = event.detail;
    const item = (this.options || [])[index];
    this.defaultIndex = index;
    const childrenAlias = this.alias.children || 'children';
    this.list = (this.options || [])[index][childrenAlias] || [];
    this.changeNavEvent.emit({ index: Number(index), item });
  };

  onSelect = (event: Event) => {
    if (!(event.currentTarget instanceof HTMLDivElement)) {
      return;
    }
    const { index } = event.currentTarget.dataset as { index: string };

    const {
      activeValue = [],
      disabledValue = [],
      maxCount = defaultProps.maxCount,
      list,
      options = [],
      defaultIndex = defaultProps.defaultIndex,
      alias,
    } = this;

    const valueAlias = alias.value || 'value';
    const value = list[Number(index)][valueAlias];

    if (disabledValue.includes(value)) {
      return;
    }
    if (activeValue.includes(value)) {
      activeValue.splice(activeValue.indexOf(value), 1);
    } else {
      if (activeValue.length >= maxCount) {
        return;
      }
      activeValue.push(value);
    }
    this.activeValue = [...activeValue];
    const current: TreeOption & {
      isActive: boolean;
    } = { ...list[Number(index)], isActive: activeValue.includes(value) };
    const item = options[defaultIndex];
    this.changeItemEvent.emit({ activeValue, current, item });
  };

  componentWillLoad() {
    addShadowRootStyle.call(this);
    this.ObserverOptions(this.options);
  }

  render() {
    const {
      icon = defaultProps.icon,
      height = defaultProps.height,
      defaultIndex = defaultProps.defaultIndex,
      extClass = '',
      options = [],
      list,
      activeValue = [],
      disabledValue = [],
      extStyle,
      alias,
    } = this;
    return (
      <div
        part={extClass}
        style={{ ...stringToAttrStyle(extStyle), height: addUnit(height) }}
        class={`${join('tree-select')} ${extClass}`}
      >
        <div class={join('tree-select-sidebar')}>
          <ti-sidebar active-index={defaultIndex} onChange={this.onClick}>
            {options.map((opt, index) => (
              <ti-sidebar-item label={opt[alias.label || 'label']} data-index={index} />
            ))}
          </ti-sidebar>
        </div>
        <div class={join('tree-select-container')}>
          {list.map((opt, index) => (
            <div
              data-index={index}
              onClick={this.onSelect}
              aria-hidden="true"
              class={join('tree-select-cell', [
                {
                  active: activeValue.includes(opt[alias.value || 'value']),
                  disabled: disabledValue.includes(opt[alias.value || 'value']),
                },
              ])}
            >
              {opt[alias.label || 'label']}
              {activeValue.includes(opt[alias.value || 'value']) ? <ti-icon size="36" name={icon} /> : null}
            </div>
          ))}
          <slot />
        </div>
      </div>
    );
  }
}
