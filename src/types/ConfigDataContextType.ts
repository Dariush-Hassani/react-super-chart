export type ConfigDataContextType = {
  width: number;
  height: number;
  diagramWidth?: number;
  diagramHeight?: number;
  decimal:number;
};


export type ConfigDataActionType = {
  type:'changeDiagramDimension'
  diagramWidth: number;
  diagramHeight: number;
};

