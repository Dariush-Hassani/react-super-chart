import React from 'react';
import { useData, useDataDispatch } from '../context/DataContext';
import { useEffect } from 'react';
import { dataNormalizer } from '../helperFunctions';
import Layout from './Layout';
import {
  useConfigData,
  useConfigDispatch,
} from '../context/ConfigtDataContext';

const Chart: React.FC<{
  chartData: any;
  chartId: string;
  width: number;
  height: number;
  decimal?: number;
}> = ({ chartData, chartId, width, height, decimal }) => {
  const data = useData();
  const dispatchData = useDataDispatch();

  const config = useConfigData();
  const dispatchConfig = useConfigDispatch();

  const randomExtId = Math.random().toString();

  useEffect(() => {
    dispatchConfig({
      type: 'changeContainerDimension',
      containerWidth: width,
      containerHeight: height,
    });
  }, [width, height]);

  useEffect(() => {
    dispatchConfig({
      type: 'changeDecimal',
      decimal: decimal ?? 2,
    });
  }, [decimal]);

  useEffect(() => {
    if (chartData) {
      let newData = dataNormalizer(chartData);
      if (newData)
        dispatchData({
          type: 'changeInitData',
          initData: newData,
        });
    }
  }, [chartData]);


  return <Layout chartId={chartId} randomExtId={randomExtId}></Layout>;
};

export default Chart;
