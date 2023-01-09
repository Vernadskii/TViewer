import {default as ApexChart} from "react-apexcharts";
import { useHistoricalDataDetail, useTrades } from '../API/queries';
import { useState, useEffect } from 'react';
import type { Settings } from "../InfoPanel";
import { ApexOptions } from "apexcharts";
import { Trades } from "../API/Api";

export type ChartSettings =  Settings & {
  settings: {
      chartName: string;
  }
}

function turnTradesIntoAnnotations(trades: Trades | undefined): PointAnnotations[] {

  return [
      {
        x: new Date('2023-01-09 09:17:42.646').getTime(),
        y: 17300,
        marker: {
          size: 6,
          fillColor: "#fff",
          strokeColor: "#2698FF",
          radius: 2
        },
        label: {
          borderColor: "#FF4560",
          offsetY: 0,
          style: {
            color: "#fff",
            background: "#FF4560"
          },

          text: "Point Annotation (XY)"
        }
      }
    ];
}

export default function Chart({settings}: ChartSettings){
  const [plotData, setPlotData] = useState<{
    x: any;
    y: any;
  }[]>([]);
  const [annotationData, setAnnotationData] = useState<PointAnnotations[]>([]);

  const { isLoading, error, data} = useHistoricalDataDetail(
    settings.profile, {indicator: settings.chartName, timeframe: settings.timeframe});
  
  const { isLoading: isLoadingTrades, error: isErrorTrades, data: dataTrades} = useTrades(settings.profile);

  useEffect(() => {
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
      setPlotData(prepared_data);
      setAnnotationData(turnTradesIntoAnnotations(dataTrades));
    }
  }, [settings, data]);

  if (isLoading || isLoadingTrades) return <p>Loading...</p>;
  if (error || isErrorTrades) return <p>An error has occurred</p>;

  var options: ApexOptions = {
    annotations: {
      points: annotationData
    },
    chart: {
      // group: 'social',
      id: `basic-bar ${settings.chartName}`,
    },
    title: {
      text: settings.chartName,
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
    <div id="chart" key={settings.chartName} className="h-auto">
        <ApexChart
          key={settings.chartName}
          options={options}
          series={series}
          type="candlestick"
          width='100%'
          height="500px"
        />
    </div>
  );
}