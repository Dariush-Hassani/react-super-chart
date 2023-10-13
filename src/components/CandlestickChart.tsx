import { DataProvider } from '../context/DataContext';
import { ConfigDataProvider } from '../context/ConfigtDataContext';

import Chart from './Chart';

const CandlestickChart: React.FC<{
  chartData: any;
  chartId: string;
  width: number;
  height: number;
  decimal?: number;
}> = ({ chartData, chartId, width, height, decimal }) => {
  return (
    <DataProvider>
      <ConfigDataProvider>
        <Chart
          chartData={chartData}
          chartId={chartId}
          width={width}
          height={height}
          decimal={decimal}
        />
      </ConfigDataProvider>
    </DataProvider>
  );
};
export default CandlestickChart;
