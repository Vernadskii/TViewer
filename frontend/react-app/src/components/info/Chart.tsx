import {default as ApexChart} from "react-apexcharts";
import { Api, Profiles, HttpResponse} from "../Api";
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

  async function getPlotData() /*:Promise<string[]>*/{
    var api = new Api();
    const response = await api.profiles.historicalDataDetail(
      settings.profile, 
      {indicator: settings.chartName, timeframe: settings.timeframe},
      {baseUrl: "http://localhost:30000"});
    return response.data;
  };

  function updatePlotData(){
    getPlotData().then(rawPlotData => {
      var prepared_data = []
      for (const candle of rawPlotData)
      {
        prepared_data.push(
            {
              x: Date.parse(candle.time),
              y: [candle.open, candle.high, candle.low, candle.close]
            }
          );
      }
      setData(prepared_data)
    })
  };

  useEffect(() => {
    console.log(`Chart settings ${JSON.stringify(settings)}`);
    updatePlotData();
  }, [settings]);

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