export interface Spec {
  label: string;
  specId: string;
  options: Array<SpecOption>;
}

export interface SpecOption {
  optionId: string;
  label: string;
}

export interface Sku {
  skuId: string;
  specOptionIds: string[];
  stock: number;
}

export enum EdgeType {
  /** 不可联通的 */
  NonConnectable = 'nonConnectableEdges',

  /** 兄弟节点，可切换过去 */
  Switchable = 'siblingsEdges',

  /** 可以连通的，未售空 */
  Connectable = 'connectableEdges',

  /** 可以连通的，但已售空 */
  ConnectableSoldout = 'soldoutEdges',
}

export default class Graph {
  vertexes: Set<string>;

  connectableEdges: Map<string, Set<string>>;

  nonConnectableEdges: Map<string, Set<string>>;

  soldoutEdges: Map<string, Set<string>>;

  siblingsEdges: Map<string, Set<string>>;

  constructor(specs: Array<Spec>, skus: Array<Sku>) {
    this.vertexes = new Set<string>();
    this.connectableEdges = new Map();
    this.soldoutEdges = new Map();
    this.nonConnectableEdges = new Map();
    this.siblingsEdges = new Map();

    this.init(specs, skus);
  }

  init(specs: Array<Spec>, skus: Array<Sku>) {
    // sibling edges map
    specs.forEach(spec => {
      const optionIds = spec.options.map(x => x.optionId);

      optionIds.forEach(optionId => {
        this.addVertex(optionId);

        const restIds = optionIds.filter(x => x !== optionId);
        restIds.forEach(toVertex => {
          this.addEdge(optionId, toVertex, EdgeType.Switchable);
        });
      });
    });

    // connectable edges map
    skus.forEach(sku => {
      sku.specOptionIds.forEach(optionId => {
        const restIds = sku.specOptionIds.filter(x => x !== optionId);
        restIds.forEach(toVertex => {
          this.addEdge(optionId, toVertex, EdgeType.Connectable);

          if (sku.stock === 0) {
            this.addEdge(optionId, toVertex, EdgeType.ConnectableSoldout);
          }
        });
      });
    });

    // non connectable edges

    [...(this.vertexes || [])].forEach((vertex: string) => {
      const toVertexes = new Set([
        ...(this.siblingsEdges.get(vertex) || []),
        ...(this.connectableEdges.get(vertex) || []),
        vertex,
      ]);
      const nonConn = [...this.vertexes].filter((x: any) => !toVertexes.has(x)) as string[];
      this.nonConnectableEdges.set(vertex, new Set(nonConn));
    });
  }

  addVertex(value: string) {
    this.vertexes.add(value);
  }

  addEdge(startVertex: string, toVertex: string, edgeType: EdgeType) {
    const targetEdgeSetKey = edgeType;

    if (!targetEdgeSetKey) return;

    let edgeSet = this[targetEdgeSetKey].get(startVertex);
    if (!edgeSet) {
      edgeSet = new Set([toVertex]);
    } else {
      edgeSet = new Set([...edgeSet, toVertex]);
    }

    this[targetEdgeSetKey].set(startVertex, edgeSet);
  }
}
