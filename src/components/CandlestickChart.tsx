import { DataProvider } from '../context/DataContext';

import Chart from './Chart';

const CandlestickChart: React.FC<{
  chartData: any;
}> = ({ chartData }) => {
  return (
    <DataProvider>
      <Chart chartData={chartData}/>
    </DataProvider>
  );
};
export default CandlestickChart;
