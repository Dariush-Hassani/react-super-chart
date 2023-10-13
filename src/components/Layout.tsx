import React, { useEffect } from 'react';
import { useData, useDataDispatch } from '../context/DataContext';
import {
  useConfigData,
  useConfigDispatch,
} from '../context/ConfigtDataContext';

const Layout: React.FC<{
  chartId: string;
  randomExtId: string;
}> = ({ chartId, randomExtId }) => {
  const data = useData();
  const dispatchData = useDataDispatch();

  const config = useConfigData();
  const dispatchConfig = useConfigDispatch();

  const paddingLeft = 25;
  const paddingTop = 10;
  const paddingBottom = 30;
  const paddingRight =
    2.5 +
    data.minMaxShownDate.max.toFixed(config.decimal).toString().length *
      config.characterFontWidth;

  useEffect(() => {
    dispatchConfig({
      type: 'changeDiagramDimension',
      diagramHeight: config.height - (paddingBottom + paddingTop + 6),
      diagramWidth: config.width - (paddingLeft + paddingRight) - 2,
    });
  }, [config.width,config.height]);

  return <div>Layout</div>;
};

export default Layout;
