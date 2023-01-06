import { Component, h, Prop, State, EventEmitter, Event, Element } from '@stencil/core';
import * as namespace from '../common/utils/namespace';

export interface ActionItem {
  name?: string;
  description?: string;
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
  dot?: boolean;
  badge?: string;
}

@Component({
  tag: 'ti-action-sheet',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiActionSheet {
  @Element() host: HTMLElement;

  @Prop() visible = false;

  @Prop() title: string;

  @Prop() actions: ActionItem[] = [];

  @Prop() cancelText: string;

  @Prop() hoverClass: string;

  @Prop() alias?: { [x: string]: string } = {};

  @State() subBgColor: string;

  @Event({ bubbles: false, composed: false }) close: EventEmitter<never>;

  @Event({ bubbles: false, composed: false }) cancel: EventEmitter<never>;

  @Event({ bubbles: false, composed: false }) select: EventEmitter<ActionItem>;

  private onPopupClose() {
    this.visible = false;
    this.close.emit();
  }

  private onCancel() {
    this.visible = false;
    this.cancel.emit();
  }

  private onSelect(e, action: ActionItem) {
    e.stopPropagation();

    if (action[this.alias.disabled || 'disabled'] || action[this.alias.loading || 'loading']) return;
    this.select.emit(action);
  }

  private renderContent() {
    const { actions, alias } = this;
    return actions.map(item => (
      <div
        aria-hidden="true"
        class={namespace.handle('action-sheet', [
          { disabled: item[alias.disabled || 'disabled'], loading: item[alias.loading || 'loading'] },
          'button',
        ])}
        onClick={e => this.onSelect(e, item)}
      >
        <div class={namespace.handle('action-sheet', ['text'])}>
          {item[alias.loading || 'loading'] ? (
            <ti-loading extClass={namespace.handle('action-sheet', ['loading-icon'])} size={28} />
          ) : null}
          {item[alias.icon || 'icon'] ? (
            <ti-icon name={item.icon} extClass={namespace.handle('action-sheet', ['icon'])} />
          ) : null}

          <ti-badge use-slot content={item.badge} dot={item.dot} atText>
            <span>{item[alias.name || 'name']}</span>
          </ti-badge>
        </div>
        {item[alias.description || 'description'] ? (
          <div class={namespace.handle('action-sheet', ['description'])}>
            {item[alias.description || 'description']}
          </div>
        ) : null}
      </div>
    ));
  }

  render() {
    return (
      <ti-popup
        class={namespace.join('action-sheet')}
        visible={this.visible}
        position="bottom"
        onClose={this.onPopupClose.bind(this)}
      >
        {this.title ? <div class={namespace.handle('action-sheet', ['title'])}>{this.title}</div> : null}
        {this.renderContent()}
        {this.cancelText ? (
          <button type="button" class={namespace.handle('action-sheet', ['cancel'])} onClick={this.onCancel.bind(this)}>
            {this.cancelText}
          </button>
        ) : null}
      </ti-popup>
    );
  }
}
