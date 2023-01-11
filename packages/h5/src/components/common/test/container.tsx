import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'test-container',
  shadow: false,
})
export class TestContainer {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
