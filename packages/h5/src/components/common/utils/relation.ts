function isEqualElement<T extends keyof HTMLElementTagNameMap>(
  target: Element,
  currentTarget: T,
): target is HTMLElementTagNameMap[T] {
  return target.tagName.toLocaleLowerCase() === currentTarget.toLocaleLowerCase();
}
function isEqualNode<T extends keyof HTMLElementTagNameMap>(
  target: ParentNode,
  currentTarget: T,
): target is HTMLElementTagNameMap[T] {
  return target.nodeName.toLocaleLowerCase() === currentTarget.toLocaleLowerCase();
}
export function isShadowRoot(node: Node): node is ShadowRoot {
  return node !== document && node === node.getRootNode();
}

export enum RelationsEnum {
  'CHILDREN' = 'children',
  'DESCENDANT' = 'descendant',
  'PARENT' = 'parent',
  'ANCESTOR' = 'ancestor',
}

export function getParent<T extends keyof HTMLElementTagNameMap>(params: {
  host: HTMLElement;
  relations: `${RelationsEnum.PARENT | RelationsEnum.ANCESTOR}`;
  tag: T;
}): [HTMLElementTagNameMap[T] | null, boolean] {
  const { host, relations = RelationsEnum.ANCESTOR, tag } = params;
  if (relations === 'parent') {
    const parent = host.parentElement;
    if (parent && isEqualElement(parent, tag)) {
      return [parent, true];
    }
    // throw new Error('parent not found');
    return [null, true];
  }
  let ancestor = host.parentNode;
  while (ancestor) {
    if (isEqualNode(ancestor, tag)) {
      return [ancestor, true];
    }
    if (ancestor.parentNode === null && ancestor.isConnected && isShadowRoot(ancestor)) {
      if (isEqualNode(ancestor.host, tag)) {
        return [ancestor.host, false];
      }
    }
    ancestor = ancestor.parentNode;
  }
  return [null, false];
}

export function getChildrenTagName<T extends keyof HTMLElementTagNameMap>(params: {
  host: HTMLElement;
  useSlot: boolean;
  relations: `${RelationsEnum.CHILDREN | RelationsEnum.DESCENDANT}`;
  tag: T;
}) {
  const { host, useSlot, relations = RelationsEnum.DESCENDANT, tag } = params;
  const curTag = host.tagName.toLocaleLowerCase();
  const querySelectAll = (str: string): HTMLElementTagNameMap[T][] => {
    if (useSlot) {
      return Array.from(host.querySelectorAll(str));
    }
    return host.shadowRoot ? Array.from(host.shadowRoot.querySelectorAll(str)) : [];
  };
  const query = relations === 'children' ? `:scope > ${tag}` : `${tag}`;
  const child = querySelectAll(query);
  const nest = [...querySelectAll(`:scope ${curTag} ${tag}`), ...querySelectAll(`:scope ${tag} ${tag}`)];
  return child.filter(children => !nest.some(item => item === children));
}
export function getChildrenSelectorName<T extends string>(params: {
  host: HTMLElement;
  useSlot: boolean;
  relations: `${RelationsEnum.CHILDREN | RelationsEnum.DESCENDANT}`;
  selector: T;
}) {
  const { host, useSlot, relations = RelationsEnum.DESCENDANT, selector } = params;
  const curTag = host.tagName.toLocaleLowerCase();
  const querySelectAll = (str: string): HTMLElement[] => {
    if (useSlot) {
      return Array.from(host.querySelectorAll(str));
    }
    return host.shadowRoot ? Array.from(host.shadowRoot.querySelectorAll(str)) : [];
  };
  const query = relations === 'children' ? `:scope > ${selector}` : `${selector}`;
  const child = querySelectAll(query);
  const nest = [...querySelectAll(`:scope ${curTag} ${selector}`), ...querySelectAll(`:scope ${selector} ${selector}`)];
  return child.filter(children => !nest.some(item => item === children));
}
export const getChildren = getChildrenTagName;
