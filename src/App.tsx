import React, { useEffect, useState } from 'react';
import CandlestickChart from './components/CandlestickChart';
import * as d3 from 'd3';

function App() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    d3.json('data.json').then((res) => {
      setData(res);
    });
  }, []);

  return <CandlestickChart chartData={data} />;
}

export default App;
