import React, { useEffect, useState } from 'react';
import CandlestickChart from './components/CandlestickChart';
import * as d3 from 'd3';

function App() {
  const [data, setData] = useState<any>([]);
  const [size, setSize] = useState<any>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    d3.json('data.json').then((res) => {
      setData(res);
    });
    window.addEventListener('resize', () =>
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    );
  }, []);

  return (
    <>
      <CandlestickChart
        chartData={data}
        chartId='1'
        width={size.width}
        height={size.height}
      />
    </>
  );
}

export default App;
