import { Prop, Component, h } from '@stencil/core';
import * as namespace from '../common/utils/namespace';

enum ESafeArea {
  Top = 'top',
  Bottom = 'bottom',
}
@Component({
  tag: 'ti-safe-area',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSafeArea {
  @Prop() position: ESafeArea = ESafeArea.Bottom;

  render() {
    return <div class={namespace.join('safe', [this.position])} />;
  }
}
