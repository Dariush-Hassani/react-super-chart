import { DataProvider } from '../context/DataContext';

import Chart from './Chart';

const CandlestickChart: React.FC<{
  chartData: any;
  chartId: string;
}> = ({ chartData, chartId }) => {
  return (
    <DataProvider>
      <Chart chartData={chartData} chartId={chartId} />
    </DataProvider>
  );
};
export default CandlestickChart;
