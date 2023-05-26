import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { IStore, store } from '../common/basic/store';

@Component({
  tag: 'ti-config-provider',
  shadow: true,
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
})
export class TiConfigProvider implements BasicComponentAbstract {
  @Prop() locale: IStore['locale'] = store.get('locale');

  @Prop() iconClassPrefix: IStore['iconClassPrefix'] = store.get('iconClassPrefix');

  @Prop() enableTitianIcon: IStore['enableTitianIcon'] = store.get('enableTitianIcon');

  @Watch('locale')
  localeChange(value: IStore['locale'], oldValue?: IStore['locale']) {
    if (value !== oldValue) {
      store.set('locale', value);
    }
  }

  @Watch('enableTitianIcon')
  enableTitianIconChange(value: IStore['enableTitianIcon'], oldValue?: IStore['enableTitianIcon']) {
    if (value !== oldValue) {
      store.set('enableTitianIcon', value);
    }
  }

  componentWillLoad(): Promise<void> | void {
    this.localeChange(this.locale);
    this.enableTitianIconChange(this.enableTitianIcon);
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
