import {default as ApexChart} from "react-apexcharts";
import { useHistoricalDataDetail } from '../API/queries';
import { useState, useEffect } from 'react';
import type { Settings } from "../InfoPanel";
import { ApexOptions } from "apexcharts";

export type ChartSettings =  Settings & {
  settings: {
      chartName: string;
  }
}

export default function Chart({settings}: ChartSettings){
  const [plotData, setData] = useState<{
    x: any;
    y: any;
  }[]>([]);
  const { isLoading, error, data} = useHistoricalDataDetail(
    settings.profile, {indicator: settings.chartName, timeframe: settings.timeframe});

  useEffect(() => {
    console.log(`Chart settings ${JSON.stringify(settings)}`);
    var prepared_data = [];
    if (data)
    {
      for (const candle of data)
      {
        prepared_data.push(
            {
              x: Date.parse(candle.time),
              y: [candle.open, candle.high, candle.low, candle.close]
            }
          );
      }
      setData(prepared_data);
    }
  }, [settings]);

  if (isLoading) return <p>'Loading...'</p>;
  if (error) return <p>'An error has occurred'</p>;

  var options: ApexOptions = {
    chart: {
      group: 'social',
      id: `basic-bar ${Math.random()}`,
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };
          
  let series:ApexAxisChartSeries = [{
      data: plotData
    }];

  return (
    <div id="chart">
        <ApexChart
          options={options}
          series={series}
          type="candlestick"
          width='100%'
          height="350"
        />
    </div>
  );
}