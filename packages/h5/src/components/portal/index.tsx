import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'ti-portal',
  shadow: true,
})
export class PortalComponent {
  @Prop() reference: HTMLElement;

  @Prop() target: HTMLElement = document.body;

  //   @Prop() offset: number;
  private portal: HTMLElement;

  private element: HTMLElement;

  private moved = false;

  private createPortal() {
    this.portal = document.createElement('div');

    this.portal.style.position = 'absolute';
    this.target.append(this.portal);
  }

  private moveElementToPortal() {
    this.portal.appendChild(this.element);
  }

  componentWillLoad() {
    this.createPortal();
  }

  componentDidLoad() {
    this.moveElementToPortal();
  }

  disconnectedCallback() {
    if (this.moved) {
      this.portal.remove();
    } else {
      this.moved = true;
    }
  }

  render() {
    return (
      <Host ref={el => (this.element = el)}>
        <slot />
      </Host>
    );
  }
}
