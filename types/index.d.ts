declare const api: {
  loadDir: (path: string) => void,
  handleData: (callback: (event: IpcRendererEvent, data: Data) => void) => Electron.IpcRenderer
}

declare interface GraphNode {
  index: number;
  name: string;
}

declare interface GraphEdge {
  source: number;
  target: number;
}

declare interface Data {
  path: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}
