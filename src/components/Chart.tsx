import React from 'react';
import { useData, useDataDispatch } from '../context/DataContext';
import { useEffect } from 'react';
import { dataNormalizer } from '../helperFunctions';

const Chart: React.FC<{
  chartData: any;
}> = ({ chartData }) => {
  const data = useData();
  const dispatchData = useDataDispatch();

  useEffect(() => {
    if (chartData) {
      let newData = dataNormalizer(chartData);
      if (newData)
        dispatchData({
          type: 'changeInitData',
          initData: newData,
        });
    }

    setTimeout(() => {
      dispatchData({
        type: 'changeShownRange',
        shownRange: {
          start: 1540166400000,
          end: 1540512000000,
        },
      });
    }, 5000);
  }, [chartData]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div>Chart</div>;
};

export default Chart;
